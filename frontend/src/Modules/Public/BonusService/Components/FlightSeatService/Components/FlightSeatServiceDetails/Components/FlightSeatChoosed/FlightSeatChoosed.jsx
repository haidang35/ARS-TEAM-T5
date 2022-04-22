import React from "react";
import { Component } from "react";
import FlightSeatChoosedItem from "./Components/FlightSeatChoosedItem/FlightSeatChoosedItem";
import "./FlightSeatChoosed.scss";

class FlightSeatChoosed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { passengers } = this.props;
    return (
      <>
        <div id="flight-seat-choosed">
          {passengers.map((psg) => {
            return (
              <FlightSeatChoosedItem
                passenger={psg}
                onSelectPassenger={this.props.onSelectPassenger}
                choosedPassengerId={this.props.choosedPassengerId}
              />
            );
          })}
        </div>
      </>
    );
  }
}

export default FlightSeatChoosed;
