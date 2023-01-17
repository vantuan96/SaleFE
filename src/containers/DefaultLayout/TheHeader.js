import React from 'react'
import { useState ,useEffect} from "react";
// useEffect(() => {
//     if(item.childrens.length > 0){
//         const pathname = window.location.pathname
//         var current = pathname.split('/');  
//         let isActive = false
//       item.childrens.map((it,index) => {
//         if(current[2] == it.id ){
//             setOpen(true)
//         }
//       })
        
//     }else {
//         const pathname = window.location.pathname
//         var current = pathname.split('/');  
//         let isActive = false
//         if(current[2] == item.id ){
//             setOpen(true)
//         }
//     }
   
  
// } , [true]);

const  acitve = (item) => {
    const pathname = window.location.pathname
    var current = pathname.split('/');  
    let isActive = false;
   if( "/" + current[1] == item.url){
    isActive = true;
    return isActive;
   }
}
const TheHeader = (props) => {
    console.log(props.treeHeaderList)
    // if(props.treeHeaderList) return null;
    // const GenUrl = (item) => {
    //     let href = "";
    //     if(item.target == 1){
    //         if(item.nameUrl != "" || item.nameUrl != null){
    //             href = ""
    //         }
    //     }
    //     else if(item.target == 2){
    //         if(item.nameUrl != "" || item.nameUrl != null){
    //             href = "/Product"
    //         }else{
    //             href = item.url
    //         }
    //     }
    //     else if(item.target == 3){
    //         if(item.nameUrl != "" || item.nameUrl != null){
    //             href = "/Service"
    //         }else{
    //             href = item.url
    //         }
    //     }
    //     else if(item.target == 4){
    //         if(item.nameUrl != "" || item.nameUrl != null){
    //             href = "/About"
    //         }else{
    //             href = item.url
    //         }
    //     }

    // }
    //     // console.log(props.)
    const GenHeader = (list) => {
        let body = []
        list.map((item, index) => {
            if (item.childrens.length > 0) {

                body.push(<div class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">{item.name}</a>
                    <div class="dropdown-menu m-0">
                        {item.childrens.map((item1, index) => {
                            return (<a a href={item1.url} class="dropdown-item">{item1.name}</a>)
                            
                        })}

                    </div>
                </div>)
               
            } else {
                body.push(<a href={item.url} className={acitve(item) == true ? "nav-item nav-link active" : "nav-item nav-link"} >{item.name}</a>)
            }
        })
        return body
    }
    return (
        <nav class="navbar navbar-expand-lg bg-white navbar-light shadow-sm py-3 py-lg-0 px-3 px-lg-0">
            <a href="index.html" class="navbar-brand ms-lg-5">
                <h1 class="m-0 text-uppercase text-dark"><i class="bi bi-shop fs-1 text-primary me-3"></i>Pet Shop</h1>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                {/* {GenHeader(props.treeHeaderList)}
             */}
                <div class="navbar-nav ms-auto py-0">
                    {GenHeader(props.treeHeaderList)}
                    {/* <a href="index.html" class="nav-item nav-link active">{GenUrl(item)}</a>
                               
                                <div class="nav-item dropdown">
                                    <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                                    <div class="dropdown-menu m-0">
                                        <a href="price.html" class="dropdown-item">Pricing Plan</a>
                                        <a href="team.html" class="dropdown-item">The Team</a>
                                        <a href="testimonial.html" class="dropdown-item">Testimonial</a>
                                        <a href="blog.html" class="dropdown-item">Blog Grid</a>
                                        <a href="detail.html" class="dropdown-item">Blog Detail</a>
                                    </div>
                                </div> */}
                    <a href="contact.html" class="nav-item nav-link nav-contact bg-primary text-white px-5 ms-lg-5">Contact <i class="bi bi-arrow-right"></i></a>
                </div>




            </div>
        </nav>

    )
}
export default React.memo(TheHeader)

