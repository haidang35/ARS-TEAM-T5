import { Box } from "@mui/material";
import React, { Component } from "react";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import Login from "./Auth/Components/Login/Login";
import Register from "./Auth/Components/Register/Register";
import { Dashboard } from "./Dashboard/Dashboard";
import Navbar from "./Shared/Components/Navbar/Narbar";
import { Sidebar } from "./Shared/Components/Sidebar/Sidebar";
import "./Admin.scss"
import LocationTable from "./Location/Location";
import AirlineTable from "./Airline/Airline";
import FlightTable from "./Flight/Flight";
import FlightTicketTable from "./FlightTicket/FlightTicket";
import FormCreateAirline from "./Airline/Create/CreateAirline";
import FormUpdateAirline from "./Airline/Update/UpdateAirline";
import FormUpdateFlight from "./Flight/Update/UpdateFlight";
import FormCreateFlight from "./Flight/Create/CreateFlight";


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
                                        <Route path="/admin/locations">
                                            <LocationTable />
                                        </Route>
                                        <Route path="/admin/airlines">
                                            <AirlineTable />
                                        </Route>
                                        <Route path="/admin/flights">
                                            <FlightTable />
                                        </Route>
                                        <Route path="/admin/flight-tickets">
                                            <FlightTicketTable />
                                        </Route>
                                        <Route path="/admin/airline/create-airline">
                                            <FormCreateAirline />
                                        </Route>
                                        <Route path="/admin/airline/update-airline">
                                            <FormUpdateAirline />
                                        </Route>
                                        <Route path="/admin/flight/update">
                                            <FormUpdateFlight />
                                        </Route>
                                        <Route path="/admin/flight/create">
                                            <FormCreateFlight />
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
