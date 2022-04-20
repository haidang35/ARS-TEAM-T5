import { Typography } from "@mui/material";
import React, { Component } from "react";
import "./ContactInfomation.scss";

export class ContactsInfomation extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <>
                <div>
                    <div className="contact-info-booking">
                        <div className="title-box">
                            <Typography variant="h6" className="title">
                                Contact information
                            </Typography>
                        </div>
                        <div className="content">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="item-contact">
                                        <Typography
                                            variant="h6"
                                            className="title-item"
                                        >
                                            Full name:
                                        </Typography>
                                        <Typography className="content-item">
                                            name
                                        </Typography>
                                    </div>

                                    <div className="item-contact">
                                        <Typography
                                            variant="h6"
                                            className="title-item"
                                        >
                                            Phone number:
                                        </Typography>
                                        <Typography className="content-item">
                                        03888999JQK
                                        </Typography>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="item-contact">
                                        <Typography
                                            variant="h6"
                                            className="title-item"
                                        >
                                            Email:
                                        </Typography>
                                        <Typography className="content-item">
                                            ARS@gmail.com
                                        </Typography>
                                    </div>
                                    <div className="item-contact">
                                        <Typography
                                            variant="h6"
                                            className="title-item"
                                        >
                                            Special requirements :
                                        </Typography>
                                        <Typography className="content-item">
                                          123
                                        </Typography>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="item-contact">
                                        <Typography
                                            variant="h6"
                                            className="title-item"
                                        >
                                            Address
                                        </Typography>
                                        <Typography className="content-item">
                                           HA NOI
                                        </Typography>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="item-contact">
                                        <Typography
                                            variant="h6"
                                            className="title-item"
                                        >
                                            Payment method
                                        </Typography>
                                        <Typography className="content-item">
                                        Payment at the agent
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