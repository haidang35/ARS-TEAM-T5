import React from "react";
import { Component } from "react";
import "./SeatItem.scss";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LockIcon from "@mui/icons-material/Lock";
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
class SeatItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChooseSeat = (seat) => {
    this.props.onChooseSeat(seat);
  };

  render() {
    const {
      seat,
      seatType,
      rowNumber,
      seatSelected,
      passengers,
      reservedSeats,
      lockedSeats,
      ipAddress
    } = this.props;
    const seatCode = rowNumber + seat.letterCode;
    let isSelected = false;
    let isLockingSeat = false;
    let isLocked = false;
    const customerCode = localStorage.getItem('_flight_t5_ctm_code');
    reservedSeats.forEach((reservedSeat) => {
      if (reservedSeat.seatCode === seatCode && reservedSeat.customerCode !== customerCode) {
        isLockingSeat = true;
      }
    });

    lockedSeats.forEach((lockedSeat) => {
      if (lockedSeat.SeatFlightCode === seatCode) {
        isLocked = true;
      }
    });

    passengers.forEach((psg) => {
      if (psg.seatInfo["seatCode"] === seatCode) {
        isSelected = true;
      }
    });
    return (
      <>
        <div
          className="seat-item"
          onClick={
            !isLockingSeat && !isLocked
              ? () => this.onChooseSeat(seat)
              : this.preventClick
          }
        >
          <div
            className="item"
            style={{
              border: `3px solid ${seatType.COLOR}`,
              backgroundColor:
                isSelected || isLockingSeat || isLocked ? seatType.COLOR : "",
            }}
          >
            {isLocked ? (
              <LockIcon className="checked-icon" />
            ) : isLockingSeat ? (
              <HourglassEmptyIcon className="checked-icon" />
            ) : isSelected ? (
              <VerifiedUserIcon className="checked-icon" />
            ) : (
              ""
            )}
          </div>
        </div>
      </>
    );
  }
}
export default SeatItem;
