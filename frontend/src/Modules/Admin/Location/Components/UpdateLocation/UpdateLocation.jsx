import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Form from "../../../../../Shared/Components/Form";
import { Redirect, withRouter } from 'react-router-dom';
import locationsService from '../../Shared/Services/LocationService';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';




class UpdateLocation extends Form {
  constructor(props) {
    super(props);
    this.state = {
      form: this._getInitFormData({
        airportCode: "",
        airportName: "",
      }),
      cityId: "",
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
    this.getLocationDetails();
  }

  getProvinceList = async () => {
    await locationsService.getProvinceList().then((res) => {
      console.log(res.data)
      this.setState({
        provinceList: res.data
      });

    });
  }

  getLocationDetails = async () => {
    const {id} = this.props.match.params;
    await locationsService.getLocationDetails(id).then(async (res) => {
      this.setState({
        
        cityId: res.data.CityId,
        provinceId: res.data.City.ProvinceId
      });
      await locationsService.getCitiesByProvince(res.data.City.ProvinceId)
        .then((res) => {
          this.setState({
            cityList: res.data
          })
        });
      this._fillForm({
        airportName: res.data.AirPortName,
        airportCode: res.data.AirPortCode,
      })
    })
  }

  saveUpdateLocation = async () => {
    this._validateForm();
    if (this._isFormValid()) {
       const {id} = this.props.match.params;
      this.setState({ isLoading: true });
      let { form, content, cityId, provinceId } = this.state;
      let dataConverted = {
        cityId: cityId,
        airportCode: form.airportCode.value,
        airportName: form.airportName.value,
      };

      await locationsService
        .updateDetails(id,dataConverted)
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

  handleChangeCity = (ev) => {
    this.setState({
      cityId: ev.target.value
    });
  }
  handleChangeProvince = (ev) => {
    const provinceId = ev.target.value;
    this.setState({
      provinceId: ev.target.value
    });
    locationsService.getCitiesByProvince(provinceId)
      .then((res) => {
        this.setState({
          cityList: res.data
        })
      })
  }


  render() {
    const { airportCode, airportName, } = this.state.form;
    const { isRedirectSuccess, content, postLocationList, isLoading, provinceList, provinceId, cityId, cityList } = this.state;
    if (isRedirectSuccess) {
      return <Redirect to={{
        pathname: '/admin/locations',
        state: {
          message: {
            type: 'success',
            content: 'Update location successful !'
          }
        }
      }} />;
    }
    return (
      <>
        <React.Fragment>
          <div id='addNewLocation'>
            <Typography variant="h4" gutterBottom >
              Update Location
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
                <Button variant="contained" onClick={this.saveUpdateLocation} >Submit</Button>
              </div>
            </Grid>
          </div>
        </React.Fragment>
      </>
    );
  }

}

export default withRouter(UpdateLocation);