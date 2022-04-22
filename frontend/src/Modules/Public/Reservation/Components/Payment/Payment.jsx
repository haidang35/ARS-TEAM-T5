import { Typography, Button } from "@mui/material";
import React, { Component } from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import "./Payment.scss";


export class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentMethods: [
                {
                    id: 1,
                    name: 'Pay at the office'
                },
                {
                    id: 2,
                    name: 'Free reservation and payment via bank transfer'
                },
                {
                    id: 3,
                    name: 'International Paypal online payment gateway'
                },
            ],
            choosedPaymentMethod: ''
        }
    }

    handlePaymentMethod = (paymentMethod) => {
        this.setState({
            choosedPaymentMethod: paymentMethod
        })
    }

    onContinue = () => {
        this.props.onContinute(this.state.choosedPaymentMethod);
    }
    render() {
        const { paymentMethods, choosedPaymentMethod } = this.state;
        console.log('payment', choosedPaymentMethod);
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
                            {
                                paymentMethods.map((method, index) => <div key={index}
                                    onClick={() => this.handlePaymentMethod(method)}
                                >
                                    <CheckCircleOutlineIcon className="icon-check" style={{
                                        color: choosedPaymentMethod.id === method.id ? 'green' : ''
                                    }} />
                                    <Typography className="title" variant="h5">
                                        {method.name}
                                    </Typography>
                                </div>)
                            }


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
                                onClick={this.onContinue}
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