import React, { Component } from "react";
import Navbar from "./Dashboard/Navbar/Navbar";


export class Admin extends Component{
    constructor(props){
        super(props);
        this.state= {

        }
    }
    render(){
        return(
            <>
            <Navbar />
            </>
        )
    }
}