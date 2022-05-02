import { Typography } from "@mui/material";
import React, { Component } from "react";
import "./FlightDetailsTicket.scss";

export class FlightDetailsTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <>
                <div className="flight-booking-detail">
                    <div className="title-box">
                        <Typography variant="h6" className="title">
                            Flight details
                        </Typography>
                    </div>
                    <div className="content">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="logo-box">
                                    <img
                                        className="logo"
                                        src="https://static.wixstatic.com/media/9d8ed5_b328a87c44a04887ab0d35ef93991f16~mv2.png/v1/fill/w_1000,h_626,al_c,usm_0.66_1.00_0.01/9d8ed5_b328a87c44a04887ab0d35ef93991f16~mv2.png"
                                    />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="list-info">
                                    <Typography className="info-item">
                                  
                                    </Typography>
                                    <Typography className="info-item">
                                        Airport Nội Bài
                                    </Typography>
                                    <Typography className="info-item">
                                        Depart 00:00
                                    </Typography>
                                    <Typography className="info-item">
                                        Date 21-04-2022
                                    </Typography>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="list-info">
                                    <Typography className="info-item">
                                        Hồ Chí Minh (SGN)
                                    </Typography>
                                    <Typography className="info-item">
                                        Airport Tân Sơn Nhất
                                    </Typography>
                                    <Typography className="info-item">
                                        Arrival 00:00
                                    </Typography>
                                    <Typography className="info-item">
                                        Date 22-04-2022
                                    </Typography>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="list-info">
                                    <Typography className="info-item">
                                        Flight: 18
                                    </Typography>
                                    <Typography className="info-item">
                                        Class: Business
                                    </Typography>
                                    <Typography className="info-item">
                                        Ticket type: 100
                                    </Typography>
                                    <Typography className="info-item">
                                    Aircraft VNA
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}