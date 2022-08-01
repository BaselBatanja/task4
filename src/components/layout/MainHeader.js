import React from "react";
import classes from "./MainHeader.module.styl";
const MainHeader = () => {
  // const query = new URLSearchParams(location.search);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Welcome</div>
    </header>
  );
};

export default MainHeader;
