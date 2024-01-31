import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";

function ProtectedRoute({ children }) {
  const { setUserConnected } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUser = async () => {
    const user = JSON.parse(localStorage.getItem("token"));
    if (!user.token) {
      return navigate("/");
    }
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/userbytoken`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setUserConnected(res.data[0]);
    return res.data[0];
  };

  useEffect(() => {
    fetchUser();
  }, [location.pathname]);
  return children;
}

export default ProtectedRoute;
