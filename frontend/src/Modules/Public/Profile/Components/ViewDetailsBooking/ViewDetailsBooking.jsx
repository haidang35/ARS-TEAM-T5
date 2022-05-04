import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import publicService from "../../../Shared/Services/PublicService";
import { TicketItem } from "../../../ChooseFlightTicket/Components/TicketItem/TicketItem";
import { FlightDetailsTicket } from "../../../Payment/Components/FlightDetailsTicket/FlightDetailsTicket";

class ViewDetailsBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingDetails: "",

        }
    }

    componentDidMount() {
        this.getBookingDetails();
    }

    getBookingDetails = async () => {
        const { bookingCode } = this.props.match.params;
        await publicService.getBookingDetails(bookingCode)
            .then((res) => {
                this.setState({
                    bookingDetails: res.data,
                })
            })
    }


    render() {
        const { bookingDetails } = this.state;
        return (
            <>
                <div>
                    {bookingDetails.map((item) => {
                        return (
                            <FlightDetailsTicket 
                            bookingDetails={bookingDetails}
                            />
                        )
                    })}
                </div>


            </>
        )
    }
}
export default withRouter(ViewDetailsBooking);