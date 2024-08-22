import { lazy } from "react";
import { RouteObject } from "react-router-dom";

// Lazy load your pages
const HomePages = lazy(() => import("../pages/Home"));

// Define your routes
const routes: RouteObject[] = [
  {
    path: "/",
    Component: HomePages,
  },
];

export default routes;
