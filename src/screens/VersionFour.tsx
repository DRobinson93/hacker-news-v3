import AllItems from "../components/v4/AllItems";
import Layout from "../components/layouts/Main";
import {useState} from "react";
import { FaInfo } from 'react-icons/fa';

export default function VersionFour() {
    const [filter, setFilter] = useState<string>('');
    return (
        <Layout>
            <div>
                <div className="item-padding font-bold">
                    V4 - Load more btn and search input
                </div>
                <div className="border-b-2 border-t-2 border-teal-500 my-1">
                    <form className="flex flex-col sm:flex-row items-end py-2 mx-2 gap-4">
                        <input className="font-bold text-sm md:text-base appearance-none bg-transparent border-none w-full text-white py-1 px-2 leading-tight focus:outline-none" 
                            type="text" placeholder="Search" aria-label="Search"
                            value={filter} onChange={(e) => setFilter(e.currentTarget.value)}
                        />
                        <div className="w-full flex gap-3 items-center border border-indigo-900 text-white text-xs sm:text-sm italic px-4 py-3" role="alert">
                            <FaInfo/>
                            <p>Search only searches through the results loaded. Scroll and click 'Load More' for more results</p>
                        </div>
                    </form>
                </div>
                <AllItems filter={filter} />
            </div>  
        </Layout>
    );
}