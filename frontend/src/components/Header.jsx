import React from "react";
import PropTypes from "prop-types";
import { addDays, subDays } from "date-fns";

function Header({ currentWeek, setDateOfTheDay, dateOfTheDay }) {
  return (
    <div className="header">
      <img className="logo" src="/images/AgendaPro.png" alt="logo Agenda Pro" />

      <button type="button">
        <img
          role="presentation"
          onClick={() => setDateOfTheDay(subDays(dateOfTheDay, 7))}
          className="arrowBack"
          src="/images/arrow2.png"
          alt="Semaine précédente"
        />
      </button>
      <h2>Semaine {currentWeek}</h2>
      <button type="button" className="">
        <img
          onClick={() => setDateOfTheDay(addDays(dateOfTheDay, 7))}
          role="presentation"
          className="arrowForward"
          src="/images/arrow2.png"
          alt="Semaine précédente"
        />
      </button>

      {/* <div></div> */}
    </div>
  );
}

Header.propTypes = {
  currentWeek: PropTypes.number.isRequired,
  setDateOfTheDay: PropTypes.func.isRequired,
  dateOfTheDay: PropTypes.instanceOf(Date).isRequired,
};

export default Header;
