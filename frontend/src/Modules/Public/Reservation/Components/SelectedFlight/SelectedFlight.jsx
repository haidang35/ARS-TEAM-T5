import React, { Component } from "react";
import { Button } from "@mui/material";
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "./SelectedFlight.scss";
import { SelectedFlightDetails } from "../SelectedFlightDetails/SelectedFlightDeatails";
import { getTime } from "../../../../../Helpers/datetime";
import { formatCurrencyToVND } from "../../../../../Helpers/currency";
import { VIEW_MODE } from "../../../ChooseFlightTicket/FlightTicket";
import { BASE_URL_SERVER } from "../../../../../Configs/server";


export class SelectedFlight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowTicketDetails: false,
        }
    }

    onShowTicket = (id) => {
        this.setState({
            isShowTicketDetails: !this.state.isShowTicketDetails,
        });

    }
    render() {
        const { flightTicket, viewMode, passengers} = this.props;
        return (
            <>
                <div className="selected-flight">
                    <div className="row">
                        <div className="col-md-2 airline-logo-box">
                            <div >
                                <img
                                    className="airline-logo"
                                    src={`${BASE_URL_SERVER}/${flightTicket && flightTicket.Flight.Airline.Logo}`}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="flight-info">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="destination">
                                            <Typography className="city">
                                                {flightTicket && flightTicket.Flight.Departure.City.Name}
                                            </Typography>
                                            <Typography className="time">
                                                {flightTicket && getTime(flightTicket.Flight.DepartureTime)}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="info">
                                            <Typography className="flight-name">
                                                {flightTicket && flightTicket.Flight.FlightCode}
                                            </Typography>
                                            <div className="icon-flight-box">
                                                <LocationOnIcon className="location-icon" />
                                                <div className="line"></div>
                                                <ConnectingAirportsIcon className="icon-flight" />
                                            </div>

                                            <Typography
                                                onClick={() => this.onShowTicket(flightTicket)}
                                                variant="h6"
                                                className="detail"
                                            >
                                                View details
                                                {this.state.isShowTicketDetails ? (
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
                                                {flightTicket && flightTicket.Flight.Destination.City.Name}
                                            </Typography>
                                            <Typography className="time">
                                                {flightTicket && getTime(flightTicket.Flight.ArrivalTime)}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="flight-choose">
                                <Typography className="price">
                                    {formatCurrencyToVND(
                                         flightTicket &&  flightTicket.Price  
                                    )}
                                </Typography>
                                <Button
                                    onClick={() =>
                                        this.onChangeFlight
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
                {this.state.isShowTicketDetails ? (
                    <SelectedFlightDetails   passengers={passengers}  flightTicket={flightTicket} />
                ) : (
                    ""
                )}
            </>
        )
    }
}