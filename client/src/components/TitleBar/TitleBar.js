import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import "../../style/style.css";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import AuthenticationTile from "../AuthenticationTile"
import { Avatar } from "@material-ui/core"

const styles = {
  root: {
    flexGrow: 1,
    marginBottom: "24px"
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title:{
    color:"White",
    fontWeight: "bold"
  },
};

function TitleBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar className="container">
          <div className={classes.flex}>
            <Link to="/"
              className={window.location.pathname === "/add" ? "nav-link active" : "nav-link"}>
              <Typography variant="title" className={classes.title}>
              <img src={logo} height={40} width={40} alt="ninjaGuy"/>
              <span style={{marginLeft: 10}}>Tryp Ninja</span>
              </Typography>
            </Link>
            </div>
          <AuthenticationTile/>
        </Toolbar>
      </AppBar>
    </div>
  );
}

TitleBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitleBar);