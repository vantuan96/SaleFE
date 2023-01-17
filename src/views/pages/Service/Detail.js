import React, { Component } from "react";
import { ServicesService } from "../../../core/services/ServicesService";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import parse from 'html-react-parser';
import FormError from '../../../components/FormError'
import Toaster from "../../../components/Toaster";
import * as Constants from "../../../common/Constants";
import { history } from '../../../helpers/history';
class Detail extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.toast = React.createRef();
        this.state = {
            fullName : '',
            email : '',
            website : '',
            comment : '',
            News: {},
            NewsRecent : [],
            ModelCmt: {
                totalCmt: 0,
                data: []
            },
            errors: {
                fullName: '',
                email: '',
                website :'',
                comment : ''

            },
        };
    }

    componentDidMount() {

        this.getCustomById();
        this.getCmtNews();
        this.NewsRecents();


    }
    NewsRecents() {
        const params = {};
        params["typeNewCategory"] = "2";
        ServicesService.GetNewsRecent(params).then(result => {
            console.log(result)
            if (result) {
                this.setState({
                    NewsRecent : result
                });

            }
            else {
                this.setState({
                    NewsRecent: []
                });
            }
        })
    }
    getCmtNews() {
        const params = {};
        params["Id"] = this.props.match.params.id;
        ServicesService.GetCmtNewsDt(params).then(result => {
            console.log(result)
            if (result) {
                this.setState({
                    ModelCmt: result
                });

            }
            else {
                this.setState({
                    ModelCmt: {}
                });
            }
        })
    }
    getCustomById() {
        const params = {};
        params["Id"] = this.props.match.params.id;
        ServicesService.GetById(params).then(result => {
            console.log(result)
            if (result) {
                this.setState({
                    News: result
                });

            }
            else {
                this.setState({
                    News: {}
                });
            }
        })
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
    SaveCmt() {
        const params = {};
        if(this.state.fullName == "" || this.state.fullName === null || this.state.fullName === undefined){
            this.setState({
                errors: {
                    fullName : "Vui lòng nhập tên."
                },
            })
            return;
        }
        if(this.state.email == "" || this.state.email === null || this.state.email === undefined){
            this.setState({
                errors: {
                    email : "Vui lòng nhập email."
                },
            })
            return;
        }
        
        if(this.state.comment == "" || this.state.comment === null || this.state.comment === undefined){
            this.setState({
                errors: {
                    comment : "Hãy để lại bình luận."
                },
            })
            return;
        }
        params["NewsId"] =  this.props.match.params.id;
        params["FullName"] = this.state.fullName,
        params["WebSite"] = this.state.website;
        params["Email"] = this.state.email;
        params["Comment"] = this.state.comment;
       
        ServicesService.SaveComments(params).then(result => {
            if (result.isSuccess) {
                this.toast.current.showToast('info', Constants.Messages.ADD_COMMENT_SUCCESS);
             this.setState({
                fullName : '',
                email : "",
                comment : "",
                website : ""
             })
            }
            else {
                this.toast.current.showToast('error', result.message);
            }
        })
    }
    onSubmit(e) {
        e.preventDefault();
    }
    render() {
        const genHtmlRaw = (value) => {
            //   console.log(value)
            return parse("'" + value + "'")
        };
        const GenCmt = (model) => {
            console.log(model)
            let body = [];
            if (model.totalCmt !== 0) {
                let obj = model.data;
                obj.map((item) => {
                body.push( <div className="d-flex mb-4">
                <img src={item.avartar} className="img-fluid" style={{ "width": "45px", "height": "45px" }} />
                <div className="ps-3">
                    <h6><a href="">{item.fullName}</a> <small><i>{item.dateCreated}</i></small></h6>
                    <p>{parse( item.summary )}</p>
                    <button className="btn btn-sm btn-light">Reply</button>
                </div>
            </div>)   

                })
            }

return body



        };
        const { News, ModelCmt,fullName,email,comment,website, errors ,NewsRecent} = this.state;
        console.log(News);
        if (News === {}) return null;
        // if (ModelCmt === {}) return null;

        return (

            <div className="container py-5">
                  <Toaster ref={this.toast} />
                 
                <div className="row g-5">
                    <div className="col-lg-8">

                        <div className="mb-5">
                            <img className="img-fluid w-100 rounded mb-5" src={News.detailPath} alt="" />
                            <h1 className="text-uppercase mb-4">{News.metaTitle}</h1>
                            <p>{News.summary}</p>
                            <div>
                                {genHtmlRaw(News.description)}

                            </div>
                        </div>

                        <div className="mb-5">
                            <h3 className="text-uppercase border-start border-5 border-primary ps-3 mb-4">{ModelCmt.totalCmt} Comments</h3>

                            {GenCmt(ModelCmt)}

                        </div>

                        <div className="bg-light rounded p-5">
                            <h3 className="text-uppercase border-start border-5 border-primary ps-3 mb-4">Để lại bình luận</h3>
                            <form onSubmit={this.onSubmit}>
                                <div className="row g-3">
                                    <div className="col-12 col-sm-6">
                                        <input type="text" name="fullName" value={fullName} className="form-control bg-white border-0" placeholder="Your Name" style={{ "height": "55px" }} onChange={this.handleChange}  />
                                        <FormError                          
                                    errorMessage={errors.fullName} />
                                    </div>
                            
                                    <div className="col-12 col-sm-6">
                                        <input type="email" name = "email" value={email} className="form-control bg-white border-0" placeholder="Your Email" style={{ "height": "55px" }} onChange={this.handleChange}  />
                                        <FormError                          
                                    errorMessage={errors.email} />
                                    </div>
                                    <div className="col-12 ">
                                        <input type="text" name = "website" value={website} className="form-control bg-white border-0" placeholder="Website" style={{ "height": "55px" }}  onChange={this.handleChange} />
                                       
                                    </div>
                                    <div className="col-12 ">
                                        <textarea  name= "comment" value={comment} className="form-control bg-white border-0" placeholder="Comment" style={{ "height": "55px" }} onChange={this.handleChange}  />
                                        <FormError                          
                                    errorMessage={errors.comment} />
                                    </div>
                                    <div class="col-12">
                                <button class="btn btn-primary w-100 py-3" type="submit" onClick={() => this.SaveCmt()}>Đăng bình luận</button>
                            </div>
                                </div>
                            </form>
                        </div>

                    </div>
                    <div className="col-lg-4">

                        <div className="mb-5">
                            <div className="input-group">
                                <input type="text" className="form-control p-3" placeholder="Keyword" />
                                <button className="btn btn-primary px-4"><i className="bi bi-search"></i></button>
                            </div>
                        </div>

                        <div className="mb-5">
                            <h3 className="text-uppercase border-start border-5 border-primary ps-3 mb-4">Danh mục bài viết</h3>
                            <div className="d-flex flex-column justify-content-start">
                                <a className="h5 bg-light py-2 px-3 mb-2" href="#"><i className="bi bi-arrow-right me-2"></i>Web Design</a>
                                <a className="h5 bg-light py-2 px-3 mb-2" href="#"><i className="bi bi-arrow-right me-2"></i>Web Development</a>
                                <a className="h5 bg-light py-2 px-3 mb-2" href="#"><i className="bi bi-arrow-right me-2"></i>Web Development</a>
                                <a className="h5 bg-light py-2 px-3 mb-2" href="#"><i className="bi bi-arrow-right me-2"></i>Keyword Research</a>
                                <a className="h5 bg-light py-2 px-3 mb-2" href="#"><i className="bi bi-arrow-right me-2"></i>Email Marketing</a>
                            </div>
                        </div>

                        <div className="mb-5">
                            <h3 className="text-uppercase border-start border-5 border-primary ps-3 mb-4">Bài viết gần đây</h3>
                            {NewsRecent.map((item,index) => {
                                return(
                                    <div className="d-flex overflow-hidden mb-3">
                              
                                    <img className="img-fluid" src={item.coverPath} style={{ "width": "100px", "height": "100px", "object-fit": "cover" }} alt="" />
                                    <a href={"/Detail/" + item.id} className="h5 d-flex align-items-center bg-light px-3 mb-0">{item.metaTitle}
                                    </a>
                                </div>
                                )
                            })}
                         
                        </div>
                        <div className="mb-5">
                        
                        <img src={News.detailPath} alt="" className="img-fluid rounded" />
                    </div>
                    <div className="mb-5">
                        <h3 className="text-uppercase border-start border-5 border-primary ps-3 mb-4">Tag Cloud</h3>
                        <div className="d-flex flex-wrap m-n1">
                            <a href="" className="btn btn-primary m-1">Thức ăn cho pet</a>
                            <a href="" className="btn btn-primary m-1">phụ kiện cho pet</a>
                            <a href="" className="btn btn-primary m-1">Chăm sóc pet</a>
                           
                        </div>
                    </div>
                    </div>
                    
{/* 
                    <div>
                        <h3 className="text-uppercase border-start border-5 border-primary ps-3 mb-4">Plain Text</h3>
                        <div className="bg-light text-center" style={{ "padding": "30px" }}>
                            <p>Vero sea et accusam justo dolor accusam lorem consetetur, dolores sit amet sit dolor clita kasd justo, diam accusam no sea ut tempor magna takimata, amet sit et diam dolor ipsum amet diam</p>
                            <a href="" className="btn btn-primary py-2 px-4">Read More</a>
                        </div>
                    </div> */}

                </div>

            </div>




        )



    }
}
export default Detail;