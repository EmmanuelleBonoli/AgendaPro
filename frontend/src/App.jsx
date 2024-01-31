import { useState, useMemo, useEffect } from "react";
import { Outlet } from "react-router-dom";
import UserContext from "./contexts/UserContext";

function App() {
  const [userConnected, setUserConnected] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      setUserConnected(JSON.parse(user));
      setIsAdmin(JSON.parse(user).admin === 1);
    }
  }, []);

  return (
    <UserContext.Provider
      value={useMemo(
        () => ({ userConnected, setUserConnected, isAdmin, setIsAdmin }),
        [userConnected, setUserConnected, isAdmin, setIsAdmin]
      )}
    >
      <Outlet />
    </UserContext.Provider>
  );
}

export default App;
