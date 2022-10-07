interface LoadMoreBtnAndInfoProps{
    totalItemsLength:number, 
    loadedItemsLength:number, 
    searchResultsLength:number, 
    showLoadMoreBtn:boolean, 
    disableLoadMoreBtn:boolean
    emittedClick: () => void
}

export default function LoadMoreBtnAndInfo({
        totalItemsLength, loadedItemsLength, showLoadMoreBtn, 
        disableLoadMoreBtn, searchResultsLength, emittedClick
    } : LoadMoreBtnAndInfoProps) {
    return (
        <div className="flex justify-center py-2 px-4 items-center gap-6">
            <div className="text-xs sm:text-sm italic">
                Loaded: {loadedItemsLength}/{totalItemsLength}
            </div>
            {showLoadMoreBtn && 
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded my-3"
                    onClick={emittedClick} disabled={disableLoadMoreBtn}>
                    Load More
                </button>
            }
            <div className="text-xs sm:text-sm italic float-right">
                <div>Search Results:{searchResultsLength}</div>
            </div>
        </div>
    )
}