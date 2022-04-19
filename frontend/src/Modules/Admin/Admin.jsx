import { Box } from "@mui/material";
import React, { Component } from "react";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import { Dashboard } from "./Dashboard/Dashboard";
import Navbar from "./Shared/Components/Navbar/Narbar";
import { Sidebar } from "./Shared/Components/Sidebar/Sidebar";
import LocationTable from "./Location/Location"
import "./Admin.scss"
import { Airline } from "./Airline/Airline";
import AirlineList from "./Airline/Components/AirlineList/AirlineList";
import  AddNewAirline from "./Airline/Components/AddNewAirline/AddNewAirline";
import  UpdateAirline  from "./Airline/Components/UpdateAirline/UpdateAirline";


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
                                        <Route path="/admin/locations">
                                            <LocationTable />
                                        </Route>
                                        {/* <Route path="/admin/bookings">
                                            <BookingTable />
                                        </Route> */}
                                        <Route exact path="/admin/airlines/create">
                                            <AddNewAirline />
                                        </Route>
                                        <Route exact path="/admin/airlines/update">
                                            <UpdateAirline />
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
