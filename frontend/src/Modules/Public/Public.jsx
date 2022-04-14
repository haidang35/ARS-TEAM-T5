import React, { Component } from "react";
import { Home } from "./Home/Home";
import Navbar from "./Shared/Components/Navbar/Navbar";
import { SearchTicketBox } from "./Shared/Components/SearchTiketBox/SearchTicketBox";



export class Public extends Component {
    constructor(props){
        super(props);
        this.state ={

        }
    }
    render(){
        return(
            <>
            {/* <Navbar />  */}
             {/* <Home /> */}
             <SearchTicketBox />
            
            </>

        )
    }
}