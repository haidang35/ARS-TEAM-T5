import React, { Component } from "react";
import { ChooseSeatFlight } from "./Components/ChooseSeatFlight/ChooseSeatFlight";
import FlightSeatServiceDetails from "./Components/FlightSeatServiceDetails/FlightSeatServiceDetails";

class FlightSeatService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowService: false,
    };
  }

  onSelectService = () => {
    this.setState({
      isShowService: !this.state.isShowService,
    });
  };

  render() {
    const { isShowService } = this.state;
    const { reservationData, flightTicket, passengers, reservedSeats, totalSeatFee, lockedSeats, ipAddress } = this.props;
    return (
      <>
        <ChooseSeatFlight onSelectService={this.onSelectService} />
        {isShowService ? (
          <FlightSeatServiceDetails
            reservationData={reservationData}
            flightTicket={flightTicket}
            passengerNumbers={passengers}
            onSelectSeatFlight={this.props.onSelectSeatFlight}
            reservedSeats={reservedSeats}
            totalSeatFee={totalSeatFee}
            lockedSeats={lockedSeats}
            ipAddress={ipAddress}
            checkExpiresReserveSeat={this.props.checkExpiresReserveSeat}
          />
        ) : (
          ""
        )}
      </>
    );
  }
}

export default FlightSeatService;
