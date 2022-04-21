import React, { Component } from "react";
import NavbarV2 from "../Shared/Components/NavbarV2/NavbarV2";
import { SearchTicketBox } from "../Shared/Components/SearchTicketBox/SearchTicketBox";
import publicService from "../Shared/Services/PublicService";
import { BookingStepBar } from "./Components/BookingStepBar/BookingStepBar";
import { FilterFlightBox } from "./Components/FilterFlightBox/FilterFlightBox";
import { FlightAmination } from "./Components/FlightAnimation/FlightAmination";
import { SelectDateTicketBox } from "./Components/SelectDateTicketBox/SelectDateTicketBox";
import { TicketItem } from "./Components/TicketItem/TicketItem";



export class FlightTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flightTickets: [],
            departureId: '',
            destinationid: ''
        }
    }

    componentDidMount() {
        this.getFlightTicketList();

    }

    getFlightTicketList = () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const searchData = {
            departureId: urlParams.get(""),
            destinationid: urlParams.get("")
        }


        getFlightTickets = async (searchData) => {

            await publicService.getFlightTickets().then((res) => {
                this.setState({
                    flightTickets : res.data,
                })

            
            })

        }
    }

    render() {
        const { flightTickets } = this.state;

        return (
            <>
                <NavbarV2 />
                <div className="wrap-container">
                    <div className="row">
                        <SearchTicketBox />
                        <BookingStepBar />
                      
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
                   
                </div>
            </>
        )
    }
}