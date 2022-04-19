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

class AddNewLocation extends Form {
  constructor(props) {
    super(props);
    this.state = {
      form: this._getInitFormData({
        id: "",
        city: "",
        code: "",
        province: "",
        citycode:"",
        airportName:"",
        country: "",  
      }),
      content: "",
      isLoading: false,
      postLocationList: [],
      isRedirectSuccess: false,
    }
  }

  componentDidMount() {
    this.getLocationList()
  }
  getLocationList = async () =>{
    await locationsService.getLocationList().then((res) =>{
      this.setState({
        postlocationList: res.data,
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
        city: form.city.value,
        code: form.code.value,
        province: form.province.value,
        citycode:form.citycode.value,
        airportName:form.airportName.value,
        country: form.country.value, 
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
  

 
  render() {
    const {id, province, citycode, airportName, code, country, city } = this.state.form;
    const {isRedirectSuccess, content, postLocationList, isLoading} = this.state;
    if(isRedirectSuccess){
      return <Redirect to={{
        pathname: '/admin/locations',
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
          <div id='addNewLocation'>
            <Typography variant="h4" gutterBottom >
              Add New Location
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} >
                <TextField
                error= {city.err !==''}
                helperText={city.err !== '' ? city.err === '*' ? 'City cannot be empty': city.err : '' }
                  required
                  id="city"
                  name="city"
                  value= {city.value}
                  label="City"
                  autoComplete="family-name"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'city')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                error= {code.err !==''}
                helperText={code.err !== '' ? code.err === '*' ? 'Code cannot be empty': code.err : '' }
                  required
                  id="code"
                  name="code"
                  value= {code.value}
                  label="Code"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'code')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                error= {citycode.err !==''}
                helperText={citycode.err !== '' ? citycode.err === '*' ? 'CityCode cannot be empty': citycode.err : '' }
                  required
                  id="citycode"
                  name="citycode"
                  value= {citycode.value}
                  label="City Code"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'citycode')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                error= {airportName.err !==''}
                helperText={airportName.err !== '' ? airportName.err === '*' ? 'Airport name cannot be empty': airportName.err : '' }
                  required
                  id="airportName"
                  name="airportName"
                  value= {airportName.value}
                  label="AirportName"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'airportName')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                error= {province.err !==''}
                helperText={province.err !== '' ? province.err === '*' ? 'Province cannot be empty': province.err : '' }
                  required
                  id="province"
                  name="province"
                  value= {province.value}
                  label="Province"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'province')}
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
                  label="country"
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