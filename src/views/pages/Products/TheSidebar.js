import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from "react-helmet";
import SidebarItem from "../../../components/SidebarItem";

const TheSidebar = (props) => {
    console.log(props.treeView)
//   const {verticalMenu} = props;

    const dsMenu = (v2) =>{
        console.log(v2)
        return(
            v2.map((item, index) => <SidebarItem key={index} item={item} />)
        )
      
    } 
    // useEffect()
    return (

        <div id="side" className="     " data-sidebar="true" data-sidebar-scroll="true" data-sidebar-hover="true">

            <div className="">
                {
                    dsMenu(props.treeView)
                }
            </div>
          
            
        </div>
    )
}

export default React.memo(TheSidebar)