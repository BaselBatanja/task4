import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavBar.module.styl";
const NavBar = (props) => {
  return (
    <nav className={`${classes.nav} ${props.className}`}>
      <div className={classes.firstDiv}>
        <NavLink
          className={(navData) => {
            return navData.isActive
              ? `${classes.active} ${classes.button}`
              : `${classes.button}`;
          }}
          to="/dashboard"
        >
          Dashboard
        </NavLink>
      </div>
      <div className={classes.secondDiv}>
        <NavLink
          className={(navData) => {
            return navData.isActive
              ? `${classes.active} ${classes.button}`
              : `${classes.button}`;
          }}
          to="/record-an-activity"
        >
          Record an activity
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
