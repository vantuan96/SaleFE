import React, { Component } from "react";
import { AboutService } from "../../../core/services/AboutService";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
class about extends Component {

    constructor(props) {
        super(props);
        this.state = {
            about: {},
            users: []
        };
    }

    componentDidMount() {
        this.getDefaultAbout();
        this.getListUserExpert();
    }
    getDefaultAbout() {
        AboutService.GetInfo().then(result => {
            console.log(result)
            if (result !== {}) {
                this.setState({
                    about: result
                })
            } else {

                this.setState({
                    about: {}
                })
            }

        })
    }
    getListUserExpert() {
        AboutService.GetListMembers().then(result => {
            console.log(result)
            if (result !== {}) {
                this.setState({
                    users: result
                })
            } else {

                this.setState({
                    users: {}
                })
            }

        })
    }
    render() {
        const { about, users } = this.state;
        console.log(users);
        if (about === {}) return null;
        
        return (
            <div>
                <div className="container-fluid py-5">
                    <div className="container">
                        <div className="row gx-5">
                            <div className="col-lg-5 mb-5 mb-lg-0" style={{ "minHeight": "500px" }}>
                                <div className="position-relative h-100">
                                    <img className="position-absolute w-100 h-100 rounded" src={about.coverPath} />
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="border-start border-5 border-primary ps-5 mb-5">
                                    <h6 className="text-primary text-uppercase">Vài nét về chúng tôi</h6>
                                    <h1 className="display-5 text-uppercase mb-0">{about.title}</h1>
                                </div>
                                <h4 className="text-body mb-4">{about.subTitle}</h4>
                                <div className="bg-light p-4">
                                    <ul className="nav nav-pills justify-content-between mb-3" id="pills-tab" role="tablist">
                                        <li className="nav-item w-50" role="presentation">
                                            <button className="nav-link text-uppercase w-100 active" id="pills-1-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-1" type="button" role="tab" aria-controls="pills-1"
                                                aria-selected="true">Nhiệm vụ của chúng tôi</button>
                                        </li>
                                        <li className="nav-item w-50" role="presentation">
                                            <button className="nav-link text-uppercase w-100" id="pills-2-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-2" type="button" role="tab" aria-controls="pills-2"
                                                aria-selected="false">Tầm nhìn của chúng tôi</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="pills-tabContent">
                                        <div className="tab-pane fade show active" id="pills-1" role="tabpanel" aria-labelledby="pills-1-tab">
                                            <p className="mb-0">{about.mission}</p>
                                        </div>
                                        <div className="tab-pane fade" id="pills-2" role="tabpanel" aria-labelledby="pills-2-tab">
                                            <p className="mb-0">{about.vission}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-fluid bg-offer my-5 py-5">
                    <div class="container py-5">

                        <div class="row gx-5 justify-content-start">
                            <div class="col-lg-7">
                                <div class="border-start border-5 border-dark ps-5 mb-5">
                                    <h6 class="text-dark text-uppercase">Chương trình đặc biệt</h6>
                                    <h1 class="display-5 text-uppercase text-white mb-0">{about.offerSpecial}</h1>
                                </div>
                                <p class="text-white mb-4">{about.despOffer}</p>
                                <a href="/Product" class="btn btn-light py-md-3 px-md-5 me-3">Shop Now</a>
                                <a href="https://www.youtube.com/watch?v=ZNU_Mxq6xVk" class="btn btn-outline-light py-md-3 px-md-5">Read More</a>
                            </div>
                        </div>
                    </div>

                </div>
        
<OwlCarousel className='owl-theme' loop margin={50} nav items  = {4} autoWidth = {false} width= {200}>
{users.map((item, index) => {
                                return (
                                    <div className="team-item">
                                        <div className="position-relative overflow-hidden">
                                            <img className="img-fluid w-100" src={ "https://localhost:44353/" + item.userAvatar} alt="" width={200} height={200} />
                                            <div className="team-overlay">
                                                <div className="d-flex align-items-center justify-content-start">
                                                    <a className="btn btn-light btn-square mx-1" href="#"><i className="bi bi-twitter"></i></a>
                                                    <a className="btn btn-light btn-square mx-1" href="#"><i className="bi bi-facebook"></i></a>
                                                    <a className="btn btn-light btn-square mx-1" href="#"><i className="bi bi-linkedin"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-light text-center p-4">
                                            <h5 className="text-uppercase">{item.name}</h5>
                                            <p className="m-0">Designation</p>
                                        </div>
                                    </div>

                                );
                            })}
</OwlCarousel>;
              
            </div>

        )



    }
}
export default about;