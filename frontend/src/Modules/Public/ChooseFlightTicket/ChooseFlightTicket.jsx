import React, { Component } from "react";
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "./ChooseFlightTicket.scss";
import { Button } from "@mui/material";
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';




export class ChooseFlightTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onViewDetails: false,
        }
    }

    viewFlightDetails = (id) => {
       this.setState({
           onViewDetails :true
       })
    };

   
    render() {
        const { onViewDetails} = this.state;
        return (
            <>
                <div className="item-ticket">
                    <div className="row">
                        <div className="col-md-2 airline-logo-box">
                            <div >
                            <FlightLandIcon className="airline-logo"/>
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
                                                onClick={() => this.viewFlightDetails}
                                                variant="h6"
                                                className="detail"
                                            >
                                                View details
                                                {this.state
                                                    .onViewDetails ? (
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
                                    Choose filght
                                </Typography>
                                <Button
                                    onClick={() =>
                                        this.onChooseFlight
                                    }
                                    className="btn-choose"
                                    variant="contained"
                                    color="primary"
                                >
                                   Choose Flifht
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                          
            </>
        )
    }
}