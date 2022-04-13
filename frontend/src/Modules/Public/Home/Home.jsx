import React, { Component } from "react";
import { Header } from "./Components/Header/Header";
import { SeachFlightTicket } from "./Components/SearchFlightTicket/SeachFlightTicket";


export class Home extends Component {
    constructor (props){
        super(props);
        this.state ={

        }
    }
    render(){
        return(
            <>
             
            <Header /> 
             <SeachFlightTicket />
           
         
           
           
            </>
        )
    }
}