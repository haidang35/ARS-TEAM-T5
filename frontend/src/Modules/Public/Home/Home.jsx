import React, { Component } from "react";
import { SearchTicketBox } from "../Shared/Components/SearchTiketBox/SearchTicketBox";
import { ChooseFlight } from "./Components/ChooseFlight/ChooseFlight";




export class Home extends Component {
    constructor (props){
        super(props);
        this.state ={

        }
    }
    render(){
        return(
            <>
                {/* <SearchTicketBox /> */}
                <ChooseFlight />
        
            </>
        )
    }
}