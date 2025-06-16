import { createBrowserRouter } from "react-router-dom";
import AuthGuard from "../AuthGuard";
import App from "../App";
import Login from "../pages/login-page/Login";
import JobOrderForm from "../pages/job-order-form/JobOrderForm";
import ReleaseOrder from "../pages/release-order/ReleaseOrder";

export enum RoutesList {
  HOME = "/",
  RELEASE_ORDER = "/release-order",
  JOB_ORDER = "/job-order",
  NOT_FOUND = "*",
  LOGIN = "/login",
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: RoutesList.HOME,
        element: (
          <AuthGuard>
            <ReleaseOrder />
          </AuthGuard>
        ),
      },
      {
        path: RoutesList.RELEASE_ORDER,
        element: (
          <AuthGuard>
            <ReleaseOrder />
          </AuthGuard>
        ),
      },
      {
        path: RoutesList.JOB_ORDER,
        element: (
          <AuthGuard>
            <JobOrderForm />
          </AuthGuard>
        ),
      },
      {
        path: RoutesList.LOGIN,
        element: <Login />,
      },
    ],
  },
]);

export default appRouter;
