import React, { useState, useEffect } from "react";
import { AppBar, Typography, Avatar, Toolbar, Button } from "@material-ui/core";
import useStyles from "./styles";
import logo from "../../images/logo.png";
import decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";

const NavBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    history.push("/");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Company Name
        </Typography>
        <img className={classes.image} src={logo} alt="icon" height={80} />
      </div>

      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Salir
            </Button>
          </div>
        ) : (
          <Button
            to="/auth"
            component={Link}
            variant="contained"
            color="primary"
          >
            Entrar
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
