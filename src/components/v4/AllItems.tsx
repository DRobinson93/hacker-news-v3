import React, { useState, useEffect } from 'react';

import {getTopItems, getItemsInRange} from "./../../api/HackerNews";
import Item from "./../../components/Item";
import Loading from "./../../components/common/Loading"
import PageTitleAndDescription from "./../../components/common/PageTitleAndDescription";
import {ItemData} from "./../../api/HackerNews"
import LoadMoreBtnAndInfo from './LoadMoreBtnAndInfo';

interface AllItemsProps{
    filter:string
}

export default function AllItems({filter = ''} : AllItemsProps) {
    const [itemIds, setItemIds] = useState<number[]>([]);
    const [showGeneralApiErrorDiv, setShowGeneralApiErrorDiv] = useState<boolean>(false);
    const [canLoadAdditionalItems, setCanLoadAdditionalItems] = useState<boolean>(true);
    //object to store all the indexes from itemIds and their data from the api
    const [itemsData, setItemsData] = useState<ItemData[]>([]);
    //while the next page is loading, do not allow more pages to be loaded
    const [nextPageIsLoading, setNextPageIsLoading] = useState<boolean>(false);
    const itemDataToLoadAtOnce = 15;

    // on load, get ids from the api which will be used to hit the item endpoint for each id
    useEffect(() => {
        if(itemIds.length !== 0){
            return;
        }
        getTopItems().then((allItemIds)=>{
            setItemIds(allItemIds);
            loadNextPage(allItemIds);
        }).catch((allItemIds)=>{
            //an error occured in our call, display a message to the user
            setShowGeneralApiErrorDiv(true)
        })
    });

    const loadNextPage = (allItemIds:number[]) => {
        //do not call this as a page is loading and do not call it 
        //if there are no next items to return
        let startIndex = itemsData.length;
        if(nextPageIsLoading || allItemIds[startIndex] === undefined){
            return;
        }
        let stopIndex = startIndex + itemDataToLoadAtOnce -1; //-1 since this starts loading index 0
        setNextPageIsLoading(true)
        const newItemsData = [...itemsData];
        getItemsInRange(allItemIds, startIndex, stopIndex).then(itemsInRange => {
            setNextPageIsLoading(false);
            //for each of these, update itemIdsAndData
            itemsInRange.forEach((itemData)=>{
                newItemsData.push(itemData)
            })
            //call setItemIndexesAndData to load dom with the data for these items set
            setItemsData(newItemsData);
            const nextStartIndex = newItemsData.length + 1;
            //if the next starting index does not exist, do not allow loading additional items
            if(allItemIds[nextStartIndex] === undefined){
                setCanLoadAdditionalItems(false);
            }
        }).catch(()=>{
            //an error occurred in getting item details, if there are no records, show error div
            if(itemsData.length === 0)
                setShowGeneralApiErrorDiv(true);
        });
        
    }

    if(showGeneralApiErrorDiv){
        return <PageTitleAndDescription description={["No records are found"]} />
    }

    //if a filter is passed in, apply it to the results
    const filteredItems = itemsData.filter(itemData => {
        if (filter==='') return true //if no filter, show the item
        if (itemData.data.title.toLowerCase().includes(filter.toLowerCase())) {
          return true
        }
        return false;
    });

    if(filter !== '' && filteredItems.length === 0){
        return <PageTitleAndDescription description={["No search results found"]} />
    }

    const items = filteredItems.map(data =>
        <Item key={data.id} itemData={data}/>
    );

    if(!items.length){
        return <Loading/>;
    }

    return (
        <>
            {items}
            <LoadMoreBtnAndInfo 
                totalItemsLength={itemIds.length} loadedItemsLength={itemsData.length} 
                searchResultsLength={filteredItems.length} emittedClick={()=>loadNextPage(itemIds)}
                showLoadMoreBtn={canLoadAdditionalItems} disableLoadMoreBtn={nextPageIsLoading} />
        </>
    )
        
}