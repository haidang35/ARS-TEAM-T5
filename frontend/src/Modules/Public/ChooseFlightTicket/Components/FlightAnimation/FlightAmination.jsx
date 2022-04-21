import React, { Component } from "react";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { LinearProgress, Typography } from "@mui/material";
import "./FlightAmination.scss";

export class FlightAmination extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <>
                <div id="flight-amination">
                    <div className="notice-none-flight">
                        <FlightTakeoffIcon className="plane-icon" />
                        <div className="progress-search">
                            <LinearProgress />
                        </div>
                        <Typography variant="h6">
                            There are currently no incoming flights matching
                            your request.
                        </Typography>
                        <Typography variant="h6">
                            Please change the time to find the right flight
                        </Typography>
                    </div>
                </div>
            </>
        )
    }
}