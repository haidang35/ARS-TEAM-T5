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
        arrivalTime: getDateTimeNow(),
        carbinBag: "",
        checkbinBag: "",
        price: "",
        tax: "",
        businessSeatsFee: "",
        deluxeSeatsFee: "",
        economySeatsFee: "",
        exitSeatsFee: "",
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
        ArrivalTime: form.arrivalTime.value,
        AvailableClass: availableClass,
        CarbinBag: form.carbinBag.value,
        CheckinBag: form.checkbinBag.value,
        Status: form.status.value,
        Price: form.price.value,
        Tax: form.tax.value,
        BusinessSeatFee: form.businessSeatsFee.value,
        DeluxeSeatFee: form.deluxeSeatsFee.value,
        EconomySeatFee: form.economySeatsFee.value,
        ExitSeatFee: form.exitSeatsFee.value,

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
    const {  arrivalTime, carbinBag, checkbinBag, status, price, tax, ticketType,
      businessSeatsFee, economySeatsFee, deluxeSeatsFee, exitSeatsFee, } = this.state.form;
    const { isRedirectSuccess, content, flightticketList,ticketTypeList,  flightId,  availableClass } = this.state;
    if (isRedirectSuccess) {
      return <Redirect to={{
        pathname: '/admin/flights',
        state: {
          message: {
            type: 'success',
            content: 'Add new airline successful !'
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
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <TextField
                      id="arrivaltime"
                      label="ArrivalTime"
                      name="arrivalTime"
                      type="datetime-local"
                      defaultValue="2017-05-24T10:30"
                      sx={{ width: 250 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(ev) => this._setValue(ev, 'arrivalTime')}
                    />
                  </Stack>
                </LocalizationProvider>
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
                  error={checkbinBag.err !== ''}
                  helperText={checkbinBag.err !== '' ? checkbinBag.err === '*' ? 'CheckbinBag cannot be empty' : checkbinBag.err : ''}
                  required
                  id="checkbinBag"
                  name="checkbinBag"
                  value={checkbinBag.value}
                  label="CheckbinBag"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'checkbinBag')}
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
                  error={businessSeatsFee.err !== ''}
                  helperText={businessSeatsFee.err !== '' ? businessSeatsFee.err === '*' ? 'BusinessSeatsFee cannot be empty' : businessSeatsFee.err : ''}
                  required
                  id="businessSeatsFee"
                  name="businessSeatsFee"
                  value={businessSeatsFee.value}
                  label="BusinessSeatsFee"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'businessSeatsFee')}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={deluxeSeatsFee.err !== ''}
                  helperText={deluxeSeatsFee.err !== '' ? deluxeSeatsFee.err === '*' ? 'DeluxeSeatsFee cannot be empty' : deluxeSeatsFee.err : ''}
                  required
                  id="deluxeSeatsFee"
                  name="deluxeSeatsFee"
                  value={deluxeSeatsFee.value}
                  label="DeluxeSeatsFee"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'deluxeSeatsFee')}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={economySeatsFee.err !== ''}
                  helperText={economySeatsFee.err !== '' ? economySeatsFee.err === '*' ? 'EconomySeatsFee cannot be empty' : economySeatsFee.err : ''}
                  required
                  id="economySeatsFee"
                  name="economySeatsFee"
                  value={economySeatsFee.value}
                  label="EconomySeatsFee"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'economySeatsFee')}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={exitSeatsFee.err !== ''}
                  helperText={exitSeatsFee.err !== '' ? exitSeatsFee.err === '*' ? 'ExitSeatsFee cannot be empty' : exitSeatsFee.err : ''}
                  required
                  id="exitSeatsFee"
                  name="exitSeatsFee"
                  value={exitSeatsFee.value}
                  label="ExitSeatsFee"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'exitSeatsFee')}
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