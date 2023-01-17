import React, { Component } from "react";
import { CartService } from "../../../core/services/CartService";
import * as Constants from "../../../common/Constants";
import { ProductService } from "../../../core/services/ProductService";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Button, Modal } from "react-bootstrap";
import { style } from "@mui/system";
import PaginatedItems from '../../../components/PaginatedItems'

const showModal = {
    display: "none"
}
class CartShooping extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lstPr: [],
            ProductsOrder: [],
            bienao: 1,
            count: 1,
            isCheckAll: false,
            isCheck: [],
            CountMoney: 0,
            SumMoney: 0,
            openModel: false,
            obj: {
                Id: '',
                nameSp: ''
            },
            isShowViewCart: false,
            OpenModelSpTT: false,
            IdModal: ''

        }
        this.ShowMoalSPTT = this.ShowMoalSPTT.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {
        var m = this.state.bienao
        if (prevState.bienao !== this.state.bienao) {
            this.getProductOrder();
            if (this.state.ProductsOrder.length == 0) {
                this.setState({
                    isShowViewCart: false
                })
            }
        }

        var m = this.state.isCheck
        if (prevState.isCheck !== this.state.isCheck) {
            if (this.state.isCheck.length == this.state.ProductsOrder.length) {
                this.setState({
                    isCheckAll: true
                })
            }
        }
        if (prevState.ProductsOrder !== this.state.ProductsOrder) {
            if (this.state.ProductsOrder.length > 0) {
                this.setState({
                    isShowViewCart: true
                })
            } else {
                this.setState({
                    isShowViewCart: false
                })
            }
            if (this.state.ProductsOrder.length == 0) {
                this.setState({
                    isShowViewCart: false
                })
            }
        }
        // if (prevState.lstPr !== this.state.lstPr) {

        // }

    }
    handleSelectAll = () => {
        var m2 = 0;
        this.state.ProductsOrder.map((item) => {
            m2 += item.moneys
        })
        this.setState({
            isCheckAll: !this.state.isCheckAll,
            isCheck: this.state.ProductsOrder.map(li => li.id),
            CountMoney: this.state.ProductsOrder.length,
            SumMoney: m2
        })
        if (this.state.isCheckAll) {
            this.setState({

                isCheck: [],
                CountMoney: 0,
                SumMoney: 0

            })
        }

    }
    handleSelect = e => {

        const { id, checked } = e.target;

        this.setState({
            isCheck: [...this.state.isCheck, id],
            CountMoney: this.state.CountMoney + 1,
            SumMoney: this.state.SumMoney + this.state.ProductsOrder.filter(item => item.id.includes(id))[0].moneys
        })


        if (!checked) {
            var a = Number(this.state.SumMoney)
            var b = Number(this.state.ProductsOrder.filter(item => item.id.includes(id))[0].moneys)
            var m2 = this.state.SumMoney - Number(this.state.ProductsOrder.filter(item => item.id.includes(id))[0].moneys)
            this.setState({

                isCheck: this.state.isCheck.filter(item => item !== id),
                CountMoney: this.state.CountMoney - 1,
                isCheckAll: false,
                SumMoney: this.state.SumMoney - Number(this.state.ProductsOrder.filter(item => item.id.includes(id))[0].moneys)
            })
            var m1 = this.state.isCheck
        }

    }
    handleChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox'
            ? target.checked
            : target.value
        this.setState({
            [name]: value
        });
    }
    componentDidMount() {
        // this.GetAllProduct();
        this.getProductOrder();
        if (this.state.ProductsOrder.length > 0) {
            this.setState({
                isShowViewCart: true
            })
        } else {
            this.setState({
                isShowViewCart: false
            })
        }
    }
    getProductOrder() {
        CartService.GetAll().then(result => {
            if (result.length > 0) {
                this.setState({
                    ProductsOrder: result
                });
            }
            else {
                this.setState({
                    ProductsOrder: []
                });
            }
        })
    }
    ShowMoalSPTT = (id) => {
        this.setState({
            lstPr: [],
        });
        var m = this.state.OpenModelSpTT;
        const params = {}
        params["Id"] = id
        ProductService.GetAll(params).then(result => {
            console.log(result)
            if (result.length > 0) {
                this.setState({
                    lstPr: result,
                    OpenModelSpTT: !this.state.OpenModelSpTT,
                    IdModal: id
                });
            }
            else {
                this.setState({
                    lstPr: []
                });
            }
        })


    }
    // GetAllProduct() {
    //     ProductService.GetAll().then(result => {
    //         if (result.length > 0) {
    //             this.setState({
    //                 lstPr: result
    //             });
    //         }
    //         else {
    //             this.setState({
    //                 lstPr: []
    //             });
    //         }
    //     })
    // }

    CloseModal = () => {
        this.setState({
            openModel: false
        })
    }

    CancelOrder = (id) => {
        const params = {}
        params["Id"] = id
        CartService.DeleteSp(params).then(result => {
            if (result.isSuccess) {
                this.setState({
                    openModel: false,
                    bienao: this.state.bienao - 1
                })

                // localStorage.setItem(Constants.ItemsStorage.)
            }
            else {

            }
        })
    }
    Delete = (id) => {
        const params = {}
        params["Id"] = id
        CartService.DeleteSp(params).then(result => {
            if (result.isSuccess) {
                this.setState({
                    // openModel: false,
                    bienao: this.state.bienao - 1
                })

            }
            else {

            }
        })
    }
    reduce = (item) => {
        if (item.quantity == 1) {
            this.setState({
                openModel: true,
                obj: {
                    nameSp: item.nameSp,
                    Id: item.id
                }

            })
            return
        }
        // localStorage.setItem(Constants.ItemsStorage.QUANITY, 0)
        const params = {};
        params["Id"] = item.productId;
        params["Count"] = 1;
        params["Type"] = "REDUCE";
        ProductService.AddProductToCart(params).then(result => {
            if (result.isSuccess) {
                this.setState({
                    bienao: this.state.bienao - 1
                })
                console.log(this.state.bienao)
            }
            else {

            }
        })


    }
    increase = (item) => {
        // if (this.state.count > Number(this.state.objProduct.stock) - 1) {
        //     this.setState({ count: Number(this.state.objProduct.stock) })
        // }

        var m = this.state.bienao;
        this.setState({ count: 1 })
        const params = {};
        params["Id"] = item.productId;
        params["Count"] = 1;
        params["Type"] = "ADD";
        ProductService.AddProductToCart(params).then(result => {
            if (result.isSuccess) {
                this.setState({
                    bienao: this.state.bienao + 1
                })
                console.log(this.state.bienao)
            }
            else {

            }
        })
    }
    render() {

        const { ProductsOrder, lstPr } = this.state
        console.log(ProductsOrder)
        const GenMoDalSp = (ObjSp) => {
            if (ObjSp.length == 0) return null;
            return (

                <PaginatedItems lstPr={this.state.lstPr} />

            )
        }
        const ShowButomPlus = (items) => {
            return (
                <button onClick={() => this.ShowMoalSPTT(items.productId)} class="shopee-button-no-outline aQ5cS3">

                    <span class="getnPy">Tìm sản phẩm tương tự</span>
                    <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" class="shopee-svg-icon mMh510 icon-down-arrow-filled">
                        <path d="m6.5 12.9-6-7.9s-1.4-1.5.5-1.5h13s1.8 0 .6 1.5l-6 7.9c-.1 0-.9 1.3-2.1 0z"></path>
                    </svg>
                </button>
            )
        }
        console.log(lstPr)
        return (
            <>
                <div className="container1">
                    <div class={this.state.isShowViewCart == true ? "render" : "rederEmty   _6ziKNS AtVAkr"} >
                        <div class="ygADNw">
                        </div>
                        <div class="V7WKVk">Giỏ hàng của bạn còn trống</div>
                        <a class="lagDN4" href="/">
                            <button class="shopee-button-solid shopee-button-solid--primary">
                                <span class="foRFm5">MUA NGAY</span>
                            </button></a>
                    </div>

                    <div style={{ "display": "contents" }}><div class="ZBJwwD"></div></div>
                    <div className={this.state.openModel ? " shopee-popup shopee-modal__transition-enter-done     " : " shopee-popup shopee-modal__transition-enter-done closeModal"}>
                        <div className="shopee-popup__overlay"> </div>
                        <div class="shopee-popup__container">
                            <div class="shopee-alert-popup card">
                                <div class="shopee-alert-popup__title">Bạn chắc chắn muốn bỏ sản phẩm này?</div>
                                <div class="shopee-alert-popup__message">{this.state.obj.nameSp}</div>
                                <div class="shopee-alert-popup__button-horizontal-layout">
                                    <button type="button" class="btn btn-solid-primary btn--m btn--inline shopee-alert-popup__btn" onClick={() => this.CancelOrder(this.state.obj.Id)}>có</button>
                                    <div class="shopee-alert-popup__button-spacer"></div>
                                    <button type="button" class="btn btn-light btn--m btn--inline shopee-alert-popup__btn" onClick={() => this.CloseModal()}>Không</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={this.state.isShowViewCart == true ? "" : "render"}>
                        <div className="_7PEQZR" style={{ "marginBottom": "0px" }}>
                            <div class="Qa2b3W">
                                <div class="HT91w+">
                                    <label class=" ">
                                        <input name="selectAll" onClick={() => this.handleSelectAll()} checked={this.state.isCheckAll} class="form-check-input" type="checkbox" value="" id="selectAll" />

                                    </label>
                                </div>
                                <div class="AL+12-">Sản Phẩm</div>
                                <div class="_9WkMVw">Đơn Giá</div>
                                <div class="-8m-Kl">Số Lượng</div>
                                <div class="jhQgNo">Số Tiền</div>
                                <div class="f6YLr6">Thao Tác</div>
                            </div>
                            {
                                ProductsOrder.map((item, index) => {
                                    return (<div class="QetDXz">


                                        <div class="B6ivVi">
                                            <div class="vZBTVk">
                                                <div class="JkA04H">
                                                    <div class="Ho1DUb">
                                                        <label class=" ">
                                                            <input name={item.id} onChange={this.handleSelect} class="form-check-input" type="checkbox" checked={this.state.isCheck.includes(item.id)} value={item.id} id={item.id} />

                                                        </label>
                                                    </div>
                                                    <div class="Nnq7jn">
                                                        <div class="_9OEiWk">
                                                            {/* style="background-image: url(&quot;https://cf.shopee.vn/file/sg-11134201-22100-mgor78wm3iivee_tn&quot;);" */}
                                                            <a title="" href="">
                                                                <div class="bkwjpc" style={{ "backgroundImage": "url(" + item.imageSp + ")" }}>
                                                                </div>
                                                            </a>
                                                            <div class="g4Ihk-">

                                                                <a class="kjRybG" title={item.nameSp} href="/Android-TV-Box-Mxq-Pro-Ram-16-256GB-Smart-Tivi-Box-4K-Wifi-5G-Android-11-xem-truyền-hình-100-kênh-miễn-phí-xem-Youtube-i.835133002.19153728876?xptdk=d4428332-e4cc-4d4a-b105-be45f0517273">
                                                                    {item.nameSp}
                                                                </a>
                                                                <div class="_5BKqFi"  >
                                                                </div>
                                                                <div class="_3iO5ot">
                                                                    <span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="_52vwcs">
                                                        <div>
                                                            <span class="d6HZlA">{item.pricePromotion.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                                                        </div>
                                                    </div>
                                                    <div class="rwgSkh">
                                                        <div class="uRjDya shopee-input-quantity">
                                                            <button onClick={() => this.reduce(item)} class="zpjHdR"><svg enable-background="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" class="shopee-svg-icon">
                                                                <polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5"></polygon>
                                                            </svg></button>
                                                            <input class="zpjHdR pVY1dQ" type="text" role="spinbutton" aria-valuenow="1" value={item.quantity} />
                                                            <button onClick={() => this.increase(item)} class="zpjHdR">
                                                                <svg enable-background="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" class="shopee-svg-icon icon-plus-sign">
                                                                    <polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5">
                                                                    </polygon>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="_3+V9JZ">
                                                        <span>{item.moneys.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                                                    </div>
                                                    <div class="mfnQju PhFyeg">
                                                        <button class="-ytT4B" onClick={() => this.Delete(item.id)}>Xóa</button>
                                                        <div class="_7vTK1g K93HWE">
                                                            <div className={this.state.OpenModelSpTT && this.state.IdModal == item.productId ? "W5qIdt eIqJRX" : "render"}>

                                                                {GenMoDalSp(lstPr)}


                                                            </div>
                                                            {ShowButomPlus(item)}

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>)

                                })
                            }

                        </div>

                        <div className="W8ezSg Z3E0E2">
                            <div class="WyzXWi -tIOmz">
                                <div class="-zQCc-">
                                    <label class=" ">
                                        <input name="selectAll" onClick={() => this.handleSelectAll()} checked={this.state.isCheckAll} class="form-check-input" type="checkbox" value="" id="selectAll" />

                                    </label>
                                </div>
                                <button class="gtcCBF clear-btn-style">Chọn Tất Cả ({ProductsOrder.length})</button>
                                <button class="clear-btn-style pv9C97" >Xóa</button>
                                <div class="">
                                </div>
                                {/* <button class="clear-btn-style _3MARa-">Lưu vào mục Đã thích</button> */}
                                <div class="TCWgaV">
                                </div><div class="_2ElxFV"><div class="exSsxY">
                                    <div class="BNuBXe">
                                        <div class="_4L690l">Tổng thanh toán ({this.state.CountMoney} Sản phẩm):</div>
                                        <div class="Or93gU">{this.state.SumMoney.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
                                    </div>
                                </div>
                                    <div class="e3Okr1">
                                    </div>
                                </div>
                                <button class="shopee-button-solid shopee-button-solid--primary">
                                    <span class="JEsC7W">Mua hàng</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="TTbSM8">
                        <div >
                            <div className="shopee-header-section shopee-header-section--simple">
                                <div className="shopee-header-section__header">
                                    <div className="shopee-header-section__header__title">
                                        <div>Có thể bạn cũng thích</div>
                                        <a class="shopee-header-section__header-link" tabindex="-1" href="/cart/recommend"><button class="shopee-button-no-outline">Xem tất cả&nbsp;<svg enable-background="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" class="shopee-svg-icon icon-arrow-right"><path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path></svg></button></a>
                                    </div>
                                </div>
                                <div class="shopee-header-section__content"></div>
                            </div>
                            <div className="ED6Nfy row">
                                <div class="F5GEoY">
                                    <a data-sqe="link" href="/(SIÊU-CỘNG)-Bỉm-dán-quần-Moony-NB90-S84-M64-L54-XL44-M58-L44-XL38-XXL26-i.166250762.2557663537?sp_atk=d9396e78-183e-4edf-b642-6151e225fbd5&amp;xptdk=d9396e78-183e-4edf-b642-6151e225fbd5">
                                        <div class="MHQUWx">
                                            <div class="e+W1+o">
                                                <div style={{ "pointer-events": "none" }}><div class="_6WqAAN kSGaAZ">
                                                    <img width="invalid-value" height="invalid-value" class="A2biD6 pH6OHR" src="https://cf.shopee.vn/file/74962d30a179b8f0ab959515871fd282_tn" />
                                                    <div class="_20CHwO"><div class="_5KXYyu r5IeUK DGPJIB">
                                                        <span class="percent">41%</span><span class="bzhmIc">giảm</span>
                                                    </div></div></div></div><div class="phaD5a"><div class="C2cLca">
                                                        <div class="_7qeYIT"><div class="xu+II7 xIpsKK">(SIÊU CỘNG) Bỉm dán/quần Moony NB90/S84/M64/L54/XL44/M58/L44/XL38/XXL26</div>
                                                        </div>
                                                        {/* <div class="YWPF+E">
                                                            <div class="_5-fR0D">#Shopdacbiet</div>
                                                        </div> */}
                                                        </div><div class="JLn02i +5sWQF"><div class="_8pWXgw QH4xqG">
                                                            <span class="PBXD50">₫</span><span class="_0pAnxm">265.000</span>
                                                        </div><div class="Xpegl0 EPTziP">Đã bán 471</div></div></div></div></div></a></div>
                            </div>
                        </div>
                    </div>
                </div>

            </>

        )

    }
}
export default CartShooping;