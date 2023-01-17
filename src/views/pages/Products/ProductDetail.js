import React, { Component } from "react";
import { ProductService } from "../../../core/services/ProductService";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import TheSidebar from "../../pages/Products/TheSidebar"
import Tab from "../../../components/Tabs"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Button, Modal } from "react-bootstrap";
import { AltRoute, ReduceCapacity } from "@mui/icons-material";
import Toaster from "../../../components/Toaster";
import * as Constants from "../../../common/Constants";
import { history } from './../../../helpers/history';
import { CartService } from "../../../core/services/CartService"
import { MessengerChat } from "react-messenger-chat-plugin";
import { ServicesService } from "../../../core/services/ServicesService";
import { getContrastRatio } from "@mui/material";
import  PagingProduct  from '../../../components/PagingProduct'
const data = [
    {
        id: '1',
        tabTitle: "Mô tả",
        tabContent: 'Tab Content 1'
    },
    {
        id: '2',
        tabTitle: "Đánh giá",
        tabContent: 'Tab Content 2'
    },
    {
        id: '3',
        tabTitle: "Địa chỉ",
        tabContent: 'Tab Content 3'
    }
]
const shows = {
    visibility: "visible"
}
const number = 2000
const hides = {
    visibility: "hidden"
}
class ProductDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            objProduct: {},
            open: false,
            listCart: [],
            bienao: 1,
            listvote: [],
            listPro: []
        };
        this.toast = React.createRef();
    }
    componentDidUpdate(prevProps, prevState) {
        var m = this.state.bienao
        if (prevState.bienao !== this.state.bienao) {
            setTimeout(() => {
                history.go(0)
            }, 2000);

            // if (this.state.ProductsOrder.length == 0) {
            //     this.setState({
            //         isShowViewCart: false
            //     })
            // }
        }

    }
    componentDidMount() {
        this.getListProduct();
        this.getCustomById();
        this.getListVote();
    }
    getListVote() {
        const params = {};
        params["ProductId"] = this.props.match.params.id;
        ServicesService.GetListVote(params).then(result => {
            console.log(result)
            if (result) {
                this.setState({
                    listvote: result
                });

            }
            else {
                this.setState({
                    listvote: []
                });
            }
        })
    }
    getCustomById() {
        const params = {};
        params["Id"] = this.props.match.params.id;
        ProductService.GetById(params).then(result => {
            console.log(result)
            if (result) {

                this.setState({
                    objProduct: result
                });

            }
            else {
                this.setState({
                    objProduct: {}

                });
            }
        })
    }
    getListProduct() {
        const params = {};
        params["Id"] = this.props.match.params.id;
        ProductService.GetAllProduct(params).then(result => {
            if (result) {

                this.setState({
                    listPro: result
                });

            }
            else {
                this.setState({
                    listPro: []

                });
            }
        })
    }
    reduce = () => {
        if (this.state.count < 2) {
            this.setState({ count: 1 })
        } else {
            this.setState({ count: this.state.count - 1 })
        }



    }
    increase = () => {

        if (this.state.count > Number(this.state.objProduct.stock) - 1) {
            this.setState({ count: Number(this.state.objProduct.stock) })
        } else {
            this.setState({ count: this.state.count + 1 })
        }
    }

    AddProduct() {
        const params = {};
        params["Id"] = this.props.match.params.id;
        params["Count"] = this.state.count;
        ProductService.AddProductToCart(params).then(result => {
            if (result.isSuccess) {
                // localStorage.setItem(Constants.ItemsStorage.COUNT_ADD_TO_CART , "1")
                // this.toast.current.showToast('info', Constants.Messages.ADD_COMMENT_SUCCESS);
                this.setState({
                    open: true,
                    bienao: this.state.bienao + 1
                })
                setTimeout(() => {
                    this.setState({
                        open: false
                    })
                }, 5000);
                //  history.go(0)
            }
            else {
                this.toast.current.showToast('error', result.message);
            }
        })
    }
    render() {
        const { listPro, count, objProduct, listvote } = this.state;
        console.log(objProduct)
 
        // if (listvote.length == 0) return null;
        if (listPro.length == 0) return null
 
        const genStar = (stars) => {
            let body = []
            for (var i = 0; i < stars; i++) {
                body.push(<div class="shopee-rating-stars__star-wrapper">
                    <div class="shopee-rating-stars__lit" style={{ "width": "100%" }}>
                        <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" class="shopee-svg-icon shopee-rating-stars__primary-star icon-rating-solid">
                            <polygon points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"></polygon>
                        </svg></div><svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" class="shopee-svg-icon shopee-rating-stars__hollow-star icon-rating">
                        <polygon fill="none" points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10">
                        </polygon>
                    </svg>
                </div>);
            }
            return body
        }
        const genDiscount = (percent) => {
            if (percent > 0) {
                return (
                    <div class="_20CHwO">
                        <div class="_5KXYyu r5IeUK DGPJIB">
                            <span class="percent">{percent}%</span>
                            <span class="bzhmIc">giảm</span>
                        </div>
                    </div>
                )
            }
        }



        return (
            <div>
                <div className="show127" style={this.state.open == true ? shows : hides}>
                    <div id="liveToast" class="toastCus  p-2 mb-4 show127 " role="alert" aria-live="assertive" aria-atomic="true">

                        <div class="toast-body">
                            <div>
                                <i class="fa fa-light fa-circle-check"></i>
                                <i class="iconCus fa fa-check-circle" aria-hidden="true"></i>
                            </div>
                            <div>
                                <span className="textCus" >Sản phẩm đã được thêm vào Giỏ hàng</span>
                            </div>


                        </div>

                    </div>
                </div>

                <div className="container py-5">
                    <Toaster ref={this.toast} />

                    <div className="row g-5">
                        <div className="col-lg-5">

                            <OwlCarousel autoHeightClass="" className="owl-theme" items={1} loop margin={10} nav>
                                <div class="item">
                                    <TransformWrapper>
                                        <TransformComponent>
                                            <img src={objProduct.img2} width={500} />
                                        </TransformComponent>
                                    </TransformWrapper>
                                </div>
                                <div class="item">
                                    <TransformWrapper>
                                        <TransformComponent>
                                            <img ssrc={objProduct.img2} width={500} />
                                        </TransformComponent>
                                    </TransformWrapper>
                                </div>
                                <div class="item">
                                    <TransformWrapper>
                                        <TransformComponent>
                                            <img src={objProduct.img3} width={500} />
                                        </TransformComponent>
                                    </TransformWrapper>
                                </div>
                                <div class="item">
                                    <TransformWrapper>
                                        <TransformComponent>
                                            <img src={objProduct.img4} width={500} />
                                        </TransformComponent>
                                    </TransformWrapper>
                                </div>
                                <div class="item">
                                    <TransformWrapper>
                                        <TransformComponent>
                                            <img src={objProduct.img5} width={500} />
                                        </TransformComponent>
                                    </TransformWrapper>
                                </div>
                            </OwlCarousel>
                        </div>
                        <div className="col-lg-7">
                            <div className="border-start border-5 border-primary ps-5 mb-5" style={{ "maxWidth": "1000px" }}>
                                <h3 className=" ">{objProduct.name}</h3>
                                <h6 class="text-uppercase">Thương hiệu <a href="https://www.petmart.vn/thuong-hieu/cat-sea-fish"><span className="text-brand">{objProduct.brand}</span></a>
                                </h6>

                                <div class="flex uP1gCV">
                                    <div class="flex gS2iLG">
                                        <div class="yz-vZm _2qXJwX">
                                            {objProduct.star}</div><div class="YTf4Bg">
                                            <div class="shopee-rating-stars">
                                                <div class="shopee-rating-stars__stars">
                                                    {genStar(objProduct.star)}


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex gS2iLG">
                                        <div class="yz-vZm"> {objProduct.vote}</div>
                                        <div class="YTf4Bg">đánh giá</div>
                                    </div>
                                    <div class="flex K+4RRI">
                                        <div class="yiMptB">{objProduct.sold}</div>
                                        <div class="T98g1v">đã bán</div>

                                    </div>

                                </div>

                                <div class="d-flex flex-column justify-content-start">

                                    <div style={{ "marginTop": "10px" }}>
                                        <div class="d-flex flex-column justify-content-start">
                                            <div class="flex flex-column LR5fT5">
                                                <div class="flex items-center">
                                                    <div class="flex items-center XfTb20">
                                                        <div class="Kg2R-S">{Number(objProduct.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
                                                        <div class="flex items-center">
                                                            <div class="X0xUb5">{Number(objProduct.pricePromotion).toLocaleString('vi', { style: 'currency', currency: 'VND' })} </div>
                                                            <div class="+1IO+x">{objProduct.percentReduce}% giảm</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex tprdAj _5BeP91 rXW4Z9">
                                    <div class="flex flex-column">
                                        <div class="flex items-center MZzIOI">
                                            <div class="c27oHv">Số lượng</div>
                                            <div class="flex items-center">
                                                <div style={{ "marginRight": "15px" }}>
                                                    <div class="TWC1HU shopee-input-quantity">
                                                        <button class="sRpgE4" onClick={() => this.reduce()} >
                                                            <svg enable-background="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" class="shopee-svg-icon"><polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5">
                                                            </polygon></svg></button>
                                                        <input class="sRpgE4 CXBc4V" type="text" role="spinbutton" aria-valuenow="1" value={count} />
                                                        <button class="sRpgE4" onClick={() => this.increase()}>
                                                            <svg enable-background="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" class="shopee-svg-icon icon-plus-sign">
                                                                <polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>{objProduct.restStock} sản phẩm có sẵn</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ "marginTop": "15px" }}>
                                    <div class="_2LulQ0">
                                        <div class="Zfpxos">
                                            <button type="button" class="btn btn-tinted btn--l vQ3lCI _8ULUF3" aria-disabled="false">
                                                <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" class="shopee-svg-icon C7Xw7m icon-add-to-cart">
                                                    <g><g>
                                                        <polyline fill="none" points=".5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"></polyline>
                                                        <circle cx="6" cy="13.5" r="1" stroke="none"></circle><circle cx="11.5" cy="13.5" r="1" stroke="none"></circle>
                                                    </g>
                                                        <line fill="none" stroke-linecap="round" stroke-miterlimit="10" x1="7.5" x2="10.5" y1="7" y2="7"></line>
                                                        <line fill="none" stroke-linecap="round" stroke-miterlimit="10" x1="9" x2="9" y1="8.5" y2="5.5"></line>
                                                    </g></svg>
                                                <span onClick={() => this.AddProduct()}>Thêm vào giỏ hàng</span></button>
                                            <button type="button" class="btn btn-solid-primary btn--l vQ3lCI" aria-disabled="false">Mua ngay</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="container py-5">

                    <Tab objProduct={objProduct} data={data} listvote={listvote} />
                </div>
                <div className="container ">
                    <div className="TTbSM8">
                        <div className="shopee-header-section shopee-header-section--simple">
                            <div className="shopee-header-section__header">
                                <div className="shopee-header-section__header__title">
                                    <div>Có thể bạn cũng thích
                                        <a class="shopee-header-section__header-link" tabindex="-1" href="/cart/recommend"><button class="shopee-button-no-outline">Xem tất cả&nbsp;<svg enable-background="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" class="shopee-svg-icon icon-arrow-right"><path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path></svg></button></a>
                                    </div>
                                </div>
                            </div>
                            <div class="shopee-header-section__content"></div>
                        </div>                      
                            <PagingProduct listPro={listPro} />                    
                    </div>
                </div>
            </div>


        )



    }
}
export default ProductDetail;


















