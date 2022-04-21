import React from "react";
import { Component } from "react";
import { BookingStepBar } from "../ChooseFlightTicket/Components/BookingStepBar/BookingStepBar";
import NavbarV2 from "../Shared/Components/NavbarV2/NavbarV2";
import FlightSeatService from "./Components/FlightSeatService/FlightSeatService";


class BonusServices extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <>
                <NavbarV2 />
                <div className="wrap-container">
                    <div className="row">
                        <div className="col-md-12">
                        <BookingStepBar />
                            <FlightSeatService />
                            
                         
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default BonusServices;