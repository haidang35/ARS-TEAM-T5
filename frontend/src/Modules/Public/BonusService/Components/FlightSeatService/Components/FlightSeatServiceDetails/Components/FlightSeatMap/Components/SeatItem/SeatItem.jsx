import React from "react";
import { Component } from "react";
import "./SeatItem.scss";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LockIcon from "@mui/icons-material/Lock";
class SeatItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
    } = this.props;
    const seatCode = rowNumber + seat.letterCode;
    let isSelected = false;
    let isLocked = false;
    reservedSeats.forEach((reservedSeat) => {
      if (reservedSeat.seatCode === rowNumber + seat.letterCode) {
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
            !isLocked ? () => this.onChooseSeat(seat) : this.preventClick
          }
        >
          <div
            className="item"
            style={{
              border: `3px solid ${seatType.COLOR}`,
              backgroundColor: isSelected || isLocked ? seatType.COLOR : "",
            }}
          >
            {isLocked ? (
              <LockIcon className="checked-icon" />
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
