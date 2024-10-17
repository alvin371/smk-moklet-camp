import { lazy } from "react";
import { RouteObject } from "react-router-dom";

// Lazy load your pages
const HomePages = lazy(() => import("../pages/Home"));
const UsersPages = lazy(() => import("../pages/Users"));
const AboutPages = lazy(() => import("../pages/About"));
const LoginPages = lazy(() => import("../pages/Auth/Login"));
const RegisterPages = lazy(() => import("../pages/Auth/Register"));

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
  {
    path: "/auth/login",
    Component: LoginPages,
  },
  {
    path: "/auth/register",
    Component: RegisterPages,
  },
];

// Define menu items based on the routes
export const menuItems = [
  { label: "Home", href: "/", isActive: false },
  { label: "Users", href: "/users", isActive: false },
  { label: "About", href: "/about", isActive: false },
];

export default routes;
