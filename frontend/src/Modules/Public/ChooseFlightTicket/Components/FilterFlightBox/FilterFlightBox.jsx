import React, { Component } from "react";
import CheckoutStepBar from "../../../Shared/Components/CheckoutStepBar/CheckoutStepBar";
import FilterByFlight from "./Components/FilterByFlight/FilterByFlight";
import { SortByFlight } from "./Components/SortByFlight/SortByFlight";
import { ViewMode } from "./Components/ViewMode/ViewMode";


export class FilterFlightBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flightsData: [],
            flightListDate: [],
            flightsDataReturn: [],
            flightListDateReturn: [],

        }
    }

    sortFlight = (value) => {
        if (value == 0) {
            this.sortFLightPriceFromLowToHigh();
        } else if (value == 1) {
            this.sortFLightPriceFromHighToLow();
        } else if (value == 2) {
            this.sortDepartureTime();
        } else if (value == 3) {
            this.sortFlightTime();
        }
    };

    sortFLightPriceFromHighToLow = () => {
        let {
            flightsData,
            flightListDate,
            flightsDataReturn,
            flightListDateReturn,
        } = this.state;
        flightsData = flightsData.sort((item1, item2) => {
            return item2.total_price - item1.total_price;
        });
        flightListDate = flightListDate.sort((item1, item2) => {
            return item2.total_price - item1.total_price;
        });
        flightsDataReturn = flightsDataReturn.sort((item1, item2) => {
            return item2.total_price - item1.total_price;
        });
        flightListDateReturn = flightListDateReturn.sort((item1, item2) => {
            return item2.total_price - item1.total_price;
        });

        this.setState({
            flightsData,
            flightListDate,
            flightListDateReturn,
            flightsDataReturn,
        });
    };

    render() {
        const { flightsData,flightListDate, flightListDateReturn,flightsDataReturn } = this.state;
        return(
            <>
                <SortByFlight onSortFlight={this.sortFlight}/>
                <ViewMode />
                <FilterByFlight />
            </>
        )
    }
}