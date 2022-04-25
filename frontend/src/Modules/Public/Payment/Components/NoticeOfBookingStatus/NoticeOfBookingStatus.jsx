import { Typography } from "@mui/material";
import React, { Component } from "react";
import "./NoticeOfBookingStatus.scss";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import { getTime } from "../../../../../Helpers/datetime";
import { BOOKING_STATUS } from "../../Payments";
export class NoticeOfBookingStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { bookingData } = this.props;
    const bookingDate = new Date(bookingData.CreatedAt);
    const expirePaymentTime =  bookingDate.setHours(bookingDate.getHours() + 1);
    return (
      <>
        <div className="booking-confirm">
          <div className="main-content">
            <div className="confirm-notice">
              <div className="title-box">
                <Typography variant="h4" className="title">
                  Notice of booking status
                </Typography>
              </div>
              <div className="content">
                <div className="animation-flight">
                  <ConnectingAirportsIcon className="cloud-icon" />
                  <ConnectingAirportsIcon className="flight-icon" />
                  <AirlineSeatReclineNormalIcon className="cloud-icon cloud-1" />
                  <ConnectingAirportsIcon className="cloud-icon cloud-2" />
                </div>
                <Typography className="notice-title" variant="h6">
                  {`You have successfully booked, your booking code is: `}
                  <span
                    style={{
                      color: "#7b61f2",
                    }}
                  >
                    {bookingData && bookingData.BookingCode}
                  </span>
                </Typography>
                {bookingData && bookingData.Status === BOOKING_STATUS.PAID ? (
                  <Typography variant="h6" className="notice-payment-success">
                    You have successfully paid
                  </Typography>
                ) : (
                  <Typography variant="h6" className="notice-alert">
                    Please pay before <span className="time">{getTime(expirePaymentTime)} </span>
                    today, after this time if you Customer has not paid the
                    request booking will be canceled
                  </Typography>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
