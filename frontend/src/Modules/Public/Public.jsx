import React, { Component } from "react";
import { Home } from "./Home/Home";


export class Public extends Component {
    constructor(props){
        super(props);
        this.state ={

        }
    }
    render(){
        return(
            <>
            <Home />
            </>

        )
    }
}