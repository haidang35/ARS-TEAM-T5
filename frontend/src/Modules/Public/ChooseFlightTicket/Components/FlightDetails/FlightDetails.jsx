import React, { Component } from "react";
import { Typography } from "@mui/material";
import "./FlightDetails.scss";
import InfoIcon from '@mui/icons-material/Info';
import AirplanemodeInactiveIcon from '@mui/icons-material/AirplanemodeInactive';
import { getTime, getDate } from "../../../../../Helpers/datetime";
import { formatCurrencyToVND } from "../../../../../Helpers/currency";



export class FlightDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        let { data, passengers } = this.props;
        let totalMoney = 0;

        return (
            <>
                <div className="flight-details">
                    <div className="flight-info">
                        <div className="title-bar">
                            <Typography className="title">
                                <InfoIcon className="icon-info" />
                                Flight details
                            </Typography>
                        </div>
                        <div className="content">
                            <div className="row">
                                <div className="col-md-3">
                                    <div>
                                        <AirplanemodeInactiveIcon className="logo-box" />

                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="list-info">
                                        <Typography className="info-item">
                                            {data.Flight.Departure.City.Province.Name}
                                            ({data.Flight.Departure.AirPortCode})
                                        </Typography>
                                        <Typography className="info-item">
                                           Airport: {data.Flight.Departure.AirPortName}
                                        </Typography>
                                        <Typography className="info-item">
                                          Take off :  {getTime(
                                                data.Flight
                                                    .DepartureTime
                                            )}
                                        </Typography>
                                        <Typography className="info-item">
                                           Date : {getDate(
                                                data.Flight.CreatedAt
                                            )}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="list-info">
                                        <Typography className="info-item">
                                            {data.Flight.Destination.City.Province.Name}
                                            ({data.Flight.Destination.AirPortCode})

                                        </Typography>
                                        <Typography className="info-item">
                                           Airport : {data.Flight.Destination.AirPortName}
                                        </Typography>
                                        <Typography className="info-item">
                                          Landing :  {getTime(
                                                data.Flight
                                                    .ArrivalTime
                                            )}
                                        </Typography>
                                        <Typography className="info-item">
                                          Date :  {getDate(
                                                data.Flight.UpdatedAt
                                            )}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="list-info">
                                        <Typography className="info-item">
                                         Flight :   {data.Flight.Airline.Code}
                                        </Typography>
                                        <Typography className="info-item">
                                            Available Class: {data.AvailableClass}
                                        </Typography>
                                        <Typography className="info-item">
                                            Ticket: {data.TicketType}
                                        </Typography>
                                        <Typography className="info-item">
                                        Aircraft :  {data.Flight.Aircraft}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ticket-info">
                        <div className="title-bar">
                            <Typography className="title">
                                <InfoIcon className="icon-info" />
                                Ticket details
                            </Typography>
                        </div>
                        <div className="content">
                            <div className="table-responsive">
                                <table className="table table-lg">
                                    <thead>
                                        <tr>
                                            <th>Passenger</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Taxes and fees</th>
                                            <th>Total money</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            passengers.map((psg, index) => {
                                                if (psg.quantity > 0) {
                                                    totalMoney += psg.quantity * data.Price + data.Tax;
                                                    return (
                                                        <tr key={index}>
                                                            <td>{psg.passengerType}</td>
                                                            <td>{psg.quantity}</td>
                                                            <td>{formatCurrencyToVND(data.Price) }</td>
                                                            <td>{formatCurrencyToVND(data.Tax)}</td>
                                                            <td>{formatCurrencyToVND(psg.quantity * data.Price + data.Tax)}</td>
                                                        </tr>
                                                    )
                                                }

                                            })
                                        }

                                        <tr>
                                            <td colSpan="4">
                                                Total fare(VND)
                                            </td>
                                            <td>
                                                {""}
                                                {formatCurrencyToVND(
                                                    totalMoney
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="baggage-condition">
                        <div className="title-bar">
                            <Typography className="title">
                                <InfoIcon className="icon-info" />
                                Baggage conditions
                            </Typography>
                        </div>
                        <div className="content">
                            <div className="condition-item">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <Typography className="text">
                                            Carbin baggage
                                        </Typography>
                                    </div>
                                    <div className="col-sm-3">
                                        <Typography className="text">

                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <div className="condition-item">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <Typography className="text">
                                            Checkin baggage
                                        </Typography>
                                    </div>
                                    <div className="col-sm-3">
                                        <Typography className="text">

                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ticket-condition">
                        <div className="title-bar">
                            <Typography className="title">
                                <InfoIcon className="icon-info" />
                                Ticket conditions
                            </Typography>
                        </div>
                        <div className="content">
                            <div className="note">
                                <Typography>
                                    *Important Note: Please check return flight
                                    information before flight date 24 sound and
                                    follow the correct journey order fly on the
                                    ticket, if any leg does not fly happily
                                    Please report back to Vemaybay.vn for
                                    support Avoid booking cancellation.
                                </Typography>
                            </div>
                            <div className="note-change">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <Typography>Flight change</Typography>
                                    </div>
                                    <div className="col-sm-9">
                                        <Typography>
                                            - 12 hours before departure time:
                                            Thu fee 297,000VND/way/pax +
                                            difference fare difference (if any)
                                        </Typography>
                                        <Typography>
                                            - Within 12 hours and after hours
                                            Departure: Not applicable
                                        </Typography>
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