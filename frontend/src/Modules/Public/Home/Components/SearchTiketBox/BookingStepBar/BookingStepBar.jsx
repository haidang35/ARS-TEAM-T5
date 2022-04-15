import React, { Component } from "react";
import { Typography } from "@mui/material";
import "./BookingStepBar.scss";


export class BookingStepBar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { step } = this.props;
        return(

        <>
            <div id="booking-step-bar">
                <div className="step-list">
                    <div className="row">
                        <div className="col-md-3">
                            <div
                                className={
                                    step == 1 ||
                                        step == 2 ||
                                        step == 3 ||
                                        step == 4
                                        ? "step-item "
                                        : "step-item step-unactive"
                                }
                            >
                                <span className="step-number">1</span>
                                <Typography className="title">
                                    {" "}
                                    Select flight
                                </Typography>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div
                                className={
                                    step == 2 || step == 3 || step == 4
                                        ? "step-item next-step "
                                        : "next-step step-item step-unactive"
                                }
                            >
                                <span className="step-number">2</span>
                                <Typography className="title">
                                    {" "}
                                    Reservation
                                </Typography>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div
                                className={
                                    step == 3 || step == 4
                                        ? "step-item next-step "
                                        : "next-step step-item step-unactive"
                                }
                            >
                                <span className="step-number">3</span>
                                <Typography className="title">
                                    {" "}
                                    Bonus Services
                                </Typography>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div
                                className={
                                    step == 4
                                        ? "step-item next-step "
                                        : "next-step step-item step-unactive"
                                }
                            >
                                <span className="step-number">4</span>
                                <Typography className="title">
                                    {" "}
                                    Payment
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
