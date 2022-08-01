import React, { useEffect, useState } from "react";
import ChartBar from "./ChartBar";

import { useSelector } from "react-redux/es/exports";
import classes from "./ChartContainer.module.styl";

const initalObject = {
  sleep: 0,
  work: 0,
  sport: 0,
  reading: 0,
  eating: 0,
  tv: 0,
  family: 0,
};
const calculateAvearge = (arr) => {
  const avtivityAvearge = {
    sleep: 0,
    work: 0,
    sport: 0,
    reading: 0,
    eating: 0,
    tv: 0,
    family: 0,
  };
  for (const activity of arr) {
    for (const act in activity) {
      switch (act) {
        case "sleep":
          avtivityAvearge.sleep += activity[act];
          break;
        case "work":
          avtivityAvearge.work += activity[act];
          break;
        case "sport":
          avtivityAvearge.sport += activity[act];
          break;
        case "reading":
          avtivityAvearge.reading += activity[act];
          break;
        case "eating":
          avtivityAvearge.eating += activity[act];
          break;
        case "tv":
          avtivityAvearge.tv += activity[act];
          break;
        case "family":
          avtivityAvearge["family"] += activity[act];
          break;

        default:
          break;
      }
    }
  }
  for (const prop in avtivityAvearge) {
    avtivityAvearge[prop] /= arr.length;
  }
  return avtivityAvearge;
};
const filterObject = (activitiesObject, perWhat) => {
  const date = new Date();
  let arr = [];
  if (perWhat === "perWeek") {
    const dateBefore7Dayes = new Date();
    dateBefore7Dayes.setDate(date.getDate() - 7);

    const timeBefore7 = dateBefore7Dayes.getTime();
    const timeNow = date.getTime();

    if (Object.keys(activitiesObject).length !== 0) {
      for (const datee in activitiesObject) {
        const newDate = new Date(datee);
        const activityTime = newDate.getTime();
        if (activityTime >= timeBefore7 && activityTime <= timeNow) {
          arr.push(activitiesObject[datee]);
        }
      }
      const obj = calculateAvearge(arr);
      return obj;
    } else {
      return initalObject;
    }
  } else if (perWhat === "perMonth") {
    const dateBeforeMonth = new Date();
    dateBeforeMonth.setMonth(date.getMonth() - 1);

    const timeBeforeMonth = dateBeforeMonth.getTime();
    const timeNow = date.getTime();

    if (Object.keys(activitiesObject).length !== 0) {
      for (const datee in activitiesObject) {
        const newDate = new Date(datee);
        const activityTime = newDate.getTime();
        if (activityTime >= timeBeforeMonth && activityTime <= timeNow) {
          arr.push(activitiesObject[datee]);
        }
      }
      const obj = calculateAvearge(arr);
      return obj;
    } else {
      return initalObject;
    }
  } else if (perWhat === "perYear") {
    const dateBeforeYear = new Date();
    dateBeforeYear.setFullYear(date.getFullYear() - 1);
    const timeBeforeYear = dateBeforeYear.getTime();
    const timeNow = date.getTime();

    if (Object.keys(activitiesObject).length !== 0) {
      for (const datee in activitiesObject) {
        const newDate = new Date(datee);
        const activityTime = newDate.getTime();
        if (activityTime >= timeBeforeYear && activityTime <= timeNow) {
          arr.push(activitiesObject[datee]);
        }
      }
      const obj = calculateAvearge(arr);
      return obj;
    } else {
      return initalObject;
    }
  }
  return {
    sleep: 0,
    work: 0,
    sport: 0,
    reading: 0,
    eating: 0,
    tv: 0,
    family: 0,
  };
};

const ChartContainer = (props) => {
  // const activites = useSelector((state) => state.activites)["2022-07-20"];
  const activitesObject = useSelector((state) => state.activites);

  const [activites, setActivities] = useState({});
  const [numbersChartArray, setNumberChartArray] = useState([2, 4, 6, 8, 10]);
  const [numbersScale, setNumberScale] = useState(1);

  const termOfTime = props.perWhat;

  useEffect(() => {
    setActivities(filterObject(activitesObject, termOfTime));
  }, [termOfTime, activitesObject]);

  useEffect(() => {
    const arr = [];

    let largerThan20;
    let largerThan10;
    if (activites) {
      for (const n in activites) {
        if (n !== "remaining") {
          arr.push(+activites[n]);
        }
      }
      largerThan20 = arr.some((e) => e > 20);
      largerThan10 = false;
      if (!largerThan20) {
        largerThan10 = arr.some((e) => e > 10);
      }
    }
    if (!(largerThan20 === false && largerThan10 === false)) {
      if (largerThan20 === true) {
        setNumberChartArray([4.8, 9.6, 14.4, 19.2, 24]);
        setNumberScale(2.4);
      } else if (largerThan10 === true) {
        setNumberChartArray([4, 8, 12, 16, 20]);
        setNumberScale(2);
      }
    } else {
      setNumberChartArray([2, 4, 6, 8, 10]);
      setNumberScale(1);
    }
  }, [activites]);

  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <div>Hours</div>
      </div>
      <div className={classes.values}>
        {numbersChartArray.map((e) => {
          if (Number.isInteger(e)) {
            return <span key={e}>{e.toFixed()}</span>;
          } else {
            return <span key={e}>{e.toFixed(1)}</span>;
          }
        })}
      </div>
      <div className={classes.showChartBarsDiv}>
        <div className={classes.chart}>
          <ChartBar
            val={"Sleep"}
            numberOfhours={activites?.sleep || 0}
            scale={numbersScale}
            key={1}
          />
          <ChartBar
            val={"Work"}
            numberOfhours={activites?.work || 0}
            scale={numbersScale}
            key={2}
          />
          <ChartBar
            val={"Sport"}
            numberOfhours={activites?.sport || 0}
            scale={numbersScale}
            key={3}
          />
          <ChartBar
            val={"Reading"}
            numberOfhours={activites?.reading || 0}
            scale={numbersScale}
            key={4}
          />
          <ChartBar
            val={"Eating"}
            numberOfhours={activites?.eating || 0}
            scale={numbersScale}
            key={5}
          />
          <ChartBar
            val={"TV"}
            numberOfhours={activites?.tv || 0}
            scale={numbersScale}
            key={6}
          />
          <ChartBar
            val={"Family/ Friends"}
            numberOfhours={activites?.["family"] || 0}
            scale={numbersScale}
            key={7}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ChartContainer;
