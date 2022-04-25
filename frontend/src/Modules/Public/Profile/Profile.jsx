import React, { Component } from "react";
import { BookingHistory } from "./Components/BookingHistory/BookingHistory";

export class Profile extends Component {
    constructor(props){
        super(props);
        this.state ={

        }
        
    }
    render(){
       return(
           <>
           <BookingHistory />
           </>
       )
    }
}