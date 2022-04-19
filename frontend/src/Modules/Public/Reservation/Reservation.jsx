import React, { Component } from "react";
import { Payment } from "./Components/Payment/Payment";
import { ContactsInfo } from "./Components/ContactsInfo/ContactsInfo";
import { CustomerInfomation } from "./Components/CustomerInfomation/CustomerInfomation";
import { SelectedFlight } from "./Components/SelectedFlight/SelectedFlight";
import { SelectedFlightDetails } from "./Components/SelectedFlightDetails/SelectedFlightDeatails";

export class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [
                {
                    id: 2,
                    price: 1000
                },
                {
                    id: 3,
                    price: 3000
                },
                {
                    id: 4,
                    price: 4000
                },
            ]

        }
    }

    
    render() {
        const { selected } = this.state;
        return (
            <>
                <div className="wrap-container">
                    <div className="row">
                        <SelectedFlight />
                        <SelectedFlightDetails />
                        <CustomerInfomation />
                        <ContactsInfo />
                        <Payment />
                    </div>
                    {
                       selected.map ((item, index) => {
                           return( <selectedFlights key={index} data={item.data}  price={item.price} /> )
                       })
                    }
                </div>

            </>
        )
    }
}