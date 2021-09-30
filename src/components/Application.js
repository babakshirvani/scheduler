import React, { useState, Fragment } from "react";
import Appointment from "./Appointment/index";
import "components/Application.scss";
import DayList from "./DayList";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Mahsa Jones",
      interviewer: {
        id: 2,
        name: "Daniel Cormier",
        avatar: "https://i.imgur.com/twYrpay.jpg"
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Milad Rousey",
      interviewer: {
        id: 3,
        name: "Amanda Nunes",
        avatar: "https://i.imgur.com/FK8V841.jpg"
      }
    }
  },
  {
    id: 6,
    time: "5pm",
  },
  {
    id: 7,
    time: "6pm",
    interview: {
      student: "Babak Shirvani",
      interviewer: {
        id: 4,
        name: "Dustin Poirer",
        avatar: "https://i.imgur.com/FK8V841.jpg"
      }
    }
  }
];


export default function Application(props) {
  const [day, setDay] = useState("Monday");

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <Fragment>
          {appointments.map(appointment => (
            <Appointment
              key={appointment.id}
              {...appointment}
            />))}
          <Appointment key={"last"} time={"12pm"} />
        </Fragment>

      </section>
    </main>
  );
}
