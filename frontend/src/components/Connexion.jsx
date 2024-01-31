import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import UserContext from "../contexts/UserContext";

export default function Connexion({ onClose }) {
  const navigate = useNavigate();
  const [motDePasseVisible, setMotDePasseVisible] = useState(false);
  const { setUserConnected } = useContext(UserContext);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  const toggleMotDePasseVisibility = () => {
    setMotDePasseVisible(!motDePasseVisible);
  };

  const handleConnexion = async (e) => {
    e.preventDefault();
    const userlogin = {
      email: inputEmail,
      password: inputPassword,
    };

    try {
      const dataUser = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
        userlogin
      );

      setUserConnected(dataUser.data.user);
      const userLocal = {
        ...dataUser.data.user,
        token: dataUser.data.token,
      };
      localStorage.setItem(
        "token",
        JSON.stringify({
          ...userLocal,
        })
      );
      onClose();
      navigate("/planning");
    } catch (error) {
      setErrorLogin("Identifiants incorrects, veuillez réessayer.");
    }
  };

  return (
    <div className="container-connexion" onClick={onClose} role="presentation">
      <div
        className="connexion-form"
        role="presentation"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="header-container">
          <h1>Connexion</h1>
          <img
            src="/images/AgendaPro.png"
            alt="Logo Agenda Pro"
            className="logo"
          />
          {errorLogin && (
            <p
              style={{
                color: "red",
                fontSize: "17px",
                fontFamily: "var(--secondary-font)",
                fontWeight: "bold",
              }}
            >
              {errorLogin}
            </p>
          )}
        </div>
        <form onSubmit={handleConnexion} className="login-container">
          <p>Entrez votre Email</p>
          <input
            type="text"
            className="pseudo"
            onInput={(event) => setInputEmail(event.target.value)}
          />

          <p>Entrez votre mot de passe</p>
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
          <button type="submit" className="btn-connexion">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

Connexion.propTypes = {
  onClose: PropTypes.func.isRequired,
};
