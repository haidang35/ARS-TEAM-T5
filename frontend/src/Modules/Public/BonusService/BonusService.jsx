import React from "react";
import { Component } from "react";
import FlightSeatService from "./Components/FlightSeatService/FlightSeatService";


class BonusServices extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return(
            <>
                <FlightSeatService />
            </>
        )
    }
}

export default BonusServices;