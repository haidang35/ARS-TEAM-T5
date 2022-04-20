import * as React from 'react';
import { FormGroup, Typography } from "@mui/material";
import "./ContactsInfo.scss";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


const currencies = [
    {
        value: 'USD',
        label: 'Qúy Ông',
    },
    {
        value: 'EUR',
        label: 'Qúy Bà',
    },
    {
        value: 'BTC',
        label: 'Anh',
    },
    {
        value: 'JPY',
        label: 'Chị',
    },
];

export default function ContactsInfo() {
    const [currency, setCurrency] = React.useState('EUR');

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };
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

                                <div>
                                    <FormGroup style={{ marginTop: "0.7rem" }}>
                                        <TextField
                                            className='vocatives'
                                            id="outlined-select-currency"
                                            select
                                            label="Vocatives"
                                            value={currency}
                                            onChange={handleChange}
                                        >
                                            {currencies.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </FormGroup>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <FormGroup style={{ marginTop: "0.7rem" }}>
                                    <TextField
                                        id="outlined-name"
                                        label="Full Name"
                                        required
                                        className="outlined-fullname"
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-sm-4">
                                <FormGroup style={{ marginTop: "0.7rem" }}>
                                    <TextField
                                        id="outlined-name"
                                        label="Phone Number"
                                        required
                                        className="outlined-phonenumber"
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-sm-4">
                                <FormGroup style={{ marginTop: "0.7rem" }}>
                                    <TextField
                                        id="outlined-email"
                                        label="Email"
                                        required
                                        className="outlined-email"
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-sm-4">
                                <FormGroup style={{ marginTop: "0.7rem" }}>
                                    <TextField
                                        id="outlined-address"
                                        label="Address"
                                        required
                                        className="outlined-address"
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-sm-4">
                                <FormGroup style={{ marginTop: "0.7rem" }}>
                                    <textarea
                                        type="text"
                                        name="note"
                                        className="form-control"
                                        placeholder="Note"
                                    >

                                    </textarea>
                                </FormGroup>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
