// import * as React from 'react';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import "./AddNewFlight.scss";
// import Form from "../../../../../Shared/Components/Form";
// import flightService from '../../Shared/Services/FlightService';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
// import { Redirect } from 'react-router-dom';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { getDateTimeNow } from "../../../../../Helpers/datetime";
// import locationsService from '../../../Location/Share/Services/LocationService';
// import LocationList from '../../../Location/Location';




// class AddNewFlight extends Form {
//   constructor(props) {
//     super(props);
//     this.state = {
//       form: this._getInitFormData({
//         flightCode: "",
//         departureTime: getDateTimeNow(),
//         arrivalTime: "",

//         capacity: "",
//         businessSeats: "",
//         deluxeSeats: "",
//         economySeats: "",
//         exitSeats: "",
//         aircraft: "",
//         seatsReseved: "",
//         seatsAvaliable: "",
//         airline: "",
//         status: "",

//       }),
//       departureId: "",
//       destinationId: "",
//       content: "",
//       isLoading: false,
//       postFlightList: [],
//       isRedirectSuccess: false,
//     }
//   }
//   componentDidMount() {
//     console.log(this.state.form);
//     this.getFlightList();
//     this.getLocationList();
//   }
//   getLocationList = async () =>{
//     await locationsService.getLocationList().then((res) =>{
//       this.setState({
//         LocationList:res.data,

//       });
//     });
//   }

//   getFlightList = async () => {
//     await flightService.getFlightList().then((res) => {
//       this.setState({
//         postFlightList: res.data,

//       });
//     });
//   }


//   saveNewFlight = async () => {

//     this._validateForm();
//     if (this._isFormValid()) {
//       this.setState({ isLoading: true });
//       let { form, content } = this.state;
//       let dataConverted = {
//         FlightCode: form.flightCode.value,
//         DepartureTime: new Date(),
//         ArrivalTime: new Date(),
//         Departure: form.departure.value,
//         Destionation: form.destination.value,
//         Capacity: form.capacity.value,
//         BusinessSeats: form.businessSeats.value,
//         DeluxeSeats: form.deluxeSeats.value,
//         EconomySeats: form.economySeats.value,
//         ExitSeats: form.exitSeats.value,
//         Aircraft: form.aircraft.value,
//         SeatsReseved: form.seatsReseved.value,
//         SeatsAvaliable: form.seatsAvaliable,
//         Airline: form.airline.value,
//         Ticket: form.ticket.value,
//         Status: form.status.value,
//       };
//       await flightService
//         .createNew(dataConverted)
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
//   handleDepartureTime = (ev) => {
//     this.setState({
//       departureTime: ev.target.value
//     });
//   }

//   // handleDepartureTime = (newValue) => {
//   //   let { searchData } = this.state;
//   //   searchData['departureTime'] = newValue;
//   //   this.setState({
//   //     searchData
//   //   })
//   // }
//   render() {
//     const { flightCode, departureTime, arrivalTime, departureId, destinationId, capacity, businessSeats, deluxeSeats,
//       economySeats, exitSeats, aircraft, seatsReseved, seatsAvaliable, airline, status } = this.state.form;
//     const { isRedirectSuccess, content, postFlightList, isLoading, } = this.state;
//     const {LocationList} = this.props;
//     if (isRedirectSuccess) {
//       return <Redirect to={{
//         pathname: '/admin/flights',
//         state: {
//           message: {
//             type: 'success',
//             content: 'Add new airline successful !'
//           }
//         }
//       }} />;
//     }
//     return (
//       <>
//         <React.Fragment>
//           <div id='addNewFlight'>
//             <Typography variant="h4" gutterBottom >
//               Add New Flight
//             </Typography>
//             <Grid container spacing={3}>
//               <Grid item xs={12} >
//                 <TextField
//                   error={flightCode.err !== ''}
//                   helperText={flightCode.err !== '' ? flightCode.err === '*' ? 'FlightCode cannot be empty' : flightCode.err : ''}
//                   required
//                   id="flightCode"
//                   name="flightCode"
//                   value={flightCode.value}
//                   label="FlightCode"
//                   autoComplete="given-name"
//                   variant="standard"
//                   onChange={(ev) => this._setValue(ev, 'flightCode')}
//                 />
//               </Grid>
//               <Grid item xs={6} >
//                 <LocalizationProvider dateAdapter={AdapterDateFns}>
//                   <Stack spacing={3}>
//                     <TextField
//                       id="datetime-local"
//                       label="DepartureTime"
//                       type="datetime-local"
//                       defaultValue="2017-05-24T10:30"
//                       sx={{ width: 250 }}
//                       InputLabelProps={{
//                         shrink: true,
//                       }}
//                     />
//                     {/* <DateTimePicker
//                       label="Date&Time picker"
//                       value={departureTime.value}
//                       onChange={this.handleDepartureTime}
//                       renderInput={(params) => <TextField {...params} />}
//                     /> */}
//                   </Stack>
//                 </LocalizationProvider>
//               </Grid>
//               <Grid item xs={6}>
//                 <LocalizationProvider dateAdapter={AdapterDateFns}>
//                   <Stack spacing={3}>
//                     <DateTimePicker
//                       label="ArrivalTime"
//                       value={arrivalTime.value}
//                       onChange={this.handleDepartureTime}
//                       renderInput={(params) => <TextField {...params} />}
//                     />
//                   </Stack>
//                 </LocalizationProvider>
//               </Grid>
//               <Grid item xs={6} >
//               <Box sx={{ minWidth: 120 }}>
//                   <FormControl fullWidth>
//                     <InputLabel id="province">Select departure</InputLabel>
//                     <Select
//                       id="departureId"
//                       name="departureId"
//                       value={departureId}
//                       label="Province"
//                       onChange={this.handleChangeLocation}
//                     >
//                       {provinceList.map(() => {
//                         return (
//                           <MenuItem
//                             key={province.Id}
//                             value={province.Id}>
                          
//                             {province.Name}
//                           </MenuItem>

//                         )
//                       })
//                       }
//                     </Select>
//                   </FormControl>
//                 </Box>

//                 {/* <TextField
//                   error={departure.err !== ''}
//                   helperText={departure.err !== '' ? departure.err === '*' ? 'Departure cannot be empty' : departure.err : ''}
//                   required
//                   id="departure"
//                   name="departure"
//                   value={departure.value}
//                   label="Departure"
//                   autoComplete="given-name"
//                   variant="standard"
//                   onChange={(ev) => this._setValue(ev, 'departure')}
//                 /> */}
//               </Grid>
//               <Grid item xs={6} >
//                 <TextField
//                   error={destination.err !== ''}
//                   helperText={destination.err !== '' ? destination.err === '*' ? 'Destination cannot be empty' : destination.err : ''}
//                   required
//                   id="destination"
//                   name="destination"
//                   value={destination.value}
//                   label="Destination"
//                   autoComplete="family-name"
//                   variant="standard"
//                   onChange={(ev) => this._setValue(ev, 'destination')}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   error={capacity.err !== ''}
//                   helperText={capacity.err !== '' ? capacity.err === '*' ? 'Capacity cannot be empty' : capacity.err : ''}
//                   required
//                   id="capacity"
//                   name="capacity"
//                   value={capacity.value}
//                   label="Capacity"
//                   autoComplete="shipping address-line1"
//                   variant="standard"
//                   onChange={(ev) => this._setValue(ev, 'capacity')}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   error={businessSeats.err !== ''}
//                   helperText={businessSeats.err !== '' ? businessSeats.err === '*' ? 'BusinessSeats cannot be empty' : businessSeats.err : ''}
//                   required
//                   id="businessSeats"
//                   name="businessSeats"
//                   value={businessSeats.value}
//                   label="BusinessSeats"
//                   autoComplete="shipping address-line1"
//                   variant="standard"
//                   onChange={(ev) => this._setValue(ev, 'businessSeats')}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   error={deluxeSeats.err !== ''}
//                   helperText={deluxeSeats.err !== '' ? deluxeSeats.err === '*' ? 'DeluxeSeats cannot be empty' : deluxeSeats.err : ''}
//                   required
//                   id="deluxeSeats"
//                   name="deluxeSeats"
//                   value={deluxeSeats.value}
//                   label="DeluxeSeats"
//                   autoComplete="shipping address-line1"
//                   variant="standard"
//                   onChange={(ev) => this._setValue(ev, 'deluxeSeats')}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   error={economySeats.err !== ''}
//                   helperText={economySeats.err !== '' ? economySeats.err === '*' ? 'EconomySeats cannot be empty' : economySeats.err : ''}
//                   required
//                   id="economySeats"
//                   name="economySeats"
//                   value={economySeats.value}
//                   label="EconomySeats"
//                   autoComplete="shipping address-line1"
//                   variant="standard"
//                   onChange={(ev) => this._setValue(ev, 'economySeats')}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   error={exitSeats.err !== ''}
//                   helperText={exitSeats.err !== '' ? exitSeats.err === '*' ? 'ExitSeats cannot be empty' : exitSeats.err : ''}
//                   required
//                   id="exitSeats"
//                   name="exitSeats"
//                   value={exitSeats.value}
//                   label="ExitSeats"
//                   autoComplete="shipping address-line1"
//                   variant="standard"
//                   onChange={(ev) => this._setValue(ev, 'exitSeats')}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   error={aircraft.err !== ''}
//                   helperText={aircraft.err !== '' ? aircraft.err === '*' ? 'Aircraft cannot be empty' : aircraft.err : ''}
//                   required
//                   id="aircraft"
//                   name="aircraft"
//                   value={aircraft.value}
//                   label="Aircraft"
//                   autoComplete="shipping address-line1"
//                   variant="standard"
//                   onChange={(ev) => this._setValue(ev, 'aircraft')}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   error={seatsReseved.err !== ''}
//                   helperText={seatsReseved.err !== '' ? seatsReseved.err === '*' ? 'SeatsReseved cannot be empty' : seatsReseved.err : ''}
//                   required
//                   id="seatsReseved"
//                   name="seatsReseved"
//                   value={seatsReseved.value}
//                   label="SeatsReseved"
//                   autoComplete="shipping address-line1"
//                   variant="standard"
//                   onChange={(ev) => this._setValue(ev, 'seatsReseved')}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   error={seatsAvaliable.err !== ''}
//                   helperText={seatsAvaliable.err !== '' ? seatsAvaliable.err === '*' ? 'SeatsAvaliable cannot be empty' : seatsAvaliable.err : ''}
//                   required
//                   id="seatsAvaliable"
//                   name="seatsAvaliable"
//                   value={seatsAvaliable.value}
//                   label="SeatsAvaliable"
//                   autoComplete="shipping address-line1"
//                   variant="standard"
//                   onChange={(ev) => this._setValue(ev, 'seatsAvaliable')}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   error={airline.err !== ''}
//                   helperText={airline.err !== '' ? airline.err === '*' ? 'Airline cannot be empty' : airline.err : ''}
//                   required
//                   id="airline"
//                   name="airline"
//                   value={airline.value}
//                   label="Airline"
//                   autoComplete="shipping address-line1"
//                   variant="standard"
//                   onChange={(ev) => this._setValue(ev, 'airline')}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   error={status.err !== ''}
//                   helperText={status.err !== '' ? status.err === '*' ? 'Status cannot be empty' : status.err : ''}
//                   required
//                   id="status"
//                   name="status"
//                   value={status.value}
//                   label="Status"
//                   autoComplete="shipping address-line1"
//                   variant="standard"
//                   onChange={(ev) => this._setValue(ev, 'status')}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <FormControlLabel
//                   control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
//                   label="Use this address for payment details"
//                 />
//               </Grid>
//               <div id='submit'>
//                 <Button variant="contained" onClick={this.saveNewFlight} >Submit</Button>
//               </div>
//             </Grid>
//           </div>
//         </React.Fragment>
//       </>
//     );
//   }

// }

// export default AddNewFlight;