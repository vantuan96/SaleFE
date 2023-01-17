import React, { Component } from "react";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import * as Constants from "../common/Constants";

class Toaster extends React.Component {
    constructor(props){
        super(props);
        this.state={
            type :'info',
           
        }
    }
    showToast = (type, message ) => {
        message = message ||  Constants.Messages.EMPTY_RESULTS;
        const option = {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            with : 400
          };
        if (type == "info"){
            toast.info(message, option);
        }else if(type == "error"){
            toast.error(message, option);
        }else if(type === 'warning'){
            toast.warning(message, option);
        }else {
            toast.dark(message, option);
        }
    }
    render(){
        return(
            <ToastContainer/>
        )
    }
}
export default Toaster;