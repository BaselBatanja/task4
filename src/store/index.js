import { configureStore, createSlice } from "@reduxjs/toolkit";

const inital = {
  activites: {},
};

const activitySlice = createSlice({
  name: "activity",
  initialState: inital,
  reducers: {
    addToActivity(state, action) {
      if (
        action.payload.date === "" ||
        action.payload.date === undefined ||
        action.payload.numberOfHours <= 0 ||
        action.payload.numberOfHours > 24
      ) {
        return;
      }
      for (const date in state.activites) {
        if (date === action.payload.date) {
          if (state.activites[date].remaining < +action.payload.numberOfHours) {
            return;
          }

          state.activites[date][action.payload.activity] +=
            +action.payload.numberOfHours;
          state.activites[date].remaining -= +action.payload.numberOfHours;
          return;
        }
      }
      state.activites[action.payload.date] = {
        sleep: 0,
        work: 0,
        sport: 0,
        reading: 0,
        eating: 0,
        tv: 0,
        family: 0,
        remaining: 24,
      };
      state.activites[action.payload.date][action.payload.activity] =
        +action.payload.numberOfHours;
      state.activites[action.payload.date].remaining -=
        +action.payload.numberOfHours;
    },
    replaceActivities(state, action) {
      state.activites = { ...action.payload };
    },
  },
});

export const activityActions = activitySlice.actions;

const store = configureStore({ reducer: activitySlice.reducer });

export default store;
