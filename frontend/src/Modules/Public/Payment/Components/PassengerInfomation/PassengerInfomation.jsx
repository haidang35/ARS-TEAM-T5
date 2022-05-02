import { Typography } from "@mui/material";
import React, { Component } from "react";
import { formatCurrencyToVND } from "../../../../../Helpers/currency";
import { dateConvert } from "../../../../../Helpers/datetime";
import "./PassengerInfomation.scss";

export class PassengerInfomation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { bookingData } = this.props;
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
                  {bookingData.BookingTickets &&
                    bookingData.BookingTickets.map((bookingTicket, index) => {
                      return (
                        <tr key={index}>
                          <td className="content-item">{++index}</td>
                          <td className="content-item">
                            {`${bookingTicket.Ticket.Flight.Departure.City.Name} - ${bookingTicket.Ticket.Flight.Destination.City.Name}`}
                          </td>
                          <td className="content-item">
                            {bookingTicket.ContactName}
                          </td>
                          <td className="content-item">
                            {bookingTicket.PassengerGender === 1
                              ? "Male"
                              : "Female"}
                          </td>
                          <td className="content-item">
                            {dateConvert(bookingTicket.PassengerBirthday)}
                          </td>
                          <td className="content-item">
                            {formatCurrencyToVND(
                              bookingTicket.Ticket.Price +
                                bookingTicket.Ticket.Tax
                            )}
                          </td>
                        </tr>
                      );
                    })}

                  <tr>
                    <td colSpan="5" className="content-item-seat-fee">
                      Seat fee
                    </td>
                    <td className="content-item-seat-fee">
                        {formatCurrencyToVND(bookingData.TotalSeatFee)}
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="5" className="content-item-total">
                      Total cost
                    </td>
                    <td className="content-item-total">{formatCurrencyToVND(bookingData.TotalMoney)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}
