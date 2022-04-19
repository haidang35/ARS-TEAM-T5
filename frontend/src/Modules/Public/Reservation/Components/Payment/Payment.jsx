import { Typography , Button } from "@mui/material";
import React, { Component } from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import "./Payment.scss";


export class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <>
                <div >
                    <div className="payment-method">
                        <div className="title-box">
                            <Typography variant="h4" className="title">
                                Payment methods
                            </Typography>
                        </div>
                        <div className="content">
                            <div
                            >
                                <CheckCircleOutlineIcon className="icon-check" />
                                <Typography className="title" variant="h5">
                                    Pay at the office
                                </Typography>
                            </div>
                            <div
                            >
                                <CheckCircleOutlineIcon className="icon-check" />
                                <Typography className="title" variant="h5">
                                    Free reservation and payment via bank transfer
                                </Typography>
                            </div>
                            <div
                            >
                                <CheckCircleOutlineIcon className="icon-check" />
                                <Typography
                                    className="title"
                                    variant="h5"
                                    style={{ marginRight: "2rem" }}
                                >
                                    International Paypal online payment gateway{" "}
                                </Typography>
                            </div>
                        </div>
                        <div className="btn-box">
                            <Button
                                variant="outlined"
                                color="primary"
                            >
                                Back
                            </Button>

                            <Button
                                className="btn-reser"
                                variant="outlined"
                                color="primary"
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}