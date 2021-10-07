const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.day
      };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };
    case SET_INTERVIEW:
      const { id, interview } = action.value;
      const appointment = {
        ...state.appointments[id],
        interview: !interview ? null : { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      const getSpotsForDay = day =>
        day.appointments.length -
        day.appointments.reduce(
          (count, id) => (appointments[id].interview ? count + 1 : count),
          0
        );
      const days = state.days.map(day => {
        return day.appointments.includes(id)
          ? {
            ...day,
            spots: getSpotsForDay(day)
          }
          : day;
      });
      return ({ ...state, appointments, days });
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW, reducer }