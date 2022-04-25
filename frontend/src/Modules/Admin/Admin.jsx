import { Box } from "@mui/material";
import React, { Component } from "react";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import { Dashboard } from "./Dashboard/Dashboard";
import Navbar from "./Shared/Components/Navbar/Narbar";
import { Sidebar } from "./Shared/Components/Sidebar/Sidebar";
import "./Admin.scss"
import AirlineList from "./Airline/Components/AirlineList/AirlineList";
import AddNewFlight from "./Flight/Components/AddNewFlight/AddNewFlight";
import AddNewAirline from "./Airline/Components/AddNewAirline/AddNewAirline";
import FlightList from "./Flight/Components/FlightList/FlightList";
import AddNewFlightTicket from "./FlightTicket/Components/AddNewFlightTIcket/AddNewFlightTicket";
import FlightTicketList from "./FlightTicket/Components/FlightTicketList/FlightTicketList";
import UpdateFlight from "./Flight/Components/Update Flight/UpdateFlight";
import UpdateAirline from "./Airline/Components/UpdateAirline/UpdateAirline";
import UpdateFlightTicket from "./FlightTicket/Components/UpdateFlightTicket/UpdateFlightTicket";
import AddNewLocation from "./Location/Components/AddNewLocation/AddNewLocation";
import LocationList from "./Location/Components/LocationList/LocationList";
import UpdateLocation from "./Location/Components/UpdateLocation/UpdateLocation";
import AddNewUser from "./User/Components/AddNewUser/AddNewUser";
import UserList from "./User/Components/UserList/UserList";
import UpdateUser from "./User/Components/UpdateUser/UpdateUser";
import BookingList from "./Booking/Components/BookingList/BookingList";
import UpdateBooking from "./Booking/Components/UpdateBooking/UpdateBooking";



export class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <>
                <BrowserRouter>
                    <div id="admin">
                        <div className="row admin-box">
                            <div className="sidebar-admin">
                                <Sidebar />
                            </div>
                            <div className="main-content-admin">
                                <Navbar />
                                <Box
                                    sx={{
                                        padding: '1rem'

                                    }}
                                >
                                    <Switch>
                                        <Route path="/admin/dashboard" >
                                            <Dashboard />
                                        </Route>
                                        <Route exact path="/admin/airlines">
                                            <AirlineList />
                                        </Route>
                                        <Route exact path="/admin/airlines/create">
                                            <AddNewAirline />
                                        </Route>
                                        <Route exact path="/admin/airlines/:id">
                                            <UpdateAirline />
                                        </Route>
                                        <Route exact path="/admin/locations">
                                            <LocationList/>
                                        </Route>
                                        <Route exact path="/admin/locations/create">
                                            <AddNewLocation/>
                                        </Route>
                                        <Route exact path="/admin/locations/:id">
                                            <UpdateLocation/>
                                        </Route>
                                        <Route exact path="/admin/flight-tickets">
                                            <FlightTicketList />
                                        </Route>
                                        <Route exact path="/admin/flight-tickets/create">
                                            <AddNewFlightTicket/>
                                        </Route>
                                        <Route exact path = "/admin/flightTickets/:id">
                                            <UpdateFlightTicket/>
                                        </Route>
                                        <Route exact path="/admin/flights">
                                           <FlightList />
                                        </Route>
                                        <Route exact path="/admin/flights/create">
                                            <AddNewFlight/>
                                        </Route>
                                        <Route exact path = "/admin/flights/:id">
                                            <UpdateFlight/>
                                        </Route>
                                        <Route exact path="/admin/users">
                                           <UserList/>
                                        </Route>
                                        <Route exact path="/admin/users/create">
                                           <AddNewUser/>
                                        </Route>
                                        <Route exact path = "/admin/users/:id">
                                           <UpdateUser/>
                                        </Route>
                                        <Route exact path="/admin/bookings">
                                           <BookingList/>
                                        </Route>
                                        <Route exact path = "/admin/bookings/:id">
                                           <UpdateBooking/>
                                        </Route>
                                       
                                       
                                    </Switch>
                                </Box>
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
            </>
        )
    }
}
