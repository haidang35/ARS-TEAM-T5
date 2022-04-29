import React, { Component, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavbarV2 from "../Shared/Components/NavbarV2/NavbarV2";
import { SearchTicketBox } from "../Shared/Components/SearchTicketBox/SearchTicketBox";
import { SlideBar } from "./Components/SlideBar/SlideBar";
import { ViewDetailsBooking } from "./Components/ViewDetailsBooking/ViewDetailsBooking";
import { BookingHistory } from "./Components/BookingHistory/BookingHistory";
import { CustomerProfile } from "./Components/CustomerProfile/CustomerProfile";



export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    render() {
        return (
            <BrowserRouter>
                <NavbarV2 />
                <SearchTicketBox />
                <div className="customer-profile">
                    <div className="wrap-container">
                        <div className="row">
                            <div className="col-md-2 col-sm-2">
                                <SlideBar />
                            </div>
                            <div className="col-md-10 col-sm-10">
                                <Switch>
                                    <Route path="/profile" exact>
                                        <CustomerProfile />
                                    </Route>
                                    <Route path="/profile/bookings" exact>
                                        <BookingHistory />
                                    </Route>
                                    <Route path="/profile/bookings/viewdetails" exact>
                                        <ViewDetailsBooking />
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}