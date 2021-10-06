import { useReducer, useEffect } from "react";
import axios from "axios";
import { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW, reducer } from "../reducers/application"

export default function useApplicationData() {
  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        if (response.status === 204) {
          dispatchState({ type: SET_INTERVIEW, value: { id, interview } });
        }
      })
  };

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        if (response.status === 204) {
          dispatchState({ type: SET_INTERVIEW, value: { id, interview: null } });
        }
      })
  };

  const [state, dispatchState] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewer: {}
  });

  const setDay = day => dispatchState({ type: SET_DAY,  day });

  useEffect(() => {
    let days = axios.get("/api/days");
    let appointments = axios.get("/api/appointments");
    let interviewers = axios.get("/api/interviewers");
    Promise.all([
      days,
      appointments,
      interviewers
    ]).then(([
      { data: days },
      { data: appointments },
      { data: interviewers }
    ]) => {
      dispatchState({ type: SET_APPLICATION_DATA, days, appointments, interviewers });
    });
    const apiSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    apiSocket.onopen = (event) => {
      apiSocket.send("ping");
    };
    apiSocket.onmessage = (appointmentData) => {
      const { type, id, interview } = JSON.parse(appointmentData.data);
      if (type === SET_INTERVIEW) {
        dispatchState({ type: SET_INTERVIEW, value: { id, interview } });
      }
    }
    return () => apiSocket.close();
  }, []);

  return { bookInterview, cancelInterview, setDay, state };
};