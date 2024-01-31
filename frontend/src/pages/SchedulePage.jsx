import { useState, useContext } from "react";
import Header from "../components/Header";
import Schedule from "../components/Schedule";
import MenuUser from "../components/MenuUser";
import UserContext from "../contexts/UserContext";

function SchedulePage() {
  const { userConnected } = useContext(UserContext);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [dateOfTheDay, setDateOfTheDay] = useState(new Date());

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
          />
        </div>
        <MenuUser />
      </div>
    );
  }
}

export default SchedulePage;
