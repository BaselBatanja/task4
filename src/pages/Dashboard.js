import React, { useEffect } from "react";
import DashboardComponent from "../components/activities/DashboardComponent";

import classes from "./dashboard.module.styl";

const Dashboard = (props) => {
  return (
    <div className={classes.dashboard}>
      <DashboardComponent />
    </div>
  );
};

export default Dashboard;
