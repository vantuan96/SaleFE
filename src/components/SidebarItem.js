
import { bool } from "prop-types";
import { useState ,useEffect} from "react";
import SubmenuItem from "./SubmenuItem";
export default function SidebarItem({ item }) {
   
    var ck = item.childrens.length;
    console.log(ck)
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if(item.childrens.length > 0){
            const pathname = window.location.pathname
            var current = pathname.split('/');  
            let isActive = false
          item.childrens.map((it,index) => {
            if(current[2] == it.id ){
                setOpen(true)
            }
          })
            
        }else {
            const pathname = window.location.pathname
            var current = pathname.split('/');  
            let isActive = false
            if(current[2] == item.id ){
                setOpen(true)
            }
        }
       
      
    } , [true]);
   
    const  acitve = () => {
        const pathname = window.location.pathname
        var current = pathname.split('/');  
        let isActive = false;
       if(current[2] == item.id){
        isActive = true;
        return isActive;
       }
    }
    
    if (ck > 0) {
        
        return (
            <div className={open ? "side-item open  d-flex flex-column justify-content-start" : " side-item d-flex flex-column justify-content-start"} >
                <a href="#"  onClick={() => setOpen(!open)} className = 'h6 bg-light1 py-2 px-3 mb-2'>
                <i class="bi bi-arrow-right me-2" style={{"marginRight" : "5px"}}></i>
                    <span className="side-title" style={{"marginRight" : "5px"}}>
                        {item.name}
                    </span>
                    <b className="fa fa-angle-down toggle-btn" ></b>
                </a>
                {/* <i className="fa-arrow-right "></i> */}
                {item.childrens.map((child, index) => <SubmenuItem key={index} item={child} open = {open} />)}
            </div>
        )
    }

    else {
        return (
       
            <div  className=" d-flex flex-column justify-content-start"  >
                <a href={"/Product/" +item.id} className = {acitve() == true ? "h6 active1 bg-light1 py-2 px-3 mb-2" : "h6 bg-light1 py-2 px-3 mb-2" }  >
                <i class="bi bi-arrow-right me-2" style={{"marginRight" : "5px"}}></i>
                    <span className="side-title ">
                        {item.name}
                    </span>
                  
                </a>
            </div>
        )
    }


}