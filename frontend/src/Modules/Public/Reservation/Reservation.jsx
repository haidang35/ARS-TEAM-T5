import React, { Component } from "react";
import { Payment } from "./Components/Payment/Payment";
import { SelectedFlight } from "./Components/SelectedFlight/SelectedFlight";
import CustomerInfomation from "./Components/CustomerInfomation/CustomerInfomation";
import { withRouter } from "react-router-dom";
import NavbarV2 from "../Shared/Components/NavbarV2/NavbarV2";
import { BookingStepBar } from "../ChooseFlightTicket/Components/BookingStepBar/BookingStepBar";
import { ContactsInfo } from "./Components/ContactsInfo/ContactsInfo";

class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flightTicket: '',
            passengers: '',
            isContinue: false
        }
    }

    componentDidMount = () => {
        this.getChoosedFlightTicket();
    }

    getChoosedFlightTicket = () => {
        const { flightTicket, passengers } = this.props.location.state;
        this.setState({
            flightTicket,
            passengers
        });
    }

    onContinute = () => {
        this.setState({
            isContinue: true
        })
    }

    render() {
        const { flightTicket, passengers, isContinue } = this.state;
        
        return (
            <>
                <NavbarV2 />

                <div className="wrap-container">
                    <div className="row">
                        <BookingStepBar />
                        <SelectedFlight  flightTicket={flightTicket} />
                        <CustomerInfomation passengers={passengers} isContinue={isContinue} />
                        <ContactsInfo isContinue={isContinue} />
                        <Payment onContinute={this.onContinute} />
                    </div>

                </div>

            </>
        )
    }
}

export default withRouter(Reservation);