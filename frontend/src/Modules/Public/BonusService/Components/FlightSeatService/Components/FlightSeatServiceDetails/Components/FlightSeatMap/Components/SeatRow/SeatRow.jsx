import { Grid, Typography } from "@mui/material";
import React from "react";
import { Component } from "react";
import SeatItem from "../SeatItem/SeatItem";
import "./SeatRow.scss";

class SeatRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seatItems: [
        {
          id: 1,
          letterCode: "A",
        },
        {
          id: 2,
          letterCode: "B",
        },
        {
          id: 3,
          letterCode: "C",
        },
        {
          id: 4,
          letterCode: "D",
        },
        {
          id: 5,
          letterCode: "E",
        },
        {
          id: 6,
          letterCode: "F",
        },
      ],
    };
  }

  onChooseSeat = (seat) => {
    const { rowNumber, seatInfo } = this.props;
    let selectedSeat = {
      seatCode: rowNumber + seat.letterCode,
      fee: seatInfo.fee,
    };
    this.props.onSelectSeatFlight(selectedSeat);
  };

  render() {
    const { seatItems } = this.state;
    const { rowNumber, seatInfo, seatRowType, passengers, reservedSeats } = this.props;
    return (
      <>
        <div className="seat-row">
          <Grid container spacing={2} className="seat-row-box">
            {seatItems.map((seat) => {
              return (
                <Grid item xs={2} key={seat.id}>
                  <SeatItem
                    seat={seat}
                    rowNumber={rowNumber}
                    onChooseSeat={this.onChooseSeat}
                    seatType={seatRowType}
                    passengers={passengers}
                    reservedSeats={reservedSeats}
                  />
                </Grid>
              );
            })}
          </Grid>
          <div className="mark-point-row">
            <Typography variant="span" component="div">
              {rowNumber}
            </Typography>
          </div>
        </div>
      </>
    );
  }
}
export default SeatRow;
