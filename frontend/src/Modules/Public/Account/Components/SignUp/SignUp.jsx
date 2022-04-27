import React, { Component } from "react"; import { Button } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Copyright } from "@mui/icons-material";
import { ErrorForm } from "../../../../../Shared/Components/ErrorMessage";
import Form from "../../../../../Shared/Components/Form";
import { REGEX_TEL } from "../../../../../Configs/validation";



export class SignUp extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
                phoneNumber: "",

            }),


        }
    }

    onSignUp = () => {
        this._validateForm();
        if (this._isFormValid()) {
            const { form } = this.state;
            const data = {
                firstName: form.firstName.value,
                phoneNumber: form.phoneNumber.value,
                email: form.email.value,
                password: form.password.value,
                confirmPassword: form.confirmPassword.value,
                lastName: form.lastName.value,
            };
            console.log("🚀 ~ file: SignUp.jsx ~ line 51 ~ SignUp ~ data", data)
        }
    };




    render() {
        const { lastName, firstName, email, password, confirmPassword, phoneNumber } = this.state.form;
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
                                                name="phone"
                                                label="phone Number"
                                                type="tel"
                                                value={phoneNumber.value}
                                                onChange={(ev) =>
                                                    this._setValue(
                                                        ev,
                                                        "phoneNumber"
                                                    )
                                                }
                                            />
                                            {phoneNumber.err == "*"
                                                ? (
                                                    <ErrorForm message="Vui lòng nhập số điện thoại  " />
                                                ) : (
                                                    <ErrorForm
                                                        err={phoneNumber.err}
                                                    />


                                                )}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                                value={email.value}
                                                onChange={(ev) =>
                                                    this._setValue(
                                                        ev,
                                                        "email"
                                                    )
                                                }
                                            />
                                            {email.err == "*"
                                                ? (
                                                    <ErrorForm message="Vui lòng nhập địa chỉ Email" />
                                                ) : (
                                                    <ErrorForm
                                                        err={email.err}
                                                    />
                                                )}
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                value={password.value}
                                                id="password"
                                                autoComplete="new-password"
                                                onChange={(ev) =>
                                                    this._setValue(
                                                        ev,
                                                        "password"
                                                    )
                                                }

                                            />
                                            {password.err == "*"
                                                ? (
                                                    <ErrorForm message="Vui lòng nhập mật khẩu" />
                                                ) : (
                                                    <ErrorForm
                                                        err={password.err}
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
                                                value={confirmPassword.value}
                                                onChange={(ev) =>
                                                    this._setValue(
                                                        ev,
                                                        "confirmPassword"
                                                    )
                                                }
                                            />
                                            {confirmPassword.err == "*"
                                                ? (
                                                    <ErrorForm message="Vui lòng nhập lại mật khẩu" />
                                                ) : (
                                                    <ErrorForm
                                                        err={confirmPassword.err}
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
                                    >
                                        Sign Up
                                    </Button>
                                    <Grid container justifyContent="flex-end">
                                        <Grid item>
                                            <Link href="#">
                                                Already have an account? Sign in
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Container>
                    </ThemeProvider>
                </div>

            </>
        )
    }
}

