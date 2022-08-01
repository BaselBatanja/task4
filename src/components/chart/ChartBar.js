import React from "react";

import classes from "./ChartBar.module.styl";
const ChartBar = (props) => {
  const { numberOfhours, scale } = props;
  const hei = (numberOfhours * 10) / scale;

  return (
    <div className={classes.chartBar}>
      <div className={classes.fill} style={{ height: `${hei}%` }}>
        <div className={classes.fillTransition}>
          <div className={classes.fillAmount}>
            {Number.isInteger(numberOfhours)
              ? numberOfhours
              : numberOfhours.toFixed(2)}
          </div>
        </div>
      </div>
      <span className={classes.nameOfChartBar}>{props.val}</span>
    </div>
  );
};

export default ChartBar;
