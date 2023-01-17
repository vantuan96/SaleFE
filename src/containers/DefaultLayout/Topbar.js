import React, { useEffect, useState } from 'react'
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import * as Constants from "../../common/Constants";
import { getCollapseUtilityClass } from '@mui/material';
import i18n from '../../i18n'
const styles = {
    display: "none"
}
const Topbar = (props) => {
    // console.log(props)
    const [count, setCount] = useState(0);
    const [items, setItems] = useState('');
    const [open1, setOpen1] = useState(false);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    useEffect(() => {

        console.log(open)
        var Count_AddToCart = localStorage.getItem(Constants.ItemsStorage.COUNT_ADD_TO_CART)
        var Items = localStorage.getItem(Constants.ItemsStorage.CART_ITEMS)
        var ItemsConvert = JSON.parse(Items)
        if (ItemsConvert.length > 5) {
            setOpen(true)
        }
        if (ItemsConvert.length > 0) {
            setOpen1(true)
        } else {
            setOpen1(false)
        }
        setCount(Count_AddToCart)
        setItems(Items)
        console.log(items)

        const pathname = window.location.pathname
        var current = pathname.split('/');
        if (current[1] == "CartShooping") {
            setOpen2(true)
        }

    });
    useEffect(() => {
        console.log("OK")
    }, [])
    const HandleShowQuanityItem = (obj1) => {
        let m1 = 0;
        if (obj1 != "") {

            var pareObj = JSON.parse(obj1);
            if (pareObj.length > 5) {
                m1 = pareObj.length - 5
            }
        }
        return m1
    }
    const GenListPr = (obj) => {
        var m = obj;
        let body = [];
        if (m != "") {
            var pareObj = JSON.parse(obj);
            pareObj.map((item, index) => {

                body.push(<div class="XLsvO5">
                    <div class="mO5Arw" style={{ "backgroundImage": "url(" + item.imageSp + ")" }}></div><div class="CmkbMQ">
                        <div class="v-center">
                            <div class="HaAgiV">{item.nameSp} . . .</div>
                            <div class="CvhdZ5"></div>
                            <div class="-zdq4e v-center">
                                <div class="-TThIm">₫{item.pricePromotion}</div>
                            </div>
                        </div>
                    </div>
                </div>)

            })
        }
        return body

    }
    // const { t, i18n } = props;

    const changeLanguage = (lng) => {
        localStorage.setItem('locale', lng)
        i18n.locale = locale
        // this.locale = locale
    }
    return (
        <>
            <header className='shopee-top container-wrapper border-bottom' >
                <div className='navbar-wrapper container-wrapper'>
                    <nav className='container navbar'>
                        <div className='flex v-center FAQGyh'></div>
                        <ul className='navbar__links'>
                            <a class="navbar__link navbar__link--tappable navbar__link--hoverable navbar__link--help" href="https://help.shopee.vn/vn/s" target="_blank" rel="noopener noreferrer" tabindex="0"><div class="navbar__help-center-icon"><svg height="16" viewBox="0 0 16 16" width="16" class="shopee-svg-icon icon-help-center"><g fill="none" fill-rule="evenodd" transform="translate(1)"><circle cx="7" cy="8" r="7" stroke="currentColor"></circle><path fill="currentColor" d="m6.871 3.992c-.814 0-1.452.231-1.914.704-.462.462-.693 1.089-.693 1.892h1.155c0-.484.099-.858.297-1.122.22-.319.583-.473 1.078-.473.396 0 .715.11.935.33.209.22.319.517.319.902 0 .286-.11.55-.308.803l-.187.209c-.682.605-1.1 1.056-1.243 1.364-.154.286-.22.638-.22 1.045v.187h1.177v-.187c0-.264.055-.506.176-.726.099-.198.253-.396.462-.572.517-.451.825-.737.924-.858.275-.352.418-.803.418-1.342 0-.66-.22-1.188-.66-1.573-.44-.396-1.012-.583-1.716-.583zm-.198 6.435c-.22 0-.418.066-.572.22-.154.143-.231.33-.231.561 0 .22.077.407.231.561s.352.231.572.231.418-.077.572-.22c.154-.154.242-.341.242-.572s-.077-.418-.231-.561c-.154-.154-.352-.22-.583-.22z"></path></g></svg></div><span class="navbar__link-text navbar__link--tappable navbar__link--hoverable">Hỗ Trợ</span></a>
                            <li class="dropdown navbar__link--notification navbar__link navbar__link--hoverable navbar__link--tappable">
                                <div class="stardust-popover" id="stardust-popover0" tabindex="0">
                                    <div role="button" class="stardust-popover__target">
                                        <div class="n1sJN5">
                                            <div class="UkG+ar">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.00065 14.6667C11.6825 14.6667 14.6673 11.6819 14.6673 8.00004C14.6673 4.31814 11.6825 1.33337 8.00065 1.33337C4.31875 1.33337 1.33398 4.31814 1.33398 8.00004C1.33398 11.6819 4.31875 14.6667 8.00065 14.6667Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    <path d="M5.33464 8.00004C5.33464 11.6819 6.52854 14.6667 8.0013 14.6667C9.47406 14.6667 10.668 11.6819 10.668 8.00004C10.668 4.31814 9.47406 1.33337 8.0013 1.33337C6.52854 1.33337 5.33464 4.31814 5.33464 8.00004Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    <path d="M1.33398 8H14.6673" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>
                                            <span class="UfAWnk">Tiếng Việt</span>
                                            <svg viewBox="0 0 12 12" fill="none" width="12" height="12" color="currentColor">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 8.146L11.146 3l.707.707-5.146 5.147a1 1 0 01-1.414 0L.146 3.707.854 3 6 8.146z" fill="currentColor">
                                                </path>
                                            </svg>
                                            {/* <span class="arrow-up1"></span> */}
                                            <div class="dropdown-content">
                                            <ul >
                                                <li className='mf-20 pb-20 textJsk' onClick={() => changeLanguage('vn')}>Tiếng việt</li>
                                                <li className='mf-20 textJsk'  onClick={() => changeLanguage('en')}>English</li>
                                            </ul>
                                               
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <a class="navbar__link navbar__link--account navbar__link--signup navbar__link--tappable navbar__link--hoverable navbar__link-text navbar__link-text--medium navbar__link-text--normal-case" href="/buyer/signup?is_from_login=true&amp;next=https%3A%2F%2Fshopee.vn%2FCh%25C4%2583m-s%25C3%25B3c-nh%25C3%25A0-c%25E1%25BB%25ADa-v%25C3%25A0-gi%25E1%25BA%25B7t-%25E1%25BB%25A7i-cat.11036670.11111665%3Fpage%3D0%26sortBy%3Dctime%26is_from_login%3Dtrue&amp;page=0&amp;sortBy=ctime">Đăng Ký</a>
                            <div class="navbar__link-separator"></div>
                            <a class="navbar__link navbar__link--account navbar__link--login navbar__link--tappable navbar__link--hoverable navbar__link-text navbar__link-text--medium navbar__link-text--normal-case" href="/buyer/login?is_from_login=true&amp;next=https%3A%2F%2Fshopee.vn%2FCh%25C4%2583m-s%25C3%25B3c-nh%25C3%25A0-c%25E1%25BB%25ADa-v%25C3%25A0-gi%25E1%25BA%25B7t-%25E1%25BB%25A7i-cat.11036670.11111665%3Fpage%3D0%26sortBy%3Dctime%26is_from_login%3Dtrue&amp;page=0&amp;sortBy=ctime">Đăng Nhập</a>
                        </ul>
                    </nav>
                </div>
            </header>
            <div className="container-fluid border-bottom d-none d-lg-block">

                <div className="row gx-0">
                    <div className={open2 ? "col-lg-3 text-center py-2" : "col-lg-3 text-center py-2"} >
                        <div className="d-inline-flex align-items-center">
                            <i className="bi bi-geo-alt fs-1 text-primary me-3"></i>
                            <div className="text-start">
                                <h6 className="text-uppercase mb-1"> Our Office</h6>
                                <span>{props.WebInfo.Adress}</span>
                            </div>
                        </div>
                    </div>
                    <div className={open2 ? "col-lg-3 text-center border-start border-end py-2" : "col-lg-3 text-center border-start border-end py-2"}>
                        <div className="d-inline-flex align-items-center">
                            <i className="bi bi-envelope-open fs-1 text-primary me-3"></i>
                            <div className="text-start">
                                <h6 className="text-uppercase mb-1"> </h6>
                                <span>{props.WebInfo.EmailSystem}</span>
                            </div>
                        </div>
                    </div>
                    <div className={open2 ? "col-lg-3 text-center py-2" : "col-lg-3 text-center py-2"} >
                        <div className="d-inline-flex align-items-center">
                            <i className="bi bi-phone-vibrate fs-1 text-primary me-3"></i>
                            <div className="text-start">
                                <h6 className="text-uppercase mb-1">Call Us</h6>
                                <span>{props.WebInfo.Phone}</span>
                            </div>
                        </div>
                    </div>
                    <div className={open2 ? " render" : "col-lg-3 text-center border-start  py-2"}  >

                        <a href="/CartShooping" id="app-title" className=" tooltip1  d-inline-flex align-items-center">


                            <i className="fa fa-thin fa-cart-plus fs-1  me-3" style={{ "color": "red", "marginTop": "10px" }}></i>
                            <div class="shopee-cart-number-badge">{count}</div>
                            <div className='tooltiptext'>
                                <span class="arrow-up"></span>

                                <div class="_1EQVMQ ">
                                    <div class={open1 ? "HLWGuL render" : "HLWGuL"} >
                                        <div class="dib9cf">
                                        </div>
                                        <div class="JphfXQ">Chưa có sản phẩm
                                        </div>
                                    </div>
                                    <div class={open1 ? "" : "render"}>

                                        <div class="jJe2sa v-center">Sản phẩm mới thêm</div>
                                        {GenListPr(items)}


                                        <div class="_4rKyUd">
                                            <div class={open ? "BhGaMC " : "BhGaMC render"} >
                                                <span class="cart-drawer__more-items-count">{HandleShowQuanityItem(items)}</span>
                                                <span>&nbsp;Thêm hàng vào giỏ</span>
                                            </div>
                                            <div class="navbar__spacer">
                                            </div>
                                            <a class="btn1 btn-solid-primary btn--s btn--inline btn-solid-primary--link gMJMRY" href="/CartShooping">Xem Giỏ hàng</a>
                                        </div>
                                    </div>
                                </div>

                            </div>


                        </a>

                    </div>
                </div>
            </div>

        </>

    )
}
export default React.memo(Topbar)

