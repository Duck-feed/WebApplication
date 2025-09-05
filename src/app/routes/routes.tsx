// src/routes.tsx
import type { RouteObject } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import MainLayout from "@/layouts/MainLayout";
import NewFeed from "@/pages/NewFeed";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <NewFeed /> },
        ],
      },
    ],
  },
];
