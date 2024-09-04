import { lazy } from "react";
import { RouteObject } from "react-router-dom";

// Lazy load your pages
const HomePages = lazy(() => import("../pages/Home"));
const UsersPages = lazy(() => import("../pages/Users"));
const AboutPages = lazy(() => import("../pages/About"));

// Define your routes
const routes: RouteObject[] = [
  {
    path: "/",
    Component: HomePages,
  },
  {
    path: "/users",
    Component: UsersPages,
  },
  {
    path: "/about",
    Component: AboutPages,
  },
];

// Define menu items based on the routes
export const menuItems = [
  { label: "Home", href: "/", isActive: false },
  { label: "Users", href: "/users", isActive: false },
  { label: "About", href: "/about", isActive: false },
];

export default routes;
