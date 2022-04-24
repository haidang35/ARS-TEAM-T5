import { Typography } from "@mui/material";
import React, { Component } from "react";
import "./PaymentNoticeBox.scss";

export class PaymentNoticeBox extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <>
                <div className="payment-notice-box">
                    <div className="title-box">
                        <Typography variant="h6" className="title">
                            Payment via bank transfer
                        </Typography>
                    </div>
                    <div className="content">
                        <div className="payment-info-list">
                            <div className="info-item">
                                <div className="row">
                                    <div className="col-md-2">
                                        <div className="img-box">
                                            <img src="https://www.bidv.com.vn/wps/wcm/connect/05f0d2ae-68c1-4cef-a7d6-2c54e81c6585/1/c.jpg?MOD=AJPERES&CVID=" />
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="info">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <Typography variant="h6">
                                                        Ngân hàng Đầu tư và phát
                                                        triển BIDV
                                                    </Typography>
                                                </div>
                                                <div className="col-md-6">
                                                    <Typography variant="h6">
                                                        Agency Hà Nội
                                                    </Typography>
                                                </div>
                                                <div className="col-md-6">
                                                    <Typography variant="h6">
                                                        Account holder :
                                                        Flight T5 Company
                                                    </Typography>
                                                </div>
                                                <div className="col-md-6">
                                                    <Typography variant="h6">
                                                        Account number:
                                                        1377555666888
                                                    </Typography>
                                                </div>
                                                <div className="col-md-12">
                                                    <Typography variant="h6">
                                                        {` Nội dung chuyển khoản:`}
                                                        <span
                                                            style={{
                                                                fontStyle:
                                                                    "italic",
                                                            }}
                                                        >
                                                            {" "}
                                                            {`"
                                                        Chuyển khoản
                                                        "`}
                                                        </span>
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

            </>
        )
    }
}