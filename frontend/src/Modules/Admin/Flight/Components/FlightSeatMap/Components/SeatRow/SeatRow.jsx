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


  render() {
    const { seatItems } = this.state;
    const { rowNumber, seatInfo, reservedSeats, lockedSeats } = this.props;
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
                    reservedSeats={reservedSeats}
                    lockedSeats={lockedSeats}
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
