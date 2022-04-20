import { Typography } from "@mui/material";
import React, { Component } from "react";
import "./PassengerInfomation.scss";


export class PassengerInfomation extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <>
                <div className="passenger-info">
                    <div className="title-box">
                        <Typography variant="h6" className="title">
                            Passenger information and fares
                        </Typography>
                    </div>
                    <div className="content">
                        <div className="table-responsive">
                            <table className="table table-lg">
                                <thead>
                                    <tr>
                                        <th className="title-item">STT</th>
                                        <th className="title-item">Flight</th>
                                        <th className="title-item">Passenger</th>
                                        <th className="title-item">Gender</th>
                                        <th className="title-item">Birthday</th>
                                        <th className="title-item">Ticket price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="content-item">
                                        1
                                        </td>
                                        <td className="content-item">
                                        Hà Nội - Hồ Chí Minh
                                        </td>
                                        <td className="content-item">
                                        name
                                        </td>
                                        <td className="content-item">
                                        Nam
                                        </td>
                                        <td className="content-item">
                                        02-04-2022
                                        </td>
                                        <td className="content-item">
                                        200 USD
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="content-item">
                                            2
                                        </td>
                                        <td className="content-item">
                                            viet nam - Anh
                                        </td>
                                        <td className="content-item">
                                          name
                                        </td>
                                        <td className="content-item">
                                           nam
                                        </td>
                                        <td className="content-item">
                                        02-04-2022
                                        </td>
                                        <td className="content-item">
                                           2000 USD
                                        </td>
                                    </tr>

                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="content-item-seat-fee"
                                        >
                                            Seat fee
                                        </td>
                                        <td className="content-item-seat-fee">
                                          100 USD
                                        </td>
                                    </tr>

                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="content-item-total"
                                        >
                                            Total cost
                                        </td>
                                        <td className="content-item-total">
                                           2500 USD
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}