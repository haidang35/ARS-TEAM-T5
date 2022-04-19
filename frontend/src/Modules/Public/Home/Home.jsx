import { ThirtyFpsSelect } from "@mui/icons-material";
import React, { Component } from "react";
import Navbar from "../Shared/Components/Navbar/Navbar";
import { Footer } from "../Shared/Footer/Footer";
import FavouriteDestination from "./Components/FavouriteDestination/FavouriteDestination";
import { Header } from "./Components/Header/Header";
import { SeachFlightTicket } from "./Components/SearchFlightTicket/SeachFlightTicket";


export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favouriteDestination : "",

        }
    }
    onSelectDestinationThumbnail = (destination) => {
        this.setState({
            favouriteDestination : destination,
        });
        window.scrollTo(0, 0)
        
    }
    render() {
        const { favouriteDestination } = this.state;
        return (
            <>
            <Navbar />

            <Header favouriteDestination={favouriteDestination} />
            <SeachFlightTicket  />
            <FavouriteDestination onSelectDestinationThumbnail={this.onSelectDestinationThumbnail} />
            <Footer />
            </>
        )
    }
}