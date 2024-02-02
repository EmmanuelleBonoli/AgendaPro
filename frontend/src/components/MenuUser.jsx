import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import UserContext from "../contexts/UserContext";

function MenuUser({
  setOpenNewCoworker,
  setOpenAllCoworkers,
  coworkers,
  listCoworkersAttente,
}) {
  const location = useLocation();
  const { userConnected, setUserConnected } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/planning") {
      coworkers();
    }
  }, []);

  const handlelogout = () => {
    setUserConnected({});
    localStorage.removeItem("token");
    navigate("/");
  };
  if (location.pathname === "/planning") {
    return (
      <div className="menuUser">
        <div className="menu">
          <h1>{userConnected.firstName}</h1>
          <div className="detailsCoworker">
            <div className="notifContainer">
              <h2
                className="buttonCoworker"
                role="presentation"
                onClick={() => setOpenAllCoworkers(true)}
              >
                Co-Workers
              </h2>
              {listCoworkersAttente.length > 0 ? (
                <p className="notif">{listCoworkersAttente.length}</p>
              ) : (
                ""
              )}
            </div>
            <p
              className="buttonCoworker"
              role="presentation"
              onClick={() => setOpenNewCoworker(true)}
            >
              Ajouter des Co-Workers
            </p>
            <div className="logoutContainer">
              <button onClick={handlelogout} type="button" className="logout">
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // if (location.pathname !== "/planning") {
  //   <div className="menuUser">
  //     <div className="menu">
  //       <h1>Agenda de : {userConnected.firstName}</h1>
  //       <div className="detailsCoworker">
  //         <div className="logoutContainer">
  //           <button type="button" className="logout">
  //             Retour à mon agenda
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>;
  // }
}

MenuUser.propTypes = {
  coworkers: PropTypes.func.isRequired,
  setOpenNewCoworker: PropTypes.func.isRequired,
  setOpenAllCoworkers: PropTypes.func.isRequired,
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

export default MenuUser;
