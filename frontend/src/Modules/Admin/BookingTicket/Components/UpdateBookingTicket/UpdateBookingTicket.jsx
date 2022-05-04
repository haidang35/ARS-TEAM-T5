import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Form from "../../../../../Shared/Components/Form";
import flightService from '../../../Flight/Shared/Services/FlightService';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Redirect, withRouter } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { getDateTimeNow } from "../../../../../Helpers/datetime";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { isThursday } from 'date-fns';
import bookingTicketService from '../../Shared/Services/BookingTicket';





class UpdateBookingTicket extends Form {
  constructor(props) {
    super(props);
    this.state = {
      form: this._getInitFormData({
       seatFlightCode: "",
        passengerName: "",
        passengerBirthday: "",
       
        seatFlightFee: "",
        passengerPhone: "",
        passengerIdentityNumber:"",

      }),
      passengerGender: "",
      genderList:[
        {
          key: 1,
          type: "Male",
        },
        {
          key: 2,
          type: "Female",
        },
        {
          key: 0,
          type: "Other",
        },
      ],
      ticketId: "",
      content: "",
      isLoading: false,
      isRedirectSuccess: false,
      bookingid:"",

      
     
    }
  }
  componentDidMount() {
   this.getBookingTicketDetails();
  }
  getBookingTicketDetails = async () => {
    const { id } = this.props.match.params;
    await bookingTicketService.getBookingTicketDetails(id).then((res) =>{
        this.setState({
           
            passengerGender: res.data.PassengerGender,
            ticketId: res.data.TicketId,
            bookingid: res.data.BookingId,

        });
        this._fillForm({
          seatFlightCode: res.data.SeatFlightCode,
          passengerName: res.data.PassengerName,
          passengerBirthday: res.data.PassengerBirthday,
          seatFlightFee: res.data.SeatFlightFee,
          passengerPhone: res.data.PassengerPhone,
          passengerIdentityNumber: res.data.PassengerIdentityNumber,
        })
    })
  }


//   saveUpdateFlightTicket = async () => {

//     this._validateForm();
//     if (this._isFormValid()) {
//      const { id } = this.props.match.params;
//       this.setState({ isLoading: true });
//       const { form, content, flightId, availableClass, status } = this.state;
//       const dataConverted = {
//         FlightId: flightId,
//         TicketType: form.ticketType.value,
//         AvailableClass: availableClass,
//         CarbinBag: form.carbinBag.value,
//         CheckinBag: form.checkinBag.value,
//         Status: status,
//         Price: form.price.value,
//         Tax: form.tax.value,
//         BusinessSeatFee: form.businessSeatFee.value,
//         DeluxeSeatFee: form.deluxeSeatFee.value,
//         EconomySeatFee: form.economySeatFee.value,
//         ExitSeatFee: form.exitSeatFee.value,

//       };
//       console.log('1222222222222222222222', dataConverted)
//       await flightTicketService
//         .updateDetails(id,dataConverted)
//         .then((res) => {
//           console.log(res.data);
//           this.setState({
//             isRedirectSuccess: true,
//           });
//         })
//         .catch((err) => {
//           console.log(err);
//         });

//     }


//   }
//   handleChangeStatus = (ev) => {
//     this.setState({
//       status: ev.target.value,
//     });
//   };
//   handleChangeAvailableClass = (ev) => {
//     this.setState({
//       availableClass: ev.target.value,
//     })
//   }
//   handleChangeAvailableClass = (ev) => {
//     this.setState({
//       availableClass: ev.target.value,
//     })
//   }
//   handleChangeFlight = (ev) => {
//     this.setState({
//       flightId: ev.target.value,
//     })
//   }
  
  render() {
    const { seatFlightCode, seatFlightFee, passengerName, passengerBirthday, passengerPhone,passengerIdentityNumber } = this.state.form;
    const { isRedirectSuccess, content, passengerGender, genderList, ticketId, bookingid  } = this.state;
    if (isRedirectSuccess) {
      return <Redirect to={{
        pathname: '/admin/bookings/details/:id',
        state: {
          message: {
            type: 'success',
            content: 'Update Booking Ticket successful !'
          }
        }
      }} />;
    }
    return (
      <>
        <React.Fragment>
          <div id='addNewFlight'>
            <Typography variant="h4" gutterBottom >
              Update Booking Ticket
            </Typography>
            <Grid container spacing={3}>
            <Grid item xs={6}>
                <TextField
                  error={seatFlightCode.err !== ''}
                  helperText={seatFlightCode.err !== '' ? seatFlightCode.err === '*' ? 'Seat Fligt Code cannot be empty' : seatFlightCode.err : ''}
                  required
                  id="seatFlightCode"
                  name="seatFlightCode"
                  value={seatFlightCode.value}
                  label="Seat Flight Code"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'seatFlightCode')}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={seatFlightFee.err !== ''}
                  helperText={seatFlightFee.err !== '' ? seatFlightFee.err === '*' ? 'Seat Fligt Fee cannot be empty' : seatFlightFee.err : ''}
                  required
                  id="seatFlightFee"
                  name="seatFlightFee"
                  value={seatFlightFee.value}
                  label="Seat Flight Fee"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'seatFlightFee')}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={passengerName.err !== ''}
                  helperText={passengerName.err !== '' ? passengerName.err === '*' ? 'Passenger Name cannot be empty' : passengerName.err : ''}
                  required
                  id="passengerName"
                  name="passengerName"
                  value={passengerName.value}
                  label="Passenger Name"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'passengerName')}
                />
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <TextField
                      id="date"
                      name="passengerBirthday"
                      label="Passenger Birthday"
                      type="date"
                      value={passengerBirthday.value}
                      sx={{ width: 250 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(ev) => this._setValue(ev, "passengerBirthday")}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={passengerPhone.err !== ''}
                  helperText={passengerPhone.err !== '' ? passengerPhone.err === '*' ? 'Passenger Phone cannot be empty' : passengerPhone.err : ''}
                  required
                  id="passengerPhone"
                  name="passengerPhone"
                  value={passengerPhone.value}
                  label="Passenger Phone"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'passengerPhone')}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={passengerIdentityNumber.err !== ''}
                  helperText={passengerIdentityNumber.err !== '' ? passengerIdentityNumber.err === '*' ? 'Passenger Identity Number Phone cannot be empty' : passengerIdentityNumber.err : ''}
                  required
                  id="passengerIdentityNumber"
                  name="passengerIdentityNumber"
                  value={passengerIdentityNumber.value}
                  label="Passenger Identity Number"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'passengerIdentityNumber')}
                />
              </Grid>




              {/* <Grid item xs={6} >
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="flightId">Select Flight</InputLabel>
                    <Select
                      id="flightTd"
                      name="flightTd"
                      value={flightId}
                      label="Flight"
                      onChange={this.handleChangeFlight}
                    >
                      {flightticketList.map((flightTicket) => {
                        return (
                          <MenuItem
                            key={flightTicket.Id}
                            value={flightTicket.Id}>

                            {flightTicket.FlightCode}
                          </MenuItem>

                        )
                      })
                      }
                    </Select>
                  </FormControl>
                </Box>

              </Grid>
              <Grid item xs={6} >
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="flightId">Select AvailableClass</InputLabel>
                    <Select
                      id="availableClass"
                      name="availableClass"
                      value={availableClass}
                      label="AvailableClass"
                      onChange={this.handleChangeAvailableClass}
                    >
                       {ticketTypeList.map((ticketType) => {
                        return (
                          <MenuItem
                            key={ticketType.key}
                            value={ticketType.type}>

                            {ticketType.type}
                          </MenuItem>

                        )
                      })
                      }
                    
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={ticketType.err !== ''}
                  helperText={ticketType.err !== '' ? ticketType.err === '*' ? 'TicketType cannot be empty' : ticketType.err : ''}
                  required
                  id="ticketType"
                  name="ticketType"
                  value={ticketType.value}
                  label="TicketType"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'ticketType')}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={carbinBag.err !== ''}
                  helperText={carbinBag.err !== '' ? carbinBag.err === '*' ? 'CarbinBag cannot be empty' : carbinBag.err : ''}
                  required
                  id="carbinBag"
                  name="carbinBag"
                  value={carbinBag.value}
                  label="CarbinBag"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'carbinBag')}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={checkinBag.err !== ''}
                  helperText={checkinBag.err !== '' ? checkinBag.err === '*' ? 'CheckinBag cannot be empty' : checkinBag.err : ''}
                  required
                  id="checkinBag"
                  name="checkinBag"
                  value={checkinBag.value}
                  label="CheckinBag"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'checkinBag')}
                />
              </Grid>
             
              <Grid item xs={6}>
                <TextField
                  error={price.err !== ''}
                  helperText={price.err !== '' ? price.err === '*' ? ' Price cannot be empty' :  price.err : ''}
                  required
                  id="price"
                  name="price"
                  value={price.value}
                  label="Price"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'price')}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={tax.err !== ''}
                  helperText={tax.err !== '' ? tax.err === '*' ? ' Tax cannot be empty' :  tax.err : ''}
                  required
                  id="tax"
                  name="tax"
                  value={tax.value}
                  label="Tax"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'tax')}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={businessSeatFee.err !== ''}
                  helperText={businessSeatFee.err !== '' ? businessSeatFee.err === '*' ? 'BusinessSeatFee cannot be empty' : businessSeatFee.err : ''}
                  required
                  id="businessSeatFee"
                  name="businessSeatFee"
                  value={businessSeatFee.value}
                  label="BusinessSeatFee"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'businessSeatFee')}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={deluxeSeatFee.err !== ''}
                  helperText={deluxeSeatFee.err !== '' ? deluxeSeatFee.err === '*' ? 'DeluxeSeatFee cannot be empty' : deluxeSeatFee.err : ''}
                  required
                  id="deluxeSeatsFee"
                  name="deluxeSeatsFee"
                  value={deluxeSeatFee.value}
                  label="DeluxeSeatsFee"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'deluxeSeatFee')}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={economySeatFee.err !== ''}
                  helperText={economySeatFee.err !== '' ? economySeatFee.err === '*' ? 'EconomySeatFee cannot be empty' : economySeatFee.err : ''}
                  required
                  id="economySeatFee"
                  name="economySeatFee"
                  value={economySeatFee.value}
                  label="EconomySeatFee"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'economySeatFee')}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={exitSeatFee.err !== ''}
                  helperText={exitSeatFee.err !== '' ? exitSeatFee.err === '*' ? 'ExitSeatFee cannot be empty' : exitSeatFee.err : ''}
                  required
                  id="exitSeatFee"
                  name="exitSeatFee"
                  value={exitSeatFee.value}
                  label="ExitSeatsFee"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'exitSeatFee')}
                />
              </Grid>
              <Grid item xs={12}>
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
              </Grid> */}

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                  label="Use this address for payment details"
                />
              </Grid>
              <div id='submit'>
                <Button variant="contained" onClick={this.saveUpdateFlightTicket} >Submit</Button>
              </div>
            </Grid>
          </div>
        </React.Fragment>
      </>
    );
  }

}

export default withRouter(UpdateBookingTicket);