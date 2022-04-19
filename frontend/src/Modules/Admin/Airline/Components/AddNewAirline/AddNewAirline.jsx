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

class AddNewAirline extends Form {
  constructor(props) {
    super(props);
    this.state = {
      form: this._getInitFormData({
        name:"",
        code:"",
        country:"",
        logo:"",

      }),
      message: "",
      isLoading: false,
    }
  }
  componentDidMount() {
    console.log(this.state.form);
  }

  render() {
    const{name, code, country, logo } = this.state.form;
    return (
      <React.Fragment>
        <div id='addNewAirline'>
          <Typography variant="h4" gutterBottom >
            Add New Airline
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} >
              <TextField
                required
                id="name"
                name="name"
                label="Name"
                autoComplete="given-name"
                variant="standard"
                onChange={(ev) => this._setValue(ev,'name')}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                required
                id="code"
                name="code"
                label="Code"
                autoComplete="family-name"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="country"
                name="country"
                label="Country"
                autoComplete="shipping address-line1"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="logo"
                name="logo"
                label="Logo"
                autoComplete="shipping address-level2"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                label="Use this address for payment details"
              />
            </Grid>
            <div id='submit'>
              <Button variant="contained">Submit</Button>
            </div>
          </Grid>
        </div>
      </React.Fragment>
    );
  }

}

export default AddNewAirline;