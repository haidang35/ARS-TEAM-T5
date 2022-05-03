import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Form from "../../../../../Shared/Components/Form";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Redirect, withRouter } from "react-router-dom";
import { id } from "date-fns/locale";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import bookingService from "../../Shared/Service/BookingService";
import BookingTicketDetails from "../../../BookingTicket/Components/BookingTicketDetails/BookingTicketDetails";
import BookingTicketList from "../../../BookingTicket/Components/BookingTicketList/BookingTicketList";

class BookingDEtails extends Form {
  constructor(props) {
    super(props);
    this.state = {
      form: this._getInitFormData({
        bookingCode: "",
        contactName: "",
        contactPhone: "",
        contactEmail: "",
        contactAddress: "",
        note: "",
      }),
      userId: "",
     
      paymentMethod: "",
      content: "",
      isLoading: false,
      isRedirectSuccess: false,
      status: "",
      status: "",
      paymentMethod: "",
      bookingStatus: [
        {
          key: 1,
          type: "Active",
        },
        {
          key: 0,
          type: "DeActive",
        },
      ],
      paymentMethodList: [
        {
          key: 1,
          type: "Paypal",
        },
        {
          key: 0,
          type: "Visa",
        },
      ],
    };
  }

  componentDidMount() {
    this.getBookingeDetails();
  }
  handleChangePaymentMethod = (ev) => {
    this.setState({
      paymentMethod: ev.target.value,
    });
  }
  handleChangeStatus = (ev) => {
    this.setState({
      status: ev.target.value,
    });
  };


  handleChangeFile = (event) => {
    const file = event.target.files[0];
    let { form } = this.state;
    form.logo.value = file;
    this.setState({ form });
  };

  getBookingeDetails = async () => {
    const { id } = this.props.match.params;
    await bookingService.getBookingDetails(id).then((res) => {
      this.setState({
        userId: res.data.UserId,
        status: res.data.Status,
        paymentMethod: res.data.PaymentMethod,
      });
      this._fillForm({
        bookingCode: res.data.BookingCode,
        contactName: res.data.ContactName,
        contactPhone: res.data.ContactPhone,
        contactEmail: res.data.ContactEmail,
        contactAddress: res.data.ContactAddress,
        note: res.data.Note,
      });
    });
  };
  returnBookingList = (ev) => {
    this.setState({
      isRedirectSuccess: true,
    });
  };


  render() {
    const { bookingCode, contactName, contactEmail, contactPhone, note } =
      this.state.form;
    const {
      isRedirectSuccess,
      content,
      postAirlineList,
      isLoading,
      userId,
      status,
      paymentMethod,
      bookingStatus,
      paymentMethodList
    } = this.state;
    if (isRedirectSuccess) {
      return (
        <Redirect
          to={{
            pathname: "/admin/bookings",
            state: {
              message: {
                type: "",
                content: "",
              },
            },
          }}
        />
      );
    }
    return (
      <>
        <React.Fragment>
          <div id="addNewAirline">
            <Typography variant="h4" gutterBottom>
              View Booking Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  error={bookingCode.err !== ""}
                  helperText={
                    bookingCode.err !== ""
                      ? bookingCode.err === "*"
                        ? "BookingCode cannot be empty"
                        : bookingCode.err
                      : ""
                  }
                  required
                  id="bookingCode"
                  name="bookingCode"
                  value={bookingCode.value}
                  label="BookingCode"
                  autoComplete="given-name"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, "bookingCode")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={contactName.err !== ""}
                  helperText={
                    contactName.err !== ""
                      ? contactName.err === "*"
                        ? "ContactName cannot be empty"
                        : contactName.err
                      : ""
                  }
                  required
                  id="contactName"
                  name="contactName"
                  value={contactName.value}
                  label="ContactName"
                  autoComplete="family-name"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, "contactName")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={contactPhone.err !== ""}
                  helperText={
                    contactPhone.err !== ""
                      ? contactPhone.err === "*"
                        ? "ContactPhone cannot be empty"
                        : contactPhone.err
                      : ""
                  }
                  required
                  id="contactPhone"
                  name="contactPhone"
                  value={contactPhone.value}
                  label="ContactPhone"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, "contactPhone")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={contactEmail.err !== ""}
                  helperText={
                    contactEmail.err !== ""
                      ? contactEmail.err === "*"
                        ? "ContactEmail cannot be empty"
                        : contactEmail.err
                      : ""
                  }
                  required
                  id="contactEmail"
                  name="contactEmail"
                  value={contactEmail.value}
                  label="ContactEmail"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, "contactEmail")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={note.err !== ""}
                  helperText={
                    note.err !== ""
                      ? note.err === "*"
                        ? "Note cannot be empty"
                        : note.err
                      : ""
                  }
                  required
                  id="note"
                  name="note"
                  value={note.value}
                  label="Note"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, "note")}
                />
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="status">Select Status</InputLabel>
                    <Select
                      id="status"
                      name="status"
                      value={status}
                      label="Status"
                      onChange={this.handleChangeStatus}
                    >
                      {bookingStatus.map((status) => {
                        return (
                          <MenuItem key={status.key} value={status.key}>
                            {status.type}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="paymentMethod">Select Payment Method</InputLabel>
                    <Select
                      id="paymentMethod"
                      name="paymentMethod"
                      value={paymentMethod}
                      label="PaymentMethod"
                      onChange={this.handleChangePaymentMethod}
                    >
                      {paymentMethodList.map((paymentMethod) => {
                        return (
                          <MenuItem key={paymentMethod.key} value={paymentMethod.key}>
                            {paymentMethod.type}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <BookingTicketList/>
              </Grid>
              <div id="submit">
                <Button variant="contained" onClick={this.returnBookingList}>
                  Back to list
                </Button>
              </div>
            </Grid>
          </div>
        </React.Fragment>
      </>
    );
  }
}

export default withRouter(BookingDEtails);
