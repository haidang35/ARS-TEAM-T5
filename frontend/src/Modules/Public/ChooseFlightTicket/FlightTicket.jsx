import { keys } from "@mui/system";
import React, { Component } from "react";
import { SearchTicketBox } from "../Shared/Components/SearchTicketBox/SearchTicketBox";
import { BookingStepBar } from "./Components/BookingStepBar/BookingStepBar";
import { FilterFlightBox } from "./Components/FilterFlightBox/FilterFlightBox";
import { SelectDateTicketBox } from "./Components/SelectDateTicketBox/SelectDateTicketBox";
import { TicketItem } from "./Components/TicketItem/TicketItem";
export class FlightTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flightTickets: [
                {
                    id: 1,
                    price: 100
                }, {
                    id: 2,
                    price: 300
                }, {
                    id: 3,
                    price: 300
                },
            ],
        }
    }



    render() {
        const { flightTickets } = this.state;
        return (
            <>
            <SearchTicketBox />
            <BookingStepBar />
                <div className="row">
                    <div className="col-md-3">
                        <FilterFlightBox />
                    </div>
                    <div className="col-md-9">
                        <SelectDateTicketBox />
                        {
                            flightTickets.map((item, index) => {
                                return (<TicketItem key={index} data={item} price={item.price} />)
                            })
                        }
                    </div>
                </div>

            </>
        )
    }
}