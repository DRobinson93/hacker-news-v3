import axios from 'axios';

export const BASE_URL = "https://hacker-news.firebaseio.com/v0";

const hackerNewsAxios = axios.create({
    baseURL: BASE_URL
});

export interface ItemData{
    id:number, 
    index:number, 
    data:ItemInfo
}

export interface ItemInfo{
    id:number, 
    by:string, 
    score:number, 
    time:number, //timestamp
    title:string, 
    type:string, 
    url:string, 
    kids?:number[]//comments
}

export async function getTopItems() : Promise<number[]>{
    return hackerNewsAxios
        .get<number[]>("/topstories.json")
        .then(resp => resp.data)
        .catch(function (error) {
            return Promise.reject([]);
        });
}

export async function getItem(id:number, index:number) : Promise<ItemData>{
    return hackerNewsAxios.get(`/item/${id}.json`)
        .then(resp => { return {data:resp.data, id, index} })
        .catch(function (error) {
            return Promise.reject({
                id, index
            });
        });
}

export async function getItemsInRange(itemIds:number[], startIndex:number, stopIndex:number) :  Promise<ItemData[]>{
        const promises : Promise<ItemData>[] = [];
        for(let i=startIndex;i<=stopIndex;i++){
            //generate a list of promises that are hitting the items endpoint
            if(itemIds[i] !== undefined){//do not load past the number of ids
                promises.push(getItem(itemIds[i], i));
            }
        }

        //wait on each promise to the items endpoint
        return Promise.all(promises).then((itemDataArrays) => {
            return itemDataArrays;
        }).catch(()=>{
            return Promise.reject([]);
        });
}