import MainLayout from "@/layouts/MainLayout";
import RootLayout from "@/layouts/RootLayout";
import Login from "@/pages/Login";
import NewFeed from "@/pages/NewFeed";
import NotificationPage from "@/pages/Notifications";
import type { RouteObject } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RedirectIfLoggedIn from "./RedirectIfLoggedIn";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <RedirectIfLoggedIn />,
        children: [{ path: "login", element: <Login /> }],
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <MainLayout />,
            children: [
              { index: true, element: <NewFeed /> }, // /
              { path: "/notifications", element: <NotificationPage /> },
            ],
          },
        ],
      },
    ],
  },
];
