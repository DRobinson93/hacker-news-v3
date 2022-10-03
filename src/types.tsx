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

export interface AutoSizerProps{
    height: number, width: number
}