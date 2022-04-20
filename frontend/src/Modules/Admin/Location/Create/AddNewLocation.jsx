import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Form from "../../../../Shared/Components/Form";
import { Redirect } from 'react-router-dom';
import locationsService from '../Share/Services/LocationService';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




class AddNewLocation extends Form {
  constructor(props) {
    super(props);
    this.state = {
      form: this._getInitFormData({
        airportCode: "",
        airportName: "",
      }),
      cityId:"",
      provinceId: '',
      content: "",
      isLoading: false,
      postLocationList: [],
      isRedirectSuccess: false,
      provinceList: [],
      cityList: [],

    }

  }

  componentDidMount() {
    this.getProvinceList();
    this.getCityList();
  }
  getCityList = async () =>{
    await locationsService.getCityList().then((res) => {
      console.log(res.data)
      this.setState({
        cityList: res.data
      });
    });
  }

  getProvinceList = async () => {
    await locationsService.getProvinceList().then((res) => {
      console.log(res.data)
      this.setState({
        provinceList: res.data
      });

    });
  }

  saveNewLocation = async () => {
    this._validateForm();
    console.log(this.state.form);
    if (this._isFormValid()) {
      this.setState({ isLoading: true });
      let { form, content } = this.state;
      let dataConverted = {
        cityId: form.city.value,
        provinceId: form.province.value,
        airportCode: form.citycode.value,
        airportName: form.airportName.value,
      };

      await locationsService
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

  handleChangeCity = (ev) => {
    this.setState({
      cityId: ev.target.value
    });
  }
  handleChangeProvince = (ev) => {
     this.setState({
       provinceId: ev.target.value
     });  
  }
  

  render() {
    const { airportCode, airportName,  } = this.state.form;
    const { isRedirectSuccess, content, postLocationList, isLoading, provinceList, provinceId, cityId, cityList } = this.state;
    if (isRedirectSuccess) {
      return <Redirect to={{
        pathname: '/admin/locations',
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
          <div id='addNewLocation'>
            <Typography variant="h4" gutterBottom >
              Add New Location
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="province">Select province</InputLabel>
                    <Select
                      id="province"
                      name="province"
                      value={provinceId}
                      label="Province"
                      onChange={this.handleChangeProvince}
                    >
                      {provinceList.map((province) => {
                        return (
                          <MenuItem
                            key={province.Id}
                            value={province.Id}>
                          
                            {province.Name}
                          </MenuItem>

                        )
                      })
                      }
                    </Select>
                  </FormControl>
                </Box>
                {/* <TextField
                error= {province.err !==''}
                helperText={province.err !== '' ? province.err === '*' ? 'Province cannot be empty': province.err : '' }
                  required
                  id="province"
                  name="province"
                  value= {province.value}
                  label="Province"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'province')} */}
                {/* /> */}
              </Grid>
              <Grid item xs={12} >
              <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="city">Select city</InputLabel>
                    <Select
                      id="city"
                      name="city"
                      value={cityId}
                      label="City"
                      onChange={this.handleChangeCity}
                    >
                      {cityList.map((city) => {
                        return (
                          <MenuItem
                            key={city.Id}
                            value={city.Id}>
                          
                            {city.Name}
                          </MenuItem>

                        )
                      })
                      }
                    </Select>
                  </FormControl>
                </Box>
                {/* <TextField
                  error={city.err !== ''}
                  helperText={city.err !== '' ? city.err === '*' ? 'City cannot be empty' : city.err : ''}
                  required
                  id="city"
                  name="city"
                  value={city.value}
                  label="City"
                  autoComplete="family-name"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'city')}
                /> */}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={airportName.err !== ''}
                  helperText={airportName.err !== '' ? airportName.err === '*' ? ' AirportName name cannot be empty' : airportName.err : ''}
                  required
                  id="airportName"
                  name="airportName"
                  value={airportName.value}
                  label="AirportName"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'airportName')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={airportCode.err !== ''}
                  helperText={airportCode.err !== '' ? airportCode.err === '*' ? ' AirportCode name cannot be empty' : airportCode.err : ''}
                  required
                  id="airportCode"
                  name="airportCode"
                  value={airportCode.value}
                  label="AirportCode"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'airportCode')}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                  label="Use this address for payment details"
                />
              </Grid>
              <div id='submit'>
                <Button variant="contained" onClick={this.saveNewLocation} >Submit</Button>
              </div>
            </Grid>
          </div>
        </React.Fragment>
      </>
    );
  }

}

export default AddNewLocation;