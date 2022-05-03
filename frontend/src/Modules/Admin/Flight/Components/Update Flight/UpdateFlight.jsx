import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Form from "../../../../../Shared/Components/Form";
import flightService from "../../Shared/Services/FlightService";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Redirect, withRouter } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { getDateTimeNow } from "../../../../../Helpers/datetime";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import airlineService from "../../../Airline/Shared/Services/AirlineService";
import locationsService from "../../../Location/Shared/Services/LocationService";
import FlightSeatMap from "../FlightSeatMap/FlightSeatMap";
import { onValue, ref } from "firebase/database";
import publicService from "../../../../Public/Shared/Services/PublicService";
import { dbFirebase } from "../../../../../Configs/firebase";

class UpdateFlight extends Form {
  constructor(props) {
    super(props);
    this.state = {
      form: this._getInitFormData({
        flightCode: "",
        departureTime: "",
        arrivalTime: "",
        capacity: "",
        businessSeats: "",
        deluxeSeats: "",
        economySeats: "",
        exitSeats: "",
        aircraft: "",
        seatsReseved: "",
        seatsAvaliable: "",
      }),
      airlineId: "",
      departureId: "",
      destinationId: "",
      content: "",
      isLoading: false,
      postFlightList: [],
      isRedirectSuccess: false,
      locationList: [],
      airlineList: [],
      status: "",
      flightStatus: [
        {
          key: 0,
          type: "Active",
        },
        {
          key: 1,
          type: "DeActive",
        },
      ],
      lockingSeats: [],
      lockedSeats: []
    };
  }
  componentDidMount() {
    this.getLocationList();
    this.getAirlineList();
    this.getFlightDetails();
    this.getLockedSeats();
  }

  getFlightDetails = async () => {
    const { id } = this.props.match.params;
    await flightService.getFlightDetails(id).then((res) => {
      this.setState({
        departureId: res.data.DepartureId,
        destinationId: res.data.DestinationId,
        airlineId: res.data.AirlineId,
        status: res.data.Status,
      });
      this._fillForm({
        flightCode: res.data.FlightCode,
        departureTime: res.data.DepartureTime,
        arrivalTime: res.data.ArrivalTime,
        capacity: res.data.Capacity,
        businessSeats: res.data.BusinessSeats,
        deluxeSeats: res.data.DeluxeSeats,
        economySeats: res.data.EconomySeats,
        exitSeats: res.data.ExitSeats,
        aircraft: res.data.Aircraft,
        seatsReseved: res.data.SeatsReseved,
        seatsAvaliable: res.data.SeatsAvaliable,
        departureId: res.data.DepartureId,
        status: res.data.Status,
      });
      this.getReservedFlightSeats(res.data.FlightCode);
    });
  };
  saveUpdateFlight = async () => {
    this._validateForm();
    if (this._isFormValid()) {
      const { id } = this.props.match.params;
      const {
        form,
        isRedirectSuccess,
        departureId,
        destinationId,
        airlineId,
        status,
      } = this.state;
      const dataConverted = {
        FlightCode: form.flightCode.value,
        DepartureTime: form.departureTime.value,
        ArrivalTime: form.arrivalTime.value,
        DestinationId: destinationId,
        DepartureId: departureId,
        AirlineId: airlineId,
        Capacity: form.capacity.value,
        BusinessSeats: form.businessSeats.value,
        DeluxeSeats: form.deluxeSeats.value,
        EconomySeats: form.economySeats.value,
        ExitSeats: form.exitSeats.value,
        Aircraft: form.aircraft.value,
        SeatsReseved: form.seatsReseved.value,
        SeatsAvaliable: form.seatsAvaliable.value,
        Status: status,
      };
      await flightService
        .updateDetails(id, dataConverted)
        .then((res) => {
          this.setState({
            isRedirectSuccess: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  getAirlineList = async () => {
    await airlineService.getAirlineList().then((res) => {
      this.setState({
        airlineList: res.data,
      });
    });
  };

  getLocationList = async () => {
    await locationsService.getLocationList().then((res) => {
      this.setState({
        locationList: res.data,
      });
    });
  };

  getFlightList = async () => {
    await flightService.getFlightList().then((res) => {
      this.setState({
        postFlightList: res.data,
      });
    });
  };
  handleChangeStatus = (ev) => {
    this.setState({
      status: ev.target.value,
    });
  };

  handleChangeAirline = (ev) => {
    this.setState({
      airlineId: ev.target.value,
    });
  };
  handleChangeDeparute = (ev) => {
    this.setState({
      departureId: ev.target.value,
    });
  };
  handleChangeDetination = (ev) => {
    this.setState({
      destinationId: ev.target.value,
    });
  };
  handleDepartureTime = (ev) => {
    this.setState({
      departureTime: ev.target.value,
    });
  };

  getReservedFlightSeats = (flightCode) => {
    const flightSeatRef = ref(dbFirebase, `flights/${flightCode}/lockingSeats`);
    onValue(flightSeatRef, (snapshot) => {
      let lockingSeats = [];
      snapshot.forEach((snapshotChild) => {
        let dataChild = snapshotChild.val();
        dataChild["key"] = snapshotChild.key;
        lockingSeats.push(dataChild);
      });
      this.setState({
        lockingSeats,
      });
    });
  };

  getLockedSeats = async () => {
    const { id } = this.props.match.params;
    await publicService
      .getLockedFlightSeats(id)
      .then((res) => {
        this.setState({
          lockedSeats: res.data,
        });
      });
  };
  render() {
    const {
      flightCode,
      departureTime,
      arrivalTime,
      capacity,
      businessSeats,
      deluxeSeats,
      economySeats,
      exitSeats,
      aircraft,
      seatsReseved,
      seatsAvaliable,
    } = this.state.form;
    const {
      isRedirectSuccess,
      content,
      postFlightList,
      isLoading,
      departureId,
      destinationId,
      locationList,
      airlineId,
      airlineList,
      status,
      flightStatus,
      lockedSeats,
      lockingSeats
    } = this.state;
      console.log("🚀 ~ file: UpdateFlight.jsx ~ line 249 ~ UpdateFlight ~ render ~ lockedSeats", lockedSeats)
      console.log("🚀 ~ file: UpdateFlight.jsx ~ line 248 ~ UpdateFlight ~ render ~ lockingSeats", lockingSeats)
    if (isRedirectSuccess) {
      return (
        <Redirect
          to={{
            pathname: "/admin/flights",
            state: {
              message: {
                type: "success",
                content: "Update Flight successful !",
              },
            },
          }}
        />
      );
    }
    return (
      <>
        <React.Fragment>
          <div id="addNewFlight">
            <Typography variant="h4" gutterBottom>
              Update Flight
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  error={flightCode.err !== ""}
                  helperText={
                    flightCode.err !== ""
                      ? flightCode.err === "*"
                        ? "FlightCode cannot be empty"
                        : flightCode.err
                      : ""
                  }
                  required
                  id="flightCode"
                  name="flightCode"
                  value={flightCode.value}
                  label="FlightCode"
                  autoComplete="given-name"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, "flightCode")}
                />
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <TextField
                      id="datetime-local"
                      name="departureTime"
                      label="DepartureTime"
                      type="datetime-local"
                      value={departureTime.value}
                      sx={{ width: 250 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(ev) => this._setValue(ev, "departureTime")}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <TextField
                      id="arrivaltime"
                      label="ArrivalTime"
                      name="arrivalTime"
                      type="datetime-local"
                      value={arrivalTime.value}
                      sx={{ width: 250 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(ev) => this._setValue(ev, "arrivalTime")}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="depature">Select Departure</InputLabel>
                    <Select
                      id="depature"
                      name="depature"
                      value={departureId}
                      label="Depature"
                      onChange={this.handleChangeDeparute}
                    >
                      {locationList.map((location) => {
                        return (
                          <MenuItem key={location.Id} value={location.Id}>
                            {location.City.Name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="destination">Select Destination</InputLabel>
                    <Select
                      id="destination"
                      name="destination"
                      value={destinationId}
                      label="Destination"
                      onChange={this.handleChangeDetination}
                    >
                      {locationList.map((location) => {
                        return (
                          <MenuItem key={location.Id} value={location.Id}>
                            {location.City.Name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={capacity.err !== ""}
                  helperText={
                    capacity.err !== ""
                      ? capacity.err === "*"
                        ? "Capacity cannot be empty"
                        : capacity.err
                      : ""
                  }
                  required
                  id="capacity"
                  name="capacity"
                  value={capacity.value}
                  label="Capacity"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, "capacity")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={businessSeats.err !== ""}
                  helperText={
                    businessSeats.err !== ""
                      ? businessSeats.err === "*"
                        ? "BusinessSeats cannot be empty"
                        : businessSeats.err
                      : ""
                  }
                  required
                  id="businessSeats"
                  name="businessSeats"
                  value={businessSeats.value}
                  label="BusinessSeats"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, "businessSeats")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={deluxeSeats.err !== ""}
                  helperText={
                    deluxeSeats.err !== ""
                      ? deluxeSeats.err === "*"
                        ? "DeluxeSeats cannot be empty"
                        : deluxeSeats.err
                      : ""
                  }
                  required
                  id="deluxeSeats"
                  name="deluxeSeats"
                  value={deluxeSeats.value}
                  label="DeluxeSeats"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, "deluxeSeats")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={economySeats.err !== ""}
                  helperText={
                    economySeats.err !== ""
                      ? economySeats.err === "*"
                        ? "EconomySeats cannot be empty"
                        : economySeats.err
                      : ""
                  }
                  required
                  id="economySeats"
                  name="economySeats"
                  value={economySeats.value}
                  label="EconomySeats"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, "economySeats")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={exitSeats.err !== ""}
                  helperText={
                    exitSeats.err !== ""
                      ? exitSeats.err === "*"
                        ? "ExitSeats cannot be empty"
                        : exitSeats.err
                      : ""
                  }
                  required
                  id="exitSeats"
                  name="exitSeats"
                  value={exitSeats.value}
                  label="ExitSeats"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, "exitSeats")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={aircraft.err !== ""}
                  helperText={
                    aircraft.err !== ""
                      ? aircraft.err === "*"
                        ? "Aircraft cannot be empty"
                        : aircraft.err
                      : ""
                  }
                  required
                  id="aircraft"
                  name="aircraft"
                  value={aircraft.value}
                  label="Aircraft"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, "aircraft")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={seatsReseved.err !== ""}
                  helperText={
                    seatsReseved.err !== ""
                      ? seatsReseved.err === "*"
                        ? "SeatsReseved cannot be empty"
                        : seatsReseved.err
                      : ""
                  }
                  required
                  id="seatsReseved"
                  name="seatsReseved"
                  value={seatsReseved.value}
                  label="SeatsReseved"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, "seatsReseved")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={seatsAvaliable.err !== ""}
                  helperText={
                    seatsAvaliable.err !== ""
                      ? seatsAvaliable.err === "*"
                        ? "SeatsAvaliable cannot be empty"
                        : seatsAvaliable.err
                      : ""
                  }
                  required
                  id="seatsAvaliable"
                  name="seatsAvaliable"
                  value={seatsAvaliable.value}
                  label="SeatsAvaliable"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, "seatsAvaliable")}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="airline">Select Airline</InputLabel>
                    <Select
                      id="airline"
                      name="airline"
                      value={airlineId}
                      label="Airline"
                      onChange={this.handleChangeAirline}
                    >
                      {airlineList.map((airline) => {
                        return (
                          <MenuItem key={airline.Id} value={airline.Id}>
                            {airline.Name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="status">Select Status</InputLabel>
                    <Select
                      id="status"
                      name="status"
                      value={status}
                      label="Status"
                      onChange={this.handleChangeStatus}
                    >
                      {flightStatus.map((status) => {
                        return (
                          <MenuItem key={status.key} value={status.key}>
                            {status.type}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      name="saveAddress"
                      value="yes"
                    />
                  }
                  label="Use this address for payment details"
                />
              </Grid>
              <div id="submit">
                <Button variant="contained" onClick={this.saveUpdateFlight}>
                  Submit
                </Button>
              </div>
            </Grid>
            <Box>
              <FlightSeatMap
                onSelectSeatFlight={this.onSelectSeatFlight}
                reservedSeats={lockingSeats}
                lockedSeats={lockedSeats}
              />
            </Box>
          </div>
        </React.Fragment>
      </>
    );
  }
}

export default withRouter(UpdateFlight);
