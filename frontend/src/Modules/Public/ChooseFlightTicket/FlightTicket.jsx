import React, { Component } from "react";
import { withRouter } from "react-router-dom";
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
    };
    await publicService.getFlightTickets(searchData).then((res) => {
      this.setState({
        flightTickets: res.data,
      });
    });
  };

  handleDepartureDate = (departureDate) => {
    this.setState({
      departureDate
    });
  };

  render() {
    const { flightTickets, departureDate } = this.state;
    const { passengers, departure, destination } = this.props.location.state;
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
                flightTicketList={flightTickets}
                handleDepartureDate={this.handleDepartureDate}
              />
              {flightTickets.map((item, index) => {
                return (
                  <TicketItem key={index} data={item} passengers={passengers} />
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(FlightTicket);
