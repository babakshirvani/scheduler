import React from "react";
import classnames from "classnames";
import "components/DayListItem.scss";



export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;

  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": !spots
  });

  function formatSpots() {
    if (!spots) {
      return "no spots remaining";
    }
    if (spots === 1) {
      return `1 spot remaining`;
    }
    if (spots > 1) {
      return `${spots} spots remaining`;
    }
  }

  return (
    <li onClick={() => setDay(name)} className={dayClass} >
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}