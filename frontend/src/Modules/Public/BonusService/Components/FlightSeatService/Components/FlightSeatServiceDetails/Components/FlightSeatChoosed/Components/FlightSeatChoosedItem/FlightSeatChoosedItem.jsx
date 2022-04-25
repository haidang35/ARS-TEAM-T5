import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Component } from "react";
import "./FlightSeatChoosedItem.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckIcon from "@mui/icons-material/Check";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import { formatCurrencyToVND } from "../../../../../../../../../../../Helpers/currency";
import { getDateTimeNow } from "../../../../../../../../../../../Helpers/datetime";
import { useState } from "react";
import { useEffect } from "react";

const FlightSeatChoosedItem = ({
  onSelectPassenger,
  passenger,
  choosedPassengerId,
  checkExpiresReserveSeat,
}) => {
  const [countDownMin, setCountDownMin] = useState(5);
  const [countDownSec, setCountDownSec] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (countDownMin === 0 && countDownSec === 0) {
      } else {
        setCountDownSec(countDownSec - 1);
      }
      if (countDownSec === 0 && countDownMin > 0) {
        setCountDownMin(countDownMin - 1);
        setCountDownSec(59);
      } else if (countDownSec === 0) {
        setCountDownSec(0);
      }
    }, 1000);
    checkExpiresTime();
    return () => clearInterval(timer);
  }, [countDownSec, passenger.seatInfo.seatCode]);

  useEffect(() => {
    setCountDownMin(5);
    setCountDownSec(0);
  }, [passenger.seatInfo.seatCode]);

  const checkExpiresTime = () => {
    // let expiresTime = "";
    // let isHasExpiresTime = false;
    // Object.keys(passenger.seatInfo).forEach((key) => {
    //   if (key === "expires" && passenger.seatInfo["expires"] !== null) {
    //     isHasExpiresTime = true;
    //   }
    // });
    // if (isHasExpiresTime) {
    //   expiresTime = new Date(passenger.seatInfo["expires"]);
    // }
    if (countDownMin === 0 && countDownSec === 0) {
      const seatCode = passenger.seatInfo.seatCode;
      checkExpiresReserveSeat(seatCode);
    }
  };

  return (
    <>
      {passenger !== null ? (
        <div
          className="flight-seat-choosed-item"
          onClick={() => onSelectPassenger(passenger)}
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

      {passenger.seatInfo.seatCode && (
        <div>
          <Typography
            variant="span"
            component="div"
            color="red"
            fontSize={20}
            fontWeight="bold"
          >
            Expires block seat {passenger.seatInfo.seatCode}:{" "}
            {`${String(countDownMin).padStart(2, "0")}:${String(
              countDownSec
            ).padStart(2, "0")}`}
          </Typography>
        </div>
      )}
    </>
  );
};

export default FlightSeatChoosedItem;
