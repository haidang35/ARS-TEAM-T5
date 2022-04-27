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
import { Redirect } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { getDateTimeNow } from "../../../../../Helpers/datetime";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import flightTicketService from '../../Shared/Service/FlightTicketService';





class AddNewFlightTicket extends Form {
  constructor(props) {
    super(props);
    this.state = {
      form: this._getInitFormData({
        carbinBag: "",
        checkinBag: "",
        price: "",
        tax: "",
        businessSeatFee: "",
        deluxeSeatFee: "",
        economySeatFee: "",
        exitSeatFee: "",
        status: "",
        ticketType: "",

      }),
      availableClass: "",
      
      flightId: "",
      content: "",
      isLoading: false,
      postFlightList: [],
      isRedirectSuccess: false,
      flightticketList: [],
      ticketTypeList: [
        {
          key:1,
          type:"Business"
        },
        {
          key:2 ,
          type: "Economy"
        },
        {
          key:3,
          type: "Deluxe"
        },
      ],
      availableClassList: [],
    }
  }
  componentDidMount() {
   this.getFlightList();


  }

  getFlightList = async () => {
    await flightService.getFlightList().then((res) => {
      console.log("999999999999999", res.data)
      this.setState({
        flightticketList: res.data,

      });
    });
  }


  saveNewFlightTicket = async () => {

    this._validateForm();
    if (this._isFormValid()) {
      this.setState({ isLoading: true });
      let { form, content, flightId, availableClass } = this.state;
      let dataConverted = {
        FlightId: flightId,
        TicketType: form.ticketType.value,
        AvailableClass: availableClass,
        CarbinBag: form.carbinBag.value,
        CheckinBag: form.checkinBag.value,
        Status: form.status.value,
        Price: form.price.value,
        Tax: form.tax.value,
        BusinessSeatFee: form.businessSeatFee.value,
        DeluxeSeatFee: form.deluxeSeatFee.value,
        EconomySeatFee: form.economySeatFee.value,
        ExitSeatFee: form.exitSeatFee.value,

      };
      console.log('1222222222222222222222', dataConverted)
      await flightTicketService
        .createNew(dataConverted)
        .then((res) => {
          console.log(res.data);
          this.setState({
            isRedirectSuccess: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });

    }


  }
  handleChangeAvailableClass = (ev) => {
    this.setState({
      availableClass: ev.target.value,
    })
  }
  handleChangeAvailableClass = (ev) => {
    this.setState({
      availableClass: ev.target.value,
    })
  }
  handleChangeFlight = (ev) => {
    this.setState({
      flightId: ev.target.value,
    })
  }
  
  render() {
    const { carbinBag, checkinBag, status, price, tax, ticketType,
      businessSeatFee, economySeatFee, deluxeSeatFee, exitSeatFee, } = this.state.form;
    const { isRedirectSuccess, content, flightticketList,ticketTypeList,  flightId,  availableClass } = this.state;
    if (isRedirectSuccess) {
      return <Redirect to={{
        pathname: '/admin/flight-tickets',
        state: {
          message: {
            type: 'success',
            content: 'Add new flight ticket successful !'
          }
        }
      }} />;
    }
    return (
      <>
        <React.Fragment>
          <div id='addNewFlight'>
            <Typography variant="h4" gutterBottom >
              Add New Flight Ticket
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6} >
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
              <Grid item xs={12}>
                <TextField
                  error={status.err !== ''}
                  helperText={status.err !== '' ? status.err === '*' ? 'Status cannot be empty' : status.err : ''}
                  required
                  id="status"
                  name="status"
                  value={status.value}
                  label="Status"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'status')}
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
                <FormControlLabel
                  control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                  label="Use this address for payment details"
                />
              </Grid>
              <div id='submit'>
                <Button variant="contained" onClick={this.saveNewFlightTicket} >Submit</Button>
              </div>
            </Grid>
          </div>
        </React.Fragment>
      </>
    );
  }

}

export default AddNewFlightTicket;