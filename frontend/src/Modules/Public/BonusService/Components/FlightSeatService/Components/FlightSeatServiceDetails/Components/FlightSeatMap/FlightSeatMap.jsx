import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Component } from "react";
import LetterRow from "./Components/LetterRow/LetterRow";
import SeatItem from "./Components/SeatItem/SeatItem";
import "./FlightSeatMap.scss";
import Grid from "@mui/material/Grid";
import SeatRow from "./Components/SeatRow/SeatRow";

export const SEAT_TYPE = {
  BUSINESS: {
    NAME: "Business",
    COLOR: "rgb(238, 214, 29)",
  },
  ECONOMY: {
    NAME: "Economy",
    COLOR: "#07af3f",
  },
  DELUXE: {
    NAME: "Deluxe",
    COLOR: "#14aeeb",
  },
  EXIT: {
    NAME: "Exit",
    COLOR: "#dd19d3",
  },
};

class FlightSeatMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      capacity: 6 * 35,
      businessSeatRows: [1, 2, 3],
      deluxSeatRows: [4, 5, 6, 7],
      exitSeatRows: [18, 19, 29],
      seatSelected: ''
    };
  }

  checkSeatRowType = (rowNumber) => {
    const { businessSeatRows, deluxSeatRows, exitSeatRows } = this.state;
    if(businessSeatRows.includes(rowNumber)) return SEAT_TYPE.BUSINESS;
    if(deluxSeatRows.includes(rowNumber)) return SEAT_TYPE.DELUXE;
    if(exitSeatRows.includes(rowNumber)) return SEAT_TYPE.EXIT;
    return SEAT_TYPE.ECONOMY;
  };

  

  render() {
    const { capacity } = this.state;
    const { reservedSeats, flightTicket } = this.props;
    let seatRows = [];
    for (let i = 0; i < capacity / 6; i++) {
      let rowNumber = i;
      seatRows.push({
        id: i,
        rowNumber: ++rowNumber,
        fee: 0,
      });
    }
    
    return (
      <>
        <div id="flight-seat-map">
          <Stack className="header">
            <Typography className="title" variant="h6" component="div">
              Select Seat Flight Map
            </Typography>
          </Stack>
          <LetterRow />
          <Box sx={{ flexGrow: 1 }}>
            {seatRows.map((row, index) => {
              let seatRowType = this.checkSeatRowType(row.rowNumber);
              let seatFee = 0;
              if(seatRowType === SEAT_TYPE.BUSINESS) seatFee = flightTicket.BusinessSeatFee;
              if(seatRowType === SEAT_TYPE.DELUXE) seatFee = flightTicket.DeluxeSeatFee;
              if(seatRowType === SEAT_TYPE.ECONOMY) seatFee = flightTicket.EconomySeatFee;
              if(seatRowType === SEAT_TYPE.EXIT) seatFee = flightTicket.ExitSeatFee;
              row['fee'] = seatFee;
              return (
                <SeatRow
                  key={index}
                  rowNumber={row.rowNumber}
                  seatInfo={row}
                  onSelectSeatFlight={this.props.onSelectSeatFlight}
                  seatRowType={seatRowType}
                  passengers={this.props.passengers}
                  reservedSeats={reservedSeats}
                />
              );
            })}
          </Box>
        </div>
      </>
    );
  }
}

export default FlightSeatMap;
