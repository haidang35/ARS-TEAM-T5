import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import NavbarV2 from "../Shared/Components/NavbarV2/NavbarV2";
import FlightSeatService from "./Components/FlightSeatService/FlightSeatService";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { dbFirebase } from "../../../Configs/firebase";
import CheckoutStepBar from "../Shared/Components/CheckoutStepBar/CheckoutStepBar";

class BonusServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservationData: "",
      flightTicket: "",
      passengers: "",
      reservedSeats: [],
      totalMoney: 0,
      totalSeatFee: 0
    };
  }

  componentDidMount = () => {
    let { reservationData, flightTicket, passengers } =
      this.props.location.state;
    reservationData.passengers.forEach((psg) => {
      psg["seatInfo"] = {
        seatCode: "",
        seatType: "",
        fee: 0,
      };
    });
    this.setState({
      reservationData,
      flightTicket,
      passengers,
    });
    this.getReservedFlightSeats(flightTicket.Flight.FlightCode);
    this.calcTotalMoney(flightTicket, passengers);
  };

  calcTotalMoney = (flightTicket = {}, passengers = []) => {
    let { totalMoney } = this.state;
    passengers.forEach((psg) => {
        if(psg.quantity > 0) {
            totalMoney += psg.quantity * flightTicket.Price + flightTicket.Tax;
        }
    })
    this.setState({ totalMoney });
  }

  getReservedFlightSeats = (flightCode) => {
    const flightSeatRef = ref(dbFirebase, `flights/${flightCode}`);
    onValue(flightSeatRef, (snapshot) => {
      if(snapshot.val() !== null) {
        this.setState({
            reservedSeats: snapshot.val().reservedSeats
        })
      }
    });
  };

  onSelectSeatFlight = (seatInfo, choosedPassengerId) => {
    let { reservationData, flightTicket, reservedSeats } = this.state;
    let oldSeatCode = '';
    let totalSeatFee = 0;
    reservationData.passengers.forEach((psg) => {
      if (psg.id === choosedPassengerId) {
        oldSeatCode = psg['seatInfo'].seatCode;
        psg["seatInfo"] = seatInfo;
      }
      totalSeatFee += psg['seatInfo']['fee'];
    });
    let isSeatExist = false;
    reservedSeats.forEach((seat, index) => {
      if (seat.seatCode === seatInfo.seatCode) {
        isSeatExist = true;
      }
      if(seat.seatCode === oldSeatCode) {
        reservedSeats.splice(index, 1)
      }
    });
    if (!isSeatExist) {
      reservedSeats.push(seatInfo);
      set(ref(dbFirebase, `flights/${flightTicket.Flight.FlightCode}`), {
        reservedSeats,
      });
    }
    this.setState({ reservationData, totalSeatFee });
  };

  onContinue = () => {
    const { reservationData } = this.state;
    console.log("🚀 ~ file: BonusService.jsx ~ line 94 ~ BonusServices ~ reservationData", reservationData)
    
  }

  render() {
    let { reservationData, flightTicket, passengers, reservedSeats, totalMoney, totalSeatFee } = this.state;
    return (
      <>
        <NavbarV2 />
        <div className="wrap-container">
          <div className="row">
            <div className="col-md-12">
              <FlightSeatService
                reservationData={reservationData}
                flightTicket={flightTicket}
                passengers={passengers}
                onSelectSeatFlight={this.onSelectSeatFlight}
                reservedSeats={reservedSeats}
                totalSeatFee={totalSeatFee}
              />
            </div>
          </div>
        </div>
        <CheckoutStepBar totalMoney={totalMoney + totalSeatFee} onContinue={this.onContinue}/>
      </>
    );
  }
}

export default withRouter(BonusServices);
