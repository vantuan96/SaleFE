import React, { Component } from "react";
import { ServicesService } from "../../../core/services/ServicesService";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
// import { MessengerChat } from "react-messenger-chat-plugin";
import { MessengerChat, showMessenger, hideMessenger, showDialog, hideDialog, setMessengerHeight } from 'react-messenger-customer-chat';

class service extends Component {

    constructor(props) {
        super(props);
        this.state = {
            news: [],

        };
    }

    componentDidMount() {
        this.getNewsService();

    }
    getNewsService() {
        ServicesService.GetNews().then(result => {
            console.log(result)
            if (result.length > 0) {
                this.setState({
                    news: result
                })
            } else {
                this.setState({
                    news: []
                })
            }

        })
    }

    render() {
        const { news } = this.state;
        console.log(news);
        if (news === {}) return null;
        return (
            <div>
                <div className="container-fluid py-5">
                    <div className="container">
                        <div className="border-start border-5 border-primary ps-5 mb-5" style={{ "maxWidth": "600px" }}>
                            <h6 className="text-primary text-uppercase">Dịch vụ</h6>
                            <h1 className="display-5 text-uppercase mb-0">OUR EXCELLENT PET CARE SERVICES</h1>
                        </div>
                        <div className="row g-5">
                            {
                                news.map((item, idex) => {
                                    return (
                                        <div className="col-md-6">
                                            <div className="service-item bg-light d-flex p-4">
                                                <img className="display-1 text-primary me-4" src={item.coverPath} width={100} height={120}></img>
                                                <div>
                                                    <h5 className="text-uppercase mb-3">{item.name}</h5>
                                                    <p>{item.metaTitle}</p>
                                                    <a className="text-primary text-uppercase" href={"/Detail/" + item.id}>Read More<i className="bi bi-chevron-right"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }


                        </div>
                    </div>
                </div>
              <div>
            
              </div>

            </div>

        )



    }
}
export default service;