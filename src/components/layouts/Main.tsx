import React from 'react';

import Nav from "../common/Nav";

interface LayoutProps{
    children: React.ReactNode,
}

const Layout =({children} : LayoutProps) =>{
    return(
        <div className="bg-black text-white h-screen">
            <div className="container mx-auto lg:px-40">
                <div className="flex gap-0 md:gap-10 lg:gap-15 justify-center">
                    <div>
                        <Nav/>
                    </div>
                    <main className="flex-1">
                        <div className="h-screen max-h-screen overflow-auto border-t-0 border-[.5px] border-gray-500 p-0 sm:p-1">
                            {children}
                        </div>
                    </main>
                </div> 
            </div>
        </div>
    )
}

export default Layout;