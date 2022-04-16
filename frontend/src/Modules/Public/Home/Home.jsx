import React, { Component } from "react";
import { FlightSearch } from "./Components/FlightSearch/FlightSearch";
import { Header } from "./Components/Header/Header";


export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <>

            <Header />
            </>
        )
    }
}