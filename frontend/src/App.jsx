import { useState, useMemo, useEffect } from "react";
import { Outlet } from "react-router-dom";
import UserContext from "./contexts/UserContext";

function App() {
  const [userConnected, setUserConnected] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      setUserConnected(JSON.parse(user));
    }
  }, []);

  return (
    <UserContext.Provider
      value={useMemo(
        () => ({ userConnected, setUserConnected }),
        [userConnected, setUserConnected]
      )}
    >
      <Outlet />
    </UserContext.Provider>
  );
}

export default App;
