import React, { Component } from "react";
import { Payment } from "./Components/Payment/Payment";
import { SelectedFlight } from "./Components/SelectedFlight/SelectedFlight";
import CustomerInfomation from "./Components/CustomerInfomation/CustomerInfomation";
import { Redirect, withRouter } from "react-router-dom";
import NavbarV2 from "../Shared/Components/NavbarV2/NavbarV2";
import { BookingStepBar } from "../ChooseFlightTicket/Components/BookingStepBar/BookingStepBar";
import { ContactsInfo } from "./Components/ContactsInfo/ContactsInfo";
import "./Reservation.scss";
import { Alert, Snackbar, Stack } from "@mui/material";
import Payments from "../Payment/Payments";

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flightTicket: "",
      flightTicketReturn: '',
      passengers: "",
      isContinue: false,
      isRedirect: false,
      reservationData: '',
      alert: {
        show: false,
        message: ''
      }
    };
  }
  passengers = "";
  contactInfo = "";

  componentDidMount = () => {
    window.scrollTo(0, 0);
    this.getChoosedFlightTicket();
  };

  getChoosedFlightTicket = () => {
    const { flightTicket, passengers, flightTicketReturn } = this.props.location.state;
    this.setState({
      flightTicket,
      passengers,
      flightTicketReturn
    });
  };

  onContinute = async (paymentMethod = "") => {
    this.setState({
      isContinue: true,
    });
    await this.checkPropertiesNotNull(this.passengers);
    await this.checkPropertiesNotNull(this.contactInfo);
    if (
      this.passengers !== "" &&
      this.contactInfo !== "" &&
      paymentMethod !== ""
    ) {
      const reservationData = {
        passengers: this.passengers,
        contactInfo: this.contactInfo,
        paymentMethod
      };
      this.setState({
        isRedirect: true,
        reservationData
      });
    } else {
      this.setState({
        alert: { show: true, message: 'Please fill out the information completely' }
      })
    }
  };

  checkPropertiesNotNull = async (property) => {
    return await property;
  };

  handleCustomerInfomation = (customerInfo) => {
    this.passengers = customerInfo;
  };

  handleContactInfo = (contactInfo) => {
    this.contactInfo = contactInfo;
  };

  render() {
    const { flightTicket, flightTicketReturn, passengers, isContinue, isRedirect, reservationData, alert } = this.state;
    if (isRedirect) {
      return (
        <Redirect
          to={{
            pathname: "/bonus-service",
            state: {
              reservationData,
              flightTicket,
              passengers,
              flightTicketReturn
            },
          }}
        />
      );
    }
    return (
      <>
        <NavbarV2 />
        <div className="wrap-container">
          <div className="style">
            <BookingStepBar step={2} />
          </div>
          <div className="row">
            <SelectedFlight passengers={passengers} flightTicket={flightTicket} />
          
            {
              flightTicketReturn !== '' && <SelectedFlight flightTicket={flightTicketReturn} />
            }
            <CustomerInfomation
              passengers={passengers}
              isContinue={isContinue}
              handleCustomerInfomation={this.handleCustomerInfomation}
            />
            <ContactsInfo
              isContinue={isContinue}
              handleContactInfo={this.handleContactInfo}
            />
            <Payment onContinute={this.onContinute} />
          </div>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={alert.show}
          onClose={() => this.setState({ alert: { ...alert, show: false } })}
          message=""
          autoHideDuration={3000}
          key={"bottom" + "left"}
        >
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert variant="filled" severity="error">
              {alert.message}
            </Alert>
          </Stack>
        </Snackbar>
      </>
    );
  }
}

export default withRouter(Reservation);
