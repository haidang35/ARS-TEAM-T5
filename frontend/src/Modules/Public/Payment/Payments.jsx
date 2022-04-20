import React, { Component } from "react";
import { ContactsInfomation } from "./Components/ContactInfomation/ContactInfomation";
import { FlightDetailsTicket } from "./Components/FlightDetailsTicket/FlightDetailsTicket";
import { NoticeOfBookingStatus } from "./Components/NoticeOfBookingStatus/NoticeOfBookingStatus";
import { PassengerInfomation } from "./Components/PassengerInfomation/PassengerInfomation";

export class Payments extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <>
                <NoticeOfBookingStatus />
                <FlightDetailsTicket />
                <PassengerInfomation />
                <ContactsInfomation />


            </>
        )
    }
}