import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./TicketItem.scss";
import { Button } from "@mui/material";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { FlightDetails } from "../FlightDetails/FlightDetails";
import { getTime } from "../../../../../Helpers/datetime";
import { formatCurrencyToVND } from "../../../../../Helpers/currency";
import { VIEW_MODE } from "../../FlightTicket";
import { BASE_URL_SERVER } from "../../../../../Configs/server";

export class TicketItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowFlightDetails: false,
      isChoosed: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.checkChooseTicket(nextProps);
  }

  checkChooseTicket = (nextProps) => {
    const { choosedFlightTicket, data } = nextProps;
    if(choosedFlightTicket.Id !== data.Id) {
      this.setState({
        isChoosed: false
      })
    }
  }

  onShowFlightTicketDetails = (id) => {
    this.setState({
      isShowFlightDetails: !this.state.isShowFlightDetails,
    });
  };

  onChooseFlight = (data, status) => {
    this.setState({
      isChoosed: !this.state.isChoosed,
    });
    this.props.onChooseFlightTicket(data, status);
  };

  render() {
    const { data, passengers, viewMode } = this.props;
    const { isChoosed } = this.state;
    return (
      <>
        <div className="item-ticket">
          <div className="row">
            <div className="col-md-2 airline-logo-box">
              <div>
                <img
                  className="airline-logo"
                  src={`${BASE_URL_SERVER}/${data.Flight.Airline.Logo} `}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="flight-info">
                <div className="row">
                  <div className="col-sm-4">
                    <div className="destination">
                      <Typography className="city">
                        {data.Flight.Departure.City.Name}
                      </Typography>
                      <Typography className="time">
                        {getTime(data.Flight.DepartureTime)}
                      </Typography>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="info">
                      <Typography className="flight-name">
                        {data.Flight.FlightCode}
                      </Typography>
                      <div className="icon-flight-box">
                        <LocationOnIcon className="location-icon" />
                        <div className="line"></div>
                        <ConnectingAirportsIcon className="icon-flight" />
                      </div>

                      <Typography
                        onClick={() => this.onShowFlightTicketDetails(data)}
                        variant="h6"
                        className="detail"
                      >
                        View details
                        {this.state.isShowFlightDetails ? (
                          <ArrowDropUpIcon className="view-detail-icon" />
                        ) : (
                          <ArrowDropDownIcon className="view-detail-icon" />
                        )}
                      </Typography>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="destination">
                      <Typography className="city">
                        {data.Flight.Destination.City.Name}
                      </Typography>
                      <Typography className="time">
                        {getTime(data.Flight.ArrivalTime)}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="flight-choose">
                <Typography className="price">
                  {formatCurrencyToVND(
                    viewMode == VIEW_MODE.BASIC_FARE_FOR_ADULTS ? data.Price : data.Price + data.Tax
                  )}
                </Typography>
                {isChoosed ? (
                  <Button
                    onClick={() => this.onChooseFlight(data, "cancel")}
                    className="btn-choose"
                    variant="contained"
                    color="primary"
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button
                    onClick={() => this.onChooseFlight(data, "choose")}
                    className="btn-choose"
                    variant="contained"
                    color="primary"
                  >
                    Choose Flight
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        {this.state.isShowFlightDetails ? (
          <FlightDetails key={data.id} data={data} passengers={passengers} />
        ) : (
          ""
        )}
      </>
    );
  }
}
