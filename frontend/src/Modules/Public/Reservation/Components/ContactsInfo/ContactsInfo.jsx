import { FormGroup, Typography } from "@mui/material";
import React, { Component } from "react";
import "./ContactsInfo.scss";

export class ContactsInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <>
                <div>
                    <div className="contact-info">
                        <div className="title-box">
                            <Typography variant="h4" className="title">
                                Contact info
                            </Typography>
                        </div>
                        <div className="content">
                            <div className="row">
                                <div className="col-sm-4">
                                    <label className="label-info">
                                        Vocative{" "}
                                        <span className="required-label">*</span>
                                    </label>
                                    <select
                                        name="vocative"
                                        required
                                        className="form-control form-select"
                                    >
                                        <option value={"Anh"}>Anh</option>
                                        <option value={"Chị"}>Chị</option>
                                        <option value={"Quý ông"}>Quý ông</option>
                                        <option value={"Quý bà"}>Quý bà</option>
                                    </select>
                                </div>
                                <div className="col-sm-4">
                                    <label className="label-info">
                                        Full name{" "}
                                        <span className="required-label">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        name="nameContact"
                                        className="form-control"
                                        placeholder="Full name"

                                    />
                                </div>
                                <div className="col-sm-4">
                                    <label className="label-info">
                                        Phone number{" "}
                                        <span className="required-label">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        name="phone"
                                        className="form-control"
                                        placeholder="Phone number"

                                    />

                                </div>
                                <div className="col-sm-4">
                                    <FormGroup style={{ marginTop: "0.7rem" }}>
                                        <label className="label-info">
                                            Email{" "}
                                            <span className="required-label">
                                                *
                                            </span>
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            className="form-control"
                                            placeholder="Email"

                                        />

                                    </FormGroup>
                                </div>
                                <div className="col-sm-4">
                                    <FormGroup style={{ marginTop: "0.7rem" }}>
                                        <label className="label-info">
                                            Address{" "}
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Address"
                                            name="address"

                                        />
                                    </FormGroup>
                                </div>
                                <div className="col-sm-4">
                                    <FormGroup style={{ marginTop: "0.7rem" }}>
                                        <label className="label-info">Note </label>
                                        <textarea
                                            type="text"
                                            name="note"
                                            className="form-control"
                                            placeholder="Note"

                                        ></textarea>
                                    </FormGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}