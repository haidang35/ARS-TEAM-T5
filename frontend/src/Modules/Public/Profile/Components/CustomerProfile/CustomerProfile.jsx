import { Button } from "@mui/material";
import React, { Component } from "react";
import Form from "../../../../../Shared/Components/Form";
import TextField from '@mui/material/TextField';
import "./CustomerProfile.scss";


export class CustomerProfile extends Form {
    constructor(props) {
        super(props);
        this.state = {
           


        }
    }

    render() {
        return (
            <>
                <div id="customer-info">
                    <div className="card">
                        <div className="card-header">
                            <div className="float-right">
                                <Button variant="contained">Edit Infor</Button>
                            </div>
                            <h4 className="card-title">Customer's Info</h4>
                        </div>
                        <div className="card-content">
                            <div className="card-body">
                                <div className="form-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div
                                                className="form-group has-icon-left"
                                                style={{ marginLeft: "0" }}
                                            >
                                                <div className="position-relative">
                                                    <TextField id="outlined-basic" label="Full Name" variant="outlined" />
                                                    <div className="form-control-icon">
                                                        <i className="bi bi-person" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="position-relative">
                                                <TextField id="outlined-basic" label="Email" variant="outlined" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div
                                                className="form-group has-icon-left"
                                                style={{ marginLeft: "0" }}
                                            >
                                                <div className="position-relative">
                                                    <TextField id="outlined-basic" label="Phone Number" variant="outlined" />

                                                    <div className="form-control-icon">
                                                        <i className="bi bi-phone" />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-md-12"></div>
                                        <div className="col-md-12 d-flex justify-content-end">
                                            <Button variant="contained" color="success">
                                                Submit
                                            </Button>
                                            <Button variant="outlined" color="error">
                                                Cancel
                                            </Button>
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