import React, { useState, useEffect } from 'react';

import {getTopItems, getItem} from "./../api/HackerNews";
import {ItemData, AutoSizerProps} from "./../types";
import { FixedSizeList } from 'react-window';
import InfiniteLoader  from 'react-window-infinite-loader';
import Item from "./../components/Item";
import Loading from "./../components/common/Loading"
import PageTitleAndDescription from "./../components/common/PageTitleAndDescription";

export default function AllItems({width, height} : AutoSizerProps) {
    const [itemIds, setItemIds] = useState<number[]>([]);
    const [itemsIdsAreLoaded, setItemsIdsAreLoaded] = useState<boolean>(false);
    const [showGeneralApiErrorDiv, setShowGeneralApiErrorDiv] = useState<boolean>(false);
    //object to store all the indexes from itemIds and their data from the api
    const [itemIndexesAndData, setItemIndexesAndData] = useState<{[key:number]:ItemData}>([]);
    //while the next page is loading, do not allow more pages to be loaded
    const [nextPageIsLoading, setNextPageIsLoading] = useState<boolean>(false);
    //store indexAndIsLoaded for quickly determining the status of an item
    const [indexAndIsLoaded, setIndexAndIsLoaded] = useState<{[key: number]: boolean}>({});
    //store max id loaded so when more data is needed you have a starting index point to access itemIds at
    const [maxIndexLoaded, setMaxIndexLoaded] = useState<number>(-1);
    const numToLoadAtOnce = 15;
    const numOfItemsApiReturns = 500;

    // on load, get ids from the api which will be used to hit the item endpoint for each id
    useEffect(() => {
        getTopItems().then((items)=>{
            setItemIds(items);
            setItemsIdsAreLoaded(true)
        }).catch((items)=>{
            //an error occured in our call, display a message to the user
            setShowGeneralApiErrorDiv(true)
        })
    },[]);

    //call this after item ids are set with setItemIds. loadNextPage will call the endpoint for each id and get details
    React.useEffect(() => {
        loadNextPage();
        // eslint-disable-next-line
    }, [itemsIdsAreLoaded]);

    interface Props{
        index:number, 
        style?:React.CSSProperties
    }

    //show an item or a loading icon as we are waiting for the items data
    const ItemOrLoadingIcon = ({ index, style }: Props) => (
        //show loading screen if data is not present
        (indexAndIsLoaded[index] === undefined || indexAndIsLoaded[index] === false) ? 
            <Loading />
        :
            <Item
                style={style}
                itemData={itemIndexesAndData[index]} 
            />
    );

    //InfiniteLoader will automatically call this when needed to get more items details 
    const loadNextPage = () => {
        if(!itemIds.length){
            return; //do not load data until itemIds.length > 0. You need ids to load the items
        }
        setNextPageIsLoading(true)
        //iterate from the max index loaded plus 1(since max id is already loaded) 
        //to max index plus num to load at once
        const promises : Promise<ItemData>[] = [];
        const newMaxIndexLoaded = maxIndexLoaded+numToLoadAtOnce;
        const newIndexesAndIsLoaded = Object.assign({}, indexAndIsLoaded);
        const newItemIndexsAndData = Object.assign({}, itemIndexesAndData);
        for(let i=maxIndexLoaded+1;i<=newMaxIndexLoaded;i++){
            //generate a list of promises that are hitting the items endpoint
            promises.push(getItem(itemIds[i], i));
            newIndexesAndIsLoaded[i] = true;
        }

        //wait on each promise to the items endpoint
        Promise.all(promises).then((itemDataArrays) => {
            setNextPageIsLoading(false);
            //for each of these, update itemIdsAndData
            itemDataArrays.forEach((itemData)=>{
                newItemIndexsAndData[itemData.index] = itemData
            })
            //update vars to reload the dom with the data for these items set
            setItemIndexesAndData(newItemIndexsAndData);
            setIndexAndIsLoaded(newIndexesAndIsLoaded);
            setMaxIndexLoaded(newMaxIndexLoaded);
        }).catch(()=>{
            //an error occurred in getting item details
            setShowGeneralApiErrorDiv(true);
        });
    }

    const isItemLoaded = (index:number)=> indexAndIsLoaded[index] === true;
    const loadMoreItems = nextPageIsLoading ? () => {} : loadNextPage;

    if(showGeneralApiErrorDiv){
        return <PageTitleAndDescription extraClasses="absolute" description={["No records are found"]} />
    }

    return (
        <>
            {/* use infinate loader to help break items api calls into 
            down into chunks of 15 calls that are only called when needed */}
            <InfiniteLoader
                isItemLoaded={isItemLoaded}
                itemCount={numOfItemsApiReturns}
                loadMoreItems={loadMoreItems}
                >
                {/* use FixedSizeList to handle displaying this list of equal sized items */}
                {({ onItemsRendered, ref }) => (
                    <FixedSizeList
                        height={height}
                        itemCount={numOfItemsApiReturns}
                        itemSize={110}
                        width={width}
                        onItemsRendered={onItemsRendered}
                        ref={ref}
                    >
                        {ItemOrLoadingIcon}
                    </FixedSizeList>
                )}
                </InfiniteLoader>
        </>
    )
}