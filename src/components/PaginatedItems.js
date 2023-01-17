import React, { Component } from "react";
class PaginatedItems extends Component {
  constructor(props) {
    super(props);
    console.log(props)
  
     const { lstPr} = props;
     if(lstPr == null) return null;
    this.state = {
      todos: lstPr,
      currentPage: 1,
      todosPerPage: 1,
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
    }else if(totalPage == this.state.currentPage){
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
    return (
      <div>
        <div className="CLDKmH">
          {currentTodos.map((item, index) => {
            return (
              <div className="NhTWrx">
                <a data-sqe="link" href={"/ProductDetail/" + item.id}>
                  <div className="BroTZD">
                    <div className="vLCVae">
                      <div style={{ "pointer-events": "none" }}>
                        <div className="x-JpY2 M4E03I">
                          <img width={170} height={170} alt="" className="SHXTiW FLvHfL" src={item.corverPath} style={{ "object-fit": "contain" }}></img>
                          <div className="_1jOx9i">
                            <div className="DappYl HqbmlT" style={{ "color": "rgb(208, 1, 27)" }}>

                              <div className="Lgrqy6"></div>
                            </div>
                          </div>
                          <div className="skjG0f">
                            <div className="customized-overlay-image">
                              <img src=""></img>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="J0slRF">
                        <div className="pdWfKn" data-sqe="name">
                          <div className="_1OLjIc">
                            <div class="sJFiF6 _4y-jRt ALEZM0">{item.name}
                            </div>
                          </div>
                          {/* <div className="nLPkBI">

                          </div> */}
                        </div>
                        <div className="_61ik0G">
                          <div className="dOCxmg Yxz75r" style={{ " maxWidth": "calc(100% - 22px)" }}>
                            {/* <span className="UDqkWV">₫</span> */}
                            <span class="xmhRY5">{item.pricePromotion.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                          </div>
                          <div className="L8nxRp"></div>
                        </div>
                        <div className="IIgv3X">
                          <div className="-HwjOp">
                            <div className="shopee-rating-stars">
                              <div className="shopee-rating-stars__stars">
                                <div class="shopee-rating-stars__star-wrapper">
                                  <div class="shopee-rating-stars__lit" style={{ "width": "100%" }}>
                                    <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" class="shopee-svg-icon shopee-rating-stars__gold-star icon-rating-solid">
                                      <polygon points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"></polygon></svg>
                                  </div>
                                  <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" class="shopee-svg-icon shopee-rating-stars__dark-star icon-rating-solid"><polygon points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10">
                                  </polygon>
                                  </svg>
                                </div>
                                <div class="shopee-rating-stars__star-wrapper">
                                  <div class="shopee-rating-stars__lit" style={{ "width": "100%" }}>
                                    <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" class="shopee-svg-icon shopee-rating-stars__gold-star icon-rating-solid">
                                      <polygon points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"></polygon></svg>
                                  </div>
                                  <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" class="shopee-svg-icon shopee-rating-stars__dark-star icon-rating-solid"><polygon points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10">
                                  </polygon>
                                  </svg>
                                </div>
                                <div class="shopee-rating-stars__star-wrapper">
                                  <div class="shopee-rating-stars__lit" style={{ "width": "100%" }}>
                                    <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" class="shopee-svg-icon shopee-rating-stars__gold-star icon-rating-solid">
                                      <polygon points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"></polygon></svg>
                                  </div>
                                  <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" class="shopee-svg-icon shopee-rating-stars__dark-star icon-rating-solid"><polygon points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10">
                                  </polygon>
                                  </svg>
                                </div>
                                <div class="shopee-rating-stars__star-wrapper">
                                  <div class="shopee-rating-stars__lit" style={{ "width": "100%" }}>
                                    <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" class="shopee-svg-icon shopee-rating-stars__gold-star icon-rating-solid">
                                      <polygon points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"></polygon></svg>
                                  </div>
                                  <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" class="shopee-svg-icon shopee-rating-stars__dark-star icon-rating-solid"><polygon points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10">
                                  </polygon>
                                  </svg>
                                </div>
                              </div>

                            </div>
                            <div class="_3YgUmH EGFsvO">Đã bán {item.sold}</div>
                          </div>
                        </div>
                        <div class="sn9l4n">Hà Nội</div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            )
          })}
        </div>
        <div className='shopee-page-controller shopee-page-controller--v2'>
                        {renderPrevBtn}
                        {pageDecrementBtn}
                        {renderPageNumbers}
                        {pageIncrementBtn}
                        {renderNextBtn}
                    </div>
               

      </div>
    );
  }
}
export default PaginatedItems;


