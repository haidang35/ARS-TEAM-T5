import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { SignIn } from "./Account/Components/SignIn/SignIn";
import { FlightTicket } from "./ChooseFlightTicket/FlightTicket";
import { Home } from "./Home/Home";
import "./Shared/Styles/Public.scss";
import { SignUp } from "./Account/Components/SignUp/SignUp";



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
                    <div id="public">

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
                            <Route path="/flight-tickets" exact>
                                <FlightTicket />
                            </Route>
                            <Route  path="/services" exact>
                                <Services />
                            </Route>
                        </Switch>
                    </div>



                </BrowserRouter>

            </>

        )
    }
}