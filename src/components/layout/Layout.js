import React from "react";

import MainHeader from "./MainHeader";
import NavBar from "./NavBar";

import classes from "./Layout.module.styl";
const Layout = (props) => {
  return (
    <>
      <MainHeader />
      <div className={classes.innerBody}>
        <NavBar className={classes.navBar} />
        {props.children}
      </div>
    </>
  );
};

export default Layout;
