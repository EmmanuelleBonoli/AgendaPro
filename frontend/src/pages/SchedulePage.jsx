import { useState, useContext } from "react";
import axios from "axios";
import Header from "../components/Header";
import Schedule from "../components/Schedule";
import MenuUser from "../components/MenuUser";
import UserContext from "../contexts/UserContext";

function SchedulePage() {
  const { userConnected } = useContext(UserContext);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [dateOfTheDay, setDateOfTheDay] = useState(new Date());
  const [openNewCoworker, setOpenNewCoworker] = useState(false);
  const [openAllCoworkers, setOpenAllCoworkers] = useState(false);
  const [listCoworkersAttente, setListCoworkersAttente] = useState([]);

  const coworkers = async () => {
    if (userConnected) {
      const user = JSON.parse(localStorage.getItem("token"));
      try {
        const dataCoworkers = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/coworkers/listAttente/${
            userConnected.id
          }`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setListCoworkersAttente(dataCoworkers.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (userConnected) {
    return (
      <div className="schedulePage">
        <div className="schedulePagePart1">
          <Header
            currentWeek={currentWeek}
            dateOfTheDay={dateOfTheDay}
            setDateOfTheDay={setDateOfTheDay}
          />
          <Schedule
            setCurrentWeek={setCurrentWeek}
            dateOfTheDay={dateOfTheDay}
            setOpenNewCoworker={setOpenNewCoworker}
            setOpenAllCoworkers={setOpenAllCoworkers}
            openAllCoworkers={openAllCoworkers}
            openNewCoworker={openNewCoworker}
            coworkers={coworkers}
            listCoworkersAttente={listCoworkersAttente}
          />
        </div>
        <MenuUser
          listCoworkersAttente={listCoworkersAttente}
          coworkers={coworkers}
          setOpenNewCoworker={setOpenNewCoworker}
          setOpenAllCoworkers={setOpenAllCoworkers}
        />
      </div>
    );
  }
}

export default SchedulePage;
