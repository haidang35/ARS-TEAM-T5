import React from "react";
import { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import NavbarV2 from "../Shared/Components/NavbarV2/NavbarV2";
import FlightSeatService from "./Components/FlightSeatService/FlightSeatService";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { dbFirebase } from "../../../Configs/firebase";
import CheckoutStepBar from "../Shared/Components/CheckoutStepBar/CheckoutStepBar";
import publicService from "../Shared/Services/PublicService";
import { BookingStepBar } from "../ChooseFlightTicket/Components/BookingStepBar/BookingStepBar";
import { Backdrop, Box, Dialog, LinearProgress, Typography } from "@mui/material";

export const GENDER = {
  MALE: 1,
  FEMALE: 2,
};

export const checkGender = (gender = "") => {
  switch (gender) {
    case "Male":
      return GENDER.MALE;
    case "Female":
      return GENDER.FEMALE;
  }
};
class BonusServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservationData: "",
      flightTicket: "",
      flightTicketReturn: '',
      passengers: "",
      lockingSeats: [],
      totalMoney: 0,
      totalSeatFee: 0,
      isRedirect: false,
      lockedSeats: [],
      bookingData: "",
      ipAddress: "",
      isLoading: false,
    };
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
    let { reservationData, flightTicket, passengers, flightTicketReturn } =
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
      flightTicketReturn
    });
    this.getReservedFlightSeats(flightTicket.Flight.FlightCode);
    this.calcTotalMoney(flightTicket, passengers);
    this.getLockedSeats(flightTicket);
    this.getIpAddress();
    this.generateCustomerCode();
  };

  getIpAddress = async () => {
    await publicService.getIpAdressInfo().then((res) => {
      this.setState({
        ipAddress: res.data.IPv4,
      });
    });
  };

  generateCustomerCode = () => {
    let expires = new Date();
    expires.setMinutes(expires.getMinutes() + 5);
    localStorage.setItem(
      "_flight_t5_ctm_code",
      Math.floor(Math.random() * 1000000)
    );
  };

  calcTotalMoney = (flightTicket = {}, passengers = []) => {
    let { totalMoney } = this.state;
    passengers.forEach((psg) => {
      if (psg.quantity > 0) {
        totalMoney += psg.quantity * flightTicket.Price + flightTicket.Tax;
      }
    });
    this.setState({ totalMoney });
  };

  getReservedFlightSeats = (flightCode) => {
    const flightSeatRef = ref(dbFirebase, `flights/${flightCode}/lockingSeats`);
    onValue(flightSeatRef, (snapshot) => {
      let lockingSeats = [];
      snapshot.forEach((snapshotChild) => {
        let dataChild = snapshotChild.val();
        dataChild["key"] = snapshotChild.key;
        lockingSeats.push(dataChild);
      });
      this.setState({
        lockingSeats,
      });
    });
  };

  getLockedSeats = async (flightTicket) => {
    await publicService
      .getLockedFlightSeats(flightTicket.FlightId)
      .then((res) => {
        this.setState({
          lockedSeats: res.data,
        });
      });
  };

  onSelectSeatFlight = (seatInfo, choosedPassengerId) => {
    let { reservationData, flightTicket, lockingSeats, ipAddress } = this.state;
    let oldSeatCode = "";
    let totalSeatFee = 0;
    const customerCode = localStorage.getItem("_flight_t5_ctm_code");
    reservationData.passengers.forEach((psg) => {
      if (psg.id === choosedPassengerId) {
        oldSeatCode = psg["seatInfo"].seatCode;
        psg["seatInfo"] = seatInfo;
      }
      totalSeatFee += psg["seatInfo"]["fee"];
    });
    let isSeatExist = false;
    lockingSeats.forEach((seat, index) => {
      if (seat.seatCode === seatInfo.seatCode) {
        isSeatExist = true;
      }
      if (seat.seatCode === oldSeatCode) {
        lockingSeats.splice(index, 1);
      }
    });

    if (!isSeatExist) {
      seatInfo["ipAddress"] = ipAddress;
      seatInfo["customerCode"] = customerCode;
      let expires = new Date();
      expires.setMinutes(expires.getMinutes() + 5);
      seatInfo["expires"] = expires.toJSON();
      lockingSeats.push(seatInfo);
      set(ref(dbFirebase, `flights/${flightTicket.Flight.FlightCode}`), {
        lockingSeats,
      });
    }
    this.setState({ reservationData, totalSeatFee });
  };

  onContinue = async () => {
    const { reservationData, flightTicket } = this.state;
    const bookingTicketsPsg = [];
    this.setState({
      isLoading: true
    })
    reservationData.passengers.forEach((psg) => {
      bookingTicketsPsg.push({
        SeatFlightCode: psg.seatInfo.seatCode,
        SeatFlightFee: psg.seatInfo.fee,
        PassengerName: psg.fullName,
        PassengerGender: checkGender(psg.gender),
        PassengerBirthday: psg.birthday,
        PassengerIdentityNumber: psg.identityNumber,
        PassengerType: psg.passengerType,
      });
    });
    const dataConvert = {
      TicketId: flightTicket.Id,
      ContactName: reservationData.contactInfo.contactName,
      ContactPhone: reservationData.contactInfo.phone,
      ContactEmail: reservationData.contactInfo.email,
      ContactAddress: reservationData.contactInfo.address,
      Note: reservationData.contactInfo.note,
      BookingTickets: bookingTicketsPsg,
      PaymentMethod: reservationData.paymentMethod.type,
    };
    const currentUser = JSON.parse(localStorage.getItem("auth_user"));
    if (currentUser !== "" && currentUser !== null) {
      dataConvert["UserId"] = currentUser.Id;
    }
    await publicService
      .bookingTicket(dataConvert)
      .then((res) => {
        this.setState({
          isRedirect: true,
          bookingData: res.data,
          isLoading: false
        });
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: BonusService.jsx ~ line 101 ~ BonusServices ~ onContinue= ~ err",
          err
        );
      });
  };

  checkExpiresReserveSeat = (seatCode) => {
    let { lockingSeats, flightTicket, reservationData } = this.state;
    lockingSeats.forEach((seat, index) => {
      if (seat.seatCode === seatCode) {
        lockingSeats.splice(index, 1);
      }
    });
    set(ref(dbFirebase, `flights/${flightTicket.Flight.FlightCode}`), {
      lockingSeats,
    });
    reservationData.passengers.forEach((psg) => {
      if (psg.seatInfo.seatCode == seatCode) {
        psg.seatInfo.seatCode = "";
      }
    });
    this.setState({ reservationData });
  };

  render() {
    let {
      reservationData,
      flightTicket,
      flightTicketReturn,
      passengers,
      lockingSeats,
      totalMoney,
      totalSeatFee,
      isRedirect,
      lockedSeats,
      bookingData,
      ipAddress,
      isLoading,
    } = this.state;
    if (isRedirect) {
      return (
        <Redirect
          to={{
            pathname: "/payment",
            state: {
              bookingData,
              totalMoney,
            },
          }}
        />
      );
    }
    return (
      <>
        <NavbarV2 />
        <div className="wrap-container">
          <BookingStepBar step={3} />
          <div className="row">
            <div className="col-md-12">
              <FlightSeatService
                reservationData={reservationData}
                flightTicket={flightTicket}
                flightTicketReturn={flightTicketReturn}
                passengers={passengers}
                onSelectSeatFlight={this.onSelectSeatFlight}
                reservedSeats={lockingSeats}
                totalSeatFee={totalSeatFee}
                lockedSeats={lockedSeats}
                ipAddress={ipAddress}
                checkExpiresReserveSeat={this.checkExpiresReserveSeat}
              />
            </div>
          </div>
        </div>
        <CheckoutStepBar
          totalMoney={totalMoney + totalSeatFee}
          onContinue={this.onContinue}
        />
        <Backdrop
          sx={{ color: "#fff", zIndex: 9999 }}
          open={isLoading}
          onClose={this.handleCloseLoading}
        >
          <Box sx={{ width: "80%" }}>
            <Typography variant="h6" component="div" align="center" marginBottom={2}>Flight T5 Loading ...</Typography>
            <LinearProgress />
          </Box>
        </Backdrop>
      </>
    );
  }
}

export default withRouter(BonusServices);
