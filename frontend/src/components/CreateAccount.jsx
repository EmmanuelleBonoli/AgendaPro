import { PropTypes } from "prop-types";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function CreateAccount({ onClose }) {
  const navigate = useNavigate();
  const [motDePasseVisible, setMotDePasseVisible] = useState(false);
  const [inputLastName, setInputLastName] = useState("");
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputEnterprise, setInputEnterprise] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inscription, setInscription] = useState("");
  const { setUserConnected } = useContext(UserContext);

  const toggleMotDePasseVisibility = () => {
    setMotDePasseVisible(!motDePasseVisible);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const userSignin = {
      lastName: inputLastName,
      firstName: inputFirstName,
      email: inputEmail,
      password: inputPassword,
      image: `/images/Avatar/Avatar.png`,
      enterprise: inputEnterprise,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/signin`,
        userSignin
      );
      setUserConnected(res.data);
      const userLocal = {
        ...res.data,
        token: res.data.token,
      };
      localStorage.setItem(
        "token",
        JSON.stringify({
          ...userLocal,
        })
      );

      if (res.status === 201) {
        setInscription("Inscription réussie !");
        setTimeout(() => {
          onClose();
        }, 1000);
        navigate("/planning");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="container-inscription "
      onClick={onClose}
      role="presentation"
    >
      <div
        className="inscription-form"
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >
        <div className="header-container">
          <h1>Inscription</h1>
          <img
            src="/images/AgendaPro.png"
            alt="Logo AgendaPro"
            className="logo"
          />
          {inscription && (
            <p
              style={{
                color: "#fbb169",
                fontSize: "17px",
                fontFamily: "var(--secondary-font)",
                fontWeight: "bold",
              }}
            >
              {inscription}
            </p>
          )}
        </div>
        <form onSubmit={handleSignIn} className="login-container">
          <p>Votre nom :</p>
          <input
            type="text"
            className="pseudo"
            onInput={(event) => setInputLastName(event.target.value)}
          />
          <p>Votre prénom :</p>
          <input
            type="text"
            className="pseudo"
            onInput={(event) => setInputFirstName(event.target.value)}
          />

          <p>Entrez votre e-mail</p>
          <input
            type="email"
            className="pseudo"
            onInput={(event) => setInputEmail(event.target.value)}
          />

          <p>Choisissez votre mot de passe</p>
          <div className="mdp-container">
            <input
              type={motDePasseVisible ? "text" : "password"}
              className="motdepasse"
              onInput={(event) => setInputPassword(event.target.value)}
            />
            <img
              src={
                motDePasseVisible
                  ? "/images/Mdp_unsee.png"
                  : "/images/Mdp_see.png"
              }
              alt="eye"
              className="mdp"
              onClick={toggleMotDePasseVisibility}
              role="presentation"
            />
          </div>
          <p>Votre entreprise:</p>
          <input
            type="text"
            className="pseudo"
            // onClick={handleInputClick}
            onInput={(event) => setInputEnterprise(event.target.value)}
          />

          <div className="container-button">
            <button type="submit" className="btn-inscription">
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

CreateAccount.propTypes = {
  onClose: PropTypes.func.isRequired,
};
