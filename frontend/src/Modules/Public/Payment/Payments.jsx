import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { PAYMENT_METHODS } from "../Reservation/Components/Payment/Payment";
import NavbarV2 from "../Shared/Components/NavbarV2/NavbarV2";
import  SearchTicketBox  from "../Shared/Components/SearchTicketBox/SearchTicketBox";
import publicService from "../Shared/Services/PublicService";
import { ContactsInfomation } from "./Components/ContactInfomation/ContactInfomation";
import { FlightDetailsTicket } from "./Components/FlightDetailsTicket/FlightDetailsTicket";
import { NoticeOfBookingStatus } from "./Components/NoticeOfBookingStatus/NoticeOfBookingStatus";
import { PassengerInfomation } from "./Components/PassengerInfomation/PassengerInfomation";
import { PaymentNoticeBox } from "./Components/PaymentNoticeBox/PaymentNoticeBox";
import PayPalPayment from "./Components/PaypalPayment/PayPalPayment";
import { BookingStepBar } from "../ChooseFlightTicket/Components/BookingStepBar/BookingStepBar"; 
export const BOOKING_STATUS = {
  PAID: 1,
  CANCELLED: 0,
  PENDING: 2,
};

class Payments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingData: "",
      isRedirect: false,
      totalMoneyConverted: 0,
      callApiConvertCurrency: false,
      bookingId: "",
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getBookingData();
    this.checkBookingDetails();
  }

  checkBookingDetails = async () => {
    const { bookingData } = this.props.location.state;
    await publicService
      .getBookingDetails(bookingData.BookingCode)
      .then((res) => {
        this.setState({
          bookingData: res.data,
        });
      });
  };

  getBookingData = () => {
    let isHasBookingData = false;
    let isRedirect = true;
    if (typeof this.props.location.state !== "undefined") {
      Object.keys(this.props.location.state).forEach((key) => {
        if (key === "bookingData") {
          isHasBookingData = true;
        }
      });
    }
    if (isHasBookingData) {
      const { bookingData } = this.props.location.state;
      this.setState({
        bookingData,
        bookingId: bookingData.Id,
      });
      return;
    }
    this.setState({
      isRedirect,
    });
  };

  onPayWithPayPal = async (payment) => {
    const { bookingId } = this.state;
    const paymentData = {
        BookingId: bookingId,
        PaymentMethod: PAYMENT_METHODS.INTERNATIONAL_PAYMENT_GATEWAY,
        Amount: payment.purchase_units[0].amount.value
    }
    await publicService.paymentBooking(paymentData)
        .then((res) => {
            this.checkBookingDetails();
    })
  };

  convertCurrency = async (totalMoney) => {
    const params = {
      format: "json",
      from: "VND",
      to: "USD",
      amount: totalMoney,
    };
    if (totalMoney > 0) {
      await publicService.convertCurrency(params).then((res) => {
        this.setState({
          totalMoneyConverted: res.data.rates.USD.rate_for_amount,
        });
      });
    }
  };

  render() {
    const { bookingData, isRedirect, totalMoneyConverted } = this.state;
    const { totalMoney } = this.props.location.state;
    if (isRedirect) {
      return (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      );
    }
    return (
      <>
        <NavbarV2 />
        <SearchTicketBox />
        <div className="wrap-container">
        <BookingStepBar step={4}/>
          <div className="row">
            <div className="col-md-12">
              <NoticeOfBookingStatus bookingData={bookingData} />
              {bookingData.Status === BOOKING_STATUS.PENDING ? (
                bookingData.PaymentMethod ===
                PAYMENT_METHODS.INTERNATIONAL_PAYMENT_GATEWAY ? (
                  <PayPalPayment
                    onPayWithPayPal={this.onPayWithPayPal}
                    totalMoney={totalMoney}
                  />
                ) : bookingData.PaymentMethod ===
                  PAYMENT_METHODS.BANKING_TRANSFER ? (
                  <PaymentNoticeBox />
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              <FlightDetailsTicket bookingData={bookingData}   />
              <PassengerInfomation bookingData={bookingData} />
              <ContactsInfomation bookingData={bookingData} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Payments);
