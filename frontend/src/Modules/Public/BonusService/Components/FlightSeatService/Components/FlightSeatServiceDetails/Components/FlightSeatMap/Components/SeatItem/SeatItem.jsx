import React from "react";
import { Component } from "react";
import "./SeatItem.scss";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

class SeatItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChooseSeat = (seat) => {
    this.props.onChooseSeat(seat);
  };

  render() {
    const { seat, seatType, rowNumber, seatSelected, passengers } = this.props;
    let isSelected = false;
    const seatCode = rowNumber + seat.letterCode;
    passengers.forEach((psg) => {
        if(psg.seat['seatCode'] === seatCode) {
            isSelected = true;
        }
    })
    return (
      <>
        <div className="seat-item" onClick={() => this.onChooseSeat(seat)}>
          <div
            className="item"
            style={{
              border: `3px solid ${seatType.COLOR}`,
              backgroundColor: isSelected ? seatType.COLOR : "",
            }}
          >
            {isSelected ? <VerifiedUserIcon className="checked-icon" /> : ""}
          </div>
        </div>
      </>
    );
  }
}
export default SeatItem;
