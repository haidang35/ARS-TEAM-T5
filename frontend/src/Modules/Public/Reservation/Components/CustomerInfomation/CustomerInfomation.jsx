import { MenuItem, TextField, Typography } from "@mui/material";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { REGEX_TEL } from "../../../../../Configs/validation";
import Form from "../../../../../Shared/Components/Form";
import "./CustomerInfomation.scss";
import { getDate } from "../../../../../Helpers/datetime";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

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

    if (isContinue) {
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
        value: getDate(new Date()),
        err: "",
        type: psg.passengerType,
      };
      form[`psg_${index}_${"identityNumber"}`] = {
        value: "",
        err: "",
        type: psg.passengerType,
      };
      form[`psg_${index}_${"checkinBag"}`] = {
        value: 5,
        err: "",
        type: psg.passengerType,
      };
    });
    this.setState({
      form,
    });
  };

  handleChangePassengerBirthday = (value, name) => {
    let { form } = this.state;
    form[[name]].value = value;
    this.setState({ form })
  }

  onContinue = () => {
    this._validateForm();
    if (this._isFormValid()) {
      const { form, passengersConverted } = this.state;
      let data = [];
      passengersConverted.forEach((psg, index) => {
        let position = index;
        ++position;
        const psgDataItem = {
          id: index,
          passengerType: psg.passengerType,
          fullName: form[`psg_${position}_fullname`].value,
          gender: form[`psg_${position}_gender`].value,
          birthday: form[`psg_${position}_birthday`].value,
          identityNumber: form[`psg_${position}_identityNumber`].value,
          checkinBag: form[`psg_${position}_checkinBag`].value,
        };
        data.push(psgDataItem);
      });
      this.props.handleCustomerInfomation(data);
    }
  };

  render() {
    const { currency, passengersConverted, form } = this.state;
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
                {passengersConverted.map((psg, i) => {
                  let index = i;
                  ++index;
                  return (
                    <div className="row" key={i} style={{ marginTop: "1rem" }}>
                      <div className="col-md-2">
                        <Typography
                          variant="body1"
                          className="sub-content-title"
                        >
                          {psg.passengerType}
                        </Typography>
                      </div>
                      <div className="col-md-2">
                        {/* <TextField
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
                        </TextField> */}
                        <select
                          className="form-select"
                          required
                          name={`psg_${index}_gender`}
                          value={
                            form[`psg_${index}_gender`] &&
                            form[`psg_${index}_gender`]["value"]
                          }
                          onChange={(ev) =>
                            this._setValue(ev, `psg_${index}_gender`)
                          }
                        >
                          <option value={""}>Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                        <p className="text-danger">
                          {form[`psg_${index}_gender`] &&
                          form[`psg_${index}_gender`]["err"] === "*"
                            ? "Gender cannot be empty"
                            : form[`psg_${index}_gender`]["err"]}
                        </p>
                      </div>
                      <div className="col-md-3">
                        <TextField
                          id="outlined-name"
                          label="Full Name"
                          required
                          error={
                            form[`psg_${index}_fullname`] &&
                            form[`psg_${index}_fullname`]["err"] !== ""
                          }
                          className="outlined-fullname"
                          name={`psg_${index}_fullname`}
                          value={
                            form[`psg_${index}_fullname`] &&
                            form[`psg_${index}_fullname`]["value"]
                          }
                          onChange={(ev) =>
                            this._setValue(ev, `psg_${index}_fullname`)
                          }
                          helperText={
                            form[`psg_${index}_fullname`] &&
                            form[`psg_${index}_fullname`]["err"] === "*"
                              ? "Fullname cannot be empty"
                              : form[`psg_${index}_fullname`]["err"]
                          }
                        />
                      </div>
                      <div className="col-md-3">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <Stack spacing={3}>
                            <DesktopDatePicker
                              label="Birthday"
                              inputFormat="dd/MM/yyyy"
                              disableFuture
                              name={`psg_${index}_birthday`}
                              value={
                                form[`psg_${index}_birthday`] &&
                                form[`psg_${index}_birthday`]["value"]
                              }
                              onChange={(value) => this.handleChangePassengerBirthday(value,`psg_${index}_birthday` )}
                              error={
                                form[`psg_${index}_birthday`] &&
                                form[`psg_${index}_birthday`]["err"] !== ""
                              }
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                          </Stack>
                        </LocalizationProvider>
                        {/* <input
                          type="date"
                          required
                          className="form-control"
                          name={`psg_${index}_birthday`}
                          value={
                            form[`psg_${index}_birthday`] &&
                            form[`psg_${index}_birthday`]["value"]
                          }
                          onChange={(ev) =>
                            this._setValue(ev, `psg_${index}_birthday`)
                          }
                          error={
                            form[`psg_${index}_birthday`] &&
                            form[`psg_${index}_birthday`]["err"] !== ""
                          }
                        /> */}
                      </div>
                      <div className="col-md-2">
                        <TextField
                          id="Identity number"
                          label="Identity number"
                          required
                          className="identity-number"
                          name={`psg_${index}_identityNumber`}
                          value={
                            form[`psg_${index}_identityNumber`] &&
                            form[`psg_${index}_identityNumber`]["value"]
                          }
                          onChange={(ev) =>
                            this._setValue(ev, `psg_${index}_identityNumber`)
                          }
                          error={
                            form[`psg_${index}_identityNumber`] &&
                            form[`psg_${index}_identityNumber`]["err"] !== ""
                          }
                          helperText={
                            form[`psg_${index}_identityNumber`] &&
                            form[`psg_${index}_identityNumber`]["err"] === "*"
                              ? "IdentityNumber cannot be empty"
                              : form[`psg_${index}_identityNumber`]["err"]
                          }
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
                                name={`psg_${index}_checkinBag`}
                                className=" form-select"
                                value={
                                  form[`psg_${index}_checkinBag`] &&
                                  form[`psg_${index}_checkinBag`]["value"]
                                }
                                onChange={(ev) =>
                                  this._setValue(ev, `psg_${index}_checkinBag`)
                                }
                              >
                                <option value={""}>Select Checkin Bag</option>
                                <option value={5}>5kg</option>
                                <option value={7}>7kg</option>
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
