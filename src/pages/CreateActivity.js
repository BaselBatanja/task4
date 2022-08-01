import React from "react";
import ActivityForm from "../components/activities/ActivityForm";

import classes from "./CreateActivity.module.styl";
const CreateActivity = (props) => {
  return (
    <div className={classes.createActivityBox}>
      <ActivityForm />
    </div>
  );
};

export default CreateActivity;
