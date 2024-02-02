import { useEffect, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import UserContext from "../contexts/UserContext";

function AllCoworkers({
  setOpenAllCoworkers,
  coworkers,
  listCoworkersAttente,
}) {
  const { userConnected } = useContext(UserContext);

  const [listCoworkers, setListCoworkers] = useState([]);

  const coworkersAll = async () => {
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

  useEffect(() => {
    coworkersAll();
    coworkers();
  }, []);

  const handleDeleteCoworker = async (workerId) => {
    if (userConnected) {
      const user = JSON.parse(localStorage.getItem("token"));
      try {
        await axios.delete(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/coworkers/delete/${workerId}/${userConnected.id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        coworkers();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteCoworker2 = async (coworkerId) => {
    if (userConnected) {
      const user = JSON.parse(localStorage.getItem("token"));
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/coworkers/delete/${
            userConnected.id
          }/${coworkerId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        coworkers();
        coworkersAll();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCreateCoworker = async (workerId) => {
    if (userConnected) {
      const user = JSON.parse(localStorage.getItem("token"));
      const updatedCoworker = {
        askingCoworker: 1,
        autorisation: 0,
      };

      const newCoworker = {
        workerId: userConnected.id,
        coworkerId: workerId,
        askingCoworker: 1,
        autorisation: 0,
      };

      try {
        await axios.put(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/coworker/update/${workerId}/${userConnected.id}`,
          updatedCoworker,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/coworker/createNewCoworker`,
          newCoworker,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        coworkers();
        coworkersAll();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleAutorizeCoworker = async (coworker) => {
    let updatedCoworker = {};
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      if (coworker.autorisation === 0) {
        updatedCoworker = {
          askingCoworker: 1,
          autorisation: 1,
        };
      } else if (coworker.autorisation === 1) {
        updatedCoworker = {
          askingCoworker: 1,
          autorisation: 0,
        };
      }

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/coworker/update/${
          userConnected.id
        }/${coworker.coworkerId}`,
        updatedCoworker,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      coworkersAll();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="allCoworkers"
      onClick={() => setOpenAllCoworkers(false)}
      role="presentation"
    >
      <div
        className="modalAllCoworkers"
        role="presentation"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>Co-Workers</h1>
        <div className="allCoworkersContainer">
          <h2>Demande(s) de connection en attente : </h2>
          <div className="coworkersWaitingContainer">
            <div className="elementsWaiting">
              <p>Entreprise</p>
              <p>Valider</p>
              <p>Supprimer</p>
            </div>
            <div>
              {listCoworkersAttente.length > 0 ? (
                listCoworkersAttente.map((coworker) => (
                  <div className="coworkersWaiting" key={coworker.workerId}>
                    <p>{coworker.firstName}</p>
                    <p>{coworker.lastName}</p>
                    <p>{coworker.enterprise}</p>
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label className="inputSelect">
                      <input
                        onInput={() => handleCreateCoworker(coworker.workerId)}
                        type="checkbox"
                      />
                      <svg viewBox="0 0 64 64" height="2em" width="2em">
                        <path
                          d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                          pathLength="575.0541381835938"
                          className="path"
                        />
                      </svg>
                    </label>
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label className="inputSelect">
                      <input
                        onInput={() => handleDeleteCoworker(coworker.workerId)}
                        type="checkbox"
                      />
                      <svg viewBox="0 0 64 64" height="2em" width="2em">
                        <path
                          d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                          pathLength="575.0541381835938"
                          className="path"
                        />
                      </svg>
                    </label>
                  </div>
                ))
              ) : (
                <div className="coworkersWaiting">
                  Aucune demande en cours de co-workers.
                </div>
              )}
            </div>
          </div>

          <h2>Mes Co-Workers :</h2>
          <div className="coworkersWaitingContainer">
            <div className="elementsWaiting">
              <p>Entreprise</p>
              <p>Autorisation Accès Détaillé</p>
              <p>Supprimer</p>
            </div>
            <div className="coworkersAllTest">
              <div>
                {listCoworkers.length > 0 ? (
                  listCoworkers.map((coworker) => (
                    <div className="coworkersWaiting" key={coworker.coworkerId}>
                      <NavLink to={`/planning/${coworker.coworkerId}`}>
                        <p>
                          {coworker.firstName} {coworker.lastName}
                        </p>
                      </NavLink>
                      <p>{coworker.enterprise}</p>
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label className="inputSelect">
                        <input
                          checked={coworker.autorisation === 1}
                          onChange={() => handleAutorizeCoworker(coworker)}
                          type="checkbox"
                        />
                        <svg viewBox="0 0 64 64" height="2em" width="2em">
                          <path
                            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                            pathLength="575.0541381835938"
                            className="path"
                          />
                        </svg>
                      </label>
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label className="inputSelect">
                        <input
                          onInput={() =>
                            handleDeleteCoworker2(coworker.coworkerId)
                          }
                          type="checkbox"
                        />
                        <svg viewBox="0 0 64 64" height="2em" width="2em">
                          <path
                            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                            pathLength="575.0541381835938"
                            className="path"
                          />
                        </svg>
                      </label>
                    </div>
                  ))
                ) : (
                  <div className="coworkersWaiting">
                    Aucun co-worker ajouté.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AllCoworkers.propTypes = {
  setOpenAllCoworkers: PropTypes.func.isRequired,
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
export default AllCoworkers;
