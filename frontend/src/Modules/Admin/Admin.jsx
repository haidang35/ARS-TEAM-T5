import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Auth/Components/Login/Login";
import Register from "./Auth/Components/Register/Register";
import Navbar from "./Shared/Components/Navbar/Narbar";



export class Admin extends Component{
    constructor(props){
        super(props);
        this.state= {

        }
    }
    render(){
        return(
            <>
            <BrowserRouter>
            <Switch>
                <Route path="/admin-login"> 
                    <Login/>
                </Route>
                <Route path="/admin-register"> 
                    <Register/>
                </Route>
            </Switch>
            </BrowserRouter>
            </>
        )
    }
}
