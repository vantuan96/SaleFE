import React, { Component } from "react";
import { WebInfoService } from "../../core/services/WebInfoService";
import { MainMenuService } from "../../core/services/MainMenuService";
import {CartService} from "../../core/services/CartService"
import * as Constants from "../../common/Constants";
import {
    TheContent,
    Topbar,
    TheHeader,
    TheFooter
} from '../DefaultLayout/index';
import { string } from "prop-types";
class DashboardLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            WebInfo: {
                // WebsiteName : '',
                // MetaTitle : '',
                // PagingFontEnd : 0,
                // PagingBackEnd : 0,
                // EmailSystem : '',
                // Phone : '',
                // Adress : ''
            },
            treeHeaderList : [],
            CartShop : []
        };
    }
    // componentDidUpdate(){
    //    alert("Ok")
    // }
    componentDidMount() {
        this.getCartShoping();
       this.GetTreeHeader()
        this.getDefaultWebInfo();
    }
    
    // componentWillReceiveProps(nextProps) {
    //  alert("Ok1")
    // }
    getCartShoping() {
        var Count_AddToCart = localStorage.getItem(Constants.ItemsStorage.COUNT_ADD_TO_CART)
        CartService.GetListAllCartShop().then(result => {
            console.log(result)
           
            if (result.length > 0) {
                this.setState({
                    listCart : result,
                
                })
                localStorage.setItem(Constants.ItemsStorage.COUNT_ADD_TO_CART ,result.length)
                localStorage.setItem(Constants.ItemsStorage.CART_ITEMS ,JSON.stringify(result))
                console.log(Constants.ItemsStorage.CART_ITEMS)
            } else {
                this.setState({
                    listCart : []
                })
                // localStorage.removeItem(Constants.ItemsStorage.COUNT_ADD_TO_CART);
                localStorage.setItem(Constants.ItemsStorage.COUNT_ADD_TO_CART ,0)
                localStorage.setItem(Constants.ItemsStorage.CART_ITEMS ,JSON.stringify(listCart))
            }

        })
    }
    // componentDidUpdate(prevProps, prevState){
    //     // this.getCartShoping();
    //     // var m = prevProps.CartShop 
    //     var m = prevState.CartShop
    //     var m1 = this.state.CartShop
    //     console.log(m);
    //     console.log(m1);
        
    //     if (prevState.CartShop.length  !== this.state.CartShop.length) {
    //         this.getCartShoping();
    //       }
      
    // }
    GetTreeHeader(){
        MainMenuService.GetTreeHeader().then(result => {
            console.log(result)
            if (result.length > 0) {
                localStorage.setItem(Constants.ItemsStorage.TREEHEADER,JSON.stringify(result))
                this.setState({
                    treeHeaderList : result
                })
            } else {

                this.setState({
                    treeHeaderList: []
                })
            }

        })
    }
   
    getDefaultWebInfo() {
        WebInfoService.GetDefault().then(result => {
            console.log(result)
            if (result !== {}) {
                this.setState({
                    WebInfo: result
                    // WebInfo : {
                    //     WebsiteName : result.websiteName,
                    //     MetaTitle : result.metaTitle,
                    //     EmailSystem : result.emailSystem,
                    //     Phone : result.phone,
                    //     Adress : result.adress
                    // }
                })
            } else {

                this.setState({
                    WebInfo: {}
                })
            }

        })
    }
    render() {
        const { WebInfo ,treeHeaderList  } = this.state;
// console.log(treeHeaderList)
if(treeHeaderList.length == 0) return null;
        if (WebInfo === {}) return null;
        return (
            <div >
                <Topbar WebInfo={WebInfo} />
                <TheHeader treeHeaderList = {treeHeaderList} />
                <div className="main-container ace-save-state" id="main-container">

                    <div className="main-content">
                        <div className="main-content-inner">
                            <div className="breadcrumbs ace-save-state breadcrumbs-fixed" id="breadcrumbs">

                            </div>
                            <div className="page-content">
                                <div className="row">
                                    <div className="col-xs-12">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                   <TheContent />
                <TheFooter WebInfo={WebInfo} />
                <a href="#" class="btn btn-primary py-3 fs-4 back-to-top" style={{"display" :"inline"}}><i class="bi bi-arrow-up"></i></a>
            </div>
        )
    }
}
export default DashboardLayout;