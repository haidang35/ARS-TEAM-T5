import React from "react";
import "./FlightSeatServiceTicketPrice.scss";
import { Typography } from "@mui/material";
import { Component } from "react";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";
import AlarmIcon from "@mui/icons-material/Alarm";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {
  getTime,
  dateConvert,
} from "../../../../../../../../../Helpers/datetime";
import { formatCurrencyToVND } from "../../../../../../../../../Helpers/currency";

class FlightSeatServiceTicketPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { flightTicket, passengerNumbers, totalSeatFee, flightTicketReturn } = this.props;
    let totalMoney = 0;
    return (
      <>
        <div id="flight-seat-service-ticket-price">
          <div className="price-details">
            <div className="ticket-details">
              <div className="title-box">
                <Typography variant="h4" className="title">
                  Ticket Details
                </Typography>
              </div>
              <div className="content">
                <div className="row">
                  <div className="col-md-8">
                    <div className="flight-time">
                      <Typography variant="body1" className="destination">
                        {flightTicket.Flight.Departure.City.Name}
                      </Typography>
                      <ArrowRightAltIcon className="icon-arrow" />
                      <Typography variant="body1" className="destination">
                        {flightTicket.Flight.Destination.City.Name}
                      </Typography>
                    </div>
                    <div className="flight-time">
                      <AlarmIcon className="icon-clock" />
                      <Typography variant="body1" className="time">
                        {`${getTime(
                          flightTicket.Flight.DepartureTime
                        )} ${dateConvert(flightTicket.Flight.DepartureTime)}`}
                      </Typography>
                    </div>
                  </div>
                  {/* <div className="col-md-4">
                    <div className="logo-airline">
                      <LocalAirportIcon />
                    </div>
                  </div> */}
                  <div className="col-md-12">
                    <div className="ticket-price">
                      <div className="row">
                        <div className="col-md-6">
                          <Typography variant="h6" className="title left-title">
                            Price
                          </Typography>
                        </div>
                        <div className="col-md-6">
                          <Typography
                            variant="h6"
                            className="title total-title"
                          >
                            Total
                          </Typography>
                        </div>
                        <div className="passenger-list-price">
                          {passengerNumbers.map((psg, index) => {
                            if (psg.quantity > 0) {
                              totalMoney +=
                                psg.quantity * flightTicket.Price +
                                flightTicket.Tax;
                              return (
                                <div className="row" key={index}>
                                  <div className="col-sm-4">
                                    <Typography
                                      variant="body1"
                                      className="content-line"
                                    >
                                      {psg.passengerType}
                                    </Typography>
                                  </div>
                                  <div className="col-sm-4">
                                    <Typography
                                      variant="body1"
                                      className="content-line"
                                    >
                                      {`${psg.quantity} x ${formatCurrencyToVND(
                                        flightTicket.Price
                                      )}`}
                                    </Typography>
                                  </div>
                                  <div className="col-sm-4">
                                    <Typography
                                      variant="body1"
                                      className="content-line right"
                                    >
                                      {formatCurrencyToVND(
                                        psg.quantity * flightTicket.Price +
                                          flightTicket.Tax
                                      )}
                                    </Typography>
                                  </div>
                                </div>
                              );
                            }
                          })}
                          <div className="row">
                            <div className="col-sm-4">
                              <Typography
                                variant="body1"
                                className="content-line"
                              >
                                Total Seat Fee
                              </Typography>
                            </div>
                            <div className="col-sm-4">
                              <Typography
                                variant="body1"
                                className="content-line"
                              ></Typography>
                            </div>
                            <div className="col-sm-4">
                              <Typography
                                variant="body1"
                                className="content-line right"
                              >
                                {formatCurrencyToVND(totalSeatFee)}
                              </Typography>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <Typography variant="h4" className="total-price">
                                Total Money
                              </Typography>
                            </div>
                            <div className="col-md-6">
                              <Typography
                                variant="h4"
                                className="total-price right"
                              >
                                {formatCurrencyToVND(totalMoney + totalSeatFee)}
                              </Typography>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default FlightSeatServiceTicketPrice;
