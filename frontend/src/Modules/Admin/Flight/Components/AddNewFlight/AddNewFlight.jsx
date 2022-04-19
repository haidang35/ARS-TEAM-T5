import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./AddNewFlight.scss";
import Form from "../../../../../Shared/Components/Form";
import flightService from '../../Shared/Services/FlightService';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Redirect } from 'react-router-dom';

class AddNewFlight extends Form {
  constructor(props) {
    super(props);
    this.state = {
      form: this._getInitFormData({
        departure: "",
        destination: "",
        airline: "",
        ticket: "",
        status:"",

      }),
      content: "",
      isLoading: false,
      postFlightList: [],
      isRedirectSuccess: false,
    }
  }
  componentDidMount() {
    console.log(this.state.form);
    this.getFlightList();
  }

  getFlightList = async () =>{
    await flightService.getFlightList().then((res) =>{
      this.setState({
        postFlightList: res.data,

      });
    });
  }


  saveNewFlight = async () => {

    this._validateForm();
    console.log(this.state.form);
    if (this._isFormValid()) {
      this.setState({ isLoading: true });
      let { form, content } = this.state;
      let dataConverted = {
        Departure :form.departure.value,
        Destionation: form.destination.value,
        Airline: form.airline.value,
        Ticket: form.ticket.value,
        Status: form.status.value,
      };
      await flightService
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
    const { departure, destination, capacity, airline, ticket, status } = this.state.form;
    const {isRedirectSuccess, content, postFlightList, isLoading} = this.state;
    if(isRedirectSuccess){
      return <Redirect to={{
        pathname: '/admin/flights',
        state: {
          message: {
            type: 'success',
            content: 'Add new airline successful !'
          }
        }
      }}/>;
    }
    return (
      <>
        <React.Fragment>
          <div id='addNewFlight'>
            <Typography variant="h4" gutterBottom >
              Add New Flight
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} >
                <TextField
                  error={departure.err !== ''}
                  helperText={departure.err !== '' ? departure.err === '*' ? 'Departure cannot be empty' : departure.err : ''}
                  required
                  id="departure"
                  name="departure"
                  value={departure.value}
                  label="Departure"
                  autoComplete="given-name"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'departure')}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                error= {destination.err !==''}
                helperText={destination.err !== '' ? destination.err === '*' ? 'Destination cannot be empty': destination.err : '' }
                  required
                  id="destination"
                  name="destination"
                  value= {destination.value}
                  label="Destination"
                  autoComplete="family-name"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'destination')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                error= {airline.err !==''}
                helperText={airline.err !== '' ? airline.err === '*' ? 'Airline cannot be empty': airline.err : '' }
                  required
                  id="airline"
                  name="airline"
                  value= {airline.value}
                  label="Airline"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'airline')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                error= {ticket.err !==''}
                helperText={ticket.err !== '' ? ticket.err === '*' ? 'Ticket cannot be empty': ticket.err : '' }
                  required
                  id="ticket"
                  name="ticket"
                  value= {ticket.value}
                  label="Ticket"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'ticket')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                error= {status.err !==''}
                helperText={status.err !== '' ? status.err === '*' ? 'Status cannot be empty': status.err : '' }
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
                <Button variant="contained" onClick={this.saveNewFlight} >Submit</Button>
              </div>
            </Grid>
          </div>
        </React.Fragment>
      </>
    );
  }

}

export default AddNewFlight;