import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import React, { Component } from "react";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import TextField from '@mui/material/TextField';
import Search from "@mui/icons-material/Search";
import { Location } from "../Location/Location";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { dateConvert, getDateTimeNow } from "../../../../../Helpers/datetime";
import "./FlightSearch.scss";



const TRIP_TYPE = {
    ONEWAY: 1,
    ROUNDTRIP: 2,
}

export class FlightSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tripType: 1,
            adults: 1,
            children: 0,
            infants: 0,
            searchData: {
                departure: {
                    province: ''
                },
                destination: {
                    province: ''
                },
                departureDate: getDateTimeNow(),
                returnDate: getDateTimeNow(),
                tripType: TRIP_TYPE.ONEWAY,
            },


            openLocationDialog: false,
            locationType: "",

        }


    }

    handleChangeTripType = (ev) => {
        this.setState({
            tripType: ev.target.value,
        });
    };

    handleOpenDialog = (locationType) => {
        this.setState({
            open: true,
            locationType
        })
    }

    selectLocation = (location) => {
        let { searchData, locationType } = this.state;
        if (locationType === 'departure') {
            searchData['departure'] = location;

        } else if (locationType === 'destination') {
            searchData['destination'] = location;

        }
        this.setState({
            searchData,
            open: false,
        })
    }

    onCloseDialog = () => {
        this.setState({
            open: false
        })
    }

    handleDepartureDate = (newValue) => {
        let { searchData } = this.state;
        searchData['departureDate'] = newValue;
        this.setState({
            searchData
        })
    }

    changeQuantityPassenger = (passengerType, action) => {
        switch (passengerType) {
            case 1:
                this.setQuantityPassenger(action, "adults", this.state.adults);
                break;
            case 2:
                this.setQuantityPassenger(
                    action,
                    "children",
                    this.state.children
                );
                break;
            case 3:
                this.setQuantityPassenger(
                    action,
                    "infants",
                    this.state.infants
                );
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
        searchData['returnDate'] = newValue;
        this.setState({
            searchData
        });
    }

    handleChangeTripType = (ev) => {
        const { name, value } = ev.target;
        let { searchData } = this.state;
        searchData['tripType'] = parseInt(value);
        this.setState({
            searchData
        })

    }


    render() {
        const { open, locations } = this.state;
        const { departure, destination, departureDate, returnDate, tripType } = this.state.searchData;
        return (
            <>
                <div id="header-left">
                    <Typography variant="h1" className="title">
                        WHERE WOULD YOU LIKE TO GO ?
                    </Typography>
                    <div className="formcheck">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="roundTrip"
                                    checked={
                                        tripType === TRIP_TYPE.ROUNDTRIP
                                    }
                                    color="primary"
                                    className="check-box"
                                    value={TRIP_TYPE.ROUNDTRIP}
                                    onChange={
                                        this
                                            .handleChangeTripType
                                    }

                                />
                            }
                            label="Round trip"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="oneWay"
                                    checked={
                                        tripType === TRIP_TYPE.ONEWAY
                                    }
                                    color="primary"
                                    className="check-box"
                                    value={TRIP_TYPE.ONEWAY}
                                    onChange={
                                        this
                                            .handleChangeTripType
                                    }
                                />
                            }
                            label="One Way"
                        />

                        <div className="depature">
                            <TextField label="Departure" value={departure.province} variant="outlined" onClick={() => this.handleOpenDialog('departure')}  />
                        </div>
                        <div className="destination">
                            <TextField label="Destination" value={destination.province} variant="outlined" onClick={() => this.handleOpenDialog('destination')} />
                        </div>
                        <div className="date">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                   
                                    label="Departure Date"
                                    value={departureDate}
                                    inputFormat="dd/MM/yyyy"
                                    onChange={this.handleDepartureDate}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                disabled={
                                    tripType === TRIP_TYPE.ONEWAY 
                                }
                                    label="Destination Date"
                                    value={returnDate}
                                    inputFormat="dd/MM/yyyy"
                                    onChange={this.handleReturnDate}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className="passenger-type">
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="choose-quantity">
                                        <label className="title-passenger">
                                            Adults
                                        </label>
                                        <div className="content">
                                            <RemoveCircleOutline
                                                onClick={() =>
                                                    this.changeQuantityPassenger(
                                                        1,
                                                        0
                                                    )
                                                }
                                                className="icon"
                                            />
                                            <span className="quantity">
                                                {
                                                    this.state
                                                        .adults
                                                }
                                            </span>
                                            <AddCircleOutline
                                                onClick={() =>
                                                    this.changeQuantityPassenger(
                                                        1,
                                                        1
                                                    )
                                                }
                                                className="icon"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="choose-quantity">
                                        <label className="title-passenger">
                                            Children
                                        </label>
                                        <div className="content">
                                            <RemoveCircleOutline
                                                onClick={() =>
                                                    this.changeQuantityPassenger(
                                                        2,
                                                        0
                                                    )
                                                }
                                                className="icon"
                                            />
                                            <span className="quantity">
                                                {
                                                    this.state
                                                        .children
                                                }
                                            </span>
                                            <AddCircleOutline
                                                onClick={() =>
                                                    this.changeQuantityPassenger(
                                                        2,
                                                        1
                                                    )
                                                }
                                                className="icon"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="choose-quantity">
                                        <label className="title-passenger">
                                            Infants
                                        </label>
                                        <div className="content">
                                            <RemoveCircleOutline
                                                onClick={() =>
                                                    this.changeQuantityPassenger(
                                                        3,
                                                        0
                                                    )
                                                }
                                                className="icon"
                                            />
                                            <span className="quantity">
                                                {
                                                    this.state
                                                        .infants
                                                }
                                            </span>
                                            <AddCircleOutline
                                                onClick={() =>
                                                    this.changeQuantityPassenger(
                                                        3,
                                                        1
                                                    )
                                                }
                                                className="icon"
                                            />
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className="search">
                                <Button
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
                <Location open={open} selectLocation={this.selectLocation} onCloseDialog={this.onCloseDialog} />
            </>
        )
    }
}