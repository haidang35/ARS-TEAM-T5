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
    } = this.props;
    const seatCode = rowNumber + seat.letterCode;
    let isSelected = false;
    let isChoosingSeat = false;
    let isLocked = false;
    reservedSeats.forEach((reservedSeat) => {
      if (reservedSeat.seatCode === seatCode) {
        isChoosingSeat = true;
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
            !isChoosingSeat && !isLocked
              ? () => this.onChooseSeat(seat)
              : this.preventClick
          }
        >
          <div
            className="item"
            style={{
              border: `3px solid ${seatType.COLOR}`,
              backgroundColor:
                isSelected || isChoosingSeat || isLocked ? seatType.COLOR : "",
            }}
          >
            {isLocked ? (
              <LockIcon className="checked-icon" />
            ) : isChoosingSeat ? (
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
