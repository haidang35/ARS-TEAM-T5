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
import { Redirect } from "react-router-dom";
import userService from "../../Shared/Services/UserService";
import SelectRole from "../../../Role/Components/SelectRole/SelectRole";
import roleService from "../../../Role/Shared/Services/RoleService";
import ListItemText from "@mui/material/ListItemText";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

class AddNewUser extends Form {
  constructor(props) {
    super(props);
    this.state = {
      form: this._getInitFormData({
        name: "",
        vocative: "",
        phoneNumber: "",
        email: "",
        password: "",
        address: "",
        confirmPassword: "",
      }),
      roleIds: [],
      content: "",
      isLoading: false,
      isRedirectSuccess: false,
      roleList: [],
    };
  }
  componentDidMount() {
    this.getRoleList();
  }
  getRoleList = async () => {
    await roleService.getRoleList().then((res) => {
      this.setState({
        roleList: res.data,
      });
    });
  };
  handleChangeRole = (ev) => {
    this.setState({
      roleIds: ev.target.value,
    });
  };

  handleChangeFile = (event) => {
    const file = event.target.files[0];
    let { form } = this.state;
    form.logo.value = file;
    this.setState({ form });
  };

  saveNewUser = async () => {
    this._validateForm();
    console.log(this.state.form);
    if (this._isFormValid()) {
      this.setState({ isLoading: true });
      let { form, content, roleIds } = this.state;
      let dataConverted = {
        Name: form.name.value,
        Vocative: form.vocative.value,
        PhoneNumber: form.phoneNumber.value,
        Email: form.email.value,
        Password: form.password.value,
        Birthday: '2022-12-12',
        Address: form.address.value,
        RoleIds: roleIds,
        Status: 0,
        ConfirmationPassword: form.confirmPassword.value,
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
  };

  render() {
    const {
      name,
      vocative,
      phoneNumber,
      email,
      password,
      address,
      confirmPassword,
    } = this.state.form;
    const { isRedirectSuccess, content, isLoading, roleIds, roleList } =
      this.state;
    if (isRedirectSuccess) {
      return (
        <Redirect
          to={{
            pathname: "/admin/users",
            state: {
              message: {
                type: "success",
                content: "Add new user successful !",
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
              Add New User
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
                  error={vocative.err !== ""}
                  helperText={
                    vocative.err !== ""
                      ? vocative.err === "*"
                        ? "Vocative cannot be empty"
                        : vocative.err
                      : ""
                  }
                  required
                  id="vocative"
                  name="vocative"
                  value={vocative.value}
                  label="Vocative"
                  autoComplete="given-name"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, "vocative")}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  error={phoneNumber.err !== ""}
                  helperText={
                    phoneNumber.err !== ""
                      ? phoneNumber.err === "*"
                        ? "PhoneNumber cannot be empty"
                        : phoneNumber.err
                      : ""
                  }
                  required
                  id="phoneNumber"
                  name="phoneNumber"
                  value={phoneNumber.value}
                  label="PhoneNumber"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, "phoneNumber")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={address.err !== ""}
                  helperText={
                    address.err !== ""
                      ? address.err === "*"
                        ? "Address cannot be empty"
                        : address.err
                      : ""
                  }
                  required
                  id="address"
                  name="address"
                  value={address.value}
                  label="Address"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, "address")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={email.err !== ""}
                  helperText={
                    email.err !== ""
                      ? email.err === "*"
                        ? "Email cannot be empty"
                        : email.err
                      : ""
                  }
                  required
                  id="email"
                  name="email"
                  value={email.value}
                  label="Email"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, "email")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={password.err !== ""}
                  helperText={
                    password.err !== ""
                      ? password.err === "*"
                        ? "Password cannot be empty"
                        : password.err
                      : ""
                  }
                  required
                  id="password"
                  name="password"
                  value={password.value}
                  label="Password"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, "password")}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  error={confirmPassword.err !== ""}
                  helperText={
                    confirmPassword.err !== ""
                      ? confirmPassword.err === "*"
                        ? "Confirm Password cannot be empty"
                        : confirmPassword.err
                      : ""
                  }
                  required
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword.value}
                  label="Confirm Password"
                  autoComplete="shipping address-line1"
                  variant="standard"
                  onChange={(ev) => this._setValue(ev, "confirmPassword")}
                />
              </Grid>
               <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-name-label">Role</InputLabel>
                  <Select
                    id="roleId"
                    multiple
                    value={roleIds}
                    onChange={this.handleChangeRole}
                    input={<OutlinedInput label="Role" />}
                  >
                    {roleList.map((role) => (
                      <MenuItem
                        key={role.Id}
                        value={role.Id}
                        // style={getStyles(name, personName, theme)}
                      >
                        {role.RoleName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid> 
              {/* <Grid item xs={12}>
                <SelectRole />
              </Grid> */}
              <div id="submit">
                <Button variant="contained" onClick={this.saveNewUser}>
                  Submit
                </Button>
              </div>
            </Grid>
          </div>
        </React.Fragment>
      </>
    );
  }
}

export default AddNewUser;
