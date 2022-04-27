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
import { FlightAmination } from "./Components/FlightAmination/FlightAmination";

export const FLIGHT_TICKET_SORT_TYPE = {
  LOW_TO_HIGH: 0,
  HIGHT_TO_LOW: 1,
  DEPART_HOUR: 2,
  FLIGHT_TIME: 3,
};

export const VIEW_MODE = {
  BASIC_FARE_FOR_ADULTS: 1,
  INCLUDE_TAX_AND_FEES: 2,
};

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
      isRedirect: false,
      viewMode: VIEW_MODE.BASIC_FARE_FOR_ADULTS,
      filterByDepartHours: [],
      filterByLandingHours: [],
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
    let { totalMoney, choosedFlightTicket } = this.state;
    const { passengers } = this.props.location.state;
    if (status === "cancel") {
      totalMoney = 0;
      choosedFlightTicket = "";
    } else {
      passengers.forEach((psg) => {
        if (psg.quantity > 0) {
          totalMoney += psg.quantity * flightTicket.Price + flightTicket.Tax;
        }
      });
      choosedFlightTicket = flightTicket;
    }
    this.setState({
      totalMoney,
      choosedFlightTicket,
    });
  };

  onContinue = () => {
    this.setState({
      isRedirect: true,
    });
  };

  onSortFlightTickets = (sortType) => {
    let { flightTickets } = this.state;
    switch (sortType) {
      case FLIGHT_TICKET_SORT_TYPE.LOW_TO_HIGH:
        flightTickets = flightTickets.sort((a, b) => {
          return a.Price - b.Price;
        });
        break;
      case FLIGHT_TICKET_SORT_TYPE.HIGHT_TO_LOW:
        flightTickets = flightTickets.sort((a, b) => {
          return b.Price - a.Price;
        });
        break;
      case FLIGHT_TICKET_SORT_TYPE.DEPART_HOUR:
        flightTickets = flightTickets.sort((a, b) => {
          return this.sortDepartHour(
            a.Flight.DepartureTime,
            b.Flight.DepartureTime
          );
        });
        break;
      case FLIGHT_TICKET_SORT_TYPE.FLIGHT_TIME:
        flightTickets = flightTickets.sort((a, b) => {
          return this.sortFlightTime(a.Flight, b.Flight);
        });
        break;
    }

    this.setState({ flightTickets });
  };

  sortDepartHour = (departureTimeA, departureTimeB) => {
    const departureTimeAConvert = new Date(departureTimeA);
    const departureTimeBConvert = new Date(departureTimeB);
    return departureTimeAConvert.getTime() - departureTimeBConvert.getTime();
  };

  sortFlightTime = (flightA, flightB) => {
    const departureTimeAConvert = new Date(flightA.DepartureTime);
    const arrivalTimeAConvert = new Date(flightA.ArrivalTime);
    const departureTimeBConvert = new Date(flightB.DepartureTime);
    const arrivalTimeBConvert = new Date(flightB.ArrivalTime);
    const flightTimeA =
      arrivalTimeAConvert.getTime() - departureTimeAConvert.getTime();
    const flightTimeB =
      arrivalTimeBConvert.getTime() - departureTimeBConvert.getTime();
    console.log("flightss", flightTimeA - flightTimeB);
    return flightTimeA - flightTimeB;
  };

  onChangeViewMode = (viewMode) => {
    this.setState({
      viewMode,
    });
  };

  filterFlightTicketByDepartHour = (departHour) => {
    this.setState({
      filterByDepartHours: departHour,
    });
  };

  filterFlightTicketByLandingHour = (landingHour) => {
    this.setState({
      filterByLandingHours: landingHour,
    });
  };

  render() {
    const {
      departureDate,
      choosedFlightTicket,
      totalMoney,
      isRedirect,
      viewMode,
      filterByDepartHours,
      filterByLandingHours,
    } = this.state;
    let { flightTickets } = this.state;
    const { passengers, departure, destination } = this.props.location.state;
    if (filterByDepartHours.length === 2) {
      flightTickets = flightTickets.filter((ticket) => {
        const departTime = new Date(ticket.Flight.DepartureTime);
        return (
          departTime.getHours() >= filterByDepartHours[0] &&
          departTime.getHours() <= filterByDepartHours[1]
        );
      });
    }

    if (filterByLandingHours.length === 2) {
      flightTickets = flightTickets.filter((ticket) => {
        const arrivalTime = new Date(ticket.Flight.ArrivalTime);
        return (
          arrivalTime.getHours() >= filterByLandingHours[0] &&
          arrivalTime.getHours() <= filterByLandingHours[1]
        );
      });
    }

    if (isRedirect) {
      return (
        <Redirect
          to={{
            pathname: "/reservation",
            state: {
              flightTicket: choosedFlightTicket,
              passengers,
            },
          }}
        />
      );
    }
    return (
      <>
        <NavbarV2 />
        <div className="wrap-container">
          <div className="row">
            <SearchTicketBox />
            <BookingStepBar step={1} />
            <div className="col-md-3">
              <FilterFlightBox
                onSortFlightTickets={this.onSortFlightTickets}
                onChangeViewMode={this.onChangeViewMode}
                filterFlightTicketByDepartHour={
                  this.filterFlightTicketByDepartHour
                }
                filterFlightTicketByLandingHour={
                  this.filterFlightTicketByLandingHour
                }
              />
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
                    viewMode={viewMode}
                  />
                );
              })}
              <FlightAmination />
              <CheckoutStepBar
                totalMoney={totalMoney}
                onContinue={this.onContinue}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(FlightTicket);
