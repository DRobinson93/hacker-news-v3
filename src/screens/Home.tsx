import AllItems from "./../components/AllItems";
import {AutoSizerProps} from "./../types";
import Layout from "./../components/layouts/Main";
import AutoSizer from 'react-virtualized-auto-sizer';

export default function Home() {
    return (
        <Layout>
            {/* use auto sizer to make the list loaded take up all the height availible */}
            <AutoSizer>
                {({ height, width} : AutoSizerProps) => (
                    <div>
                        <div className="item-padding font-bold">
                            Home
                        </div>
                        <AllItems height={height} width={width} />
                    </div>
                )}   
        
            </AutoSizer>
        </Layout>
    );
}