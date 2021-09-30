import React, { useState } from 'react'
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [studentName, setStudentName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.value || null);

  function reset() {

  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setStudentName(event.target.value)}
            value={studentName}
          /*
            This must be a controlled component
          */
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel} >Cancel</Button>
          <Button confirm onClick={(event) => props.onSave(studentName, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  );
}