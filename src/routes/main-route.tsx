import { createBrowserRouter } from "react-router-dom";
import AuthGuard from "../AuthGuard";
import App from "../App";
import ReleaseOrder from "../pages/release-order/ReleaseOrder";

export enum RoutesList {
  HOME = "/",
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
    ],
  },
]);

export default appRouter;
