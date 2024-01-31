import { useState } from "react";
import Connexion from "../components/Connexion";
import CreateAccount from "../components/CreateAccount";

function Home() {
  const [createAccount, setCreateAccount] = useState(false);
  const [connexion, setConnexion] = useState(false);

  const handleCreateAccount = () => {
    setCreateAccount(!createAccount);
  };

  const handleConnexion = () => {
    setConnexion(!connexion);
  };

  return (
    <div className="home">
      {createAccount && <CreateAccount onClose={handleCreateAccount} />}
      {connexion && <Connexion onClose={handleConnexion} />}
      <div className="homePart1">
        <img
          className="logo"
          src="/images/AgendaPro.png"
          alt="logo Agenda Pro"
        />
        <h1>
          Découvrez AGENDA PRO, le site qui va vous faciliter la vie au travail
          !
        </h1>
        <img
          className="sampleSchedule"
          src="/images/capture.png"
          alt="exemple de planning"
        />
      </div>
      <div className="homePart2">
        <img
          className="captureSchedule"
          src="/images/capture2.png"
          alt="Extrait de l'application"
        />
        <h2>
          Gérer son agenda et classifier ses rdv n’ont jamais été aussi facile !
        </h2>
        <img
          className="captureSchedule"
          src="/images/capture3.png"
          alt="Extrait de l'application"
        />
        <h2>
          Retrouver vos collègues facilement pour une meilleure organisation !
        </h2>
        <div className="buttonConnexion">
          <button onClick={handleCreateAccount} type="button" className="login">
            Créer un compte
          </button>
          <button onClick={handleConnexion} type="button" className="auth">
            Connexion
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
