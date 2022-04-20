import { Box } from "@mui/material";
import React, { Component } from "react";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import { Dashboard } from "./Dashboard/Dashboard";
import Navbar from "./Shared/Components/Navbar/Narbar";
import { Sidebar } from "./Shared/Components/Sidebar/Sidebar";
import "./Admin.scss"
import AirlineList from "./Airline/Components/AirlineList/AirlineList";
import UpdateAirline  from "./Airline/Components/UpdateAirline/UpdateAirline";
import AddNewFlight from "./Flight/Components/AddNewFlight/AddNewFlight";
import LocationList from "./Location/Location";
import FlightList from "./Flight/Flight";
import FlightTicketList from "./FlightTicket/FlightTicket";
import FormUpdateFlight from "./Flight/Update/UpdateFlight";
import FormCreateFlight from "./Flight/Create/CreateFlight";
import AddNewAirline from "./Airline/Components/AddNewAirline/AddNewAirline";
import AddNewLocation from "./Location/Create/AddNewLocation"


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
                                        <Route exact path="/admin/locations">
                                            <LocationList />
                                        </Route>
                                        <Route exact path="/admin/locations/create">
                                            <AddNewLocation />
                                        </Route>
                                        <Route path="/admin/flights">
                                            <FlightList />
                                        </Route>
                                        <Route path="/admin/flight-tickets">
                                            <FlightTicketList />
                                        </Route>
                                        
                                        <Route path="/admin/flight/update">
                                            <FormUpdateFlight />
                                        </Route>
                                        <Route path="/admin/flight/create">
                                            <FormCreateFlight />
                                        </Route>
                                        <Route exact path="/admin/flights">
                                            <FlightList/>
                                        </Route>
                                        <Route exact path="/admin/flights/create">
                                            <AddNewFlight/>
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
