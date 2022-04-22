import React, { Component } from "react";
import { Payment } from "./Components/Payment/Payment";
import { SelectedFlight } from "./Components/SelectedFlight/SelectedFlight";
import ContactsInfo from "./Components/ContactsInfo/ContactsInfo";
import CustomerInfomation from "./Components/CustomerInfomation/CustomerInfomation";
import { withRouter } from "react-router-dom";

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
                <div className="wrap-container">
                    <div className="row">
                        <SelectedFlight flightTicket={flightTicket} />
                        <CustomerInfomation passengers={passengers} isContinue={isContinue} />
                        <ContactsInfo />
                        <Payment onContinute={this.onContinute}/>
                    </div>

                </div>

            </>
        )
    }
}

export default withRouter(Reservation);