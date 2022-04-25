import React, { Component } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
import "./SlideBar.scss";

export class SlideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <>
                <div className="customer-side-bar">
                    <ul className="menu-list">
                        <Link
                            to="/customerprofile"
                            style={{ textDecoration: "none" }}
                        >
                            <li className="menu-item">
                                {" "}
                                <AccountCircleIcon className="icon-menu" />
                                Profile
                            </li>
                        </Link>

                        <Link
                            to="/booking"
                            style={{ textDecoration: "none" }}
                        >
                            {" "}
                            <li className="menu-item">
                                <ShoppingCartIcon className="icon-menu" />
                                Booking
                            </li>
                        </Link>
                    </ul>
                </div>
            </>
        )
    }
}