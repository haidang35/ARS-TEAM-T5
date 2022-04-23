import React, { Component } from "react";
import { Payment } from "./Components/Payment/Payment";
import { SelectedFlight } from "./Components/SelectedFlight/SelectedFlight";
import CustomerInfomation from "./Components/CustomerInfomation/CustomerInfomation";
import { withRouter } from "react-router-dom";
import NavbarV2 from "../Shared/Components/NavbarV2/NavbarV2";
import { BookingStepBar } from "../ChooseFlightTicket/Components/BookingStepBar/BookingStepBar";
import { ContactsInfo } from "./Components/ContactsInfo/ContactsInfo";


class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flightTicket: "",
      passengers: "",
      isContinue: false,
      isRedirect: false,
   
    };
  }
  passengers = "";
  contactInfo = "";

  componentDidMount = () => {
    this.getChoosedFlightTicket();
  };

  getChoosedFlightTicket = () => {
    const { flightTicket, passengers } = this.props.location.state;
    this.setState({
      flightTicket,
      passengers,
    });
  };

  onContinute = async (paymentMethod = '') => {
    this.setState({
      isContinue: true,
    });
    await this.checkPropertiesNotNull(this.passengers);
    await this.checkPropertiesNotNull(this.contactInfo);
    if(this.passengers !== "" && this.contactInfo !== "" && paymentMethod !== '') {
        console.log("🚀 ~ file: Reservation.jsx ~ line 42 ~ Reservation ~ onContinute= ~ paymentMethod", paymentMethod)
    }
  };

  checkPropertiesNotNull = async (property) => {
    return await property;
  }

  handleCustomerInfomation =  (customerInfo) => {
     this.passengers = customerInfo;
  };

  handleContactInfo =  (contactInfo) => {
    this.contactInfo = contactInfo;
  };


  render() {
    const { flightTicket, passengers, isContinue, isRedirect } = this.state;
    return (
      <>
        <NavbarV2 />
        <div className="wrap-container">
          <div className="row">
            <BookingStepBar />
            <SelectedFlight   flightTicket={flightTicket} />
            <CustomerInfomation
              passengers={passengers}
              isContinue={isContinue}
              handleCustomerInfomation={this.handleCustomerInfomation}
            />
            <ContactsInfo isContinue={isContinue} handleContactInfo={this.handleContactInfo}/>
            <Payment onContinute={this.onContinute} />
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Reservation);
