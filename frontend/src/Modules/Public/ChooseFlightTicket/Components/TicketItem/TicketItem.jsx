import React, { Component } from "react";
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "./TicketItem.scss";
import { Button } from "@mui/material";
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { FlightDetails } from "../FlightDetails/FlightDetails";



export class TicketItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowFlightDetails: false,
        }
    }

    onShowFlightTicketDetails = (id) => {
        this.setState({
            isShowFlightDetails: !this.state.isShowFlightDetails,
        });
    };



    render() {
        const { data } = this.props;
        return (
            <>
                <div className="item-ticket">
                    <div className="row">
                        <div className="col-md-2 airline-logo-box">
                            <div >
                                <img
                                    className="airline-logo"
                                    src="https://static.wixstatic.com/media/9d8ed5_b328a87c44a04887ab0d35ef93991f16~mv2.png/v1/fill/w_1000,h_626,al_c,usm_0.66_1.00_0.01/9d8ed5_b328a87c44a04887ab0d35ef93991f16~mv2.png"
                                />
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
                                                onClick={() => this.onShowFlightTicketDetails(data)}
                                                variant="h6"
                                                className="detail"
                                            >
                                                View details
                                                {this.state.isShowFlightDetails ? (
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
                                    Choose Flight
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isShowFlightDetails ? (
                    <FlightDetails key={data.id} data={data} />
                ) : (
                    ""
                )}
            </>
        )
    }
}