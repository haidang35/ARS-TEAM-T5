import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import React, { Component } from "react";
import Navbar from "../../../Shared/Components/Navbar/Navbar";
import "./Header.scss";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Search from "@mui/icons-material/Search";
import { Footer } from "../../../Shared/Footer/Footer";
import { FlightSearch } from "../FlightSearch/FlightSearch";


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
                                <div className="col-md-6">
                                    <FlightSearch />
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