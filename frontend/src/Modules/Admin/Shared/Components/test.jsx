import React, { Component } from "react";
import Navbar from "./Navbar/Narbar";
import { Sidebar } from "./Sidebar/Sidebar";


export class Test extends Component{
    constructor(props){
        super(props);
        this.state = {

        } 
            
        
    }
    render(){
        return(
            <>
            <Navbar/>
            <Sidebar />
            </>
        )
    }
}