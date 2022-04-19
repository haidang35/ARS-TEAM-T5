import { Typography } from "@mui/material";
import React, { Component } from "react";
import "./TicketPriceDetails.scss";
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import AlarmIcon from '@mui/icons-material/Alarm';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';



export class TicketPriceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <>
                <div className="price-details">
                    <div className="ticket-details">
                        <div className="title-box">
                            <Typography variant="h4" className="title">
                                Chi tiết giá vé
                            </Typography>
                        </div>
                        <div className="content">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="flight-time">
                                        <Typography
                                            variant="body1"
                                            className="destination"

                                        >
                                            Hà nội

                                        </Typography>
                                        <ArrowRightAltIcon className="icon-arrow" />
                                        <Typography
                                            variant="body1"
                                            className="destination"
                                        >
                                            Hồ Chí Minh
                                        </Typography>
                                    </div>
                                    <div className="flight-time">
                                        <AlarmIcon className="icon-clock" />
                                        <Typography
                                            variant="body1"
                                            className="time"
                                        >
                                            00:00 21-04-2022
                                        </Typography>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="logo-airline">
                                        < LocalAirportIcon />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="ticket-price">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Typography
                                                    variant="h6"
                                                    className="title left-title"
                                                >
                                                    giá vé <br />
                                                        Người lớn 
                                                        1 x 200 ₫
                                                </Typography>
                                            </div>
                                            <div className="col-md-6">
                                                <Typography
                                                    variant="h6"
                                                    className="title total-title"
                                                >
                                                    Tổng
                                                </Typography>
                                            </div>
                                            <div className="passenger-list-price">
                                                <div

                                                    className="row"
                                                >
                                                    
                                                    <div className="col-sm-4">
                                                        <Typography
                                                            variant="body1"
                                                            className="content-line"
                                                        >
                                                           

                                                        </Typography>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <Typography
                                                            variant="body1"
                                                            className="content-line"
                                                        >

                                                        </Typography>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <Typography
                                                            variant="body1"
                                                            className="content-line right"
                                                        >

                                                        </Typography>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <Typography
                                                            variant="h4"
                                                            className="total-price"
                                                        >
                                                            Tổng chi phí
                                                        </Typography>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <Typography
                                                            variant="h4"
                                                            className="total-price right"
                                                        >
                                                            200 VND
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}