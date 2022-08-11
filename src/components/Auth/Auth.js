import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./input.js";
import Icon from "./Icon.js";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signup, signin } from "../../actions/auth.js";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSwitch = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });

      history.pushState("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("ERROR NO ANDA ALGO");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {isSignup ? "Registrarse" : "Entrar"}
        </Typography>
        <form className={classes.from} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup ? (
              <>
                <Input
                  name="firstName"
                  label="Nombre"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Apellido"
                  handleChange={handleChange}
                  half
                />
              </>
            ) : null}
            <Input
              name="email"
              label="Direccion de email"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Contraseña"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup ? (
              <Input
                name="confirmPassword"
                label="Reprtir contraseña"
                handleChange={handleChange}
                type="password"
              />
            ) : null}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Registrarse" : "Entrar"}
          </Button>
          <GoogleLogin
            clientId="334867311829-kho21qi1hu548bo6mn5m767oe5rk4jba.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Entrar con Google
              </Button>
            )}
            cookiePolicy={"single_host_origin"}
            onSucces={googleSuccess}
            onFailure={googleFailure}
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={handleSwitch}>
                {isSignup
                  ? "Ya tienes una cuenta? Ingresá!"
                  : "No tienes cuenta? Registrate"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
