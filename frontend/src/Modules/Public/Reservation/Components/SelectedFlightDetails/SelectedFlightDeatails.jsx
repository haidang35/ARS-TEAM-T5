import React, { Component } from "react";
import InfoIcon from '@mui/icons-material/Info';
import AirplanemodeInactiveIcon from '@mui/icons-material/AirplanemodeInactive';
import { Typography } from "@mui/material";
import "./SelectedFlightDetails.scss";


export class SelectedFlightDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        let { data } = this.props;
        return (
            <>
                <div className="selected-flight-details">
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
                                            Hà Nội (HAN)
                                        </Typography>
                                        <Typography className="info-item">
                                            Airport Nội Bài
                                        </Typography>
                                        <Typography className="info-item">
                                            Take off 24:21
                                        </Typography>
                                        <Typography className="info-item">
                                            Date 19-04-2022
                                        </Typography>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="list-info">
                                        <Typography className="info-item">
                                            Hồ Chí Minh (SGN)
                                        </Typography>
                                        <Typography className="info-item">
                                            Airport Tân Sơn Nhất
                                        </Typography>
                                        <Typography className="info-item">
                                            Landing 19:21
                                        </Typography>
                                        <Typography className="info-item">
                                            Date 21-04-2022
                                        </Typography>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="list-info">
                                        <Typography className="info-item">
                                            Flight VNA 909
                                        </Typography>
                                        <Typography className="info-item">
                                            Class Business
                                        </Typography>
                                        <Typography className="info-item">
                                            Ticket: 12121
                                        </Typography>
                                        <Typography className="info-item">
                                            Aircraft Boeing 010
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
                                        <tr>
                                            <td>
                                                Adult
                                            </td>
                                            <td>
                                                2
                                            </td>
                                            <td>
                                                200.000vnd
                                            </td>
                                            <td>
                                                200.000vnd
                                            </td>
                                            <td>
                                                400.000vnd
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="4">
                                                Total fare (VND)
                                            </td>
                                            <td>
                                                {"100 "}

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
                                            121
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
                                            123
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