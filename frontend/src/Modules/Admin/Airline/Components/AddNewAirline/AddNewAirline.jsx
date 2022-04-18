import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./AddNewAirline.scss";

export default function AddNewAirline() {
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