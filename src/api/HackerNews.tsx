import axios from 'axios';

import {ItemData} from "./../types"

export const BASE_URL = "https://hacker-news.firebaseio.com/v0";

const hackerNewsAxios = axios.create({
    baseURL: BASE_URL
  });

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