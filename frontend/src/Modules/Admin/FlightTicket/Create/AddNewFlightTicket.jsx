import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Form from '../../../../Shared/Components/Form';
import { Redirect } from 'react-router-dom';
import flightTicketService from '../Share/Service/FlightTicketService';
import { Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "../Create/AddNewFlightTicket.scss";

class AddNewFlightTicket extends Form {
  constructor(props) {
    super(props);
    this.state = {
      form: this._getInitFormData({
        id: "",
        flightcode: "",
        departureTime: "",
        arrivalTime: "",
        departureId: "",
        destinationId: "",
        capacity: "",
        businessSeats: "",
        deluxeSeats: "",
        economySeats: "",
        aircraft: "",
        seatsReseved: "",
        seatsAvaliable: "",
        airlineId: "",
        ticketId: "",
        status: "",
        createdAt: "",
        updatedAt: "",
      }),
      content: "",
      isLoading: false,
      postFlightTicketList: [],
      isRedirectSuccess: false,
      
    }
  }
  componentDidMount() {
    console.log(this.state.form);
    this.getFlightTicketList();
  }

  handleChangeFile = (event) => {
    const file = event.target.files[0];
    let { form } = this.state;
    form.logo.value = file;
    this.setState({ form });
  }

  getFlightTicketList = async () => {
    await flightTicketService.getFlightTicketList().then((res) => {
      this.setState({
        postFlightTicketList: res.data,
      });
    });
  }


  saveNewFlightTicket = async () => {

    this._validateForm();
    console.log(this.state.form);
    if (this._isFormValid()) {
      this.setState({ isLoading: true });
      let { form, content } = this.state;
      let dataConverted = {
        Flightcode: form.flightcode.value,
        DepartureTime: form.departureTime.value,
        ArrivalTime: form.arrivalTime.value,
        DepartureId: form.departureId.value,
        DestinationId: form.destinationId.value,
        Capacity: form.capacity.value,
        BusinessSeats: form.businessSeats.value,
        DeluxeSeats: form.deluxeSeats.value,
        EconomySeats: form.economySeats.value,
        Aircraft: form.aircraft.value,
        SeatsReseved: form.seatsReseved.value,
        SeatsAvaliable: form.seatsAvaliable.value,
        AirlineId: form.airlineId.value,
        TicketId: form.ticketId.value,
        Status: form.status.value,
        CreatedAt: form.createdAt.value,
        UpdatedAt: form.updatedAt.value,
      };
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

  render() {
    const { id, flightcode, departureTime, arrivalTime, destinationId, departureId, capacity, businessSeats, deluxeSeats, economySeats, seatsReseved, seatsAvaliable, aircraft, airlineId, ticketId, status } = this.state.form;
    const { isRedirectSuccess, content, postFlightTicketList, isLoading } = this.state;
    
    if (isRedirectSuccess) {
      return <Redirect to={{
        pathname: '/admin/flightticket',
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
          <div id='addNewFlightTicket'>
            <Typography variant="h4" gutterBottom >
              Add New Flight Ticket
            </Typography>
            <Box>
              <Grid container spacing={3} >
                <div className='col-2' >
                  <Grid item xs={12} >
                    <TextField
                      error={flightcode.err !== ''}
                      helperText={flightcode.err !== '' ? flightcode.err === '*' ? 'Flightcode cannot be empty' : flightcode.err : ''}
                      required
                      id="flightcode"
                      name="flightcode"
                      value={flightcode.value}
                      label="Flightcode"
                      autoComplete="given-name"
                      variant="standard"
                      onChange={(ev) => this._setValue(ev, 'flightcode')}
                    />
                  </Grid>
                  <Grid item xs={12}  >
                    <TextField
                      error={departureTime.err !== ''}
                      helperText={departureTime.err !== '' ? departureTime.err === '*' ? 'DepartureTime cannot be empty' : departureTime.err : ''}
                      required
                      id="departureTime"
                      name="departureTime"
                      value={departureTime.value}
                      label="DepartureTime"
                      autoComplete="family-name"
                      variant="standard"
                      onChange={(ev) => this._setValue(ev, 'departureTime')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={departureId.err !== ''}
                      helperText={departureId.err !== '' ? departureId.err === '*' ? 'DepartureId cannot be empty' : departureId.err : ''}
                      required
                      id="departureId"
                      name="departureId"
                      value={departureId.value}
                      label="DepartureId"
                      autoComplete="shipping address-line1"
                      variant="standard"
                      onChange={(ev) => this._setValue(ev, 'departureId')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={arrivalTime.err !== ''}
                      helperText={arrivalTime.err !== '' ? arrivalTime.err === '*' ? 'ArrivalTime cannot be empty' : arrivalTime.err : ''}
                      required
                      id="arrivalTime"
                      name="arrivalTime"
                      value={arrivalTime.value}
                      label="ArrivalTime"
                      autoComplete="shipping address-line1"
                      variant="standard"
                      onChange={(ev) => this._setValue(ev, 'arrivalTime')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={destinationId.err !== ''}
                      helperText={destinationId.err !== '' ? destinationId.err === '*' ? 'DestinationId cannot be empty' : destinationId.err : ''}
                      required
                      id="destinationId"
                      name="destinationId"
                      value={destinationId.value}
                      label="DestinationId"
                      autoComplete="shipping address-line1"
                      variant="standard"
                      onChange={(ev) => this._setValue(ev, 'destinationId')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={capacity.err !== ''}
                      helperText={capacity.err !== '' ? capacity.err === '*' ? 'Capacity cannot be empty' : capacity.err : ''}
                      required
                      id="capacity"
                      name="capacity"
                      value={capacity.value}
                      label="Capacity"
                      autoComplete="shipping address-line1"
                      variant="standard"
                      onChange={(ev) => this._setValue(ev, 'capacity')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={businessSeats.err !== ''}
                      helperText={businessSeats.err !== '' ? businessSeats.err === '*' ? 'BusinessSeats cannot be empty' : businessSeats.err : ''}
                      required
                      id="businessSeats"
                      name="businessSeats"
                      value={businessSeats.value}
                      label="BusinessSeats"
                      autoComplete="shipping address-line1"
                      variant="standard"
                      onChange={(ev) => this._setValue(ev, 'businessSeats')}
                    />
                  </Grid>
                </div>
                <div className="col-2">
                  <Grid item xs={12}>
                    <TextField
                      error={deluxeSeats.err !== ''}
                      helperText={deluxeSeats.err !== '' ? deluxeSeats.err === '*' ? 'DeluxeSeats cannot be empty' : deluxeSeats.err : ''}
                      required
                      id="deluxeSeats"
                      name="deluxeSeats"
                      value={deluxeSeats.value}
                      label="DeluxeSeats"
                      autoComplete="shipping address-line1"
                      variant="standard"
                      onChange={(ev) => this._setValue(ev, 'deluxeSeats')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={economySeats.err !== ''}
                      helperText={economySeats.err !== '' ? economySeats.err === '*' ? 'EconomySeats cannot be empty' : economySeats.err : ''}
                      required
                      id="economySeats"
                      name="economySeats"
                      value={economySeats.value}
                      label="EconomySeats"
                      autoComplete="shipping address-line1"
                      variant="standard"
                      onChange={(ev) => this._setValue(ev, 'economySeats')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={seatsReseved.err !== ''}
                      helperText={seatsReseved.err !== '' ? seatsReseved.err === '*' ? 'SeatsReseved cannot be empty' : seatsReseved.err : ''}
                      required
                      id="seatsReseved"
                      name="seatsReseved"
                      value={seatsReseved.value}
                      label="SeatsReseved"
                      autoComplete="shipping address-line1"
                      variant="standard"
                      onChange={(ev) => this._setValue(ev, 'seatsReseved')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={seatsAvaliable.err !== ''}
                      helperText={seatsAvaliable.err !== '' ? seatsAvaliable.err === '*' ? 'SeatsAvaliable cannot be empty' : seatsAvaliable.err : ''}
                      required
                      id="seatsAvaliable"
                      name="seatsAvaliable"
                      value={seatsAvaliable.value}
                      label="SeatsAvaliable"
                      autoComplete="shipping address-line1"
                      variant="standard"
                      onChange={(ev) => this._setValue(ev, 'seatsAvaliable')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={aircraft.err !== ''}
                      helperText={aircraft.err !== '' ? aircraft.err === '*' ? 'Aircraft cannot be empty' : aircraft.err : ''}
                      required
                      id="aircraft"
                      name="aircraft"
                      value={aircraft.value}
                      label="Aircraft"
                      autoComplete="shipping address-line1"
                      variant="standard"
                      onChange={(ev) => this._setValue(ev, 'aircraft')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={airlineId.err !== ''}
                      helperText={airlineId.err !== '' ? airlineId.err === '*' ? 'AirlineId cannot be empty' : airlineId.err : ''}
                      required
                      id="airlineId"
                      name="airlineId"
                      value={airlineId.value}
                      label="AirlineId"
                      autoComplete="shipping address-line1"
                      variant="standard"
                      onChange={(ev) => this._setValue(ev, 'airlineId')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={ticketId.err !== ''}
                      helperText={ticketId.err !== '' ? ticketId.err === '*' ? 'TicketId cannot be empty' : ticketId.err : ''}
                      required
                      id="ticketId"
                      name="ticketId"
                      value={ticketId.value}
                      label="TicketId"
                      autoComplete="shipping address-line1"
                      variant="standard"
                      onChange={(ev) => this._setValue(ev, 'ticketId')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Status"
                      Name = "Status"
                      style={{width : 180}}
                      // onChange={}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </Grid>
                </div>


                <Grid item xs={12} style={{marginLeft:500}}>
                  <FormControlLabel
                    control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                    label="Use this address for payment details"
                  />
                </Grid>
                <div id='submit'>
                  <Button variant="contained" onClick={this.saveNewFlightTicket} >Submit</Button>
                </div>
              </Grid>
            </Box>
          </div>
        </React.Fragment>
      </>
    );
  }

}

export default AddNewFlightTicket;