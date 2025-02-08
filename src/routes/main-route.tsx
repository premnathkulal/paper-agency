import { createBrowserRouter } from "react-router-dom";
import AuthGuard from "../AuthGuard";
import App from "../App";

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
            <div>Hello</div>
          </AuthGuard>
        ),
      },
    ],
  },
]);

export default appRouter;
