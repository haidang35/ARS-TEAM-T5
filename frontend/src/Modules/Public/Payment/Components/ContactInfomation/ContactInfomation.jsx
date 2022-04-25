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
        const { bookingData } = this.props;
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
                                            { bookingData && bookingData.ContactName }
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
                                        { bookingData && bookingData.ContactPhone }

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
                                        { bookingData && bookingData.ContactEmail }

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
                                        { bookingData && bookingData.Note || 'None'}

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
                                        { bookingData && bookingData.ContactAddress }

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