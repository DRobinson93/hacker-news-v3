import {
  Link, useLocation
} from "react-router-dom";

import { FaHome, FaInfo, FaCode, FaSmile } from 'react-icons/fa';

const Nav =() =>{
    const location = useLocation();

    const navLinks : {path:string, name:string, icon:JSX.Element}[] = [
      {path:"/", name:"Home", icon:<FaHome/>}, 
      {path:"/v4", name:"V4", icon:<FaSmile/>}, 
      {path:"/about", name:"About", icon:<FaInfo/>}
    ]
    return(
        <nav className="p-1 md:p-2">
          <Link key={"NavHomeTop"} className="text-lg md:text-xl mb-4 nav-link-w-hover" to="/">
            <span className="nav-link-w-hover-icon"><FaCode/></span>
            <span className="hidden md:inline-flex">DR - HN3</span>
          </Link>
          <div className="flex flex-col gap-5">
            {
                navLinks.map(function(navLink, index){
                  const activeClass = location.pathname === navLink.path ? "font-bold" : "" 
                  return (
                      <Link key={`NavLink_${index}`} to={navLink.path} className={`nav-link-w-hover ${activeClass}`}>
                        <span className="nav-link-w-hover-icon">{navLink.icon}</span> 
                        <span className="text-base md:text-lg hidden md:inline-flex">{navLink.name}</span>
                      </Link>
                  )
                })
            }
          </div>
        </nav>
    )
}

export default Nav;