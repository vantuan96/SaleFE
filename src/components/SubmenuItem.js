
import { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";

export default function SubmenuItem({ item ,open}) {
     const [v1, setV1] = useState(false);
     const  acitve = () => {
            const pathname = window.location.pathname
            var current = pathname.split('/');  
            let isActive = false;
           if(current[2] == item.id){
            isActive = true;
            return isActive;
           }
            
          
        }
    if (item.childrens.length > 0) {
        return (
            <div className="subs" >
                <div className={v1 ? "d-flex flex-column justify-content-start" : "d-flex flex-column justify-content-start"} >
                    <a href="#"  onClick={() => setV1(!v1)}  className = ' bg-light1 py-2 px-3 mb-2'>
                          <i class="bi bi-arrow-right me-2" style={{"marginRight" : "5px"}}></i>
                        <span className="side-title">
                            {item.name}
                        </span>
                        <b className=" fa fa-angle-down" ></b>
                    </a>
                    <b className="arrow "></b>
                    {item.childrens.map((child, index) => <SubmenuItem key={index} item={child} />)}

                </div>
            </div>
        )
    }
    else {
        return (
            <div className="subs ">
                <div className= "d-flex flex-column justify-content-start">
             
                    <a href={"/Product/" +item.id}  className= {acitve() == true ? " active1 bg-light1 py-2 px-3 mb-2" : "h6 bg-light1 py-2 px-3 mb-2" }  >
                    <i className="bi bi-arrow-right me-2 " style={{"marginRight" : "5px"}}></i>
                        <span className="side-title">
                            {item.name}
                        </span>
                    </a>
                </div>
            </div>
        )
    }


}