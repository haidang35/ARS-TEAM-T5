import { Typography } from "@mui/material";
import React, { Component } from "react";
import "./SupportInfo.scss";

export class SupportInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <>
                <div className="support-info">
                    <div className="wrap-container">
                        {/* <Typography variant="h4" className="title">
                            Support
                        </Typography> */}
                        <div className="row">
                            <div className="col-md-4">
                                <div className="support-item">
                                    <div className="img-box">
                                        <img
                                            src="https://i.pinimg.com/564x/55/78/56/557856c09654bab7ad0c092d62d402a5.jpg"


                                            className="img-support"
                                        />
                                    </div>

                                    <div className="content">
                                        <Typography variant="h6">
                                            Ready when you are
                                        </Typography>
                                        <Typography variant="body1">
                                            See where you can travel to right
                                            now and find the best deals across
                                            thousands of flights, hotels and car
                                            hire options
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="support-item">
                                    <div className="img-box">
                                        <img
                                            src="https://i.pinimg.com/564x/a2/67/52/a267525c4b53e0ac620103106cf08ae1.jpg"


                                            className="img-support img-support-2"
                                        />
                                    </div>

                                    <div className="content">
                                        <Typography variant="h6">
                                            Plan with confidence
                                        </Typography>
                                        <Typography variant="body1">
                                            Stay one step ahead with flexible
                                            flight tickets, free hotel and car
                                            cancellation and the cleanest rooms
                                            around.
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="support-item">
                                    <div className="img-box">
                                        <img
                                            src="https://i.pinimg.com/564x/10/67/e6/1067e6ac6fbba242fc5c14e2b0a54ba4.jpg"

                                            className="img-support img-support-3"
                                        />
                                    </div>

                                    <div className="content">
                                        <Typography variant="h6">
                                            Keep it simple
                                        </Typography>
                                        <Typography variant="body1">
                                            No hidden fees. No hidden charges.
                                            No funny business. With us, you’ll
                                            always know exactly where your money
                                            goes. So you can relax before your
                                            trip even begins.
                                        </Typography>
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