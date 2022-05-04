import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Form from "../../../../../Shared/Components/Form";
import paymentService from '../../Shared/PaymentService'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { Redirect, withRouter } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import bookingService from '../../../Booking/Shared/Service/BookingService'
import paymentService1 from '../../Shared/PaymentService'

class UpdatePayment extends Form {
  constructor(props) {
    super(props);
    this.state = {
      form: this._getInitFormData({
        amount: "",
      }),
      bookingId: "",
      bookingList:[],
      isLoading: false,
      postPaymentList: [],
      isRedirectSuccess: false, 
       paymentMethod: "",
       paymentMethodList: [
        {
          key: 1,
          type: "Paypal",
        },
        {
          key: 2,
          type: "BankingTranfer",
        },
        {
          key: 3,
          type: "PayAtOffice",
        },
      ],
      status: "",
      statusList: [
        {
          key: 1,
          type: "Active",
        },
        {
          key: 0,
          type: "DeActive",
        },

      ],
    }
  }
  componentDidMount() {
    this.getPaymentDetails();
    this.getBookingList();
  }

  handleChangeFile =(event) => {
    const file =event.target.files[0];
    let {form} =this.state;
    form.logo.value = file;
    this.setState({form});
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

  getPaymentDetails = async () => {
    const { id } = this.props.match.params;
    await paymentService.getPaymentDetails(id).then((res) => {
      this.setState({
        paymentMethod: res.data.PaymentMethod,
        status: res.data.Status,
        bookingId: res.data.BookingId,
      });
      this._fillForm({
        amount: res.data.Amount,
      });
    });
  };
  getBookingList = async () => {
      await bookingService.getBookingList().then((res) =>{
          this.setState({
              bookingList: res.data,
          })
      })
  }

  saveUpdatePayment = async () => {

    this._validateForm();
    console.log(this.state.form);
    if (this._isFormValid()) {
      this.setState({ isLoading: true });
      let { form, content,bookingId, status,paymentMethod, isRedirectSuccess } = this.state;
      let dataConverted = {
        PaymentMethod: paymentMethod,
        BookingId: bookingId,
        Amount: form.amount.value,
        Status: status,
      };
      await paymentService
        .updateDetails(dataConverted)
        .then((res) => {
          this.setState({
            isRedirectSuccess: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });

    }

  }
  handleChangeBooking = (ev) => {
    this.setState({
      bookingId: ev.target.value,
    })
  }

  render() {
    const { amount, } = this.state.form;
    const {isRedirectSuccess, content, bookingList, bookingId, isLoading, paymentMethod, status, paymentMethodList, statusList} = this.state;
    if(isRedirectSuccess){
      return <Redirect to={{
        pathname: '/admin/payments',
        state: {
          message: {
            type: 'success',
            content: 'Add new payment successful !'
          }
        }
      }}/>;
    }
    return (
      <>
        <React.Fragment>
          <div id='addNewPayment'>
            <Typography variant="h4" gutterBottom >
              Add New Payment
            </Typography>
            <Grid container spacing={3}>
            <Grid item xs={12} >
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="bookingId">Select Booking</InputLabel>
                    <Select
                      id="bookingId"
                      name="bookingId"
                      value={bookingId}
                      label="BookingId"
                      onChange={this.handleChangeBooking}
                    >
                      {bookingList.map((booking) => {
                        return (
                          <MenuItem
                            key={booking.Id}
                            value={booking.Id}>
                            {booking.BookingCode}
                          </MenuItem>
                        )
                      })
                      }
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
                      {statusList.map((status) => {
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