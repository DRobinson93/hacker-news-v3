import {ItemData} from "./../types";
import React, { useState } from 'react';
import { FaComment, FaHeart } from 'react-icons/fa';

interface Props{
    style?:React.CSSProperties, 
    itemData:ItemData
}

export default function Item({itemData, style} : Props) {
    const itemInfo = itemData.data;
    const formatDate = (unix_timestamp:number) => {
        return new Date(unix_timestamp * 1000).toLocaleDateString("en-US")
    }
    const [numOfComments] = useState<number>(itemInfo.kids?.length || 0);
    const [dateFormatted] = useState<string>(formatDate(itemInfo.time));

    return (
        <div>
            <a href={itemInfo.url} style={style} 
                key={itemData.index} 
                className="item item-padding"
            >
                <div className="grid gap-1">
                    <div className="flex gap-1">
                        <div className="font-bold text-white text-xs md:text-sm">
                            {itemInfo.by}
                        </div>
                        <div className="font-bold text-slate-500 text-xs md:text-sm">
                            - {dateFormatted}
                        </div>
                    </div>
                    <div className="font-bold text-xs sm:text-sm md:text-base">
                        <h2>{itemInfo.title}</h2>
                    </div>
                    <div className="flex gap-4 text-slate-400">
                        <div className="text-xs md:text-sm flex gap-1 place-items-center">
                            <FaComment/> {numOfComments}
                        </div>
                        <div className="text-xs md:text-sm flex gap-1 place-items-center">
                            <FaHeart/> {itemInfo.score}
                        </div>
                    </div>
                </div>
                
            </a>    
        </div>
    )
}