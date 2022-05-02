import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import Reservation from "../Reservation/Reservation";
import CheckoutStepBar from "../Shared/Components/CheckoutStepBar/CheckoutStepBar";
import NavbarV2 from "../Shared/Components/NavbarV2/NavbarV2";
import SearchTicketBox from "../Shared/Components/SearchTicketBox/SearchTicketBox";
import publicService from "../Shared/Services/PublicService";
import { BookingStepBar } from "./Components/BookingStepBar/BookingStepBar";
import { FilterFlightBox } from "./Components/FilterFlightBox/FilterFlightBox";
import { SelectDateTicketBox } from "./Components/SelectDateTicketBox/SelectDateTicketBox";
import { TicketItem } from "./Components/TicketItem/TicketItem";
import { FlightAmination } from "./Components/FlightAmination/FlightAmination";
import { Alert, Snackbar, Stack } from "@mui/material";

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
      flightTicketsDepartureAll: [],
      flightTicketsReturn: [],
      flightTicketsReturnAll: [],
      departureId: "",
      destinationid: "",
      departureDate: new Date(),
      returnDate: new Date(),
      choosedFlightTicket: "",
      choosedFlightTicketReturn: "",
      totalMoney: 0,
      totalMoneyReturn: 0,
      isRedirect: false,
      viewMode: VIEW_MODE.BASIC_FARE_FOR_ADULTS,
      filterByDepartHours: [],
      filterByLandingHours: [],
      airlineList: [],
      filterByAirline: 0,
      sortType: FLIGHT_TICKET_SORT_TYPE.HIGHT_TO_LOW,
      alert: {
        show: false,
        message: "",
      },
    };
  }
  componentDidMount() {
    this.getFlightTicketDepartureAll();
    this.getFlightTicketReturnAll();
    this.getFlightTicketList();
    this.getFlightTicketReturnList();
    this.setDepartureDateFromParamUrl();
    this.getAirlineList();
  }

  getFlightTicketDepartureAll = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchData = {
      departureId: urlParams.get("departure"),
      destinationId: urlParams.get("destination"),
    };
    await publicService.getFlightTickets(searchData)
      .then(res => {
        this.setState({
          flightTicketsDepartureAll: res.data
        })
      })
  }

  getFlightTicketReturnAll = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchData = {
      departureId: urlParams.get("destination"),
      destinationId: urlParams.get("departure"),
    };
    await publicService.getFlightTickets(searchData)
      .then(res => {
        this.setState({
          flightTicketsReturnAll: res.data
        })
      })
  }

  setDepartureDateFromParamUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const departureDate = urlParams.get("departureDate");
    const returnDate = urlParams.get("returnDate");
    this.setState({
      departureDate,
      returnDate
    });
  };

  getAirlineList = async () => {
    await publicService.getAirlineList().then((res) => {
      this.setState({
        airlineList: res.data,
      });
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

  getFlightTicketReturnList = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchData = {
      departureId: urlParams.get("destination"),
      destinationid: urlParams.get("departure"),
      departureDate: urlParams.get("returnDate"),
    };
    await publicService.getFlightTickets(searchData).then((res) => {
      this.setState({
        flightTicketsReturn: res.data,
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
      destinationId: urlParams.get("destination"),
      departureDate,
    };
    await publicService.getFlightTickets(searchData).then((res) => {
      this.setState({
        flightTickets: res.data,
      });
    });
  };

  handleReturnDate = async (returnDate) => {
    this.setState({
      returnDate,
    });
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchData = {
      departureId: urlParams.get("destination"),
      destinationId: urlParams.get("departure"),
      returnDate,
    };
    await publicService.getFlightTickets(searchData).then((res) => {
      this.setState({
        flightTicketsReturn: res.data,
      });
    });
  };

  onChooseFlightTicket = (flightTicket, status) => {
    let { totalMoney, choosedFlightTicket } = this.state;
    const { state } = this.props.location;
    let passengers = [];
    if (typeof state !== "undefined") {
      passengers = state.passengers;
    } else {
      const searchData = JSON.parse(localStorage.getItem("search_data"));
      passengers = searchData.passengers;
    }
    totalMoney = 0;
    if (status === "cancel") {
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

  onChooseFlightTicketReturn = (flightTicket, status) => {
    let { totalMoneyReturn, choosedFlightTicketReturn } = this.state;
    const { state } = this.props.location;
    let passengers = [];
    if (typeof state !== "undefined") {
      passengers = state.passengers;
    } else {
      const searchData = JSON.parse(localStorage.getItem("search_data"));
      passengers = searchData.passengers;
    }
    totalMoneyReturn = 0;
    if (status === "cancel") {
      choosedFlightTicketReturn = "";
    } else {
      passengers.forEach((psg) => {
        if (psg.quantity > 0) {
          totalMoneyReturn += psg.quantity * flightTicket.Price + flightTicket.Tax;
        }
      });
      choosedFlightTicketReturn = flightTicket;
    }
    this.setState({
      totalMoneyReturn,
      choosedFlightTicketReturn,
    });
  };

  onContinue = () => {
    let { alert, choosedFlightTicket, isRedirect } = this.state;
    if (choosedFlightTicket !== "") {
      isRedirect = true;
    } else {
      alert = {
        ...alert,
        show: true,
        message: "Please choose flight ticket before continue",
      };
    }
    this.setState({ isRedirect, alert });
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

    this.setState({ flightTickets, sortType });
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

  filterFlightTicketByAirline = (scopeAirline) => {
    this.setState({
      filterByAirline: scopeAirline,
    });
  };

  render() {
    const {
      departureDate,
      choosedFlightTicket,
      choosedFlightTicketReturn,
      totalMoney,
      totalMoneyReturn,
      isRedirect,
      viewMode,
      filterByDepartHours,
      filterByLandingHours,
      airlineList,
      filterByAirline,
      sortType,
      redirectToObject,
      returnDate,
      alert,
    } = this.state;
    let { flightTickets, flightTicketsReturn, flightTicketsDepartureAll, flightTicketsReturnAll } = this.state;
    let passengers = "";
    let departure = "";
    let destination = "";
    const { state } = this.props.location;
    if (state !== null && typeof state !== "undefined") {
      passengers = state.passengers;
      departure = state.departure;
      destination = state.destination;
    } else {
      const searchDataLocal = JSON.parse(localStorage.getItem("search_data"));
      if (searchDataLocal !== null) {
        passengers = searchDataLocal.passengers;
        departure = searchDataLocal.departure;
        destination = searchDataLocal.destination;
      }
    }

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

    if (filterByAirline != 0) {
      flightTickets = flightTickets.filter((ticket) => {
        return ticket.Flight.Airline.Id == filterByAirline;
      });
    }

    if (isRedirect) {
      return (
        <Redirect
          to={{
            pathname: "/reservation",
            state: {
              flightTicket: choosedFlightTicket,
              flightTicketReturn: choosedFlightTicketReturn,
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
            <SearchTicketBox
              departure={departure}
              destination={destination}
              passengers={passengers}
            />
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
                airlineList={airlineList}
                filterFlightTicketByAirline={this.filterFlightTicketByAirline}
              />
            </div>
            <div className="col-md-9">
              <SelectDateTicketBox
                departureDateTime={departureDate}
                departure={departure}
                destination={destination}
                handleDepartureDate={this.handleDepartureDate}
                filterByAirline={filterByAirline}
                sortType={sortType}
                viewMode={viewMode}
                filterByDepartHours={filterByDepartHours}
                filterByLandingHours={filterByLandingHours}
                flightTicketAll={flightTicketsDepartureAll}
              />
              {flightTickets.map((item, index) => {
                return (
                  <TicketItem
                    key={index}
                    data={item}
                    passengers={passengers}
                    onChooseFlightTicket={this.onChooseFlightTicket}
                    viewMode={viewMode}
                    choosedFlightTicket={choosedFlightTicket}
                  />
                );
              })}

              {/* Return Date */}
              <SelectDateTicketBox
                departureDateTime={returnDate}
                departure={destination}
                destination={departure}
                handleDepartureDate={this.handleReturnDate}
                filterByAirline={filterByAirline}
                sortType={sortType}
                viewMode={viewMode}
                filterByDepartHours={filterByDepartHours}
                filterByLandingHours={filterByLandingHours}
                flightTicketAll={flightTicketsReturnAll}
              />
              {flightTicketsReturn.map((item, index) => {
                return (
                  <TicketItem
                    key={index}
                    data={item}
                    passengers={passengers}
                    onChooseFlightTicket={this.onChooseFlightTicketReturn}
                    viewMode={viewMode}
                    choosedFlightTicket={choosedFlightTicketReturn}
                  />
                );
              })}
              {flightTickets.length === 0 || flightTicketsReturn.length === 0 && <FlightAmination />}
              <CheckoutStepBar
                totalMoney={totalMoney + totalMoneyReturn}
                onContinue={this.onContinue}
              />
            </div>
          </div>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={alert.show}
          onClose={() => this.setState({ openAlertSearchForn: false })}
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

export default withRouter(FlightTicket);
