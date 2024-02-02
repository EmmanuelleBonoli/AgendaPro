import { useState, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import UserContext from "../contexts/UserContext";

function NewCoworker({ setOpenNewCoworker }) {
  const { userConnected } = useContext(UserContext);

  const [inputName, setInputName] = useState("");
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  const handleNewCoworker = async (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/checkExistence`,
        {
          params: {
            inputName,
            inputFirstName,
            inputEmail,
          },
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const newCoworker = {
        workerId: userConnected.id,
        coworkerId: res.data.user[0].id,
        askingCoworker: 0,
        autorisation: 0,
      };

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/coworker/createNewCoworker`,
        newCoworker,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setOpenNewCoworker(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      onClick={() => setOpenNewCoworker(false)}
      role="presentation"
      className="newCoworker"
    >
      <form
        onSubmit={handleNewCoworker}
        role="presentation"
        onClick={(e) => e.stopPropagation()}
        className="modalNewCoworker"
      >
        <h1>Ajout de Co-Workers</h1>
        <div className="inputContainer">
          <input
            onInput={(event) => setInputName(event.target.value)}
            placeholder="Nom"
          />
          <input
            onInput={(event) => setInputFirstName(event.target.value)}
            placeholder="Prénom"
          />
          <input
            onInput={(event) => setInputEmail(event.target.value)}
            placeholder="Email"
          />
        </div>
        <button type="submit">Envoyer une demande</button>
      </form>
    </div>
  );
}

NewCoworker.propTypes = {
  setOpenNewCoworker: PropTypes.func.isRequired,
};

export default NewCoworker;
