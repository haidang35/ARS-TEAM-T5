import { Button } from "@mui/material";
import React, { Component } from "react";
import Form from "../../../../../Shared/Components/Form";
import TextField from '@mui/material/TextField';
import "./CustomerProfile.scss";
import { ErrorForm } from "../../../../../Shared/Components/ErrorMessage";
import { REGEX_TEL } from "../../../../../Configs/validation";


export class CustomerProfile extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                fullName: "",
                email: "",
                phone: "",
            }),
            onEdit: false,
        }
    }



    onEditInfo = () => {
        this.setState({
            onEdit: true,
        })
    }


    onCancelEdit = () => {
        this.setState({
            onEdit: false,
        });

    }

    render() {
        const { fullName, email, phone } = this.state.form;
        const { onEdit } = this.state;
        return (
            <>
                <div id="customer-info">
                    <div className="card">
                        <div className="card-header">
                            <div className="float-right">
                                {!onEdit ? (
                                    <button
                                        onClick={this.onEditInfo}
                                        className="btn btn-primary"
                                    >
                                        Edit info
                                    </button>
                                ) : (
                                    ""
                                )}
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
                                                    <TextField
                                                        id="outlined-basic"
                                                        disabled={!onEdit}
                                                        label="Full Name"
                                                        required
                                                        variant="outlined"
                                                        value={fullName.value}
                                                        onChange={(ev) => {
                                                            this._setValue(
                                                                ev,
                                                                "fullName"
                                                            )
                                                        }}
                                                    />

                                                    <div className="form-control-icon">
                                                        <i className="bi bi-person" />
                                                    </div>
                                                    {fullName.message == "*" ? (
                                                        <ErrorForm
                                                            err={
                                                                "Họ và tên không được để trống"
                                                            }
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="position-relative">
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Email"
                                                    required
                                                    disabled={!onEdit}
                                                    variant="outlined"
                                                    value={email.value}
                                                    onChange={(ev) => {
                                                        this._setValue(
                                                            ev,
                                                            "email"
                                                        )
                                                    }}
                                                />
                                                <div className="form-control-icon">
                                                    <i className="bi bi-phone" />
                                                </div>
                                                {email.message == "*" ? (
                                                    <ErrorForm
                                                        err={
                                                            "email không được để trống"
                                                        }
                                                    />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div
                                                className="form-group has-icon-left"
                                                style={{ marginLeft: "0" }}
                                            >
                                                <div className="position-relative">
                                                    <TextField
                                                        id="outlined-basic"
                                                        disabled={!onEdit}
                                                        pattern={REGEX_TEL}
                                                        required
                                                        label="Phone Number"
                                                        variant="outlined"
                                                        value={phone.value}
                                                        onChange={(ev) => {
                                                            this._setValue(
                                                                ev,
                                                                "Phone Number"
                                                            )
                                                        }}
                                                    />


                                                    <div className="form-control-icon">
                                                        <i className="bi bi-phone" />
                                                    </div>
                                                    {phone.message == "*" ? (
                                                        <ErrorForm
                                                            err={
                                                                "sdt không được để trống"
                                                            }
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-md-12"></div>
                                        {onEdit ? (
                                            <div className="col-md-12 d-flex justify-content-end">
                                                <Button variant="contained" color="success">
                                                    Submit
                                                </Button>
                                                <Button variant="outlined" color="error" onClick={this.onCancelEdit}>
                                                    Cancel
                                                </Button>
                                            </div>
                                        ) : (
                                            ""
                                        )}
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