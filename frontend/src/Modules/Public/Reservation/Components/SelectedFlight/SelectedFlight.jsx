import React, { Component } from "react";
import { Button } from "@mui/material";
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "./SelectedFlight.scss";
import { SelectedFlightDetails } from "../SelectedFlightDetails/SelectedFlightDeatails";


export class SelectedFlight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onShowSelectedFlight: false,

        }
    }

    onShowSelected = (id) => {
        this.setState({
            onShowSelectedFlight: !this.state.onShowSelectedFlight,
        });

    }
    render() {
        const { data } = this.props;
        return (
            <>
                <div className="selected-flight">
                    <div className="row">
                        <div className="col-md-2 airline-logo-box">
                            <div >
                                <FlightLandIcon className="airline-logo" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="flight-info">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="destination">
                                            <Typography className="city">
                                                ha noi
                                            </Typography>
                                            <Typography className="time">
                                                15:17
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="info">
                                            <Typography className="flight-name">
                                                T5
                                            </Typography>
                                            <div className="icon-flight-box">
                                                <LocationOnIcon className="location-icon" />
                                                <div className="line"></div>
                                                <ConnectingAirportsIcon className="icon-flight" />
                                            </div>

                                            <Typography
                                                onClick={() => this.onShowSelected(data)}
                                                variant="h6"
                                                className="detail"
                                            >
                                                View details
                                                {this.state.onShowSelectedFlight ? (
                                                    <ArrowDropUpIcon className="view-detail-icon" />
                                                ) : (
                                                    <ArrowDropDownIcon className="view-detail-icon" />
                                                )}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="destination">
                                            <Typography className="city">
                                                ha noi
                                            </Typography>
                                            <Typography className="time">
                                                24:00
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="flight-choose">
                                <Typography className="price">
                                    {this.props.price} USD
                                </Typography>
                                <Button
                                    onClick={() =>
                                        this.onChooseFlight
                                    }
                                    className="btn-choose"
                                    variant="contained"
                                    color="primary"
                                >
                                    Change Flight
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.onShowSelectedFlight ? (
                    <SelectedFlightDetails key={data.id} data={data} />
                ) : (
                    ""
                )}
            </>
        )
    }
}