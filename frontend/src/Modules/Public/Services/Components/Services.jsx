import React, { Component } from "react";
import { SeatFlight } from "./SeatFlight/Components/SeatFlight";



export class Services extends Component {
    constructor(props){
        super(props);
        this.state ={

        }
    }
    render(){
        return(
            <>
           <SeatFlight />

            </>
        )
    }
}