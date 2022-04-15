import { keys } from "@mui/system";
import React, { Component } from "react";
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
                },
                {
                    id: 2,
                    price: 200
                },
                {
                    id: 3,
                    price: 300
                }
                
            ],
        }
    }

  
   
    render() {
        const { flightTickets} = this.state;
        return (
            <>
            <SelectDateTicketBox />
              {
              flightTickets.map((item, index) => {
                return( <TicketItem key={index} price={item.price} /> ) 
              })  
              }    
            </>
        )
    }
}