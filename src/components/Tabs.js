import React, { useEffect, useState } from 'react';
import FormError from '../components/FormError'
import { ServicesService } from "../core/services/ServicesService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import parse from 'html-react-parser';
import PagingVotes from '../components/PagingVotes'
const Tab = (props) => {
    console.log(props)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [comment, setComment] = useState('')
    const [open, setOpen] = useState(false)
    const [id, setId] = useState(0)
    const [count, setCount] = useState(0)
    const [errors, setErrors] = useState(
        {
            fullName: '',
            email: '',
            website: '',
            comment: ''
        }
    )
    const SaveCmt = () => {
        const params = {};
        if (fullName == "" || fullName === null || fullName === undefined) {
            setFullName("Vui lòng nhập tên.")
            return;
        }
        if (email == "" || email === null || email === undefined) {
            setEmail("Vui lòng nhập email.")
            return;
        }

        if (comment == "" || comment === null || comment === undefined) {
            setComment("Hãy để lại bình luận.")
            return;
        }
        params["ProductId"] = props.objProduct.id;
        params["FullName"] = fullName,
            params["Email"] = email;
        params["Comment"] = comment;
        params["VoteStar"] = parseInt($('#stars li.selected').last().data('value'), 10);
        params["Avartar"] = "";
        ServicesService.SaveVote(params).then(result => {
            if (result.isSuccess) {
                toast(result.message);
                setFullName('')
                setComment('')
                setEmail('')
            }
            else {
                toast(result.message);
            }
        })
    }
    const [visibleTab, setVisibleTab] = useState(props.data[0].id)
    useEffect(() => {
        $(document).ready(function () {

            /* 1. Visualizing things on Hover - See next part for action on click */
            $('#stars li').on('mouseover', function () {
                var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on

                // Now highlight all the stars that's not after the current hovered star
                $(this).parent().children('li.star').each(function (e) {
                    if (e < onStar) {
                        $(this).addClass('hover');
                    }
                    else {
                        $(this).removeClass('hover');
                    }
                });

            }).on('mouseout', function () {
                $(this).parent().children('li.star').each(function (e) {
                    $(this).removeClass('hover');
                });
            });


            /* 2. Action to perform on click */
            $('#stars li').on('click', function () {
                var onStar = parseInt($(this).data('value'), 10); // The star currently selected
                var stars = $(this).parent().children('li.star');
                let i;
                for (i = 0; i < stars.length; i++) {
                    $(stars[i]).removeClass('selected');
                }

                for (i = 0; i < onStar; i++) {
                    $(stars[i]).addClass('selected');
                }

                // JUST RESPONSE (Not needed)
                var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
                var msg = "";
                if (ratingValue > 1) {
                    msg = "Thanks! You rated this " + ratingValue + " stars.";
                }
                else {
                    msg = "We will improve ourselves. " + ratingValue + " stars.";
                }
                responseMessage(msg);

            });


        });


        function responseMessage(msg) {
            $('.success-box').fadeIn(200);
            $('.success-box div.text-message').html("<span>" + msg + "</span>");
        }

    })
    const GenTitleTab = (item1) => {
        let str = ""
        if (item1.id == 1) {
            str = "Mô tả"
        } else if (item1.id == 2) {
            str = "Đánh giá" + " " + "(" + (props.listvote.length) + ")"
        } else if (item1.id == 3) {
            str = "Địa chỉ"
        }
        return str
    }
    const listTitles = props.data.map((item) =>
        <li id="tab-title-reviews" role="tab" aria-controls="tab-reviews" onClick={() => setVisibleTab(item.id)} className={visibleTab === item.id ? "description_tab active" : "description_tab "}>

            <a href="#tab-description" aria-selected="false" tabindex="-1">
                {GenTitleTab(item)}
            </a>
        </li>
    )

    const listContent = props.data.map((item) =>
        <p style={visibleTab === item.id ? {} : { display: 'none' }}>{item.tabContent}</p>
    )
    function changeBackground(e) {
        e.target.style.color = 'yellow';
    }
    
    const handleChange = e => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox'
            ? target.checked
            : target.value
        this.setState({
            [name]: value
        });
    }
    const genHtmlRaw = (value) => {
        //   console.log(value)
        return parse("'" + value + "'")
    };

    const onSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div class="product-bottom">
            <ToastContainer />
            <section class="nl-tabs">
                <div class="woocommerce-tabs wc-tabs-wrapper tabbed-content">
                    <ul class="tabs container wc-tabs product-tabs small-nav-collapse nav nav-uppercase nav-tabs nav-normal nav-left" role="tablist">
                        {listTitles}
                    </ul>
                    <div class="tab-panels container">
                     
                            <div style={visibleTab === "2" ? {} : { display: 'none' }} className='row g-5   product-ratings'>
                                <div className='col-lg-7'>
                                    <div className='product-ratings__list'>
                                    <PagingVotes lstVotes={ props.listvote} />
                                       
                                    </div>
                                </div>
                                <div className='col-lg-5'>
                                    <div class="bg-light rounded p-5">
                                        <h6 class="text-uppercase border-start border-5 border-primary ps-3 mb-4">Thêm đánh giá</h6>
                                        <div class="comment-form-rating">
                                            <label for="rating">Đánh giá của bạn&nbsp;<span class="required">*</span>
                                            </label>
                                            <section class='rating-widget'>


                                                <div class='rating-stars text-center'>
                                                    <ul id='stars'>
                                                        <li class='star' title='Poor' data-value='1'>
                                                            <i class='fa fa-star fa-fw'></i>
                                                        </li>
                                                        <li class='star' title='Fair' data-value='2'>
                                                            <i class='fa fa-star fa-fw'></i>
                                                        </li>
                                                        <li class='star' title='Good' data-value='3'>
                                                            <i class='fa fa-star fa-fw'></i>
                                                        </li>
                                                        <li class='star' title='Excellent' data-value='4'>
                                                            <i class='fa fa-star fa-fw'></i>
                                                        </li>
                                                        <li class='star' title='WOW!!!' data-value='5'>
                                                            <i class='fa fa-star fa-fw'></i>
                                                        </li>
                                                    </ul>
                                                </div>

                                            </section>


                                            <div class='success-box'>
                                                <img alt='tick image' width='32' src='data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA0MjYuNjY3IDQyNi42NjciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQyNi42NjcgNDI2LjY2NzsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxwYXRoIHN0eWxlPSJmaWxsOiM2QUMyNTk7IiBkPSJNMjEzLjMzMywwQzk1LjUxOCwwLDAsOTUuNTE0LDAsMjEzLjMzM3M5NS41MTgsMjEzLjMzMywyMTMuMzMzLDIxMy4zMzMgIGMxMTcuODI4LDAsMjEzLjMzMy05NS41MTQsMjEzLjMzMy0yMTMuMzMzUzMzMS4xNTcsMCwyMTMuMzMzLDB6IE0xNzQuMTk5LDMyMi45MThsLTkzLjkzNS05My45MzFsMzEuMzA5LTMxLjMwOWw2Mi42MjYsNjIuNjIyICBsMTQwLjg5NC0xNDAuODk4bDMxLjMwOSwzMS4zMDlMMTc0LjE5OSwzMjIuOTE4eiIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K' />
                                                <div class='text-message'></div>
                                            </div>

                                        </div>
                                        <form onSubmit={onSubmit}>
                                            <div class="row g-3">
                                                <div class="col-12 col-sm-6">
                                                    <input type="text" value={fullName} class="form-control bg-white border-0" placeholder="Your Name" style={{ "height": "55px" }} onChange={e => setFullName(e.target.value)} />
                                                    <FormError
                                                        errorMessage={errors.fullName} />
                                                </div>

                                                <div class="col-12 col-sm-6">
                                                    <input type="email" value={email} class="form-control bg-white border-0" placeholder="Your Email" style={{ "height": "55px" }} onChange={e => setEmail(e.target.value)} />
                                                    <FormError
                                                        errorMessage={errors.email} />
                                                </div>

                                                <div class="col-12">
                                                    <textarea value={comment} class="form-control bg-white border-0" rows="5" placeholder="Comment" onChange={e => setComment(e.target.value)} ></textarea>
                                                    <FormError
                                                        errorMessage={errors.comment} />
                                                </div>
                                                <div class="col-12">
                                                    <button class="btn btn-primary w-100 py-3" type="submit" onClick={SaveCmt}>Đánh giá của bạn</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div style={visibleTab === "1" ? {} : { display: 'none' }} className='descript'>
                            {genHtmlRaw(props.objProduct.summary)} 
                            </div>

                       
                    </div>

                </div>

            </section>
        </div>

    )
}


export default Tab

