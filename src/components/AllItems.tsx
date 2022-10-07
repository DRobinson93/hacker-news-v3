import React, { useState, useEffect } from 'react';
import {getTopItems} from "./../api/HackerNews";
import { FixedSizeList } from 'react-window';
import InfiniteLoader  from 'react-window-infinite-loader';
import Item from "./../components/Item";
import Loading from "./../components/common/Loading"
import PageTitleAndDescription from "./../components/common/PageTitleAndDescription";
import {ItemData, getItemsInRange} from "./../api/HackerNews"

interface AllItemsProps{
    height: number, width: number
}

export default function AllItems({width, height} : AllItemsProps) {
    const [itemIds, setItemIds] = useState<number[]>([]);
    const [showGeneralApiErrorDiv, setShowGeneralApiErrorDiv] = useState<boolean>(false);
    //object to store all the indexes from itemIds and their data from the api
    const [itemIndexesAndData, setItemIndexesAndData] = useState<{[key:number]:ItemData}>({});
    //while the next page is loading, do not allow more pages to be loaded
    const [nextPageIsLoading, setNextPageIsLoading] = useState<boolean>(false);
    const numOfItemsApiReturns = 500;

    // on load, get ids from the api which will be used to hit the item endpoint for each id
    useEffect(() => {
        getTopItems().then((items)=>{
            setItemIds(items);
        }).catch((items)=>{
            //an error occured in our call, display a message to the user
            setShowGeneralApiErrorDiv(true)
        })
    },[]);

    interface ItemOrLoadingIconProps{
        index:number, 
        style?:React.CSSProperties
    }

    //show an item or a loading icon as we are waiting for the items data
    const ItemOrLoadingIcon = ({ index, style }: ItemOrLoadingIconProps) => (
        //show loading screen if data is not present
        (!isItemLoaded(index)) ? 
            <Loading />
        :
            <Item
                style={style}
                itemData={itemIndexesAndData[index]} 
            />
    );

    //InfiniteLoader will automatically call this when needed to get more items details 
    const loadNextPage = (startIndex: number, stopIndex: number) => {
        //do not call this as a page is loading and do not call it 
        //if there are no next items to return
        if(nextPageIsLoading || itemIds[startIndex] === undefined){
            return;
        }
        setNextPageIsLoading(true)
        const newItemIndexsAndData = {...itemIndexesAndData};
        getItemsInRange(itemIds, startIndex, stopIndex).then(itemsInRange => {
            setNextPageIsLoading(false);
            //for each of these, update itemIdsAndData
            itemsInRange.forEach((itemData)=>{
                newItemIndexsAndData[itemData.index] = itemData
            })
            //call setItemIndexesAndData to load dom with the data for these items set
            setItemIndexesAndData(newItemIndexsAndData);
        }).catch(()=>{
            //an error occurred in getting item details
            setShowGeneralApiErrorDiv(true);
        });
    }

    const isItemLoaded = (index:number)=> index in itemIndexesAndData === true;

    if(showGeneralApiErrorDiv){
        return <PageTitleAndDescription extraClasses="absolute" description={["No records are found"]} />
    }

    //require item ids to load InfiniteLoader
    if(!itemIds.length){
        return <></>;
    }

    return (
        <>
            {/* use infinate loader to help break items api calls into 
            down into chunks of 15 calls that are only called when needed */}
            <InfiniteLoader
                isItemLoaded={isItemLoaded}
                itemCount={numOfItemsApiReturns}
                loadMoreItems={loadNextPage}
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