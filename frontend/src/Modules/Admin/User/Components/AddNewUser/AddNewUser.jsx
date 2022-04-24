import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Form from "../../../../../Shared/Components/Form";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Redirect } from 'react-router-dom';
import userService from '../../Shared/Services/UserService';

class AddNewUser extends Form {
  constructor(props) {
    super(props);
    this.state = {
      form: this._getInitFormData({
        name: "",
        vocative: "",
        phoneNumber: "",
        email: "",
        password:"",
        address:"",
      }),
      content: "",
      isLoading: false,
      isRedirectSuccess: false,
    }
  }
  componentDidMount() {
  }

  handleChangeFile =(event) => {
    const file =event.target.files[0];
    let {form} =this.state;
    form.logo.value = file;
    this.setState({form});
  }


  saveNewUser = async () => {

    this._validateForm();
    console.log(this.state.form);
    if (this._isFormValid()) {
      this.setState({ isLoading: true });
      let { form, content } = this.state;
      let dataConverted = {
        Name: form.name.value,
        Vocative: form.vocative.value,
        PhoneNumber: form.phoneNumber.value,
        Email: form.email.value,
        Password: form.password.value,
        Address: form.address.value,

      };
      await userService
        .createNew(dataConverted)
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

  render() {
    const { name, vocative, phoneNumber, email, password, address } = this.state.form;
    const {isRedirectSuccess, content, isLoading} = this.state;
    if(isRedirectSuccess){
      return <Redirect to={{
        pathname: '/admin/users',
        state: {
          message: {
            type: 'success',
            content: 'Add new user successful !'
          }
        }
      }}/>;
    }
    return (
      <>
        <React.Fragment>
          <div id='addNewAirline'>
            <Typography variant="h4" gutterBottom >
              Add New User
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
                  error={vocative.err !== ''}
                  helperText={vocative.err !== '' ? vocative.err === '*' ? 'Vocative cannot be empty' : vocative.err : ''}
                  required
                  id="vocative"
                  name="vocative"
                  value={vocative.value}
                  label="Vocative"
                  autoComplete="given-name"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'vocative')}
                />
              </Grid>
             
              <Grid item xs={12}>
                <TextField
                error= {phoneNumber.err !==''}
                helperText={phoneNumber.err !== '' ? phoneNumber.err === '*' ? 'PhoneNumber cannot be empty': phoneNumber.err : '' }
                  required
                  id="phoneNumber"
                  name="phoneNumber"
                  value= {phoneNumber.value}
                  label="PhoneNumber"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'phoneNumber')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                error= {address.err !==''}
                helperText={address.err !== '' ? address.err === '*' ? 'Address cannot be empty': address.err : '' }
                  required
                  id="address"
                  name="address"
                  value= {address.value}
                  label="Address"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'address')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                error= {email.err !==''}
                helperText={email.err !== '' ? email.err === '*' ? 'Email cannot be empty': email.err : '' }
                  required
                  id="email"
                  name="email"
                  value= {email.value}
                  label="Email"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'email')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                error= {password.err !==''}
                helperText={password.err !== '' ? password.err === '*' ? 'Password cannot be empty': password.err : '' }
                  required
                  id="password"
                  name="password"
                  value= {password.value}
                  label="Password"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, 'password')}
                />
              </Grid>
              
             
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                  label="Use this address for payment details"
                />
              </Grid>
              <div id='submit'>
                <Button variant="contained" onClick={this.saveNewUser} >Submit</Button>
              </div>
            </Grid>
          </div>
        </React.Fragment>
      </>
    );
  }

}

export default AddNewUser;