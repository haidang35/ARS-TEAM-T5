import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Component } from "react";
import "./FlightSeatChoosedItem.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckIcon from "@mui/icons-material/Check";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import { formatCurrencyToVND } from "../../../../../../../../../../../Helpers/currency";

class FlightSeatChoosedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSelectPassenger = (passenger) => {
    this.props.onSelectPassenger(passenger);
  };

  render() {
    const { passenger, choosedPassengerId } = this.props;
    return (
      <>
        {passenger !== null ? (
          <div
            className="flight-seat-choosed-item"
            onClick={() => this.onSelectPassenger(passenger)}
            style={{
              border:
                passenger.id === choosedPassengerId ? "3px solid #5ba8c7" : "",
            }}
          >
            <div className="row">
              <div className="col-md-6">
                <Typography
                  className="passenger-name"
                  variant="span"
                  component="div"
                >
                  {passenger.fullName}
                </Typography>

                {passenger.seatInfo.seatCode === "" ? (
                  <Grid container spacing={2}>
                    <Grid item xs={10}>
                      <Typography
                        className="choose-seat-title"
                        variant="span"
                        component="div"
                      >
                        Choose your seat
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <ArrowForwardIosIcon />
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <CheckIcon className="" />
                    </Grid>
                    <Grid item xs={10}>
                      <Typography
                        className="choose-seat-title active"
                        variant="span"
                        component="div"
                      >
                        Seat added
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              </div>
              <div className="col-md-6">
                {passenger.seatInfo.seatCode !== "" ? (
                  <div className="flight-seat-active">
                    <Grid container className="info">
                      <Grid item xs={3}>
                        <AirlineSeatReclineNormalIcon className="seat-icon" />
                      </Grid>
                      <Grid item xs={9}>
                        <Typography
                          variant="span"
                          component="div"
                          className="seat-info"
                        >
                          {passenger.seatInfo.seatCode}
                        </Typography>
                        <Typography
                          variant="span"
                          component="div"
                          className="seat-info"
                        >
                          + {formatCurrencyToVND(passenger.seatInfo.fee)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default FlightSeatChoosedItem;
