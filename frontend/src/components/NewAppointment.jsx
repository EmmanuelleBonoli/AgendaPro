import { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import UserContext from "../contexts/UserContext";

function NewAppointment({
  scheduleUser,
  saveNewAppointment,
  setOpenNewAppointment,
}) {
  const { userConnected } = useContext(UserContext);
  const [listCoworkers, setListCoworkers] = useState([]);
  const [inputDateStart, setInputDateStart] = useState(saveNewAppointment[0]);
  const [inputDateFinish, setInputDateFinish] = useState(saveNewAppointment[0]);
  const [inputHourStart, setInputHourStart] = useState(0);
  const [inputHourFinish, setInputHourFinish] = useState(0);
  const [inputMinuteStart, setInputMinuteStart] = useState(0);
  const [inputMinuteFinish, setInputMinuteFinish] = useState(0);
  const [inputPlace, setInputPlace] = useState("");
  const [inputCategory, setInputCaterogy] = useState("#fbb13c");
  const [inputCoworkers, setInputCoworkers] = useState([]);
  const [inputCommentary, setInputCommentary] = useState("");
  const [inputTitle, setInputTitle] = useState("");

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
  }, []);

  const handleSave = async (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      const newAppointment = {
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
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/appointment/create`,
        newAppointment,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const newMeeting = {
        userId: userConnected.id,
        appointmentId: res.data.insertId.insertId,
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
              appointmentId: res.data.insertId.insertId,
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

      setOpenNewAppointment(false);
      scheduleUser();
    } catch (error) {
      console.error(error);
    }
  };

  function handleChooseCoworker(coworker) {
    if (!inputCoworkers.includes(coworker)) {
      const listCoworkersChoose = [...inputCoworkers];
      listCoworkersChoose.push(coworker);
      setInputCoworkers(listCoworkersChoose);
    }
  }

  function handleDeleteChoice(choiceId) {
    const updatedCoworkers = inputCoworkers.filter(
      (coworker) => coworker !== choiceId.toString()
    );
    setInputCoworkers(updatedCoworkers);
  }

  return (
    <div
      className="newAppointment"
      onClick={() => setOpenNewAppointment(false)}
      role="presentation"
    >
      <div
        className="modalAppointment"
        role="presentation"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSave}>
          <h1>Nouveau Rendez-vous :</h1>
          <div className="saveDate">
            <p>Objet :</p>
            <input
              className="inputother1"
              onInput={(e) => setInputTitle(e.target.value)}
            />
          </div>
          <div className="saveDate">
            <p>Date de début: </p>
            <input
              type="date"
              className="inputdate"
              defaultValue={saveNewAppointment[0]}
              onInput={(e) => setInputDateStart(e.target.value)}
            />
            <p>à</p>
            <select onInput={(e) => setInputHourStart(e.target.value)}>
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
            <select onInput={(e) => setInputMinuteStart(e.target.value)}>
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
              defaultValue={saveNewAppointment[0]}
            />
            <p>à</p>
            <select onInput={(e) => setInputHourFinish(e.target.value)}>
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
            <select onInput={(e) => setInputMinuteFinish(e.target.value)}>
              <option>--</option>
              <option>00</option>
              <option>30</option>
            </select>
          </div>
          <div className="saveDate">
            <p>Lieu :</p>
            <input
              className="inputother1"
              onInput={(e) => setInputPlace(e.target.value)}
            />
          </div>
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
          <div className="saveDate">
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
          <div className="saveDate">
            <p>Commentaire : </p>
            <input
              className="inputother2"
              onInput={(e) => setInputCommentary(e.target.value)}
            />
          </div>

          <button type="submit">Enregistrer</button>
        </form>
      </div>
    </div>
  );
}

NewAppointment.propTypes = {
  setOpenNewAppointment: PropTypes.func.isRequired,
  scheduleUser: PropTypes.func.isRequired,
  saveNewAppointment: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.shape({
        hour: PropTypes.string.isRequired,
      }).isRequired,
    ])
  ).isRequired,
};

export default NewAppointment;
