import React, { Component } from "react";
import "./SearchTicketBox.scss";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getDateTimeNow } from "../../../../../Helpers/datetime";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Search from "@mui/icons-material/Search";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Location } from "./Location/Location";
import { Redirect, withRouter } from "react-router-dom";
import { getDate } from "../../../../../Helpers/datetime";

const TRIP_TYPE = {
  ONEWAY: 1,
  ROUNDTRIP: 2,
};

class SearchTicketBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripType: 1,
      adults: 1,
      children: 0,
      infants: 0,
      searchData: {
        departure: "",
        destination: "",
        departureDate: getDateTimeNow(),
        returnDate: getDateTimeNow(),
        tripType: TRIP_TYPE.ONEWAY,
      },

      openLocationDialog: false,
      locationType: "",
      isRedirect: false,
    };
  }


  componentWillReceiveProps(nextProps) {
    if(typeof nextProps.passengers !== 'undefined') {
      this.getSearchFlightTicketInfo(nextProps);
    }
  }

  getSearchFlightTicketInfo = (nextProps) => {
    const { departure, destination, passengers } = nextProps;
    let { searchData, adults, children, infants } = this.state;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchParams = {
      departureId: urlParams.get("departure"),
      destinationid: urlParams.get("destination"),
      departureDate: urlParams.get("departureDate"),
      tripType: urlParams.get("tripType"),
      returnDate: urlParams.get("returnDate"),
    };

    passengers.forEach((psg) => {
      if (psg.passengerType === "adults") adults = psg.quantity;
      if (psg.passengerType === "children") children = psg.quantity;
      if (psg.passengerType === "infants") infants = psg.quantity;
    });

    this.setState({
      adults,
      children,
      infants,
      searchData: {
        ...searchData,
        departure,
        destination,
        tripType: searchParams.tripType,
        departureDate: searchParams.departureDate,
        returnDate: searchParams.returnDate || new Date(),
      },
    });
  };

  handleChangeTripType = (ev) => {
    this.setState({
      tripType: ev.target.value,
    });
  };

  handleOpenDialog = (locationType) => {
    this.setState({
      open: true,
      locationType,
    });
  };

  selectLocation = (location) => {
    let { searchData, locationType } = this.state;
    if (locationType === "departure") {
      searchData["departure"] = location;
    } else if (locationType === "destination") {
      searchData["destination"] = location;
    }
    this.setState({
      searchData,
      open: false,
    });
  };

  onCloseDialog = () => {
    this.setState({
      open: false,
    });
  };

  handleDepartureDate = (newValue) => {
    let { searchData } = this.state;
    searchData["departureDate"] = getDate(newValue);
    this.setState({
      searchData,
    });
  };

  changeQuantityPassenger = (passengerType, action) => {
    switch (passengerType) {
      case 1:
        this.setQuantityPassenger(action, "adults", this.state.adults);
        break;
      case 2:
        this.setQuantityPassenger(action, "children", this.state.children);
        break;
      case 3:
        this.setQuantityPassenger(action, "infants", this.state.infants);
        break;
      default:
        break;
    }
  };

  setQuantityPassenger = (action, stateName, stateValue) => {
    if (action == 1) {
      this.setState({
        [stateName]: stateValue + 1,
      });
    } else if (action == 0 && stateValue > 0 && stateName !== "adults") {
      this.setState({
        [stateName]: stateValue - 1,
      });
    } else if (action == 0 && stateValue >= 2 && stateName == "adults") {
      this.setState({
        [stateName]: stateValue - 1,
      });
    }
  };

  handleReturnDate = (newValue) => {
    let { searchData } = this.state;
    searchData["returnDate"] = getDate(newValue);
    this.setState({
      searchData,
    });
  };

  handleChangeTripType = (ev) => {
    const { name, value } = ev.target;
    let { searchData } = this.state;
    searchData["tripType"] = parseInt(value);
    this.setState({
      searchData,
    });
  };
  onSearchFlight = () => {
    this.setState({
      isRedirect: true,
    });
  };

  render() {
    const { departure, destination, departureDate, returnDate, tripType } =
      this.state.searchData;
    const { open, locations, isRedirect, children, infants, adults } =
      this.state;

    if (isRedirect) {
      const pathName = "/flight-ticket";
      const queryParams = `?tripType=${tripType}&departure=${departure.Id}&destination=${destination.Id}&departureDate=${departureDate}`;
      const pushState = {
        passengers: [
          {
            id: 1,
            passengerType: "adults",
            quantity: adults,
          },
          {
            id: 2,
            passengerType: "children",
            quantity: children,
          },
          {
            id: 3,
            passengerType: "infants",
            quantity: infants,
          },
        ],
        departure,
        destination,
      };
      window.history.pushState(pushState, '', pathName + queryParams)
      window.location.replace(`/flight-ticket${queryParams}`);
      localStorage.setItem('search_data', JSON.stringify(pushState));
      // return (
      //   <Redirect
      //     exact
      //     to={{
      //       pathname: pathName,
      //       search: queryParams,
      //       state: pushState,
      //     }}
      //   />
      // );
    }

    return (
      <>
        <div id="search-ticket-box">
          <div className="wrap-container">
            <div className="search-flight-bar">
              <div className="row">
                <div className="col-md-12">
                  <div className="formcheck">
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="checkedB"
                          color="primary"
                          className="check-box"
                          value={TRIP_TYPE.ROUNDTRIP}
                          checked={tripType == TRIP_TYPE.ROUNDTRIP}
                          onChange={this.handleChangeTripType}
                        />
                      }
                      label="Round trip"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="checkedB"
                          color="primary"
                          className="check-box"
                          value={TRIP_TYPE.ONEWAY}
                          checked={tripType == TRIP_TYPE.ONEWAY}
                          onChange={this.handleChangeTripType}
                        />
                      }
                      label="One Way"
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <TextField
                    className="departure"
                    label="Departure"
                    value={departure && departure.City.Name}
                    variant="outlined"
                    onClick={() => this.handleOpenDialog("departure")}
                  />
                </div>
                <div className="col-md-4">
                  <TextField
                    className="destination"
                    label="Destination"
                    value={destination && destination.City.Name}
                    variant="outlined"
                    onClick={() => this.handleOpenDialog("destination")}
                  />
                </div>
                <div className="col-md-4">
                  <div className="passenger-type">
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="choose-quantity">
                          <label className="title-passenger">Adults</label>
                          <div className="content">
                            <RemoveCircleOutlineIcon
                              onClick={() => this.changeQuantityPassenger(1, 0)}
                              className="icon"
                            />
                            <span className="quantity">
                              {this.state.adults}
                            </span>
                            <AddCircleOutlineIcon
                              onClick={() => this.changeQuantityPassenger(1, 1)}
                              className="icon"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="choose-quantity">
                          <label className="title-passenger">Children</label>
                          <div className="content">
                            <RemoveCircleOutlineIcon
                              onClick={() => this.changeQuantityPassenger(2, 0)}
                              className="icon"
                            />
                            <span className="quantity">
                              {this.state.children}
                            </span>
                            <AddCircleOutlineIcon
                              onClick={() => this.changeQuantityPassenger(2, 1)}
                              className="icon"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="choose-quantity">
                          <label className="title-passenger">Infants</label>
                          <div className="content">
                            <RemoveCircleOutlineIcon
                              onClick={() => this.changeQuantityPassenger(3, 0)}
                              className="icon"
                            />
                            <span className="quantity">
                              {this.state.infants}
                            </span>
                            <AddCircleOutlineIcon
                              onClick={() => this.changeQuantityPassenger(3, 1)}
                              className="icon"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="input-destination">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Departure Date"
                        value={departureDate}
                        inputFormat="dd/MM/yyyy"
                        onChange={this.handleDepartureDate}
                        renderInput={(params) => <TextField {...params} />}
                        disablePast
                      />
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="input-destination">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        disabled={tripType === TRIP_TYPE.ONEWAY}
                        label="Destination Date"
                        value={returnDate}
                        inputFormat="dd/MM/yyyy"
                        onChange={this.handleReturnDate}
                        renderInput={(params) => <TextField {...params} />}
                        disablePast
                      />
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="search">
                    <Button
                      onClick={this.onSearchFlight}
                      variant="contained"
                      className="btn-search-form"
                      startIcon={<Search />}
                    >
                      Search flights
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Location
          open={open}
          selectLocation={this.selectLocation}
          onCloseDialog={this.onCloseDialog}
        />
      </>
    );
  }
}

export default withRouter(SearchTicketBox);
