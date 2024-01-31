import PropTypes from "prop-types";
// import { useEffect } from "react";

function Appointment({ appointments, daysInCurrentWeek }) {
  const filteredAppointments = appointments.filter((appointment) =>
    daysInCurrentWeek.includes(appointment.dateStart)
  );

  // useEffect(() => {
  //   console.log("appointments from appointment", appointments);
  // }, [appointments, daysInCurrentWeek]);

  return (
    <>
      {filteredAppointments.map((appointment) => (
        <div
          key={appointment.appointmentId}
          className="appointment-item"
          style={{
            backgroundColor: `${appointment.category}`,
            gridColumn: `${
              daysInCurrentWeek.indexOf(appointment.dateStart) + 2
            }`,
            gridRow: `${
              (appointment.hourStart - 8) * 2 +
              (appointment.minuteStart === 30 ? 1 : 0) +
              2
            } / span ${appointment.duration * 2}`,
          }}
        >
          {appointment.commentary}
        </div>
      ))}
    </>
  );
}

Appointment.propTypes = {
  daysInCurrentWeek: PropTypes.arrayOf(PropTypes.string).isRequired,
  appointments: PropTypes.arrayOf(
    PropTypes.shape({
      allDay: PropTypes.number.isRequired,
      duration: PropTypes.number.isRequired,
      hourStart: PropTypes.number,
      minuteStart: PropTypes.number,
      commentary: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      place: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Appointment;
