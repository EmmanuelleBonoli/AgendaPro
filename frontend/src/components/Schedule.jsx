import React, { useState, useEffect, useContext } from "react";
import { format, startOfWeek, addDays, getISOWeek } from "date-fns";
import { fr } from "date-fns/locale";
import PropTypes from "prop-types";
import axios from "axios";
import Appointment from "./Appointment";
import AppointmentSelected from "./AppointmentSelected";
import NewAppointment from "./NewAppointment";
import UserContext from "../contexts/UserContext";
import AllCoworkers from "./AllCoworkers";
import NewCoworker from "./NewCoworker";

function Schedule({
  setCurrentWeek,
  dateOfTheDay,
  setOpenNewCoworker,
  setOpenAllCoworkers,
  openAllCoworkers,
  openNewCoworker,
  coworkers,
  listCoworkersAttente,
}) {
  const { userConnected } = useContext(UserContext);

  const [daysInCurrentWeek, setDaysInCurrentWeek] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [appointmentsFormatted, setAppointmentsFormatted] = useState([]);
  const [openAppointment, setOpenAppointment] = useState(false);
  const [appointmentSelected, setAppointmentSelected] = useState([]);
  const [saveNewAppointment, setSaveNewAppointment] = useState([]);
  const [openNewAppointment, setOpenNewAppointment] = useState(false);

  const scheduleUser = async () => {
    if (userConnected) {
      const user = JSON.parse(localStorage.getItem("token"));
      try {
        const dataAppointments = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/appointment/Allappointments/${userConnected.id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setAllAppointments(dataAppointments.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    scheduleUser();
  }, []);

  const initializeAppointments = () => {
    const newAppointments = [];
    allAppointments.forEach((appointment) => {
      const {
        dateStart,
        hourStart,
        minuteStart,
        hourFinish,
        minuteFinish,
        commentary,
        category,
        place,
        allDay,
        title,
        appointmentId,
      } = appointment;
      const formattedDay = new Date(dateStart);
      const start = hourStart * 60 + minuteStart;
      const end = hourFinish * 60 + minuteFinish;
      const duration = (end - start) / 60;

      const newAppointment = {
        dateStart: format(formattedDay, "yyyy-MM-dd"),
        hourStart,
        minuteStart,
        duration,
        time: `${hourStart}:${minuteStart === 0 ? "00" : "30"}`,
        commentary,
        category,
        place,
        allDay,
        title,
        appointmentId,
      };
      newAppointments.push(newAppointment);
    });
    setAppointmentsFormatted(newAppointments);
  };

  useEffect(() => {
    initializeAppointments();
  }, [allAppointments]);

  useEffect(() => {
    const weekNumber = getISOWeek(dateOfTheDay);
    setCurrentWeek(weekNumber);
  }, [dateOfTheDay]);

  useEffect(() => {
    const firstDayOfWeek = startOfWeek(dateOfTheDay, { weekStartsOn: 1 });
    const tmpDaysWeek = [];
    for (let i = 0; i < 5; i += 1) {
      const day = addDays(firstDayOfWeek, i);
      const formattedDate = format(day, "yyyy-MM-dd");
      tmpDaysWeek.push(formattedDate);
    }
    setDaysInCurrentWeek(tmpDaysWeek);
    initializeAppointments();
  }, [dateOfTheDay]);

  const hours = [
    { hour: "8:00" },
    { hour: "8:30" },
    { hour: "9:00" },
    { hour: "9:30" },
    { hour: "10:00" },
    { hour: "10:30" },
    { hour: "11:00" },
    { hour: "11:30" },
    { hour: "12:00" },
    { hour: "12:30" },
    { hour: "13:00" },
    { hour: "13:30" },
    { hour: "14:00" },
    { hour: "14:30" },
    { hour: "15:00" },
    { hour: "15:30" },
    { hour: "16:00" },
    { hour: "16:30" },
    { hour: "17:00" },
    { hour: "17:30" },
    { hour: "18:00" },
    { hour: "18:30" },
  ];

  function handleSave(day, hour) {
    const newAppointment = [];
    newAppointment.push(day);
    newAppointment.push(hour);
    setSaveNewAppointment(newAppointment);
    setOpenNewAppointment(true);
  }

  return (
    <div className="agenda-container">
      {openAllCoworkers && (
        <AllCoworkers
          coworkers={coworkers}
          listCoworkersAttente={listCoworkersAttente}
          setOpenAllCoworkers={setOpenAllCoworkers}
        />
      )}
      {openNewCoworker && (
        <NewCoworker setOpenNewCoworker={setOpenNewCoworker} />
      )}
      {openNewAppointment && (
        <NewAppointment
          scheduleUser={scheduleUser}
          setOpenNewAppointment={setOpenNewAppointment}
          saveNewAppointment={saveNewAppointment}
        />
      )}
      {openAppointment && (
        <AppointmentSelected
          scheduleUser={scheduleUser}
          setOpenAppointment={setOpenAppointment}
          appointmentSelected={appointmentSelected}
        />
      )}
      <div className="agenda-grid">
        {daysInCurrentWeek.map((day, index) => (
          <div key={day} style={{ gridColumn: `${index + 2}`, gridRow: "1" }}>
            {format(new Date(day), "EEEE d MMMM", { locale: fr })}
          </div>
        ))}

        {hours.map((hour, index) => {
          const [hourPart, minutePart] = hour.hour.split(":");
          const isEvenHour =
            parseInt(hourPart, 10) % 2 === 0 && minutePart === "00";
          return (
            <div
              key={hour.hour}
              className="hours"
              style={{ gridColumn: `1`, gridRow: `${index + 2}` }}
            >
              {isEvenHour ? `${hour.hour}` : ""}
            </div>
          );
        })}

        {hours.map((hour, rowIndex) => {
          const detailsHoursIndicesTop = [0, 4, 8, 12, 16, 20];
          const detailsHoursIndicesTopBottom = [
            1, 2, 5, 6, 9, 10, 13, 14, 17, 18,
          ];

          return (
            <React.Fragment key={hour.hour}>
              {daysInCurrentWeek.map((day, colIndex) => {
                const getDetailsHoursClass = () => {
                  if (detailsHoursIndicesTop.includes(rowIndex))
                    return "detailsHours detailsHoursBasic";
                  if (detailsHoursIndicesTopBottom.includes(rowIndex))
                    return "detailsHoursTopBottom detailsHoursBasic";
                  return "detailsHoursTop detailsHoursBasic";
                };
                const hashKey = () => {
                  return `${day}_${hour}_${rowIndex}`;
                };
                return (
                  <div
                    role="presentation"
                    key={hashKey(day, hour, rowIndex)}
                    className={getDetailsHoursClass(rowIndex)}
                    style={{
                      gridColumn: `${colIndex + 2}`,
                      gridRow: `${rowIndex + 2}`,
                    }}
                    onClick={() => handleSave(day, hour)}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
        <Appointment
          appointments={appointmentsFormatted}
          daysInCurrentWeek={daysInCurrentWeek}
          setOpenAppointment={setOpenAppointment}
          setAppointmentSelected={setAppointmentSelected}
        />
      </div>
    </div>
  );
}

Schedule.propTypes = {
  setCurrentWeek: PropTypes.func.isRequired,
  dateOfTheDay: PropTypes.instanceOf(Date).isRequired,
  setOpenNewCoworker: PropTypes.func.isRequired,
  setOpenAllCoworkers: PropTypes.func.isRequired,
  openAllCoworkers: PropTypes.bool.isRequired,
  openNewCoworker: PropTypes.bool.isRequired,
  coworkers: PropTypes.func.isRequired,
  listCoworkersAttente: PropTypes.arrayOf(
    PropTypes.shape({
      askingCoworker: PropTypes.number.isRequired,
      autorisation: PropTypes.number.isRequired,
      coworkerId: PropTypes.number.isRequired,
      enterprise: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      workerId: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Schedule;
