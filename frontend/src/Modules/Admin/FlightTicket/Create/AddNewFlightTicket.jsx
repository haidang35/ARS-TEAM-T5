import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./AddNewAirline.scss";
import Form from "../../../../../Shared/Components/Form";
import airlineService from '../../Shared/Services/AirlineService';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Redirect } from 'react-router-dom';

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
        aircraft:"",
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

  handleChangeFile =(event) => {
    const file =event.target.files[0];
    let {form} =this.state;
    form.logo.value = file;
    this.setState({form});
  }

  getLocationList = async () =>{
    await airlineService.getFlightTicketList().then((res) =>{
      this.setState({
        postFlightTicketList: res.data,

      });
    });
  }


  saveNewAirline = async () => {

    this._validateForm();
    console.log(this.state.form);
    if (this._isFormValid()) {
      this.setState({ isLoading: true });
      let { form, content } = this.state;
      let dataConverted = {
        Name: form.name.value,
        Id: form.id.value,
        Flightcode: form.flightcode.value,
        DepartureTime: form.departureTime.value,
        ArrivalTime: form.arrivalTime.value,
        DepartureId: form.departureId.value,
        DestinationId: form.destinationId.value,
        Capacity: form.capacity.value,
        BusinessSeats: form.businessSeats.value,
        DeluxeSeats: form.deluxeSeats.value,
        EconomySeats: form.economySeats.value,
        Aircraft:form.aircraft.value,
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
    const { name, code, country, logo } = this.state.form;
    const {isRedirectSuccess, content, postFlightTicketList, isLoading} = this.state;
    if(isRedirectSuccess){
      return <Redirect to={{
        pathname: '/admin/flightticket',
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
          <div id='addNewFlightTicket'>
            <Typography variant="h4" gutterBottom >
              Add New Flight Ticket
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} >
                <TextField
                  error={name.err !== ''}
                  helperText={name.err !== '' ? name.err === '*' ? 'Name cannot be empty' : name.err : ''}
                  required
                  id="name"
                  name="name"
                  value={name.value}
                  label="Name"
                  autoComplete="given-name"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'name')}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                error= {code.err !==''}
                helperText={code.err !== '' ? code.err === '*' ? 'Code cannot be empty': code.err : '' }
                  required
                  id="code"
                  name="code"
                  value= {code.value}
                  label="Code"
                  autoComplete="family-name"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'code')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                error= {country.err !==''}
                helperText={country.err !== '' ? country.err === '*' ? 'Country cannot be empty': country.err : '' }
                  required
                  id="country"
                  name="country"
                  value= {country.value}
                  label="Country"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'country')}
                />
              </Grid>
             
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                  label="Use this address for payment details"
                />
              </Grid>
              <div id='submit'>
                <Button variant="contained" onClick={this.saveNewAirline} >Submit</Button>
              </div>
            </Grid>
          </div>
        </React.Fragment>
      </>
    );
  }

}

export default AddNewFlightTicket;