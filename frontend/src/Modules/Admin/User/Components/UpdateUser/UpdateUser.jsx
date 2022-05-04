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
import userService from "../../Shared/Services/UserService";
import SelectRole from "../../../Role/Components/SelectRole/SelectRole";
import roleService from "../../../Role/Shared/Services/RoleService";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Box from "@mui/material/Box";
import ListItemText from "@mui/material/ListItemText";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
class UpdateUser extends Form {
  constructor(props) {
    super(props);
    this.state = {
      form: this._getInitFormData({
        name: "",
        phoneNumber: "",
        email: "",
        password: "",
        address: "",
        confirmPassword: "",
        birthday: "",
      }),
      status: "",
      vocative: "",
      roleIds: [],
      content: "",
      isLoading: false,
      isRedirectSuccess: false,
      roleList: [],
      vocativeList: [
        {
          key: 1,
          type: "Anh",
        },
        {
          key: 2,
          type: "Chị",
        },
        {
          key: 3,
          type: "Ông",
        },
        {
          key: 4,
          type: "Bà",
        },
      ],
      statusList: [
        {
          key: 1,
          type: "Active",
        },
        {
          key: 0,
          type: "Deactive",
        },
      ],
      showPassword: false,
      showPasswordConfirm: false,
    };
  }
  componentDidMount() {
    this.getUserDetails();
    // this.getRoleList();
  }

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
  handleChangeVocative = (ev) => {
    this.setState({
      vocative: ev.target.value,
    });
  };
  handleChangeStatus = (ev) => {
    this.setState({
      status: ev.target.value,
    });
  };
  handleClickShowPassword = (ev) => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  handleMouseDownPassword = (ev) => {
    ev.preventDefault();
  };
  handleClickShowPasswordConfirm = (ev) => {
    this.setState({
      showPasswordConfirm: !this.state.showPasswordConfirm,
    });
  };

  handleMouseDownPasswordConfirm = (ev) => {
    ev.preventDefault();
  };

  getUserDetails = async () => {
    const { id } = this.props.match.params;
    await userService.getUserDetails(id).then((res) => {
      this.setState({
        roleIds: res.data.RoleId,
        status: res.data.Status,
       
      });
      this._fillForm({
        name: res.data.Name,
        phoneNumber: res.data.PhoneNumber,
        email: res.data.Email,
        address: res.data.Address,
        birthday: res.data.Birthday,
      }); console.log("🚀 ~ file: UpdateUser.jsx ~ line 137 ~ UpdateUser ~ awaituserService.getUserDetails ~ res.data", res.data)
    });
  };

  saveUpdateUser = async () => {
    this._validateForm();
    if (this._isFormValid()) {
      const { id } = this.props.match.params;
      const { form, isRedirectSuccess, roleIds, status } = this.state;
      const dataConverted = {
        Name: form.name.value,
        PhoneNumber: form.phoneNumber.value,
        Email: form.email.value,
        Birthday: form.birthday.value,
        Address: form.address.value,
        RoleIds: roleIds,
        Status: status,
        ConfirmationPassword: form.confirmPassword.value,
      };
      
      await userService
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
  getRoleList = async () => {
    await roleService.getRoleList().then((res) => {
      this.setState({
        roleList: res.data,
      });
    });
  };

  render() {
    const {
      name,
      birthday,
      phoneNumber,
      email,
      password,
      address,
      confirmPassword,
    } = this.state.form;
    const {
      isRedirectSuccess,
      content,
      isLoading,
      roleIds,
      roleList,
      status,
      statusList,
    } = this.state;
    if (isRedirectSuccess) {
      return (
        <Redirect
          to={{
            pathname: "/admin/users",
            state: {
              message: {
                type: "success",
                content: "Update user successful !",
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
              Update User
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6}>
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
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <TextField
                      id="birthday"
                      name="birthday"
                      label="Birthday"
                      type="date"
                      value={birthday.value}
                      sx={{ width: 250 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(ev) => this._setValue(ev, "birthday")}
                    />
                  </Stack>
                </LocalizationProvider>
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
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="status">Select Status</InputLabel>
                    <Select
                      id="status"
                      name="status"
                      value={status}
                      label="Status"
                      onChange={this.handleChangeStatus}
                    >
                      {statusList.map((status) => {
                        return (
                          <MenuItem key={status.key} value={status.key}>
                            {status.type}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
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
                      <MenuItem key={role.Id} value={role.Id}>
                        {role.RoleName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <div id="submit">
                <Button variant="contained" onClick={this.saveUpdateUser}>
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

export default withRouter(UpdateUser);
