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
      passengers: [
        {
          id: 1,
          name: "Nguyen Van A",
          seat: {
            seatCode: "",
            fee: 0,
          },
        },
        {
          id: 2,
          name: "Nguyen Van B",
          seat: {
            seatCode: "",
            fee: 0,
          },
        },
      ],
      choosedPassengerId: 0,
    };
  }

  onSelectSeatFlight = (seat) => {
    let { passengers, choosedPassengerId } = this.state;
    passengers.forEach((psg) => {
      if (psg.id === choosedPassengerId) {
        psg["seat"] = seat;
      }
    });
    this.setState({ passengers });
  };

  onSelectPassenger = (passenger) => {
    this.setState({
      choosedPassengerId: passenger.id,
    });
  };

  render() {
    const { passengers, choosedPassengerId } = this.state;
    return (
      <>
        <div id="flight-seat-service-details">
          <div className="row">
            <div className="col-md-3">
              <FlightSeatServiceTicketPrice />
              <FlightSeatChoosed
                passengers={passengers}
                choosedPassengerId={choosedPassengerId}
                onSelectPassenger={this.onSelectPassenger}
              />
            </div>
            <div className="col-md-8">
              <FlightSeatMap
                onSelectSeatFlight={this.onSelectSeatFlight}
                passengers={passengers}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default FlightSeatServiceDetails;
