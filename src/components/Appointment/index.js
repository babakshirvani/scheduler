import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Confirm from "./Confirm";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

import "./styles.scss"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  };

  const cancel = () => {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY));
  };

  const interview = props.interview;
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={(event) => { transition(CREATE) }} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={(event) => { transition(CONFIRM) }}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />)}
      {mode === SAVING && (<Status message={"Saving"} />)}
      {mode === DELETING && (<Status message={"Deleting"} />)}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onConfirm={() => cancel()}
          onCancel={back} />)}
    </article>
  );
}