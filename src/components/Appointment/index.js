import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Confirm from "./Confirm";
import Error from "./Error";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

import "./styles.scss"
import { transform } from "@babel/core";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {
  const save = (name, interviewer) => {
    if (interviewer) {
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING, true);
      props.bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch((error) => transition(ERROR_SAVE, true));
    }
  };

  const destroy = () => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
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
          onEdit={(event) => { transition(EDIT) }}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />)}
      {mode === EDIT && (
        <Form
          name={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={props.interviewers}
          value={interview.interviewer.id}
          onCancel={back}
          onSave={save}
        />)}
      {mode === SAVING && (<Status message={"Saving"} />)}
      {mode === DELETING && (<Status message={"Deleting"} />)}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onConfirm={() => destroy()}
          onCancel={back}
        />)}
      {mode === ERROR_SAVE && (
        <Error
          message={"Can not save appointment"}
          onClose={back}
        />)}
      {mode === ERROR_DELETE && (
        <Error
          message={"Can not cancel appointment"}
          onClose={back}
        />)}
    </article>
  );
}