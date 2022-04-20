import React, { Component } from "react";
import { ChooseSeatFlight } from "./Components/ChooseSeatFlight/ChooseSeatFlight";
import FlightSeatServiceDetails from "./Components/FlightSeatServiceDetails/FlightSeatServiceDetails";

class FlightSeatService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowService: true,
    };
  }

  onSelectService = () => {
    this.setState({
      isShowService: !this.state.isShowService
    });
  }

  render() {
    const { isShowService } = this.state;
    return (
      <>
        <ChooseSeatFlight onSelectService={this.onSelectService} />
        {isShowService ? <FlightSeatServiceDetails /> : ""}
      </>
    );
  }
}

export default FlightSeatService;
