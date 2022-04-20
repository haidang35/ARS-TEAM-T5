import React, { Component } from "react";
import { Payment } from "./Components/Payment/Payment";
import { CustomerInfomation } from "./Components/CustomerInfomation/CustomerInfomation";
import { SelectedFlight } from "./Components/SelectedFlight/SelectedFlight";
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
                {
                    id: 3,
                    price: 3000
                },
                {
                    id: 4,
                    price: 4000
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
                        <CustomerInfomation />
                        <ContactsInfo />
                        <Payment />
                    </div>
                    {
                       selectedTickets.map ((item, index) => {
                           return (<SelectedFlight key={index} data={item}  price={item.price}/>)
                       })
                    }
                </div>

            </>
        )
    }
}