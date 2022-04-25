import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import Reservation from "../Reservation/Reservation";
import CheckoutStepBar from "../Shared/Components/CheckoutStepBar/CheckoutStepBar";
import NavbarV2 from "../Shared/Components/NavbarV2/NavbarV2";
import { SearchTicketBox } from "../Shared/Components/SearchTicketBox/SearchTicketBox";
import publicService from "../Shared/Services/PublicService";
import { BookingStepBar } from "./Components/BookingStepBar/BookingStepBar";
import { FilterFlightBox } from "./Components/FilterFlightBox/FilterFlightBox";
import { SelectDateTicketBox } from "./Components/SelectDateTicketBox/SelectDateTicketBox";
import { TicketItem } from "./Components/TicketItem/TicketItem";

class FlightTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flightTickets: [],
      departureId: "",
      destinationid: "",
      departureDate: new Date(),
      choosedFlightTicket: "",
      totalMoney: 0,
      isRedirect: false
    };
  }

  componentDidMount() {
    this.getFlightTicketList();
    this.setDepartureDateFromParamUrl();
  }

  setDepartureDateFromParamUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const departureDate = urlParams.get("departureDate");
    this.setState({
      departureDate,
    });
  };

  getFlightTicketList = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchData = {
      departureId: urlParams.get("departure"),
      destinationid: urlParams.get("destination"),
      departureDate: urlParams.get("departureDate"),
    };
    await publicService.getFlightTickets(searchData).then((res) => {
      this.setState({
        flightTickets: res.data,
      });
    });
  };

  handleDepartureDate = async (departureDate) => {
    this.setState({
      departureDate,
    });
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchData = {
      departureId: urlParams.get("departure"),
      destinationid: urlParams.get("destination"),
      departureDate,
    };
    await publicService.getFlightTickets(searchData).then((res) => {
      this.setState({
        flightTickets: res.data,
      });
    });
  };

  onChooseFlightTicket = (flightTicket, status) => {
    let { totalMoney, choosedFlightTicket } =  this.state;
    const { passengers } = this.props.location.state;
    if (status === "cancel") {
        totalMoney = 0;
        choosedFlightTicket = '';
    } else {
      passengers.forEach((psg) => {
        if (psg.quantity > 0) {
          totalMoney += psg.quantity * flightTicket.Price + flightTicket.Tax;
        }
      });
      choosedFlightTicket = flightTicket;
    }
    this.setState({
      totalMoney, choosedFlightTicket
    });
  };


  onContinue = () => {
    this.setState({
      isRedirect: true
    })
  }

  render() {
    const { flightTickets, departureDate, choosedFlightTicket, totalMoney, isRedirect } =
      this.state;
    const { passengers, departure, destination } = this.props.location.state;
    if(isRedirect) {
      return <Redirect to={{
        pathname: '/reservation',
        state: {
          flightTicket: choosedFlightTicket,
          passengers
        }
      }} />
    }
    return (
      <>
        <NavbarV2 />
        <div className="wrap-container">
          <div className="row">
            <SearchTicketBox />
            <BookingStepBar />
            <div className="col-md-3">
              <FilterFlightBox />
            </div>
            <div className="col-md-9">
              <SelectDateTicketBox
                departureDateTime={departureDate}
                departure={departure}
                destination={destination}
                handleDepartureDate={this.handleDepartureDate}
              />
              {flightTickets.map((item, index) => {
                return (
                  <TicketItem
                    key={index}
                    data={item}
                    passengers={passengers}
                    onChooseFlightTicket={this.onChooseFlightTicket}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <CheckoutStepBar totalMoney={totalMoney} onContinue={this.onContinue} />
      </>
    );
  }
}

export default withRouter(FlightTicket);
