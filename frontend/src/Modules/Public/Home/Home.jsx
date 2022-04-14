import React, { Component } from "react";
import { SelectDateTicketBox } from "./Components/FlightSearch/SelectDate/SelectDateTicketBox"; 






export class Home extends Component {
    constructor (props){
        super(props);
        this.state ={

        }
    }
    render(){
        return(
            <>
            <SelectDateTicketBox />
                

        
            </>
        )
    }
}