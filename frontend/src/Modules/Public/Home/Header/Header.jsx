import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import React, { Component } from "react";
import Navbar from "../../Shared/Components/Navbar/Navbar";
import "./Header.scss";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Search from "@mui/icons-material/Search";
import { Footer } from "../../Shared/Footer/Footer";


export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tripType: 1,
            adults: 1,
            children: 0,
            infants: 0,
        }
    }

    handleChangeTripType = (ev) => {
        this.setState({
            tripType: ev.target.value,
        });
    };

    render() {
        return (
            <>
                <div className="home-header">
                <Navbar />
                    <div className="wrap-container">
                        <div className="header-content">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="header-left">
                                        <Typography variant="h1" className="title">
                                            WHERE WOULD YOU LIKE TO GO ?
                                        </Typography>
                                        <div className="formcheck">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="checkedB"
                                                        color="primary"
                                                        className="check-box"
                                                        checked={
                                                            this.state.tripType == 1
                                                                ? true
                                                                : false
                                                        }
                                                        alue={1}
                                                        onChange={
                                                            this
                                                                .handleChangeTripType
                                                        }
                                                    />
                                                }
                                                label="Round trip"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="checkedB"
                                                        color="primary"
                                                        className="check-box"
                                                        checked={
                                                            this.state.tripType == 1
                                                                ? true
                                                                : false
                                                        }
                                                        alue={1}
                                                        onChange={
                                                            this
                                                                .handleChangeTripType
                                                        }
                                                    />
                                                }
                                                label="Round trip"
                                            />
                                            <Stack component="form" noValidate spacing={3} className="datetime">
                                                <TextField
                                                    id="date"
                                                    label="Date"
                                                    type="date"
                                                    defaultValue="2022-04-11"
                                                    sx={{ width: 220 }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Stack>
                                            <div className="passenger-type">
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <div className="choose-quantity">
                                                            <label className="title-passenger">
                                                                Adults
                                                            </label>
                                                            <div className="content">
                                                                <RemoveCircleOutline
                                                                    onClick={() =>
                                                                        this.changeQuantityPassenger(
                                                                            1,
                                                                            0
                                                                        )
                                                                    }
                                                                    className="icon"
                                                                />
                                                                <span className="quantity">
                                                                    {
                                                                        this.state
                                                                            .adults
                                                                    }
                                                                </span>
                                                                <AddCircleOutline
                                                                    onClick={() =>
                                                                        this.changeQuantityPassenger(
                                                                            1,
                                                                            1
                                                                        )
                                                                    }
                                                                    className="icon"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="choose-quantity">
                                                            <label className="title-passenger">
                                                                Children
                                                            </label>
                                                            <div className="content">
                                                                <RemoveCircleOutline
                                                                    onClick={() =>
                                                                        this.changeQuantityPassenger(
                                                                            2,
                                                                            0
                                                                        )
                                                                    }
                                                                    className="icon"
                                                                />
                                                                <span className="quantity">
                                                                    {
                                                                        this.state
                                                                            .children
                                                                    }
                                                                </span>
                                                                <AddCircleOutline
                                                                    onClick={() =>
                                                                        this.changeQuantityPassenger(
                                                                            2,
                                                                            1
                                                                        )
                                                                    }
                                                                    className="icon"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="choose-quantity">
                                                            <label className="title-passenger">
                                                                Infants
                                                            </label>
                                                            <div className="content">
                                                                <RemoveCircleOutline
                                                                    onClick={() =>
                                                                        this.changeQuantityPassenger(
                                                                            3,
                                                                            0
                                                                        )
                                                                    }
                                                                    className="icon"
                                                                />
                                                                <span className="quantity">
                                                                    {
                                                                        this.state
                                                                            .infants
                                                                    }
                                                                </span>
                                                                <AddCircleOutline
                                                                    onClick={() =>
                                                                        this.changeQuantityPassenger(
                                                                            3,
                                                                            1
                                                                        )
                                                                    }
                                                                    className="icon"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="search">
                                                        <Button
                                                            variant="contained"
                                                            className="btn-search-form"
                                                            startIcon={<Search />}
                                                        >
                                                            Search flights
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <Footer />

            </>
        )
    }
}