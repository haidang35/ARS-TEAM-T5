import React, { Component } from "react";
import { Payment } from "./Components/Payment/Payment";
import { SelectedFlight } from "./Components/SelectedFlight/SelectedFlight";
import CustomerInfomation from "./Components/CustomerInfomation/CustomerInfomation";
import ContactsInfo from "./Components/ContactsInfo/ContactsInfo";

export class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTickets: [
                {
                    id: 2,
                    price: 1000
                },
               
            ],

        }
    }


    render() {
        const { selectedTickets } = this.state;
        return (
            <>
                <div className="wrap-container">
                    <div className="row">
                        {
                            selectedTickets.map((item, index) => {
                                return (<SelectedFlight key={index} data={item} price={item.price} />)
                            })
                        }
                       <CustomerInfomation />
                       <ContactsInfo />
                        <Payment />
                    </div>

                </div>

            </>
        )
    }
}