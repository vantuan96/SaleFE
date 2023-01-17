import React, { Component } from "react";
class PagingProduct extends Component {
    constructor(props) {
        super(props);
        console.log(props)

        const { listPro } = props;
        if (listPro == null) return null;
        this.state = {
            todos: listPro,
            currentPage: 1,
            todosPerPage:24,
            upperPageBound: 3,
            lowerPageBound: 0,
            isPrevBtnActive: 1,
            isNextBtnActive: 0,
            pageBound: 3
           
        };
        this.handleClick = this.handleClick.bind(this);
        this.btnDecrementClick = this.btnDecrementClick.bind(this);
        this.btnIncrementClick = this.btnIncrementClick.bind(this);
        this.btnNextClick = this.btnNextClick.bind(this);
        this.btnPrevClick = this.btnPrevClick.bind(this);
        // this.componentDidMount = this.componentDidMount.bind(this);
        this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);
    }

    handleClick(event) {
        let listid = Number(event.target.id);
        this.setState({
            currentPage: listid
        });
         $(".active2").removeClass( 'product-button-solid product-button-solid--primary');
         if(listid == 2){
            $(".two" ).addClass('active2 product-button-solid product-button-solid--primary');
         }else if(listid == 1){
            $(".one" ).addClass('active2 product-button-solid product-button-solid--primary');
         }
         
         else{
            $("#" + listid ).addClass('active2 product-button-solid product-button-solid--primary');
         }
        


        this.setPrevAndNextBtnClass(listid);
    }
    componentDidUpdate(     ) {    
        $(".active2").removeClass('product-button-solid product-button-solid--primary');
        if(this.state.currentPage == 2){
            $(".two" ).addClass('active2 product-button-solid product-button-solid--primary');
         }else if(this.state.currentPage == 1){
            $(".one" ).addClass('active2 product-button-solid product-button-solid--primary');
         }
         
         else{
            $("#" + this.state.currentPage ).addClass('active2 product-button-solid product-button-solid--primary');
         }
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

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            if (number === currentPage) {
                return (
                    // <li key={number} className='active' id={number}><a href='#' id={number} onClick={this.handleClick}>{number}</a></li>
                    <button id={number} class="one two active2 product-button-solid product-button-solid--primary" onClick={this.handleClick}>{number}</button>
                )
            }
            else if ((number < upperPageBound + 1)  && number > lowerPageBound) {
                if(number == 2){
                    return (
                        // <li key={number} id={number}><a href='#' id={number} onClick={this.handleClick}>{number}</a></li>
                        <button id="2" class=" two product-button-no-outline" onClick={this.handleClick}>2</button>
                    )
                }else {
                    return (
                        // <li key={number} id={number}><a href='#' id={number} onClick={this.handleClick}>{number}</a></li>
                        <button id={number} class="  product-button-no-outline" onClick={this.handleClick}>{number}</button>
                    )
                }
                
            }
        });
        let pageIncrementBtn = null;
        if (pageNumbers.length > upperPageBound) {
            pageIncrementBtn = <button class="product-button-no-outline product-button-no-outline--non-click">...</button>
        }
        let pageDecrementBtn = null;
        if (lowerPageBound >= 1) {
            pageDecrementBtn = <button class="product-button-no-outline product-button-no-outline--non-click">...</button>
        }
        let renderPrevBtn = null;
        // if(currentPage == this.totalPage)
        if (isPrevBtnActive === 1) {
            renderPrevBtn = (<p class="product-icon-button product-icon-button--left ">
                <svg enable-background="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" class="product-svg-icon icon-arrow-left"><g>
                    <path d="m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z"></path>
                </g>
                </svg>
            </p>)
        }
        else {
            renderPrevBtn = (<button onClick={this.btnPrevClick} class="product-icon-button product-icon-button--left ">
                <svg enable-background="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" class="product-svg-icon icon-arrow-left"><g>
                    <path d="m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z"></path>
                </g>
                </svg>
            </button>)
        }
        let renderNextBtn = null;
        if (isNextBtnActive === 1) {
            renderNextBtn = (<p class="product-icon-button product-icon-button--right ">
                <svg enable-background="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" class="product-svg-icon icon-arrow-right"><path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z">
                </path>
                </svg>
            </p>)
        }
        else {
            renderNextBtn = (<button onClick={this.btnNextClick} class="product-icon-button product-icon-button--right ">
                <svg enable-background="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" class="product-svg-icon icon-arrow-right"><path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z">
                </path>
                </svg>
            </button>)
        }
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
        return (
            <>
            <div className="ED6Nfy rowCustom ">
                    {currentTodos.map((item, index) => {
                        return (
                            <div class="F5GEoY">
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
                                        </div><div class="Xpegl0 EPTziP"> {genPrice(item.sold)} </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        )
                    })}
            </div>
                 <div className='pagingProduct'>
                        {renderPrevBtn}
                        {pageDecrementBtn}
                        {renderPageNumbers}
                        {pageIncrementBtn}
                        {renderNextBtn}
                    </div>
               
                    </>

        );
    }
}
export default PagingProduct;


