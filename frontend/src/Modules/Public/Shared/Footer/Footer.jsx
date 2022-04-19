import { Typography } from "@mui/material";
import React, { Component } from "react";
import "./Footer.scss";

export class Footer extends Component {
    constructor(props){
        super(props);
        this.state ={

        }
    }
    render(){
        return(
            <>
             <div className="footer-user">
                    <div className="wrap-container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="logo-box">
                                    <Typography className="title" variant="h4">
                                        Flight T5
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        className="content "
                                    >
                                        We always cooperate with you.
                                    </Typography>
                                    <Typography
                                        className="contact"
                                        variant="h6"
                                    >
                                        Hotline 19001600
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="copyright-box">
                                <Typography
                                    className="content-1"
                                    variant="body1"
                                >
                                    @FlightT5 2022
                                </Typography>
                                <Typography
                                    className="content-2"
                                    variant="body1"
                                >
                                    Developed by TEAM T5 T2009M APTECH
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}