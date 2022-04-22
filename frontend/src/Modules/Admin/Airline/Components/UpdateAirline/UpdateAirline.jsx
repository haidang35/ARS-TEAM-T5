import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Form from "../../../../../Shared/Components/Form";
import airlineService from "../../Shared/Services/AirlineService";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Redirect, withRouter } from "react-router-dom";
import flightService from "../../../Flight/Shared/Services/FlightService";
import { id } from "date-fns/locale";

class UpdateAirline extends Form {
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
    };
  }

  componentDidMount() {
    this.getAirlineDetails();
  }

  handleChangeFile = (event) => {
    const file = event.target.files[0];
    let { form } = this.state;
    form.logo.value = file;
    this.setState({ form });
  };

  getAirlineDetails = async () => {
    const { id } = this.props.match.params;
    await airlineService.getAirlineDetails(id).then((res) => {
      this._fillForm({
        name: res.data.Name,
        code: res.data.Code,
        country: res.data.Country,
        logo: res.data.Logo,
      });
    });
  };

  saveUpdateAirline = async () => {
    this._validateForm();
    if (this._isFormValid()) {
      const { id } = this.props.match.params;
      const { form, isRedirectSuccess } = this.state;
      const dataConverted = {
        Name: form.name.value,
        Code: form.code.value,
        Country: form.country.value,
        Logo: form.country.value,
      };
      await airlineService
        .updateDetails(id, dataConverted)
        .then((res) => {
          this.setState({
            isRedirectSuccess: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    const { name, code, country, logo } = this.state.form;
    const { isRedirectSuccess, content, postAirlineList, isLoading } =
      this.state;
    if (isRedirectSuccess) {
      return (
        <Redirect
          to={{
            pathname: "/admin/airlines",
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
              Update Airline
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  error={name.err !== ""}
                  helperText={
                    name.err !== ""
                      ? name.err === "*"
                        ? "Name cannot be empty"
                        : name.err
                      : ""
                  }
                  required
                  id="name"
                  name="name"
                  value={name.value}
                  label="Name"
                  autoComplete="given-name"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, "name")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={code.err !== ""}
                  helperText={
                    code.err !== ""
                      ? code.err === "*"
                        ? "Code cannot be empty"
                        : code.err
                      : ""
                  }
                  required
                  id="code"
                  name="code"
                  value={code.value}
                  label="Code"
                  autoComplete="family-name"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, "code")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={country.err !== ""}
                  helperText={
                    country.err !== ""
                      ? country.err === "*"
                        ? "Country cannot be empty"
                        : country.err
                      : ""
                  }
                  required
                  id="country"
                  name="country"
                  value={country.value}
                  label="Country"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, "country")}
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
                <Button variant="contained" onClick={this.saveUpdateAirline}>
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

export default withRouter(UpdateAirline);
