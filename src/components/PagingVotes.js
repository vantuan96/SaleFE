import React, { Component } from "react";
import { ServicesService } from "../core/services/ServicesService";
class PagingVotes extends Component {
    constructor(props) {
        super(props);
        console.log(props)

        const { lstVotes } = props;
        if (lstVotes == null) return null;
        this.state = {
            todos: lstVotes,
            currentPage: 1,
            todosPerPage: 5,
            upperPageBound: 3,
            lowerPageBound: 0,
            isPrevBtnActive: 1,
            isNextBtnActive: 0,
            pageBound: 3,
            count: 0,
            open: false,
            ids: 0
        };
        this.handleClick = this.handleClick.bind(this);
        this.btnDecrementClick = this.btnDecrementClick.bind(this);
        this.btnIncrementClick = this.btnIncrementClick.bind(this);
        this.btnNextClick = this.btnNextClick.bind(this);
        this.btnPrevClick = this.btnPrevClick.bind(this);
        // this.componentDidMount = this.componentDidMount.bind(this);
        this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);
    }
    componentDidUpdate() {

        $(".active1").removeClass('shopee-button-solid shopee-button-solid--primary');
        $('#' + this.state.currentPage).addClass('active1 shopee-button-solid shopee-button-solid--primary');
    }
    // componentDidMount (){

    //   let totalPage = Math.ceil(this.state.todos.length / this.state.todosPerPage);
    //   if(totalPage == this.state.currentPage){
    //     this.setState({ isNextBtnActive: 1,
    //       isPrevBtnActive : 1
    //      });
    //   }
    // }
    handleClick(event) {
        let listid = Number(event.target.id);
        this.setState({
            currentPage: listid
        });
        $(".active1").removeClass('shopee-button-solid shopee-button-solid--primary');
        $('#' + listid).addClass('active1 shopee-button-solid shopee-button-solid--primary');
        this.setPrevAndNextBtnClass(listid);
    }
    setPrevAndNextBtnClass(listid) {
        let totalPage = Math.ceil(this.state.todos.length / this.state.todosPerPage);
        this.setState({ isNextBtnActive: 1 });
        this.setState({ isPrevBtnActive: 1 });
        if (totalPage === listid && totalPage > 1) {
            this.setState({ isPrevBtnActive: '' });
        }
        else if (listid === 1 && totalPage > 1) {
            this.setState({ isNextBtnActive: '' });
        }
        else if (totalPage > 1) {
            this.setState({ isNextBtnActive: '' });
            this.setState({ isPrevBtnActive: 0 });
        } else if (totalPage == this.state.currentPage) {
            this.setState({ isNextBtnActive: 1 });

        }
    }
    btnIncrementClick() {
        this.setState({ upperPageBound: this.state.upperPageBound + this.state.pageBound });
        this.setState({ lowerPageBound: this.state.lowerPageBound + this.state.pageBound });
        let listid = this.state.upperPageBound + 1;
        this.setState({ currentPage: listid });
        this.setPrevAndNextBtnClass(listid);
    }
    btnDecrementClick() {
        this.setState({ upperPageBound: this.state.upperPageBound - this.state.pageBound });
        this.setState({ lowerPageBound: this.state.lowerPageBound - this.state.pageBound });
        let listid = this.state.upperPageBound - this.state.pageBound;
        this.setState({ currentPage: listid });
        this.setPrevAndNextBtnClass(listid);
    }
    btnPrevClick() {
        if ((this.state.currentPage - 1) % this.state.pageBound === 0) {
            this.setState({ upperPageBound: this.state.upperPageBound - this.state.pageBound });
            this.setState({ lowerPageBound: this.state.lowerPageBound - this.state.pageBound });
        }
        let listid = this.state.currentPage - 1;
        this.setState({ currentPage: listid });
        this.setPrevAndNextBtnClass(listid);
    }
    btnNextClick() {
        if ((this.state.currentPage + 1) > this.state.upperPageBound) {
            this.setState({ upperPageBound: this.state.upperPageBound + this.state.pageBound });
            this.setState({ lowerPageBound: this.state.lowerPageBound + this.state.pageBound });
        }
        let listid = this.state.currentPage + 1;
        this.setState({ currentPage: listid });
        this.setPrevAndNextBtnClass(listid);
    }
    render() {
        const { todos, currentPage, todosPerPage, upperPageBound, lowerPageBound, isPrevBtnActive, isNextBtnActive } = this.state;
        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

        // const renderTodos = currentTodos.map((todo, index) => {
        //   return <li key={index}>{todo}</li>;
        // });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            if (number === 1 && currentPage === 1) {
                return (
                    // <li key={number} className='active' id={number}><a href='#' id={number} onClick={this.handleClick}>{number}</a></li>
                    <button id={number} class="active1 shopee-button-solid shopee-button-solid--primary" onClick={this.handleClick}>{number}</button>
                )
            }
            else if ((number < upperPageBound + 1) && number > lowerPageBound) {
                return (
                    // <li key={number} id={number}><a href='#' id={number} onClick={this.handleClick}>{number}</a></li>
                    <button id={number} class="shopee-button-no-outline" onClick={this.handleClick}>{number}</button>
                )
            }
        });
        let pageIncrementBtn = null;
        if (pageNumbers.length > upperPageBound) {
            pageIncrementBtn = <button class="shopee-button-no-outline shopee-button-no-outline--non-click">...</button>
        }
        let pageDecrementBtn = null;
        if (lowerPageBound >= 1) {
            pageDecrementBtn = <button class="shopee-button-no-outline shopee-button-no-outline--non-click">...</button>
        }
        let renderPrevBtn = null;
        // if(currentPage == this.totalPage)
        if (isPrevBtnActive === 1) {
            renderPrevBtn = (<p class="shopee-icon-button shopee-icon-button--left ">
                <svg enable-background="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" class="shopee-svg-icon icon-arrow-left"><g>
                    <path d="m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z"></path>
                </g>
                </svg>
            </p>)
        }
        else {
            renderPrevBtn = (<button onClick={this.btnPrevClick} class="shopee-icon-button shopee-icon-button--left ">
                <svg enable-background="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" class="shopee-svg-icon icon-arrow-left"><g>
                    <path d="m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z"></path>
                </g>
                </svg>
            </button>)
        }
        let renderNextBtn = null;
        if (isNextBtnActive === 1) {
            renderNextBtn = (<p class="shopee-icon-button shopee-icon-button--right ">
                <svg enable-background="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" class="shopee-svg-icon icon-arrow-right"><path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z">
                </path>
                </svg>
            </p>)
        }
        else {
            renderNextBtn = (<button onClick={this.btnNextClick} class="shopee-icon-button shopee-icon-button--right ">
                <svg enable-background="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" class="shopee-svg-icon icon-arrow-right"><path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z">
                </path>
                </svg>
            </button>)
        }
        const genStar = (stars) => {
            let body = []
            for (var i = 0; i < stars; i++) {
                body.push(<svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" class="shopee-svg-icon icon-rating-solid--active icon-rating-solid"><polygon points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"></polygon></svg>);
            }
            return body
        }
        const SetCountAndOpen = (show, count1, id, index) => {
            this.setState({
                open: show
            })

            if (show) {
                this.setState({
                    count: this.state.count + 1
                })

            } else {
                if (this.state.count == 0) {
                    this.setState({
                        count: 0
                    })

                } else if (this.state.count > 0) {
                    this.setState({
                        count: this.state.count - 1
                    })
                }
            }
            const params = {}
            params["Id"] = id
            params["CountLikeCmt"] = count + 1
            ServicesService.SaveLikeCmt(params).then(result => {
                if (result.isSuccess) {
                    console.log(result)
                    // setId(index)
                }
                else {

                }
            })
        }
        const GenPaging = (obj) => {
            if(obj.length > 0){
                return (<div className='shopee-page-controller shopee-page-controller--v2 pageCustom'>
                {renderPrevBtn}
                {pageDecrementBtn}
                {renderPageNumbers}
                {pageIncrementBtn}
                {renderNextBtn}
            </div>)
            }
         
        }
        return (

            <div>
                <div className='shopee-product-comment-list'>

                    {currentTodos.map((item, index) => {
                        return (
                            <div key={index} className='shopee-product-rating'>
                                <div className='shopee-product-rating__avatar'>
                                    <div className='shopee-avatar'>
                                        <div className='shopee-avatar__placeholder'>

                                        </div>
                                        <img class="shopee-avatar__img" src="https://cf.shopee.vn/file/735460ef7cdcec9a076d7e565f932a6a_tn"></img>
                                    </div>
                                </div>
                                <div className='shopee-product-rating__main'>
                                    <div class="shopee-product-rating__author-name">{item.fullName}</div>
                                    <div className='repeat-purchase-con'>
                                        <div className='shopee-product-rating__rating'>
                                            {genStar(item.voteStar)}
                                        </div>
                                        <div class="shopee-product-rating__time">{item.dateCreated}</div>
                                        <div class="EXI9SU">{item.description}</div>
                                        <div className='shopee-product-rating__image-list-wrapper'></div>
                                        <div className='shopee-product-rating__actions ' style={{ "justify-content": "space-between" }}>
                                            <div className='' style={{ "display": "flex" }}>
                                                <div className={open && this.state.ids == index ? "shopee-product-rating__like-button shopee-product-rating__like-button--liked" : 'shopee-product-rating__like-button'}>
                                                    <svg onClick={() => SetCountAndOpen(!open, count, item.id, index)} width="14px" height="13px" viewBox="0 0 14 13" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs></defs><g stroke="none" stroke-width="1" fill-rule="evenodd"><g id="Product-Ratings-Working" transform="translate(-245.000000, -855.000000)" fill-rule="nonzero"><g transform="translate(155.000000, 92.000000)"><g transform="translate(40.000000, 184.000000)"><g transform="translate(0.000000, 326.000000)"><g transform="translate(50.000000, 253.000000)"><g><path d="M0,12.7272727 L2.54545455,12.7272727 L2.54545455,5.09090909 L0,5.09090909 L0,12.7272727 Z M14,5.72727273 C14,5.02727273 13.4272727,4.45454545 12.7272727,4.45454545 L8.71818182,4.45454545 L9.35454545,1.52727273 L9.35454545,1.33636364 C9.35454545,1.08181818 9.22727273,0.827272727 9.1,0.636363636 L8.4,0 L4.2,4.2 C3.94545455,4.39090909 3.81818182,4.70909091 3.81818182,5.09090909 L3.81818182,11.4545455 C3.81818182,12.1545455 4.39090909,12.7272727 5.09090909,12.7272727 L10.8181818,12.7272727 C11.3272727,12.7272727 11.7727273,12.4090909 11.9636364,11.9636364 L13.8727273,7.44545455 C13.9363636,7.31818182 13.9363636,7.12727273 13.9363636,7 L13.9363636,5.72727273 L14,5.72727273 C14,5.79090909 14,5.72727273 14,5.72727273 Z"></path></g></g></g></g></g></g></g></svg>

                                                </div>

                                                <div class="shopee-product-rating__like-count">{item.countLikeCmt}   </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {GenPaging(currentTodos)}

            </div>

        );
    }
}
export default PagingVotes;


