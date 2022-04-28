import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Home } from "./Home/Home";
import "./Shared/Styles/Public.scss";
import Reservation from "./Reservation/Reservation";
import BonusServices from "./BonusService/BonusService";
import Payments from "./Payment/Payments";
import FlightTicket from "./ChooseFlightTicket/FlightTicket";
import { Profile } from "./Profile/Profile";
import { CustomerProfile } from "./Profile/Components/CustomerProfile/CustomerProfile";
import { BookingHistory } from "./Profile/Components/BookingHistory/BookingHistory";
import { ViewDetailsBooking } from "./Profile/Components/ViewDetailsBooking/ViewDetailsBooking";
import { SignUp } from "./Account/Components/SignUp/SignUp";
import { SignIn } from "./Account/Components/SignIn/SignIn";
import registerService from "./Account/Components/Service/AccountService";
import { ROLES } from "../../Configs/server";



export class Public extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    checkCurrentUserRoles = async () => {
        await registerService.getCurrentUserRoles()
            .then((res) => {
                const userRoles = res.data;
                let isPublic = false;
                userRoles.forEach((userRoles) => {
                    if (
                        userRoles.ROLE.ROLECODE === ROLES.ADMIN ||
                        userRoles.ROLE.ROLECODE === ROLES.SUPER_ADMIN ||
                        userRoles.ROLE.ROLECODE === ROLES.USER
                    ) {
                        isPublic = true;
                    }
                    if (isPublic) {
                        window.localtion.replace('/signin')
                    }
                });
            });
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
                            <Route path="/flight-ticket" exact>
                                <FlightTicket />
                            </Route>
                            <Route path="/signup" exact>
                                <SignUp />
                            </Route>
                            <Route path="/signin" exact >
                                <SignIn />
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
                            <Route path="/customer-info/profile">
                                <CustomerProfile />
                            </Route>
                            <Route path="/customer-bookinghistory">
                                <BookingHistory />
                            </Route>
                            <Route path="/customer-info/viewdetailsbooking" exact >
                                <ViewDetailsBooking />
                            </Route>
                        </Switch>
                    </div>
                </BrowserRouter>
            </>
        )
    }
}