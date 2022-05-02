import React from "react";
import { FormGroup, Typography } from "@mui/material";
import "./ContactsInfo.scss";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Form from '../../../../../Shared/Components/Form';
import { ErrorForm } from "../../../../../Shared/Components/ErrorMessage";
import { REGEX_TEL } from "../../../../../Configs/validation";



export class ContactsInfo extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                nameContact: "",
                vocative: "Anh",
                phone: "",
                email: "",
                address: "",
                note: "",
            }),

        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.isContinue) {
            this.onReservation();
        }
    };

    onReservation = () => {
        this._validateForm();
        if (this._isFormValid()) {
            const { form } = this.state;
            let convertPhone = form.phone.value;
            convertPhone = `+84${convertPhone.substring(1)}`
            const data = {
                contactName: form.nameContact.value,
                phone: convertPhone,
                email: form.email.value,
                vocative: form.vocative.value,
                address: form.address.value,
                note: form.note.value,
            };
            this.props.handleContactInfo(data);
        }
    };


    render() {
        const { nameContact, vocative, phone, email, address, note, dirty } = this.state.form;
        return (
            <>
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
                                    value={vocative.value}
                                    className="form-control form-select"
                                    onChange={(ev) =>
                                        this._setValue(ev, "vocative")
                                    }
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
                                    value={nameContact.value}
                                    onChange={(ev) =>
                                        this._setValue(ev, "nameContact")
                                    }
                                />
                                {nameContact.err == "*" && dirty ? (
                                    <ErrorForm message="Full name cannot be empty" />
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="col-sm-4">
                                <label className="label-info">
                                    Phone number{" "}
                                    <span className="required-label">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    pattern={REGEX_TEL}
                                    name="phone"
                                    className="form-control"
                                    placeholder="Phone number"
                                    value={phone.value}
                                    onChange={(ev) =>
                                        this._setValue(ev, "phone")
                                    }
                                />
                                {phone.err == "*" && dirty ? (
                                    <ErrorForm message="Phone number cannot be empty" />
                                ) : phone.err.length > 0 && dirty ? (
                                    <ErrorForm message="Incorrect phone number " />
                                ) : (
                                    ""
                                )}
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
                                        value={email.value}
                                        onChange={(ev) =>
                                            this._setValue(ev, "email")
                                        }
                                    />
                                    {email.err == "*" && dirty ? (
                                        <ErrorForm message="Email cannot be empty" />
                                    ) : email.err.length > 0 && dirty ? (
                                        <ErrorForm message="Wrong email format " />
                                    ) : (
                                        ""
                                    )}
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
                                        value={address.value}
                                        onChange={(ev) =>
                                            this._setValue(ev, "address")
                                        }
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
                                        value={note.value}
                                        onChange={(ev) =>
                                            this._setValue(ev, "note")
                                        }
                                    ></textarea>
                                </FormGroup>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
