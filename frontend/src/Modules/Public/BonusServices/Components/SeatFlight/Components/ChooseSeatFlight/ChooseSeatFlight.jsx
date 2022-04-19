import React, { Component } from "react";
import "./ChooseSeatFlight.scss";
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';

export class ChooseSeatFlight extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <>
                <div className="flight-seat-reserve">
                    <div className="row">
                        <div className="col-md-2">
                            <div className="select-service">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            
                                            name="checkedB"
                                            color="primary"
                                            className="check-box"
                                           
                                        />
                                    }
                                    label=""
                                />
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="row">
                                <div className="col-md-7">
                                    <div className="title-box">
                                        <AirlineSeatReclineNormalIcon className="seat-icon" />
                                        <Typography
                                            className="select-seat-title"
                                            variant="h5"
                                        >
                                            Choose your favorite seat
                                        </Typography>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="description-box">
                                        <div className="desc-item">
                                            <CircleNotificationsIcon className="icon-check" />
                                            <Typography
                                                variant="body1"
                                                className="desc-title"
                                            >
                                                Individual seat selection
                                            </Typography>
                                        </div>
                                        <div className="desc-item">
                                            <CircleNotificationsIcon className="icon-check" />
                                            <Typography
                                                variant="body1"
                                                className="desc-title"
                                            >
                                                Standard seats
                                            </Typography>
                                        </div>
                                        <div className="desc-item">
                                            <CircleNotificationsIcon className="icon-check" />
                                            <Typography
                                                variant="body1"
                                                className="desc-title"
                                            >
                                                Wide seat
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="img-box"></div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}