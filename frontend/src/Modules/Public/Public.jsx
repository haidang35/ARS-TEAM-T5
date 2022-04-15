import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import SignIn from "./Account/Components/SignIn/SignIn";
import SignUp from "./Account/Components/SignUp/SignUp";
import { FlightTicket } from "./ChooseFlightTicket/FlightTicket";
import { Home } from "./Home/Home";




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
                    <Switch>
                        <Route path="/flight-ticket" exact>
                        <FlightTicket />
                        </Route>
                        <Route  path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/signup" exact>
                            <SignUp />
                        </Route>
                        <Route path="/signin" exact>
                            <SignIn />
                        </Route>


                    </Switch>

                </BrowserRouter>

            </>

        )
    }
}