import React, { Component } from "react";

export class BookingHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <>
                <div className="user-booking-list">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Booking History</h4>
                        </div>
                        <div className="card-content">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-lg">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Booking date</th>
                                                <th>Route</th>
                                                <th>Flight</th>
                                                <th>Total</th>
                                                <th>Payment status</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="text-bold-500">
                                                   111
                                                </td>
                                                <td className="text-bold-500">
                                                   111
                                                </td>
                                                <td className="text-bold-500">
                                                   111
                                                </td>
                                                <td className="text-bold-500">
                                                 111
                                                </td>
                                                <td className="text-bold-500">
                                                  121
                                                </td>
                                                <td>
                                                   122
                                                </td>

                                                <td>
                                                    <div className="btn-box-control">
                                                        {/* <Link
                                                            to={{
                                                                pathname:
                                                                    "/customer-info/booking-details",
                                                                state: item,
                                                            }}
                                                        > */}
                                                            <button className="btn btn-primary">
                                                                View
                                                                details
                                                            </button>
                                                        {/* </Link> */}
                                                        <button
                                                            className="btn btn-danger"
                                                            style={{
                                                                marginTop:
                                                                    "1rem",
                                                            }}
                                                          
                                                        >
                                                            Cancel
                                                           
                                                        </button>
                                                    </div>

                                                    
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}