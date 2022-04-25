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
import paymentService1 from '../../Shared/PaymentService'

class AddNewPayment extends Form {
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
    }
  }
  componentDidMount() {
    console.log(this.state.form);
    this.getPaymentList();
  }

  handleChangeFile =(event) => {
    const file =event.target.files[0];
    let {form} =this.state;
    form.logo.value = file;
    this.setState({form});
  }

  getPaymentList = async () =>{
    await paymentService.getPaymentList().then((res) =>{
      this.setState({
        postPaymentList: res.data,

      });
    });
  }


  saveNewPayment = async () => {

    this._validateForm();
    console.log(this.state.form);
    if (this._isFormValid()) {
      this.setState({ isLoading: true });
      let { form, content,bookingId } = this.state;
      let dataConverted = {
        PaymentMethod: form.paymentMethod.value,
        BookingId: bookingId,
        Amount: form.amount.value,
        Status: form.status.value,
      };
      await paymentService1
        .createNew(dataConverted)
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
    const { paymentMethod, amount, status, bookingId } = this.state.form;
    const {isRedirectSuccess, content, bookingList, postAirlineList, isLoading} = this.state;
    if(isRedirectSuccess){
      return <Redirect to={{
        pathname: '/admin/payment',
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
                <Button variant="contained" onClick={this.saveNewPayment} >Submit</Button>
              </div>
            </Grid>
          </div>
        </React.Fragment>
      </>
    );
  }

}

export default withRouter(AddNewPayment);