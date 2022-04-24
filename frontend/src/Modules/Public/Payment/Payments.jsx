import React, { Component } from "react";
import NavbarV2 from "../Shared/Components/NavbarV2/NavbarV2";
import { SearchTicketBox } from "../Shared/Components/SearchTicketBox/SearchTicketBox";
import { ContactsInfomation } from "./Components/ContactInfomation/ContactInfomation";
import { FlightDetailsTicket } from "./Components/FlightDetailsTicket/FlightDetailsTicket";
import { NoticeOfBookingStatus } from "./Components/NoticeOfBookingStatus/NoticeOfBookingStatus";
import { PassengerInfomation } from "./Components/PassengerInfomation/PassengerInfomation";
import { PaymentNoticeBox } from "./Components/PaymentNoticeBox/PaymentNoticeBox";

export class Payments extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <>
                <NavbarV2 />
                <SearchTicketBox />
                <div className="wrap-container">
                    <div className="row">
                        <div className="col-md-12">
                            <NoticeOfBookingStatus />
                            <PaymentNoticeBox />
                            <FlightDetailsTicket />
                            <PassengerInfomation />
                            <ContactsInfomation />
                        </div>
                    </div>
                </div>



            </>
        )
    }
}