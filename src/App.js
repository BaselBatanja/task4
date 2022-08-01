import React, { useEffect } from "react";
import { Route, Navigate, Routes } from "react-router-dom";

import CreateActivity from "./pages/CreateActivity";
import Dashboard from "./pages/dashboard";

import { useDispatch } from "react-redux";
import { activityActions } from "./store";

import Layout from "./components/layout/Layout";
import NotFound from "./components/UI/NotFound";

// import classes from "./СomponentStyle.module.styl";
//npm run serve

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://task4-ef227-default-rtdb.firebaseio.com/activities.json"
      );
      if (!response.ok) {
        throw new Error("error");
      }
      const data = await response.json();

      dispatch(activityActions.replaceActivities(data));
    };

    try {
      sendRequest();
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/record-an-activity" element={<CreateActivity />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;
