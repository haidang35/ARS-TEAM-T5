import React, { Component } from "react";
import NavbarV2 from "../Shared/Components/NavbarV2/NavbarV2";
import { SearchTicketBox } from "../Shared/Components/SearchTicketBox/SearchTicketBox";
import { SlideBar } from "./Components/SlideBar/SlideBar";

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
                <div className="wrap-container">
                    <div className="row">
                        <div className="col-md-2 col-sm-2"  >
                            <SlideBar />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}