import { Typography } from "@mui/material";
import React from "react";
import { Component } from "react";
import "./FavouriteDestination.scss";

class FavouriteDestination extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {


        return (
            <div className="favourite-destination">
                <div className="wrap-container">
                    <div className="row">
                        <div className="col-md-6">
                            <div

                                className="item-destination"
                                style={{
                                    background:
                                        "linear-gradient(0deg, rgba(44, 43, 44, 0.3), rgba(44, 43, 44, 0.3)), "

                                }}
                            >
                                <img
                                    src="https://vietradeportal.vn/trung-tam-thanh-pho-ha-noi-o-dau/imager_11239.jpg"
                                    loading="lazy"
                                    style={{
                                        borderBottomLeftRadius: 18,
                                        borderBottomRightRadius: 18,
                                        borderTopLeftRadius: 18,
                                        borderTopRightRadius: 18,
                                        display: 'block',
                                        width: '100%',
                                        height: '100%'
                                    }}
                                />
                                <Typography variant="h5" className="title">


                                </Typography>
                                <div className="content">
                                    <Typography
                                        variant="body1"
                                        className="from-title"
                                    ></Typography>
                                    <Typography
                                        variant="h5"
                                        className="price-title"
                                    ></Typography>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div

                                className="item-destination"
                                style={{
                                    background:
                                        "linear-gradient(0deg, rgba(44, 43, 44, 0.3), rgba(44, 43, 44, 0.3)), "

                                }}
                            >
                                <img
                                    src="https://2trip.vn/wp-content/uploads/2020/08/da-lat-00.jpg"
                                    loading="lazy"
                                    style={{
                                        borderBottomLeftRadius: 18,
                                        borderBottomRightRadius: 18,
                                        borderTopLeftRadius: 18,
                                        borderTopRightRadius: 18,
                                        display: 'block',
                                        width: '100%',
                                        height: '100%'
                                    }}
                                />
                                <Typography variant="h5" className="title">

                                </Typography>
                                <div className="content">
                                    <Typography
                                        variant="body1"
                                        className="from-title"
                                    ></Typography>
                                    <Typography
                                        variant="h5"
                                        className="price-title"
                                    ></Typography>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div

                                className="item-destination item-destination-big"
                                style={{
                                    background:
                                        "linear-gradient(0deg, rgba(44, 43, 44, 0.3), rgba(44, 43, 44, 0.3)), "

                                }}
                            >
                                <img
                                    src="https://statics.vinpearl.com/phu-quoc-1_1627355955.jpg"
                                    loading="lazy"
                                    style={{
                                        borderBottomLeftRadius: 18,
                                        borderBottomRightRadius: 18,
                                        borderTopLeftRadius: 18,
                                        borderTopRightRadius: 18,
                                        display: 'block',
                                        width: '100%',
                                        height: '100%'
                                    }}
                                />
                                <Typography variant="h5" className="title">

                                </Typography>
                                <div className="content">
                                    <Typography
                                        variant="body1"
                                        className="from-title"
                                    ></Typography>
                                    <Typography
                                        variant="h5"
                                        className="price-title"
                                    ></Typography>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="row">
                                <div className="col-md-12">
                                    <div

                                        className="item-destination item-destination-small"
                                        style={{
                                            background:
                                                "linear-gradient(0deg, rgba(44, 43, 44, 0.3), rgba(44, 43, 44, 0.3)), "

                                        }}

                                    >
                                        <img
                                            src="https://img.nhandan.com.vn/Files/Images/2021/03/23/40692162_9381807_image_a_23_1616-1616460198504.jpg"
                                            loading="lazy"
                                            style={{
                                                borderBottomLeftRadius: 18,
                                                borderBottomRightRadius: 18,
                                                borderTopLeftRadius: 18,
                                                borderTopRightRadius: 18,
                                                display: 'block',
                                                width: '100%',
                                                height: '100%'
                                            }}
                                        />
                                        <Typography
                                            variant="h5"
                                            className="title"
                                        >


                                        </Typography>
                                        <div className="content">
                                            <Typography
                                                variant="body1"
                                                className="from-title"
                                            ></Typography>
                                            <Typography
                                                variant="h5"
                                                className="price-title"
                                            ></Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div

                                        className="item-destination item-destination-small"
                                        style={{
                                            background:
                                                "linear-gradient(0deg, rgba(44, 43, 44, 0.3), rgba(44, 43, 44, 0.3)), "

                                        }}
                                    >
                                        <img
                                            src="https://hdproland.com/media/posts/dien-tich-cac-quan-tai-ho-chi-minh-1.jpg"
                                            loading="lazy"
                                            style={{
                                                borderBottomLeftRadius: 18,
                                                borderBottomRightRadius: 18,
                                                borderTopLeftRadius: 18,
                                                borderTopRightRadius: 18,
                                                display: 'block',
                                                width: '100%',
                                                height: '100%'
                                            }}
                                        />
                                        <Typography
                                            variant="h5"
                                            className="title"
                                        >

                                        </Typography>
                                        <div className="content">
                                            <Typography
                                                variant="body1"
                                                className="from-title"
                                            ></Typography>
                                            <Typography
                                                variant="h5"
                                                className="price-title"
                                            ></Typography>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default FavouriteDestination;
