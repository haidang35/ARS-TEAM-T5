import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Form from "../../../../../Shared/Components/Form";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Redirect, withRouter } from "react-router-dom";
import flightService from "../../../Flight/Shared/Services/FlightService";
import { id } from "date-fns/locale";

class UpdateBooking extends Form {
  constructor(props) {
    super(props);
    this.state = {
      form: this._getInitFormData({
        bookingCode:"",
        contactName:"",
        contactPhone:"",
        contactEmail:"",
        note:"",
      }),
      userId:"",
      content: "",
      isLoading: false,
      postAirlineList: [],
      isRedirectSuccess: false,
    };
  }

//   componentDidMount() {
//     this.getAirlineDetails();
//   }

  handleChangeFile = (event) => {
    const file = event.target.files[0];
    let { form } = this.state;
    form.logo.value = file;
    this.setState({ form });
  };

//   getAirlineDetails = async () => {
//     const { id } = this.props.match.params;
//     await airlineService.getAirlineDetails(id).then((res) => {
//       this._fillForm({
//         name: res.data.Name,
//         code: res.data.Code,
//         country: res.data.Country,
//         logo: res.data.Logo,
//       });
//     });
//   };

//   saveUpdateAirline = async () => {
//     this._validateForm();
//     if (this._isFormValid()) {
//       const { id } = this.props.match.params;
//       const { form, isRedirectSuccess } = this.state;
//       const dataConverted = {
//         Name: form.name.value,
//         Code: form.code.value,
//         Country: form.country.value,
//         Logo: form.country.value,
//       };
//       await airlineService
//         .updateDetails(id, dataConverted)
//         .then((res) => {
//           this.setState({
//             isRedirectSuccess: true,
//           });
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   };

  render() {
    const { bookingCode, contactName, contactEmail, contactPhone, note } = this.state.form;
    const { isRedirectSuccess, content, postAirlineList, isLoading } =
      this.state;
    if (isRedirectSuccess) {
      return (
        <Redirect
          to={{
            pathname: "/admin/bookings",
            state: {
              message: {
                type: "success",
                content: "Update airline successful !",
              },
            },
          }}
        />
      );
    }
    return (
      <>
        <React.Fragment>
          <div id="addNewAirline">
            <Typography variant="h4" gutterBottom>
              Update Booking
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  error={bookingCode.err !== ""}
                  helperText={
                    bookingCode.err !== ""
                      ? bookingCode.err === "*"
                        ? "BookingCode cannot be empty"
                        : bookingCode.err
                      : ""
                  }
                  required
                  id="bookingCode"
                  name="bookingCode"
                  value={bookingCode.value}
                  label="BookingCode"
                  autoComplete="given-name"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, "bookingCode")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={contactName.err !== ""}
                  helperText={
                    contactName.err !== ""
                      ? contactName.err === "*"
                        ? "ContactName cannot be empty"
                        : contactName.err
                      : ""
                  }
                  required
                  id="contactName"
                  name="contactName"
                  value={contactName.value}
                  label="ContactName"
                  autoComplete="family-name"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, "contactName")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={contactPhone.err !== ""}
                  helperText={
                    contactPhone.err !== ""
                      ? contactPhone.err === "*"
                        ? "ContactPhone cannot be empty"
                        : contactPhone.err
                      : ""
                  }
                  required
                  id="contactPhone"
                  name="contactPhone"
                  value={contactPhone.value}
                  label="ContactPhone"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, "contactPhone")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={contactEmail.err !== ""}
                  helperText={
                    contactEmail.err !== ""
                      ? contactEmail.err === "*"
                        ? "ContactEmail cannot be empty"
                        : contactEmail.err
                      : ""
                  }
                  required
                  id="contactEmail"
                  name="contactEmail"
                  value={contactEmail.value}
                  label="ContactEmail"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, "contactEmail")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={note.err !== ""}
                  helperText={
                    note.err !== ""
                      ? note.err === "*"
                        ? "ContactEmail cannot be empty"
                        : note.err
                      : ""
                  }
                  required
                  id="note"
                  name="note"
                  value={note.value}
                  label="Note"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, "note")}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      name="saveAddress"
                      value="yes"
                    />
                  }
                  label="Use this address for payment details"
                />
              </Grid>
              <div id="submit">
                <Button variant="contained" onClick={this.saveUpdateBooking}>
                  Update
                </Button>
              </div>
            </Grid>
          </div>
        </React.Fragment>
      </>
    );
  }
}

export default withRouter(UpdateBooking);
