import React, { useState, useRef, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { activityActions } from "../../store";

import classes from "./ActivityForm.module.styl";
let inital = true;
const ActivityForm = () => {
  const dispatch = useDispatch();

  const [date, setDate] = useState("");
  const [number, setNumber] = useState("");
  const [activity, setActivity] = useState("sleep");
  const [classNumberInvalid, setClassNumberInvalid] = useState(null);

  const [formIsValid, setformIsValid] = useState(false);
  useEffect(() => {
    if (
      date !== "" &&
      date !== undefined &&
      number !== "" &&
      classNumberInvalid === null
    ) {
      setformIsValid(true);
    } else {
      setformIsValid(false);
    }
  }, [date, number, classNumberInvalid]);

  const activites = useSelector((state) => state.activites);
  const dateRef = useRef();
  const numberRef = useRef();
  const activityRef = useRef();

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://task4-ef227-default-rtdb.firebaseio.com/activities.json",
        {
          method: "PUT",
          body: JSON.stringify(activites),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    };
    if (inital) {
      inital = false; // to not reset the database
      return;
    }
    sendRequest();
  }, [activites, inital]);

  const submitFormHandler = (e) => {
    e.preventDefault();
    if (formIsValid) {
      dispatch(
        activityActions.addToActivity({
          date: dateRef.current.value,
          numberOfHours: numberRef.current.value,
          activity: activityRef.current.value,
        })
      );

      setDate("");
      setActivity("sleep");
      setNumber("");
    }
  };

  const activityChangeHandler = (event) => {
    setActivity(event.target.value);
  };

  const numberChangeHandler = (event) => {
    setNumber(event.target.value);

    if (event.target.value === "") {
      setClassNumberInvalid(null);
      return;
    }
    if (activites[date] && activites[date].remaining === 0) {
      setClassNumberInvalid("You cannot add more activities in this day");
      return;
    }

    if (+event.target.value > 24 || +event.target.value <= 0) {
      setClassNumberInvalid("You must enter value between 0 and 24");
      return;
    } else {
      setClassNumberInvalid(null);

      if (date && activites[date]) {
        if (
          activites[date] &&
          activites[date].remaining >= event.target.value
        ) {
          setClassNumberInvalid(null);
        } else {
          setClassNumberInvalid(
            `You exceeded number of hours in this day (Remaining : ${activites[date].remaining} hours)`
          );
        }
      }
    }
  };

  const dateChangeHandler = (event) => {
    setDate(event.target.value);

    if (numberRef.current.value === "") {
      return;
    }
    if (numberRef.current.value <= 0 || +numberRef.current.value > 24) {
      setClassNumberInvalid("You must enter value between 0 and 24");
      return;
    }
    if (activites[event.target.value] === undefined) {
      setClassNumberInvalid(null);
      // if(numberRef)
      return;
    }
    if (event.target.value && activites[event.target.value]) {
      if (activites[event.target.value].remaining >= +numberRef.current.value) {
        setClassNumberInvalid(null);
      } else {
        setClassNumberInvalid(
          `You exceeded number of hours in this day (Remaining : ${
            activites[event.target.value].remaining
          } hours)`
        );
      }
    }
  };
  //
  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div>
        <div className={classes.heading}>
          <h1>Record your activity for the day</h1>
        </div>
        <div className={classes.dataInput}>
          <div className={classes.leftDiv}>
            <div>Date</div>
            <div>
              <span
                className={`${classNumberInvalid ? classes.invalidLabel : ""}`}
              >
                How many hours?
              </span>
            </div>
            <div>Select the activity</div>
          </div>
          <div className={classes.rightDiv}>
            <div>
              <input
                type="date"
                onChange={dateChangeHandler}
                max="2022-10-20"
                ref={dateRef}
                value={date}
                id="dateInput"
              />
            </div>
            <div>
              <input
                type="number"
                onChange={numberChangeHandler}
                className={`${classNumberInvalid ? classes.inputInvalid : ""}`}
                ref={numberRef}
                value={number}
                id="numberInput"
              />
              {classNumberInvalid && (
                <span className={classes.invalidNumberOfHours} id="errorSpan">
                  {classNumberInvalid}
                </span>
              )}
            </div>
            <div>
              <select
                className={classes.select}
                onChange={activityChangeHandler}
                ref={activityRef}
                value={activity}
                id="activityId"
              >
                <option value="sleep">Sleep</option>
                <option value="work">Work</option>
                <option value="sport">Sport</option>
                <option value="reading">Reading</option>
                <option value="eating">Eating</option>
                <option value="tv">TV</option>
                <option value="family">Family/Friends</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.actions}>
        <button disabled={!formIsValid}>+</button>
      </div>
    </form>
  );
};

export default ActivityForm;
