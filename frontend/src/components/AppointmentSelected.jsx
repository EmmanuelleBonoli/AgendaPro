import { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import UserContext from "../contexts/UserContext";

function AppointmentSelected({
  scheduleUser,
  appointmentSelected,
  setOpenAppointment,
}) {
  const { userConnected } = useContext(UserContext);
  const [membersMeeting, setMembersMeeting] = useState([]);
  const [isModify, setIsModify] = useState(false);
  const [appointmentAllObject, setAppointmentAllObject] = useState([]);
  const [listCoworkers, setListCoworkers] = useState([]);
  const [inputDateStart, setInputDateStart] = useState("");
  const [inputDateFinish, setInputDateFinish] = useState("");
  const [inputHourStart, setInputHourStart] = useState(0);
  const [inputHourFinish, setInputHourFinish] = useState(0);
  const [inputMinuteStart, setInputMinuteStart] = useState(0);
  const [inputMinuteFinish, setInputMinuteFinish] = useState(0);
  const [inputPlace, setInputPlace] = useState("");
  const [inputCategory, setInputCaterogy] = useState("#fbb13c");
  const [inputCoworkers, setInputCoworkers] = useState([]);
  const [inputCommentary, setInputCommentary] = useState("");
  const [inputTitle, setInputTitle] = useState(appointmentAllObject.title);

  useEffect(() => {
    const coworkers = async () => {
      if (userConnected) {
        const user = JSON.parse(localStorage.getItem("token"));
        try {
          const dataCoworkers = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/coworkers/list/${
              userConnected.id
            }`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setListCoworkers(dataCoworkers.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    coworkers();
    const members = async () => {
      if (userConnected) {
        const user = JSON.parse(localStorage.getItem("token"));
        try {
          const dataMembers = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/meeting/membersMeeting/${
              appointmentSelected.appointmentId
            }`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setMembersMeeting(dataMembers.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    const getAllAppointmentObject = async () => {
      if (userConnected) {
        const user = JSON.parse(localStorage.getItem("token"));
        try {
          const dataAppointment = await axios.get(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/appointment/appointmentSelected/${
              appointmentSelected.appointmentId
            }`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );

          const formattedAppointment = {
            ...dataAppointment.data[0],
            dateStart: new Date(
              dataAppointment.data[0].dateStart
            ).toLocaleDateString("en-CA"),
            dateFinish: new Date(
              dataAppointment.data[0].dateFinish
            ).toLocaleDateString("en-CA"),
            minuteStart:
              dataAppointment.data[0].minuteStart === 0
                ? "00"
                : dataAppointment.data[0].minuteStart,
            minuteFinish:
              dataAppointment.data[0].minuteFinish === 0
                ? "00"
                : dataAppointment.data[0].minuteFinish,
          };
          setAppointmentAllObject(formattedAppointment);

          setInputDateStart(formattedAppointment.dateStart);
          setInputDateFinish(formattedAppointment.dateFinish);
          setInputHourStart(formattedAppointment.hourStart);
          setInputHourFinish(formattedAppointment.hourFinish);
          setInputMinuteStart(formattedAppointment.minuteStart);
          setInputMinuteFinish(formattedAppointment.minuteFinish);
          setInputPlace(formattedAppointment.place);
          setInputCaterogy(formattedAppointment.category);
          setInputCommentary(formattedAppointment.commentary);
          setInputTitle(formattedAppointment.title);
        } catch (error) {
          console.error(error);
        }
      }
    };
    members();
    getAllAppointmentObject();
  }, []);

  const handleDeleteAppointment = async () => {
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/appointment/${
          appointmentSelected.appointmentId
        }`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/meeting/${
          appointmentSelected.appointmentId
        }`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setOpenAppointment(false);
      scheduleUser();
    } catch (err) {
      console.error(err);
    }
  };

  const handleModify = async (event) => {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem("token"));
    try {
      const modifyAppointment = {
        dateStart: inputDateStart,
        hourStart: inputHourStart,
        minuteStart: inputMinuteStart,
        hourFinish: inputHourFinish,
        minuteFinish: inputMinuteFinish,
        dateFinish: inputDateFinish,
        category: inputCategory,
        place: inputPlace,
        commentary: inputCommentary,
        title: inputTitle,
      };
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/appointment/modify/${
          appointmentAllObject.id
        }`,
        modifyAppointment,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/meeting/${
          appointmentSelected.appointmentId
        }`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const newMeeting = {
        userId: userConnected.id,
        appointmentId: appointmentAllObject.id,
      };

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/meeting/create`,
        newMeeting,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (inputCoworkers.length > 0) {
        await Promise.all(
          inputCoworkers.map(async (coworker) => {
            const newMeetingCoworker = {
              userId: parseInt(coworker, 10),
              appointmentId: appointmentAllObject.id,
            };

            await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/meeting/create`,
              newMeetingCoworker,
              {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              }
            );
          })
        );
      }

      setIsModify(false);
      setOpenAppointment(false);
      scheduleUser();
    } catch (error) {
      console.error(error);
    }
  };

  function handleChooseCoworker(coworker) {
    if (!inputCoworkers.includes(parseInt(coworker, 10))) {
      const listCoworkersChoose = [...inputCoworkers];
      listCoworkersChoose.push(coworker);
      setInputCoworkers(listCoworkersChoose);
    }
  }

  function handleDeleteChoice(choiceId) {
    const updatedCoworkers = inputCoworkers.filter(
      (coworker) => coworker !== choiceId
    );
    setInputCoworkers(updatedCoworkers);
  }
  return (
    <div
      className="appointmentSelected"
      onClick={() => setOpenAppointment(false)}
      role="presentation"
    >
      {!isModify ? (
        <div
          className="modalAppointment"
          role="presentation"
          onClick={(e) => e.stopPropagation()}
        >
          <h1>{appointmentSelected.title}</h1>
          <p>Démarre le {appointmentSelected.dateStart}</p>
          <p>Lieu : {appointmentSelected.place}</p>
          <div className="members">
            <p>Participants : </p>
            {membersMeeting.map((member) => {
              return (
                <div key={member.userId}>
                  <p> {member.firstName}, </p>
                </div>
              );
            })}
          </div>

          <div className="commentary">
            <p>Commentaires</p>
            <p className="commentarySection">
              {appointmentSelected.commentary}
            </p>
          </div>
          <div className="buttons">
            <button type="button" onClick={() => setIsModify(true)}>
              Modifier
            </button>
            <button type="button" onClick={() => handleDeleteAppointment()}>
              Supprimer
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleModify}
          className="modalAppointment"
          role="presentation"
          onClick={(e) => e.stopPropagation()}
        >
          <h1>
            <input
              onInput={(e) => setInputTitle(e.target.value)}
              defaultValue={appointmentAllObject.title}
            />
          </h1>

          <div className="saveDate">
            <p>Date de début: </p>
            <input
              type="date"
              className="inputdate"
              defaultValue={appointmentAllObject.dateStart}
              onInput={(e) => setInputDateStart(e.target.value)}
            />
            <p>à</p>
            <select
              defaultValue={appointmentAllObject.hourStart}
              onInput={(e) => setInputHourStart(e.target.value)}
            >
              <option>--</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
              <option>13</option>
              <option>14</option>
              <option>15</option>
              <option>16</option>
              <option>17</option>
              <option>18</option>
            </select>
            <p>h</p>
            <select
              defaultValue={appointmentAllObject.minuteStart}
              onInput={(e) => setInputMinuteStart(e.target.value)}
            >
              <option>--</option>
              <option>00</option>
              <option>30</option>
            </select>
          </div>
          <div className="saveDate">
            <p>Date de Fin: </p>

            <input
              type="date"
              className="inputdate"
              onInput={(e) => setInputDateFinish(e.target.value)}
              defaultValue={appointmentAllObject.dateFinish}
            />
            <p>à</p>
            <select
              defaultValue={appointmentAllObject.hourFinish}
              onInput={(e) => setInputHourFinish(e.target.value)}
            >
              <option>--</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
              <option>13</option>
              <option>14</option>
              <option>15</option>
              <option>16</option>
              <option>17</option>
              <option>18</option>
            </select>

            <p>h</p>
            <select
              defaultValue={appointmentAllObject.minuteFinish}
              onInput={(e) => setInputMinuteFinish(e.target.value)}
            >
              <option>--</option>
              <option>00</option>
              <option>30</option>
            </select>
          </div>
          <p>
            Lieu :{" "}
            <input
              onInput={(e) => setInputPlace(e.target.value)}
              defaultValue={appointmentAllObject.place}
            />
          </p>
          <div className="saveDate">
            <p>Catégorie :</p>
            <div className="categoryChooseContainer">
              <div
                className="categoryChoose"
                style={{ backgroundColor: inputCategory }}
              />
            </div>
            <select
              aria-label="Sélectionnez une option"
              onInput={(e) => setInputCaterogy(e.target.value)}
            >
              <option value="#fbb13c">Jaune</option>
              <option value="#a76571">Rouge</option>
              <option value="#bcd8c1">Vert</option>
              <option value="#0097b2">Bleu</option>
            </select>
          </div>
          <div className="members">
            <p>Choisissez les participants : </p>
            <select
              onInput={(event) => handleChooseCoworker(event.target.value)}
            >
              <option value="">--</option>
              {listCoworkers.map((coworker) => (
                <option key={coworker.coworkerId} value={coworker.coworkerId}>
                  {coworker.firstName}
                </option>
              ))}
            </select>
            <p>Participants :</p>
            {inputCoworkers.map((coworkerId) => {
              const numericCoworkerId = parseInt(coworkerId, 10);
              const coworker = listCoworkers.find(
                (c) => c.coworkerId === numericCoworkerId
              );
              return (
                <div key={coworkerId} className="coworkersAddContainer">
                  <p className="coworkersAdd">{coworker.firstName}</p>
                  <p
                    role="presentation"
                    onClick={(event) =>
                      handleDeleteChoice(
                        event.currentTarget.getAttribute("data-id")
                      )
                    }
                    className="deleteCoworkersAdd"
                    data-id={numericCoworkerId}
                  >
                    X
                  </p>
                </div>
              );
            })}
          </div>

          <div className="commentary">
            <p>Commentaires</p>
            <p className="commentarySection">
              <input
                className="inputCommentary"
                onInput={(e) => setInputCommentary(e.target.value)}
                defaultValue={appointmentAllObject.commentary}
              />
            </p>
          </div>
          <div className="buttons">
            <button type="submit">Enregistrer</button>
          </div>
        </form>
      )}
    </div>
  );
}

AppointmentSelected.propTypes = {
  scheduleUser: PropTypes.func.isRequired,
  setOpenAppointment: PropTypes.func.isRequired,
  appointmentSelected: PropTypes.shape({
    allDay: PropTypes.number.isRequired,
    appointmentId: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    commentary: PropTypes.string.isRequired,
    dateStart: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    hourStart: PropTypes.number,
    minuteStart: PropTypes.number,
    place: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default AppointmentSelected;
