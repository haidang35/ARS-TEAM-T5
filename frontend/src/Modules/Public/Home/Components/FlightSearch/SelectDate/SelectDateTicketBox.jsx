import React, { Component } from "react";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Typography } from "@mui/material";
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import "./SelectDateTicketBox.scss";
import {
    dateConvert,
    getDayOfWeek,
} from "../../../../../../Helpers/datetime";
import {formatCurrencyToVND} from "../../../../../../Helpers/currency";

export class SelectDateTicketBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDate: [],
            flightList: [],
            flightListOrg: [],
            departureDate: "",
        }
    }

    componentDidMount = () => {
        const departureDate = new Date();
        const ticketList = [];
        this.getDaysOfWeek(departureDate, ticketList);
    }

    compareDate = (departureDate, date) => {
        let depaDate = new Date(departureDate);
        let newDate = new Date(date);
        if (
            depaDate.getDate() == newDate.getDate() &&
            newDate.getMonth() == depaDate.getMonth() &&
            depaDate.getFullYear() == newDate.getFullYear()
        )
            return true;
        return false;
    };

    handleChangeDepartureDate = (data) => {
        // this.props.onChangeDepartureDate(
        //     data,
        //     this.state.flightList,
        //     this.state.flightListOrg
        // );
        const ticketList = [];
        this.getDaysOfWeek(data.date, ticketList);
       
    };

    getDaysOfWeek = (departureDate, flightList) => {
        let current = new Date(departureDate);
        let flightOnWeek = new Array();
        current.setDate(current.getDate() - 3);
        for (let i = 0; i < 7; i++) {
            let data = {
                id: i,
                date: new Date(current),
                priceTicket: this.getPriceFlightTicket(
                    flightList,
                    new Date(current)
                ),
            };
            flightOnWeek.push(data);
            current.setDate(current.getDate() + 1);
        }
        this.setState({
            listDate: flightOnWeek,
        });
    };

    getPriceFlightTicket(flightList, date) {
        for (let i = 0; i < flightList.length; i++) {
            if (
                this.compareDate(flightList[i].flight.departure_datetime, date)
            ) {
                let ticketPrice = flightList[i].total_price;
                return ticketPrice;
            }
        }
        return "-";
    }

    render() {
        const { listDate, departureDate, flightList } = this.state;
        return (
            <>
                <div id="select-ticket-box">
                    <div className="top-content-bar">
                        <AirplanemodeActiveIcon className="icon-plane" />
                        <div className="content">
                            <div className="top-content">
                                <Typography className="location-title">
                                    Hà Nội, Việt Nam (HAN)
                                </Typography>
                                <ArrowRightAltIcon className="icon-arrow" />
                                <Typography className="location-title">
                                    Phú Quốc, Vietnam (PQP)
                                </Typography>
                            </div>
                            <Typography className="departure-time">
                                Thur , 14-04-2022
                            </Typography>
                        </div>
                    </div>
                    <div className="bottom-content-bar">
                        <div className="row">
                            {listDate.map((item) => {
                                return (
                                    <div
                                        key={item.id}
                                        onClick={() =>
                                            this.handleChangeDepartureDate(item)
                                        }
                                        className={
                                            this.compareDate(
                                                departureDate,
                                                item.date
                                            )
                                                ? "item-box item-selected"
                                                : "item-box"
                                        }
                                    >
                                        <span className="item-date">
                                        {dateConvert(item.date)}
                                        </span>
                                        <span className="item-day">
                                        {getDayOfWeek(item.date)}
                                        </span>
                                        <span className="item-price">
                                        {item.priceTicket !== "-"
                                                ? formatCurrencyToVND(
                                                      item.priceTicket
                                                  )
                                                : "-"}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}