import React, { Component } from "react";
import { ContactsInfomation } from "../../../Payment/Components/ContactInfomation/ContactInfomation";
import {FlightDetailsTicket } from "../../../Payment/Components/FlightDetailsTicket/FlightDetailsTicket";
import { PassengerInfomation } from "../../../Payment/Components/PassengerInfomation/PassengerInfomation";

export class ViewDetailsBooking extends Component {
    constructor(props){
        super(props);
        this.state ={

        }
    }
    render(){
        return(
            <>
                <FlightDetailsTicket />
               {/* <PassengerInfomation />
               <ContactsInfomation /> */}


            </>
        )
    }
}