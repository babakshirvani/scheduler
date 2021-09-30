import React from "react";
import classnames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer } = props;

  const interviewClass = classnames("interviewers__item", {
    "interviewers__item--selected": selected
  });

  return (
    <li onClick={setInterviewer} className={interviewClass}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}