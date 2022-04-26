import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { SignIn } from "./Account/Components/SignIn/SignIn";
import { Home } from "./Home/Home";
import "./Shared/Styles/Public.scss";
import { SignUp } from "./Account/Components/SignUp/SignUp";
import Reservation from "./Reservation/Reservation";
import BonusServices from "./BonusService/BonusService";
import Payments from "./Payment/Payments";
import FlightTicket from "./ChooseFlightTicket/FlightTicket";
import { Profile } from "./Profile/Profile";
import { CustomerProfile } from "./Profile/Components/CustomerProfile/CustomerProfile";
import { BookingHistory } from "./Profile/Components/BookingHistory/BookingHistory";
import {  ViewDetailsBooking } from "./Profile/Components/ViewDetailsBooking/ViewDetailsBooking";



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
                            <Route path="/" exact>
                                <Home />
                            </Route>
                            <Route path="/signup" exact>
                                <SignUp />
                            </Route>
                            <Route path="/signin" exact>
                                <SignIn />
                            </Route>
                            <Route path="/flight-ticket" exact>
                                <FlightTicket />
                            </Route>

                            <Route path="/reservation" exact>
                                <Reservation />
                            </Route>
                            <Route path="/bonus-service" exact>
                                <BonusServices />
                            </Route>
                            <Route path="/payment" exact>
                                <Payments />
                            </Route>
                            <Route path="/profile" exact >
                                <Profile />
                            </Route>
                            <Route path="/customerprofile">
                                <CustomerProfile />
                            </Route>
                            <Route path="/booking">
                                <BookingHistory />
                            </Route>
                            <Route path="/viewdetailsbooking" exact >
                                <ViewDetailsBooking />
                            </Route>
                        </Switch>
                    </div>
                </BrowserRouter>
            </>
        )
    }
}