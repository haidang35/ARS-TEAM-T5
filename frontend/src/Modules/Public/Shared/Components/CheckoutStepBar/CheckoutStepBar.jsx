import { Button, Typography } from "@mui/material";
import React from "react";
import { Component } from "react";
import { formatCurrencyToVND } from "../../../../../Helpers/currency";
import "./CheckoutStepBar.scss";    
class CheckoutStepBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { totalMoney, step } = this.props;
        return (
            <div>
                <div className="checkout-step-bar">
                    <div className="wrap-container">
                        <div className="row">
                            <div className="col-md-3">
                                <Button
                                    className="btn-back"
                                    variant="contained"
                                    color="inherit"
                                >
                                    Go back
                                </Button>
                            </div>
                            {totalMoney > 0 ? (
                                <div className="col-md-6">
                                    <div className="booking-price-total">
                                        <Typography
                                            className="price-total"
                                            variant="h6"
                                        >
                                            {formatCurrencyToVND(totalMoney)}
                                        </Typography>
                                        <Typography
                                            className="price-info"
                                            variant="body1"
                                        >
                                            Taxes, fees and surcharges are
                                            included
                                        </Typography>
                                    </div>
                                </div>
                            ) : (
                                <div className="col-md-6"></div>
                            )}

                            <div className="col-md-3">
                                <Button
                                    onClick={() => this.props.onContinue()}
                                    className="btn-continue"
                                    variant="contained"
                                    color="inherit"
                                >
                                    Continue
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default CheckoutStepBar;
