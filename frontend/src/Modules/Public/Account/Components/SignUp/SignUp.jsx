import React, { Component } from "react";
import { Button } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ErrorForm } from "../../../../../Shared/Components/ErrorMessage";
import Form from "../../../../../Shared/Components/Form";
import { REGEX_TEL } from "../../../../../Configs/validation";
import accountService from "../../Service/AccountService";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { getDate } from "date-fns";



export class SignUp extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                firstName: "",
                lastName: "",
                Email: "",
                Password: "",
                ConfirmationPassword: "",
                PhoneNumber: "",
                Birthday: new Date(),
                Vocative: "",
                Address: "",
            }),
           
        }
    }

    onSignUp = async () => {
        this._validateForm();
        if (this._isFormValid()) {
            const { form } = this.state;
            const data = {
                Name: `${form.lastName.value} ${form.firstName.value}`,
                PhoneNumber: form.PhoneNumber.value,
                Email: form.Email.value,
                Password: form.Password.value,
                ConfirmationPassword: form.ConfirmationPassword.value,
                Birthday: form.Birthday.value,
                Address: form.Address.value,
                Vocative: form.Vocative.value,
            };
            await accountService.userRegister(data)
                .then((ress) => {
                    window.location.replace("/signin");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    handleChangeBirthday = () =>{
        
    }



    render() {
        const { lastName, firstName, Email, Password, ConfirmationPassword, PhoneNumber, Address, Birthday, Vocative } = this.state.form;
        const theme = createTheme();
        return (
            <>
                <div id="signup-form">
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign up
                                </Typography>
                                <Box component="form" noValidate sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="given-name"
                                                name="firstName"
                                                required
                                                fullWidth
                                                id="firstName"
                                                label="First Name"
                                                autoFocus
                                                value={firstName.value}
                                                onChange={(ev) =>
                                                    this._setValue(
                                                        ev,
                                                        "firstName"
                                                    )
                                                }
                                            />
                                            {firstName.err == "*"
                                                ? (
                                                    <ErrorForm message="Vui lòng nhập tên" />
                                                ) : (
                                                    <ErrorForm
                                                        err={firstName.err}
                                                    />
                                                )}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="lastName"
                                                label="Last Name"
                                                name="lastName"
                                                autoComplete="family-name"
                                                value={lastName.value}
                                                onChange={(ev) =>
                                                    this._setValue(
                                                        ev,
                                                        "lastName"
                                                    )
                                                }
                                            />
                                            {lastName.err == "*"
                                                ? (
                                                    <ErrorForm message="Vui lòng nhập tên đệm " />
                                                ) : (
                                                    <ErrorForm
                                                        err={lastName.err}
                                                    />


                                                )}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                className="form-control"
                                                fullWidth
                                                pattern={REGEX_TEL}
                                                name="Phone Number"
                                                label="Phone Number"
                                                value={PhoneNumber.value}
                                                onChange={(ev) =>
                                                    this._setValue(
                                                        ev,
                                                        "PhoneNumber"
                                                    )
                                                }
                                            />
                                            {PhoneNumber.err == "*"
                                                ? (
                                                    <ErrorForm message="Vui lòng nhập so dien thoai   " />
                                                ) : (
                                                    <ErrorForm
                                                        err={PhoneNumber.err}
                                                    />
                                                )}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                className="form-control"
                                                fullWidth
                                                name="Vocation"
                                                label="Vocation"
                                                value={Vocative.value}
                                                onChange={(ev) =>
                                                    this._setValue(
                                                        ev,
                                                        "Vocative"
                                                    )
                                                }
                                            />
                                            {Vocative.err == "*"
                                                ? (
                                                    <ErrorForm message="Vui lòng nhập   " />
                                                ) : (
                                                    <ErrorForm
                                                        err={Vocative.err}
                                                    />
                                                )}
                                        </Grid>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <Grid item xs={12}>
                                                <DesktopDatePicker
                                                    label="Date desktop"
                                                    inputFormat="dd/MM/yyyy"
                                                    value={Birthday.value}
                                                    onChange={this.handleChangeBirthday}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                                {Birthday.err == "*"
                                                    ? (
                                                        <ErrorForm message="Vui lòng nhập ngay thang   " />
                                                    ) : (
                                                        <ErrorForm
                                                            err={Birthday.err}
                                                        />
                                                    )}
                                            </Grid>
                                        </LocalizationProvider>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                className="form-control"
                                                fullWidth
                                                name="Address"
                                                label="Address"
                                                value={Address.value}
                                                onChange={(ev) =>
                                                    this._setValue(
                                                        ev,
                                                        "Address"
                                                    )
                                                }
                                            />
                                            {Address.err == "*"
                                                ? (
                                                    <ErrorForm message="Vui lòng nhập Address " />
                                                ) : (
                                                    <ErrorForm
                                                        err={Address.err}
                                                    />
                                                )}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="Email"
                                                label="Email Address"
                                                name="Email"
                                                autoComplete="Email"
                                                value={Email.value}
                                                onChange={(ev) =>
                                                    this._setValue(
                                                        ev,
                                                        "Email"
                                                    )
                                                }
                                            />
                                            {Email.err == "*"
                                                ? (
                                                    <ErrorForm message="Vui lòng nhập địa chỉ Email" />
                                                ) : (
                                                    <ErrorForm
                                                        err={Email.err}
                                                    />
                                                )}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="Password"
                                                type="Password"
                                                label="Password"
                                                value={Password.value}
                                                id="Password"
                                                autoComplete="new-password"
                                                onChange={(ev) =>
                                                    this._setValue(
                                                        ev,
                                                        "Password"
                                                    )
                                                }
                                            />
                                            {Password.err == "*"
                                                ? (
                                                    <ErrorForm message="Vui lòng nhập mật khẩu" />
                                                ) : (
                                                    <ErrorForm
                                                        err={Password.err}
                                                    />
                                                )}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="confirm password"
                                                label="Confirm Password"
                                                type="password"
                                                id="confirm password"
                                                autoComplete="confirm password"
                                                value={ConfirmationPassword.value}
                                                onChange={(ev) =>
                                                    this._setValue(
                                                        ev,
                                                        "ConfirmationPassword"
                                                    )
                                                }
                                            />
                                            {ConfirmationPassword.err == "*"
                                                ? (
                                                    <ErrorForm message="Vui lòng nhập lại mật khẩu" />
                                                ) : (
                                                    <ErrorForm
                                                        err={ConfirmationPassword.err}
                                                    />
                                                )}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                                label="I am 13 or older and agree with the terms of the Steam Registrar Agreement and Valve's Privacy Privacy Agreement."
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        onClick={this.onSignUp}
                                        type="button"
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        fullWidth
                                    >
                                        Sign Up
                                    </Button>
                                </Box>
                            </Box>
                        </Container>
                    </ThemeProvider>
                </div>
            </>
        )
    }
}

