import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import SignIn from "./Account/Components/SignIn/SignIn";
import SignUp from "./Account/Components/SignUp/SignUp";
import { FlightTicket } from "./ChooseFlightTicket/FlightTicket";
import { Home } from "./Home/Home";
import Navbar from "./Shared/Components/Navbar/Navbar";
import { SearchTicketBox } from "./Shared/Components/SearchTicketBox/SearchTicketBox";




export class Public extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <>
                <BrowserRouter>
               

                    <Navbar />
                    
                    <div className="MuiContainer-root MuiContainer-maxWidthXl css-19r6kue-MuiContainer-root">
                    <SearchTicketBox />
                        <Switch>
                            <Route path="/flight-ticket" exact>
                                <FlightTicket />
                            </Route>
                            <Route path="/" exact>
                                <Home />
                            </Route>
                            <Route path="/signup" exact>
                                <SignUp />
                            </Route>
                            <Route path="/signin" exact>
                                <SignIn />
                            </Route>
                            <Route path="/flight-tickets">
                                <FlightTicket />

                            </Route>


                        </Switch>
                    </div>


                </BrowserRouter>

            </>

        )
    }
}