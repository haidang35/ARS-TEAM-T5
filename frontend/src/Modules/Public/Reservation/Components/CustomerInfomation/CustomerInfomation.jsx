import { Typography } from "@mui/material";
import React, { Component } from "react";
import "./CustomerInfomation.scss";


export class CustomerInfomation extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }
    render() {
        
        return (
            <>
                <div>
                    <div className="customer-info">
                        <div className="title-box">
                            <Typography variant="h4" className="title">
                                Customer information
                            </Typography>
                        </div>
                        <div className="content">
                            <div className="list-sub-title">
                                <div className="row">
                                    <div className="col-md-2">
                                        <Typography
                                            variant="h6"
                                            className="sub-title"
                                        >
                                            Passenger
                                        </Typography>
                                    </div>
                                    <div className="col-md-2">
                                        <Typography
                                            variant="h6"
                                            className="sub-title"
                                        >
                                            Genger
                                        </Typography>
                                    </div>
                                    <div className="col-md-3">
                                        <Typography
                                            variant="h6"
                                            className="sub-title"
                                        >
                                            Full name
                                        </Typography>
                                    </div>
                                    <div className="col-md-3">
                                        <Typography
                                            variant="h6"
                                            className="sub-title"
                                        >
                                            Birthday
                                        </Typography>
                                    </div>
                                    <div className="col-md-2">
                                        <Typography
                                            variant="h6"
                                            className="sub-title"
                                        >
                                            Identity number
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <div className="list-sub-content">
                                <div className="sub-content">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <Typography
                                                variant="body1"
                                                className="sub-content-title"
                                            >
                                                Adult
                                            </Typography>
                                        </div>
                                        <div className="col-md-2">
                                            <select
                                                name="gender"
                                                required
                                                className="form-control form-select"

                                            >
                                                <option value={"Nam"}>
                                                    Male
                                                </option>
                                                <option value={"Nữ"}>
                                                    Female
                                                </option>
                                            </select>
                                        </div>
                                        <div className="col-md-3">
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                className="form-control "

                                            />

                                        </div>
                                        <div className="col-md-3">
                                            <input
                                                type="date"
                                                name="birthday"
                                                required
                                                className="form-control"

                                            />

                                        </div>
                                        <div className="col-md-2">
                                            <input
                                                type="text"
                                                name="identity_card"
                                                required
                                                className="form-control"

                                            />

                                        </div>
                                    </div>
                                    <div className="baggage-info">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <Typography
                                                    variant="body1"
                                                    className="sub-content-title"
                                                >
                                                    Baggage
                                                </Typography>
                                            </div>
                                            <div className="col-md-10">
                                                <select
                                                    name="checking-bag"
                                                    className="form-control form-select"

                                                >
                                                    
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="sub-content">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <Typography
                                                variant="body1"
                                                className="sub-content-title"
                                            >
                                                Children
                                            </Typography>
                                        </div>
                                        <div className="col-md-2">
                                            <select
                                                name="gender"
                                                required
                                                className="form-control form-select"

                                            >
                                                <option value={"Nam"}>
                                                    Male
                                                </option>
                                                <option value={"Nữ"}>
                                                    Female
                                                </option>
                                            </select>
                                        </div>
                                        <div className="col-md-3">
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                className="form-control "

                                            />

                                        </div>
                                        <div className="col-md-3">
                                            <input
                                                type="date"
                                                name="birthday"
                                                required
                                                className="form-control"

                                            />

                                        </div>
                                    </div>
                                    <div className="baggage-info">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <Typography
                                                    variant="body1"
                                                    className="sub-content-title"
                                                >
                                                    Baggage
                                                </Typography>
                                            </div>
                                            <div className="col-md-10">
                                                <select
                                                    name="checking-bag"
                                                    className="form-control form-select"
                                                >

                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                                {/* <div className="sub-content">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <Typography
                                                variant="body1"
                                                className="sub-content-title"
                                            >
                                                Infant
                                            </Typography>
                                        </div>
                                        <div className="col-md-2">
                                            <select
                                                name="gender"
                                                required
                                                className="form-control form-select"
                                               
                                            >
                                                <option value={"Nam"}>
                                                    Male
                                                </option>
                                                <option value={"Nữ"}>
                                                    Female
                                                </option>
                                            </select>
                                        </div>
                                        <div className="col-md-3">
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                className="form-control "

                                            />
                                           
                                            
                                        </div>
                                        <div className="col-md-3">
                                            <input
                                                type="date"
                                                name="birthday"
                                                required
                                                className="form-control"
                                               
                                            />
                                            
                                        </div>
                                    </div>
                                    <div className="baggage-info">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <Typography
                                                    variant="body1"
                                                    className="sub-content-title"
                                                >
                                                    Baggage
                                                </Typography>
                                            </div>
                                            <div className="col-md-10">
                                                <select
                                                    name="checking-bag"
                                                    className="form-control form-select"
                                                >
                                                    
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}