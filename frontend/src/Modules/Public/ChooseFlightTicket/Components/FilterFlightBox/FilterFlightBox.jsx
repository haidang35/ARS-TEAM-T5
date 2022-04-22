import React, { Component } from "react";
import CheckoutStepBar from "../../../Shared/Components/CheckoutStepBar/CheckoutStepBar";
import FilterByFlight from "./Components/FilterByFlight/FilterByFlight";
import { SortByFlight } from "./Components/SortByFlight/SortByFlight";
import { ViewMode } from "./Components/ViewMode/ViewMode";


export class FilterFlightBox extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return(
            <>
                <SortByFlight />
                <ViewMode />
                <FilterByFlight />
            </>
        )
    }
}