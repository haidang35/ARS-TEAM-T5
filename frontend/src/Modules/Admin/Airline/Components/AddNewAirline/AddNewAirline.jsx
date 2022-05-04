import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import "./AddNewAirline.scss";
import Form from "../../../../../Shared/Components/Form";
import airlineService from '../../Shared/Services/AirlineService';
import { Redirect } from 'react-router-dom';

class AddNewAirline extends Form {
  constructor(props) {
    super(props);
    this.state = {
      form: this._getInitFormData({
        name: "",
        code: "",
        country: "",
        logo: "",
      }),
      content: "",
      isLoading: false,
      postAirlineList: [],
      isRedirectSuccess: false,
    }
  }
  componentDidMount() {
    console.log(this.state.form);
    this.getAirlineList();
  }

  handleChangeFile =(event) => {
    const file =event.target.files[0];
    let {form} =this.state;
    form.logo.value = file;
    this.setState({form});
  }

  getAirlineList = async () =>{
    await airlineService.getAirlineList().then((res) =>{
      this.setState({
        postAirlineList: res.data,

      });
    });
  }

  handleChangeLogo = (ev) => {
    let { form } = this.state;
    form['logo'].value = ev.target.files[0];
    this.setState({
      form
    })
  }


  saveNewAirline = async () => {
    this._validateForm();
    console.log(this.state.form);
    if (this._isFormValid()) {
      this.setState({ isLoading: true });
      let { form, content } = this.state;
      let formData = new FormData();
      let dataConverted = {
        Name: form.name.value,
        Code: form.code.value,
        Country: form.country.value,
        Logo: "",
      };
      formData.append('fileUpload', form.logo['value'], form.logo['value']['name']);
      await airlineService.uploadLogo(formData)
        .then(async (res) => {
          dataConverted['Logo'] = res.data;
          await airlineService
          .createNew(dataConverted)
          .then((res) => {
            this.setState({
              isRedirectSuccess: true,
            });
          })
          .catch((err) => {
            console.log(err);
          });
        })
    }
  }

  render() {
    const { name, code, country, logo } = this.state.form;
    const {isRedirectSuccess, content, postAirlineList, isLoading} = this.state;
    if(isRedirectSuccess){
      return <Redirect to={{
        pathname: '/admin/airlines',
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
          <div id='addNewAirline'>
            <Typography variant="h4" gutterBottom >
              Add New Airline
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
              <Grid item xs={12} >
                <TextField
                  error={logo.err !== ''}
                  helperText={logo.err !== '' ? logo.err === '*' ? 'Logo cannot be empty' : logo.err : ''}
                  required
                  type="file"
                  id="logo"
                  name="logo"
                  label="Logo"
                  autoComplete="given-name"
                  variant="standard"
                  onChange={this.handleChangeLogo}
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

export default AddNewAirline;