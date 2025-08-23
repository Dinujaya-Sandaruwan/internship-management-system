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
import SupervisorEvaluation from "./pages/SupervisorPages/SupervisorEvaluation";
import SupervisorReportSubmissionPage from "./pages/SupervisorPages/SupervisorReportSubmissionPage";
import SupervisorSchedulePage from "./pages/SupervisorPages/SupervisorSchedulePage";
import SupervisorGoalsPage from "./pages/SupervisorPages/SupervisorGoalsPage";
import SupervisorUpdateProfile from "./pages/SupervisorPages/SupervisorUpdateProfile";
import SupervisorDashboardComplete from "./pages/SupervisorPages/SupervisorDashboardCompelete";
import CoordinatorLayout from "./layout/CoordinatorLayout";
import CoordinatorDashboard from "./pages/CordinatorPages/CoordinatorDashboard";
import CoordinatorMessagesPage from "./pages/CordinatorPages/CoordinatorMessagesPage";
import CoordinatorNotificationsPage from "./pages/CordinatorPages/CoordinatorNotificationsPage";
import CoordinatorMyInterns from "./pages/CordinatorPages/CoordinatorMyInterns";

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
        path: "dashboard-incomplete",
        element: <SupervisorDashboard />,
      },
      {
        path: "dashboard",
        element: <SupervisorDashboardComplete />,
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
      {
        path: "evaluations",
        element: <SupervisorEvaluation />,
      },
      {
        path: "reports",
        element: <SupervisorReportSubmissionPage />,
      },
      {
        path: "schedule",
        element: <SupervisorSchedulePage />,
      },
      {
        path: "goals",
        element: <SupervisorGoalsPage />,
      },
      {
        path: "update-profile",
        element: <SupervisorUpdateProfile />,
      },
    ],
  },
  {
    path: "/coordinator",
    element: <CoordinatorLayout />, // Pass a default value, this should be from context or state in a real app
    children: [
      {
        path: "dashboard",
        element: <CoordinatorDashboard />,
      },
      {
        path: "messages",
        element: <CoordinatorMessagesPage />,
      },
      {
        path: "notifications",
        element: <CoordinatorNotificationsPage />,
      },
      {
        path: "my-interns",
        element: <CoordinatorMyInterns />,
      },
    ],
  },
]);
