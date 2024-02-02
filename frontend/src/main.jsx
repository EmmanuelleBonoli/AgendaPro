import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./services/ProtectedRoute";
import App from "./App";
import "./styles/index.scss";
import SchedulePage from "./pages/SchedulePage";
import SchedulePageCoworker, {
  loadScheduleCoworker,
} from "./pages/SchedulePageCoworker";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    id: "app",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/planning",
        element: (
          <ProtectedRoute>
            <SchedulePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/planning/:id",
        element: (
          <ProtectedRoute>
            <SchedulePageCoworker />
          </ProtectedRoute>
        ),
        loader: loadScheduleCoworker,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
