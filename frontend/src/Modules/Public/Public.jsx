import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "../Admin/Auth/Components/Login/Login";
import Register from "../Admin/Auth/Components/Register/Register";




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
                        <Route path="/admin-login">
                            <Login />

                        </Route>
                        <Route path="/admin-register">
                            <Register />

                        </Route>
                        
                    </Switch>
                </BrowserRouter>

            </>

        )
    }
}