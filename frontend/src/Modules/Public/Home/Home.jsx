import React, { Component } from "react";
import Navbar from "../Shared/Components/Navbar/Navbar";
import { Footer } from "../Shared/Footer/Footer";
import { FlightSearch } from "./Components/FlightSearch/FlightSearch";
import { Header } from "./Components/Header/Header";
import { SeachFlightTicket } from "./Components/SearchFlightTicket/SeachFlightTicket";


export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <>
            <Navbar />

            <Header />
            <SeachFlightTicket />
            <Footer />
            </>
        )
    }
}