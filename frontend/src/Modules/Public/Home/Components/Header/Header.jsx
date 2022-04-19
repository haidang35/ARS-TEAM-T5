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

        const videoBackgroundHome = document.getElementById("videoBackgroundHome");
        if (videoBackgroundHome !== null) {
            videoBackgroundHome.muted = true;
        }
        return (
            <>
                <div id="home-header">
                    <div
                        style={{
                            width: "100%",
                            height: 0,
                            position: "relative",
                            paddingBottom: "56.250%"
                        }}
                        className="background-video-box"
                    >
                        <iframe
                            id="videoBackgroundHome"
                            src="https://streamable.com/e/bqjlrb?autoplay=1&nocontrols=1"
                            frameBorder={0}
                            width="100%"
                            className="background-video"
                            height="100%"
                            allowFullScreen=""
                            allow="autoplay"
                            style={{
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                                left: 0,
                                top: 0,
                                overflow: "hidden"
                            }}
                        />

                        <div className="wrap-container">
                            <div className="header-content">
                                <div className="row">
                                    <div className="col-md-10">
                                        <FlightSearch favouriteDestination={this.props.favouriteDestination}/>
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