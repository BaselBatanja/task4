import React, { useEffect, useState } from "react";
import ChartContainer from "../chart/chartContainer";

import classes from "./DashboardComponent.module.styl";

const DashboardComponent = () => {
  const [selectState, setSelectState] = useState("perWeek");
  const selectionChangeHandler = (e) => {
    setSelectState(e.target.value);
  };

  const [strNow, setStrNow] = useState(null);
  const [strBefore, setStrBefore] = useState(null);
  const [per, setPer] = useState(null);

  useEffect(() => {
    const date = new Date();

    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.toLocaleString("en-US", { year: "numeric" });
    const day = date.toLocaleString("en-US", { day: "2-digit" });

    setStrNow(`${day}-${month} ${year}`);
    if (selectState === "perWeek") {
      setPer("per week");

      const dateBefore7Dayes = new Date();
      dateBefore7Dayes.setDate(date.getDate() - 7);
      dateBefore7Dayes.setDate(dateBefore7Dayes.getDate() + 1);

      const month = dateBefore7Dayes.toLocaleString("en-US", { month: "long" });
      const year = dateBefore7Dayes.toLocaleString("en-US", {
        year: "numeric",
      });
      const day = dateBefore7Dayes.toLocaleString("en-US", { day: "2-digit" });
      setStrBefore(`${day}-${month} ${year}`);
    }
    if (selectState === "perMonth") {
      setPer("per month");

      const dateBeforeMonth = new Date();
      dateBeforeMonth.setMonth(date.getMonth() - 1);
      dateBeforeMonth.setDate(dateBeforeMonth.getDate() + 1);

      const month = dateBeforeMonth.toLocaleString("en-US", { month: "long" });
      const year = dateBeforeMonth.toLocaleString("en-US", { year: "numeric" });
      const day = dateBeforeMonth.toLocaleString("en-US", { day: "2-digit" });
      setStrBefore(`${day}-${month} ${year}`);
    } else if (selectState === "perYear") {
      setPer("per year");

      const dateBeforeYear = new Date();
      dateBeforeYear.setFullYear(date.getFullYear() - 1);
      dateBeforeYear.setDate(dateBeforeYear.getDate() + 1);

      const month = dateBeforeYear.toLocaleString("en-US", { month: "long" });
      const year = dateBeforeYear.toLocaleString("en-US", { year: "numeric" });
      const day = dateBeforeYear.toLocaleString("en-US", { day: "2-digit" });
      setStrBefore(`${day}-${month} ${year}`);
    }
  }, [selectState]);

  return (
    <>
      <header className={classes.header}>
        <div className={classes.topic} id="titleOfDashboard">
          Average hours spent on activites {per}
        </div>
        <div className={classes.selectContainer}>
          <select
            onChange={selectionChangeHandler}
            value={selectState}
            id="selectTime"
          >
            <option value="perWeek">Per Week</option>
            <option value="perMonth">Per Month</option>
            <option value="perYear">Per Year</option>
          </select>
        </div>
        <div className={classes.termOfChart}>
          <div className={classes.value}>
            <div>
              <span style={{ fontWeight: "bold" }}>From: </span> {strBefore}
            </div>
            <div id="toSpan">
              <span style={{ fontWeight: "bold" }}>To: </span> {strNow}
            </div>
          </div>
        </div>
      </header>
      <ChartContainer perWhat={selectState} />
      <footer>
        <span>Activities</span>
      </footer>
    </>
  );
};

export default DashboardComponent;
