import React, { Component } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Typography } from "@mui/material";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import "./SelectDateTicketBox.scss";
import { dateConvert, getDayOfWeek } from "../../../../../Helpers/datetime";
import { formatCurrencyToVND } from "../../../../../Helpers/currency";
import publicService from "../../../Shared/Services/PublicService";
import { FLIGHT_TICKET_SORT_TYPE, VIEW_MODE } from "../../FlightTicket";

export class SelectDateTicketBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDate: [],
      flightTicketList: [],
      flightListOrg: [],
      departureDate: "",
    };
  }

  componentDidMount = () => {
    this.getFlightTicketList();
  };

  getFlightTicketList = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchData = {
      departureId: urlParams.get("departure"),
      destinationId: urlParams.get("destination"),
    };
    await publicService.getFlightTickets(searchData).then((res) => {
      this.getDaysOfWeek(this.props.departureDateTime, res.data);
      this.setState({
        flightTicketList: res.data,
      });
    });
  };

  componentWillReceiveProps = (nextProps) => {
    const departureDate = nextProps.departureDateTime;
    const {
      filterByAirline,
      sortType,
      viewMode,
      filterByDepartHours,
      filterByLandingHours,
    } = nextProps;
    let { flightTicketList } = this.state;
    if (filterByAirline != 0) {
      flightTicketList = flightTicketList.filter((ticket) => {
        return ticket.Flight.Airline.Id == filterByAirline;
      });
    }

    switch (sortType) {
      case FLIGHT_TICKET_SORT_TYPE.LOW_TO_HIGH:
        flightTicketList = flightTicketList.sort((a, b) => {
          return a.Price - b.Price;
        });
        break;
      case FLIGHT_TICKET_SORT_TYPE.HIGHT_TO_LOW:
        flightTicketList = flightTicketList.sort((a, b) => {
          return b.Price - a.Price;
        });
        break;
      case FLIGHT_TICKET_SORT_TYPE.DEPART_HOUR:
        flightTicketList = flightTicketList.sort((a, b) => {
          return this.sortDepartHour(
            a.Flight.DepartureTime,
            b.Flight.DepartureTime
          );
        });
        break;
      case FLIGHT_TICKET_SORT_TYPE.FLIGHT_TIME:
        flightTicketList = flightTicketList.sort((a, b) => {
          return this.sortFlightTime(a.Flight, b.Flight);
        });
        break;
    }
    if (filterByDepartHours.length === 2) {
      flightTicketList = flightTicketList.filter((ticket) => {
        const departTime = new Date(ticket.Flight.DepartureTime);
        return (
          departTime.getHours() >= filterByDepartHours[0] &&
          departTime.getHours() <= filterByDepartHours[1]
        );
      });
    }

    if (filterByLandingHours.length === 2) {
      flightTicketList = flightTicketList.filter((ticket) => {
        const arrivalTime = new Date(ticket.Flight.ArrivalTime);
        return (
          arrivalTime.getHours() >= filterByLandingHours[0] &&
          arrivalTime.getHours() <= filterByLandingHours[1]
        );
      });
    }

    this.getDaysOfWeek(departureDate, flightTicketList, viewMode);
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

  compareDate = (departureDate, date) => {
    let depaDate = new Date(departureDate);
    let newDate = new Date(date);
    return (
      depaDate.getDate() == newDate.getDate() &&
      newDate.getMonth() == depaDate.getMonth() &&
      depaDate.getFullYear() == newDate.getFullYear()
    );
  };

  onChangeViewMode = (viewMode) => {
    this.setState({
      viewMode,
    });
  };

  handleChangeDepartureDate = (data) => {
    this.props.handleDepartureDate(data.date);
  };

  getDaysOfWeek = (departureDate, ticketList, viewMode) => {
    let current = new Date(departureDate);
    let flightOnWeek = new Array(); // = []
    current.setDate(current.getDate() - 3);
    for (let i = 0; i < 7; i++) {
      let data = {
        id: i,
        date: new Date(current),
        ticketPrice: this.getPriceFlightTicket(
          ticketList,
          new Date(current),
          viewMode
        ),
      };
      flightOnWeek.push(data);
      current.setDate(current.getDate() + 1);
    }
    this.setState({
      listDate: flightOnWeek,
    });
  };

  getPriceFlightTicket(ticketList, date, viewMode) {
    for (let i = 0; i < ticketList.length; i++) {
      if (this.compareDate(ticketList[i].Flight.DepartureTime, date)) {
        let ticketPrice =
          viewMode == VIEW_MODE.BASIC_FARE_FOR_ADULTS
            ? ticketList[i].Price
            : ticketList[i].Price + ticketList[i].Tax;
        return ticketPrice;
      }
    }
    return "-";
  }

  render() {
    const { listDate, departureDate, flightTicketList } = this.state;
    const { departure, destination, departureDateTime, filterByAirline } =
      this.props;
    return (
      <>
        <div id="select-ticket-box">
          <div className="top-content-bar">
            <AirplanemodeActiveIcon className="icon-plane" />
            <div className="content">
              <div className="top-content">
                <Typography className="location-title">
                  {`${departure.City.Name}, ${departure.City.Province.Country} (${departure.AirPortCode})`}
                </Typography>
                <ArrowRightAltIcon className="icon-arrow" />
                <Typography className="location-title">
                  {`${destination.City.Name}, ${destination.City.Province.Country} (${destination.AirPortCode})`}
                </Typography>
              </div>
              <Typography className="departure-time">
                {getDayOfWeek(departureDateTime)} ,{" "}
                {dateConvert(departureDateTime)}
              </Typography>
            </div>
          </div>
          <div className="bottom-content-bar">
            <div className="row">
              {listDate.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => this.handleChangeDepartureDate(item)}
                    className={
                      this.compareDate(departureDate, item.date)
                        ? "item-box item-selected"
                        : "item-box"
                    }
                  >
                    <span className="item-date">{dateConvert(item.date)}</span>
                    <span className="item-day">{getDayOfWeek(item.date)}</span>
                    <span className="item-price">
                      {item.ticketPrice !== "-"
                        ? formatCurrencyToVND(item.ticketPrice)
                        : "-"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}
