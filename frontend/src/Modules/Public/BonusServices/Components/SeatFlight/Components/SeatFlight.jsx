import React, { Component } from "react";
import { TicketPriceDetails } from "../../TicketPriceDetails/TicketPriceDetails";
import { ChooseSeatFlight } from "./ChooseSeatFlight/ChooseSeatFlight";

export class SeatFlight extends Component {
    constructor(props){
        super(props);
        this.state ={

        }
    }
    render(){
        return(
            <>
            <ChooseSeatFlight />
           <TicketPriceDetails />
            </>
        )
    }
}