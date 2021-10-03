

export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(fday => fday.name === day);
  if (filteredDay !== [] && filteredDay[0] && filteredDay[0].appointments) {
    const appointments = filteredDay[0].appointments.map((id) => state.appointments[id]);
    return appointments;
  }
  return [];
};

export function getInterview(state, interview) {
  if (!interview) return null;
  else {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }
  }
}