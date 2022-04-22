import { MenuItem, TextField, Typography } from "@mui/material";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Form from "../../../../../Shared/Components/Form";
import "./CustomerInfomation.scss";

const genger = [
  {
    value: "USD",
    label: "Male",
  },
  {
    value: "EUR",
    label: "Female",
  },
];

class CustomerInfomation extends Form {
  constructor(props) {
    super(props);
    this.state = {
      currency: "",
      form: this._getInitFormData({}),
      passengersConverted: [],
      isHasPassengers: false,
    };
  }

  componentDidMount = () => {};

  componentWillReceiveProps = (nextProps) => {
    const { passengers, isContinue } = nextProps;
    const { isHasPassengers } = this.state;
    if (!isHasPassengers) {
      let { passengersConverted } = this.state;
      passengers.forEach((psg) => {
        for (let i = 0; i < psg.quantity; i++) {
          let index = i;
          passengersConverted.push({
            id: Math.random() * 10000000,
            passengerType: psg.passengerType,
          });
        }
      });
      this.setInitFormData(passengersConverted);
      this.setState({
        passengersConverted,
        isHasPassengers: true,
      });
    }

    if(isContinue) {
        this.onContinue();
    }
  };

  setInitFormData = (passengers = []) => {
    let { form } = this.state;
    passengers.forEach((psg, i) => {
      let index = i;
      form[`psg_${++index}_${"gender"}`] = {
        value: "",
        err: "",
        type: psg.passengerType,
      };
      form[`psg_${index}_${"fullname"}`] = {
        value: "",
        err: "",
        type: psg.passengerType,
      };
      form[`psg_${index}_${"birthday"}`] = {
        value: "",
        err: "",
        type: psg.passengerType,
      };
      form[`psg_${index}_${"identityNumber"}`] = {
        value: "",
        err: "",
        type: psg.passengerType,
      };
    });
    this.setState({
      form,
    });
  };

  onContinue = () => {
        this._validateForm();
        if(this._isFormValid()) {
            //TODO Passing data valid to Reservation Component
        }
  }

  render() {
    const { currency, passengersConverted, form } = this.state;
    console.log(
      "🚀 ~ file: CustomerInfomation.jsx ~ line 63 ~ CustomerInfomation ~ render ~ form",
      form
    );
    return (
      <>
        <div className="customer-info">
          <div className="title-box">
            <Typography variant="h4" className="title">
              Customer information
            </Typography>
          </div>
          <div className="content">
            <div className="list-sub-title">
              <div className="row">
                <div className="col-md-2">
                  <Typography variant="h6" className="sub-title">
                    Passenger
                  </Typography>
                </div>
                <div className="col-md-2">
                  <Typography variant="h6" className="sub-title">
                    Genger
                  </Typography>
                </div>
                <div className="col-md-3">
                  <Typography variant="h6" className="sub-title">
                    Full name
                  </Typography>
                </div>
                <div className="col-md-3">
                  <Typography variant="h6" className="sub-title">
                    Birthday
                  </Typography>
                </div>
                <div className="col-md-2">
                  <Typography variant="h6" className="sub-title">
                    Identity number
                  </Typography>
                </div>
              </div>
            </div>
            <div className="list-sub-content">
              <div className="sub-content">
                {passengersConverted.map((psg, index) => {
                  return (
                    <div
                      className="row"
                      key={++index}
                      style={{ marginTop: "1rem" }}
                    >
                      <div className="col-md-2">
                        <Typography
                          variant="body1"
                          className="sub-content-title"
                        >
                          {psg.passengerType}
                        </Typography>
                      </div>
                      <div className="col-md-2">
                        <TextField
                          className="genger"
                          id="outlined-select-currency"
                          select
                          required
                          name={`psg_${index}_gender`}
                          label="Select"
                          value={
                            form[`psg_${index}_gender`] &&
                            form[`psg_${index}_gender`]["value"]
                          }
                          onChange={(ev) =>
                            this._setValue(ev, `psg_${index}_gender`)
                          }
                        >
                          {genger.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                      <div className="col-md-3">
                        <TextField
                          id="outlined-name"
                          label="Full Name"
                          required
                          error={form[`psg_${index}_fullname`] && form[`psg_${index}_fullname`]['err'] !== ""}
                          className="outlined-fullname"
                          name={`psg_${index}_fullname`}
                          value={
                            form[`psg_${index}_fullname`] &&
                            form[`psg_${index}_fullname`]["value"]
                          }
                          onChange={(ev) =>
                            this._setValue(ev, `psg_${index}_fullname`)
                          }
                        />
                      </div>
                      <div className="col-md-3">
                        <input
                          type="date"
                          name="birthday"
                          required
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-2">
                        <TextField
                          id="Identity number"
                          label="Identity number"
                          required
                          className="identity-number"
                        />
                      </div>
                      <div className="col-md-12">
                        <div className="baggage-info">
                          <div className="row">
                            <div className="col-md-2">
                              <Typography
                                variant="body1"
                                className="sub-content-title"
                              >
                                Baggage
                              </Typography>
                            </div>
                            <div className="col-md-10">
                              <select
                                name="checkin-bag"
                                className=" form-select"
                              >
                                <option value={""}>Select Checkin Bag</option>
                                <option value={7}>7kg</option>
                                <option value={20}>20kg</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(CustomerInfomation);
