import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SupervisorDashboard from "./pages/SupervisorPages/SupervisorDashboard";
import SupervisorLayout from "./layout/SupervisorLayout";
import InternLayout from "./layout/InternLayout";
import InternDashboard from "./pages/InternPages/InternDashboard";
import MessagePage from "./pages/InternPages/MessagePage";
import NotificationsPage from "./pages/InternPages/NotificationsPage";
import GoalsPage from "./pages/InternPages/GoalsPage";
import EvaluationPage from "./pages/InternPages/EvaluationPage";
import ProgressPage from "./pages/InternPages/ProgressPage";
import UpdateDataPage from "./pages/InternPages/UpdateDataPage";
import SupervisorRequestsPage from "./pages/InternPages/SupervisorRequestsPage";
import "./scss/style.scss";
import SupervisorMessagesPage from "./pages/SupervisorPages/SupervisorMessagesPage";
import SupervisorNotificationsPage from "./pages/SupervisorPages/SupervisorNotificationsPage";
import MyInterns from "./pages/SupervisorPages/SupervisorInterns";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/intern",
    element: <InternLayout />,
    children: [
      {
        path: "dashboard",
        element: <InternDashboard />,
      },
      {
        path: "messages",
        element: <MessagePage />,
      },
      {
        path: "notifications",
        element: <NotificationsPage />,
      },
      {
        path: "goals",
        element: <GoalsPage />,
      },
      {
        path: "evaluation",
        element: <EvaluationPage />,
      },
      {
        path: "progress",
        element: <ProgressPage />,
      },
      {
        path: "update-data",
        element: <UpdateDataPage />,
      },
      {
        path: "supervisor-requests",
        element: <SupervisorRequestsPage />,
      },
    ],
  },
  {
    path: "/supervisor",
    element: <SupervisorLayout />, // Pass a default value, this should be from context or state in a real app
    children: [
      {
        path: "dashboard",
        element: <SupervisorDashboard />,
      },
      {
        path: "messages",
        element: <SupervisorMessagesPage />,
      },
      {
        path: "notifications",
        element: <SupervisorNotificationsPage />,
      },
      {
        path: "interns",
        element: <MyInterns />,
      },
    ],
  },
]);
