import React, { Component } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import "./Login.scss";
import Form from "../../../../../Shared/Components/Form";
import { async } from "@firebase/util";
import authService from "../../Service/AuthServices";
const theme = createTheme();

export class Login extends Form{
  constructor(props){
    super(props);
    this.state = {
      form: this._getInitFormData({
        email:"",
        password:"",
      }),
      message: "",
      isLoading: false,
    };
  }
  componentDidMount(){
    console.log(this.state.form);

  }
  
  handleSubmit = async() => {
    this._validateForm();
    const { email, password } = this.state.form;
    if (this._isFormValid()) {
      this.setState({ isLoading: true });
      const params = new URLSearchParams();
      params.append("grant_type", "password");
      params.append("username", email.value);
      params.append("password", password.value);
      await authService
        .accessAuthToken(params)
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          window.location.replace("/admin");
        })
        .catch((err) => {
          this.setState({
            message:
              "Đăng nhập thất bại, vui lòng kiểm tra lại tài khoản hoặc mật khẩu",
            isLoading: false
          });
        });
    } else {
      console.log("in valid");
    }
  };
   render(){
    const { email, password } = this.state.form;
    const { message, isLoading } = this.state;
    return (
      <>
        <div id="login">
          <div className="login-admin">
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      value={email.value}
                      autoComplete="email"
                      autoFocus
                      onChange={(ev) => this._setValue(ev, 'email')}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      value={password.value}
                      id="password"
                      autoComplete="current-password"
                      onChange={(ev) => this._setValue(ev, 'password')}
                    />
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={this.handleSubmit}
                    >
                      Sign In
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href="#" variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
          </div>
        </div>
      </>
    );

   }
}
 

  // const handleSubmit = (event) => {
  // };

export default Login;
