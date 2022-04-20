import { MenuItem, TextField, Typography } from "@mui/material";
import React, { Component } from "react";
import "./CustomerInfomation.scss";


const genger = [
    {
        value: 'USD',
        label: 'Male',
    },
    {
        value: 'EUR',
        label: 'Female',
    },

];

export default function CustomerInfomation() {
    const [currency, setCurrency] = React.useState('EUR');

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

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
                                        <TextField
                                            className="genger"
                                            id="outlined-select-currency"
                                            select
                                            label="Select"
                                            value={currency}
                                            onChange={handleChange}
                                        >
                                            {genger.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                    <div className="col-md-3">
                                        <TextField
                                            id="outlined-name"
                                            label="Full Name"
                                            required
                                            className="outlined-fullname"
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
                                        <TextField
                                            id="Identity number"
                                            label="Identity number"
                                            required
                                            className="identity-number"
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
                                                className=" form-select"

                                            >

                                            </select>
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
