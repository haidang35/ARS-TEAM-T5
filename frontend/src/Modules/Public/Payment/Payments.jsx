import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { ContactsInfomation } from "./Components/ContactInfomation/ContactInfomation";
import { FlightDetailsTicket } from "./Components/FlightDetailsTicket/FlightDetailsTicket";
import { NoticeOfBookingStatus } from "./Components/NoticeOfBookingStatus/NoticeOfBookingStatus";
import { PassengerInfomation } from "./Components/PassengerInfomation/PassengerInfomation";

 class Payments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingData: '',
            isRedirect: false
        }
    }

    componentDidMount() {
        this.getBookingData();
    }

    getBookingData = () => {
        let isHasBookingData = false;
        let isRedirect = true;;
        if(typeof this.props.location.state !== 'undefined') {
            Object.keys(this.props.location.state).forEach(key => {
                if(key === 'bookingData') {
                    isHasBookingData = true;
                }
            })
        }
        if(isHasBookingData) {
            const { bookingData } = this.props.location.state;
            this.setState({
                bookingData
            });
            return;
        }
        this.setState({
            isRedirect
        });
    }
    render() {
        const { bookingData, isRedirect } = this.state;
        console.log("🚀 ~ file: Payments.jsx ~ line 44 ~ Payments ~ render ~ bookingData", bookingData)
        if(isRedirect) {
            return <Redirect to={{
                pathname: '/'
            }} />
        }
        return (
            <>
                <div className="wrap-container">
                    <div className="row">
                        <div className="col-md-12">
                            <NoticeOfBookingStatus bookingData={bookingData} />
                            <FlightDetailsTicket />
                            <PassengerInfomation />
                            <ContactsInfomation bookingData={bookingData} />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(Payments);