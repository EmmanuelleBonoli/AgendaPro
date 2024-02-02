// import { useEffect } from "react";
import axios from "axios";
// import MenuUser from "../components/MenuUser";
// import { useLoaderData } from "react-router-dom";

function SchedulePageCoworker() {
  //   const scheduleCoworker = useLoaderData();

  //   useEffect(() => {
  //     console.log(scheduleCoworker);
  //   }, []);

  return (
    <div>
      Schedule Coworker
      {/* <MenuUser /> */}
    </div>
  );
}

export const loadScheduleCoworker = async ({ params }) => {
  const user = JSON.parse(localStorage.getItem("token"));
  try {
    const scheduleCoworker = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/appointment/Allappointments/${
        params.id
      }`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return scheduleCoworker.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export default SchedulePageCoworker;
