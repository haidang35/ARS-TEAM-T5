import { Typography } from "@mui/material";
import React, { Component } from "react";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";
import AlarmIcon from "@mui/icons-material/Alarm";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import "./FlightSeatServiceDetails.scss";
import FlightSeatServiceTicketPrice from "./Components/FlightSeatServiceTicketPrice/FlightSeatServiceTicketPrice";
import "./FlightSeatServiceDetails.scss";
import FlightSeatMap from "./Components/FlightSeatMap/FlightSeatMap";
import FlightSeatChoosedItem from "./Components/FlightSeatChoosed/Components/FlightSeatChoosedItem/FlightSeatChoosedItem";
import FlightSeatChoosed from "./Components/FlightSeatChoosed/FlightSeatChoosed";

class FlightSeatServiceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choosedPassengerId: 0,
    };
  }

  onSelectSeatFlight = (seat) => {
    this.props.onSelectSeatFlight(seat, this.state.choosedPassengerId);
  };

  onSelectPassenger = (passenger) => {
    this.setState({
      choosedPassengerId: passenger.id,
    });
  };

  render() {
    const {  choosedPassengerId } = this.state;
    const { reservationData, flightTicket, passengerNumbers, reservedSeats, totalSeatFee, lockedSeats } = this.props;
    return (
      <>
        <div id="flight-seat-service-details">
          <div className="row">
            <div className="col-md-3">
              <FlightSeatServiceTicketPrice
                flightTicket={flightTicket}
                passengerNumbers={passengerNumbers}
                passengersInfo={reservationData.passengers}
                totalSeatFee={totalSeatFee}
              />
              <FlightSeatChoosed
                passengers={reservationData.passengers}
                choosedPassengerId={choosedPassengerId}
                onSelectPassenger={this.onSelectPassenger}
              />
            </div>
            <div className="col-md-8">
              <FlightSeatMap
                onSelectSeatFlight={this.onSelectSeatFlight}
                passengers={reservationData.passengers}
                reservedSeats={reservedSeats}
                flightTicket={flightTicket}
                lockedSeats={lockedSeats}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default FlightSeatServiceDetails;
