import React, { Component } from "react";
import { ProductService } from "../../../core/services/ProductService";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import TheSidebar from "../../pages/Products/TheSidebar"
import PagingProduct from '../../../components/PagingProduct'
class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            treeView: [],
            lstProduct: [],
            CategoryPr: {},
            listPro: []

        };
    }

    componentDidMount() {
        const pathname = window.location.pathname
        var current = pathname.split('/');

        let categoryid = current[2]
        this.ProductCategoryTree();
        this.GetProductByCategory(categoryid);
        this.getTitleProduct(categoryid)
        this.getListProduct();
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
    getTitleProduct(categoryid) {
        const params = {};
        params["CategoryId"] = categoryid;
        ProductService.GetByCategoryId(params).then(result => {
            console.log(result)
            if (result) {
                this.setState({
                    CategoryPr: result
                })
            } else {
                this.setState({
                    CategoryPr: {}
                })
            }

        })
    }
    ProductCategoryTree() {
        ProductService.GetTreeCateProduct().then(result => {
            console.log(result)
            if (result.length > 0) {
                this.setState({
                    treeView: result
                })
            } else {
                this.setState({
                    treeView: []
                })
            }

        })
    }
    GetProductByCategory(CategoryId) {
        const params = {};
        params["CategoryId"] = CategoryId;
        ProductService.GetProductsByCategory(params).then(result => {
            console.log(result)
            if (result.length > 0) {
                this.setState({
                    lstProduct: result
                })
            } else {
                this.setState({
                    lstProduct: []
                })
            }

        })
    }
    render() {
        const { listPro, treeView, lstProduct, CategoryPr } = this.state;
        if (listPro.length == 0) return null
        console.log(lstProduct);
        const genFavarit = (value) => {
            if (value > 20) {
                return (
                    <div class="-mCRW0"><div class="CGWoC0 _7JfmM3" style={{ "color": "rgb(242, 82, 32)" }}><span class="jKw-Wu">Yêu thích</span></div></div>

                )
            }
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
        const genPrice = (price) => {
            if (price == 0) {
                return null
            } else if (price > 1000) {
                var m = price / 1000
                return "Đã bán" + " " + m + "k"
            } else if (price < 1000) {
                return "Đã bán" + " " + price
            }
        }
        const ShowListProduct = (list) => {
            if (list.length > 0) {
                return (
                    <>
                        <div className="shopee-sort-bar">
                            <span className="shopee-sort-bar__label">Sắp xếp theo</span>
                            <div className="shopee-sort-by-options">
                                <div class="shopee-sort-by-options__option">Phổ biến</div>
                                <div class="shopee-sort-by-options__option">Mới nhất</div>
                                <div class="shopee-sort-by-options__option shopee-sort-by-options__option--selected" style={{ "backgroundColor": "rgb(238, 77, 45)" }}>Bán chạy</div>
                                <div className="styleSearch">
                                    <div class="select-with-status  ">
                                    <div class="select-with-status__holder select-with-status__box-shadow">
                                        <span class="select-with-status__placeholder">Giá  <i class=" mr-20 fa fa-solid fa-angle-down"></i></span>
                                       
                                        <div className="TD1">
                                        <div class="select-with-status__dropdown shopee-modal__transition-enter-done">
                                            <div class="select-with-status__dropdown-item select-with-status__dropdown-item--with-tick">Giá: Thấp đến Cao</div><div class="select-with-status__dropdown-item select-with-status__dropdown-item--with-tick">Giá: Cao đến Thấp</div></div>
                                        </div>
                                    </div>
                                </div></div>
                            </div>
                        </div>
                        <OwlCarousel className='owl-theme' margin={50} nav items={3} autoWidth={false} width={200}>
                            {lstProduct.map((item, index) => {
                                return (

                                    <div class="F5GEoYCus visableText">
                                        <a data-sqe="link" href={"/ProductDetail/" + item.id}  >
                                            <div class="MHQUWx">
                                                <div class="e+W1+o">
                                                    <div style={{ "pointerEvents": "none" }}><div class="_6WqAAN kSGaAZ">
                                                        <img width="invalid-value" height="invalid-value" class="A2biD6 pH6OHR" src={item.corverPath} />
                                                        {genFavarit(item.sold)}
                                                        {genDiscount(item.percentReduce)}
                                                    </div>
                                                    </div>
                                                    <div class="phaD5a"><div class="C2cLca">
                                                        <div class="_7qeYIT"><div class="xu+II7 xIpsKK">{item.name}</div>
                                                        </div>

                                                    </div><div class="JLn02i +5sWQF"><div class="_8pWXgw QH4xqG">
                                                        <span class="_0pAnxm">{item.pricePromotion.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                                                    </div>
                                                            <div class="Xpegl0 EPTziP"> {genPrice(item.sold)} </div>
                                                        </div>
                                                    </div>
                                                    <div class=" tooltipText1 btn-action d-flex justify-content-center">
                                                        <a class="btn1 btn-primary py-2 px-3" href=""><i class="bi bi-cart"></i></a>
                                                        <a class="btn1 btn-primary py-2 px-3" href=""><i class="bi bi-eye"></i></a>
                                                    </div>
                                                </div>

                                            </div>
                                        </a>
                                    </div>
                                )
                            })}

                        </OwlCarousel>
                    </>

                )
            } else {
                return (
                    <div className="border-primary ps-5 mb-5" style={{ "max-width": "600px" }}>
                        <h1 className="text-primary text-uppercase">Không có sản phẩm nào!</h1>

                    </div>
                )
            }
        }
        if (treeView.length === 0) return null;
        return (
            <div>
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-lg-3">
                            <div className="mb-5">
                                <h5 className="text-uppercase border-start border-5 border-primary ps-3 mb-4"><i className="fa fa-list "></i> Danh mục</h5>
                                <TheSidebar treeView={treeView} />
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="border-start border-5 border-primary ps-5 mb-5" style={{ "max-width": "600px" }}>
                                <h6 className="text-primary text-uppercase">Sản phẩm</h6>
                                <h4 className=" text-uppercase mb-0">{CategoryPr.name} </h4>
                            </div>
                            {ShowListProduct(lstProduct)}
                        </div>


                    </div>

                </div>
                <div className="container   ">
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
export default Product;