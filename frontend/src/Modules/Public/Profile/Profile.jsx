import React, { Component, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import NavbarV2 from "../Shared/Components/NavbarV2/NavbarV2";
import { SearchTicketBox } from "../Shared/Components/SearchTicketBox/SearchTicketBox";
import { BookingHistory } from "./Components/BookingHistory/BookingHistory";
import { CustomerProfile } from "./Components/CustomerProfile/CustomerProfile";
import { SlideBar } from "./Components/SlideBar/SlideBar";
import { ViewDetailsBooking } from "./Components/ViewDetailsBooking/ViewDetailsBooking";



export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    render() {
        return (
            <>
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
                                    <Suspense>
                                        <Route
                                            exact
                                            path="/customer-bookinghistory"
                                            component={BookingHistory}
                                        />
                                        <Route
                                            exact
                                            path="/customer-info/viewdetailsbooking"
                                            component={ViewDetailsBooking}
                                        />
                                        <Route
                                            exact
                                            path="/customer-info/profile"
                                            component={CustomerProfile}
                                        />
                                    </Suspense>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}