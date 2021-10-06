import { useReducer, useEffect } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const SET_SPOTS = "SET_SPOTS";

export default function useApplicationData() {
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(response => {
        if (response.status === 204) {
          dispatchState({ type: SET_INTERVIEW, appointments });
          if (!state.appointments[id].interview) {
            dispatchState({ type: SET_SPOTS, value: -1 });
          }

        }
      })
  };


  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(response => {
        if (response.status === 204) {
          dispatchState({ type: SET_INTERVIEW, appointments });
          dispatchState({ type: SET_SPOTS, value: 1 });
        }
      })
  };

  const newDaysObj = (days, day) => {
    return days.map(d => {
      if (d.name === day.name) return { ...d, spots: day.spots }
      else return d;
    });
  };

  const spots = (state, value) => {
    const dayObj = state.days.find(day => day.name === state.day);
    const day = { ...dayObj, spots: dayObj.spots + value };
    console.log("aaaaaa", { ...state, days: newDaysObj(state.days, day) })
    return ({ ...state, days: newDaysObj(state.days, day) });
  }

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return {
          ...state,
          day: action.day
        }
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers
        }
      case SET_INTERVIEW:
        return {
          ...state,
          appointments: action.appointments
        }
      case SET_SPOTS:
        return spots(state, action.value)
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatchState] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewer: {}
  });

  const setDay = day => dispatchState({ type: SET_DAY, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(([
      { data: days },
      { data: appointments },
      { data: interviewers }
    ]) => {
      dispatchState({ type: SET_APPLICATION_DATA, days, appointments, interviewers });
    });
  }, []);

  return { bookInterview, cancelInterview, setDay, state };
};