import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Form from "../../../../../Shared/Components/Form";
import airlineService from "../../Shared/Services/AirlineService";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Redirect, withRouter } from "react-router-dom";
import flightService from "../../../Flight/Shared/Services/FlightService";
import { id } from "date-fns/locale";

class UpdatePayment extends Form {
  constructor(props) {
    super(props);
    this.state = {
      form: this._getInitFormData({
        paymentMethod: "",
        amount: "",
        status: "",
      }),
      bookingId: "",
      bookingList:[],
      isLoading: false,
      postPaymentList: [],
      isRedirectSuccess: false,
    };
  }

  componentDidMount() {
    this.getAirlineDetails();
  }

  handleChangeFile = (event) => {
    const file = event.target.files[0];
    let { form } = this.state;
    form.logo.value = file;
    this.setState({ form });
  };

  getPaymentDetails = async () => {
    const { id } = this.props.match.params;
    await paymentService.getPaymentDetails(id).then((res) => {
        this.setState({
            bookingId: res.data.BookingId
        })
      this._fillForm({
        paymentMethod: res.data.PaymentMethod,
        amount: res.data.Amount,
        status: res.data.Status,
      });
    });
  };

  saveUpdatePayment = async () => {
    this._validateForm();
    if (this._isFormValid()) {
      const { id } = this.props.match.params;
      const { form, isRedirectSuccess, bookingId } = this.state;
      const dataConverted = {
        PaymentMethod: form.paymentMethod.value,
        Amount: form.amount.value,
        Status: form.status.value,
      };
      await paymentService
        .updateDetails(id, dataConverted)
        .then((res) => {
          this.setState({
            isRedirectSuccess: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    const { paymentMethod, amount, status, logo } = this.state.form;
    const { isRedirectSuccess, content, postPaymentList, isLoading } =
      this.state;
    if (isRedirectSuccess) {
      return (
        <Redirect
          to={{
            pathname: "/admin/payment",
            state: {
              message: {
                type: "success",
                content: "Update payment successful !",
              },
            },
          }}
        />
      );
    }
    return (
      <>
        <React.Fragment>
          <div id="addNewPayment">
            <Typography variant="h4" gutterBottom>
              Update Payment
            </Typography>
            <Grid container spacing={3}>
            <Grid item xs={12} >
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="bookingId">Select Booking</InputLabel>
                    <Select
                      id="bookingId"
                      name="bookingId"
                      value={bookingId.value}
                      label="BookingId"
                      onChange={this.handleChangeBooking}
                    >
                      {bookingList.map((booking) => {
                        return (
                          <MenuItem
                            key={booking.Id}
                            value={booking.Id}>
                            {booking.Id}
                          </MenuItem>

                        )
                      })
                      }
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} >
                <TextField
                error= {paymentMethod.err !==''}
                helperText={paymentMethod.err !== '' ? paymentMethod.err === '*' ? 'Code cannot be empty': paymentMethod.err : '' }
                  required
                  id="paymentMethod"
                  name="paymentMethod"
                  value= {paymentMethod.value}
                  label="PaymentMethod"
                  autoComplete="family-name"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'paymentMethod')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                error= {amount.err !==''}
                helperText={amount.err !== '' ? amount.err === '*' ? 'Country cannot be empty': amount.err : '' }
                  required
                  id="amount"
                  name="amount"
                  value= {amount.value}
                  label="Amount"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'amount')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                error= {status.err !==''}
                helperText={status.err !== '' ? status.err === '*' ? 'Country cannot be empty': status.err : '' }
                  required
                  id="status"
                  name="status"
                  value= {status.value}
                  label="Status"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'status')}
                />
              </Grid>
             
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                  label="Use this address for payment details"
                />
              </Grid>
              <div id='submit'>
                <Button variant="contained" onClick={this.saveUpdatePayment} >Submit</Button>
              </div>
            </Grid>
          </div>
        </React.Fragment>
      </>
    );
  }
}

export default withRouter(UpdatePayment);
