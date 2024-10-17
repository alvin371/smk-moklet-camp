import { useEffect } from "react";
import { Suspense } from "react";
import {
  BrowserRouter as Router,
  useRoutes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import routes from "./routes";
import { SuspenseLoading } from "./components";

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current URL path

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Define the paths that should be excluded from redirection
    const excludedPaths = ["/auth/login", "/auth/register"];

    // If token is missing and the current path is not excluded, redirect to login
    if (!token && !excludedPaths.includes(location.pathname)) {
      navigate("/auth/login");
    }
  }, [navigate, location.pathname]);

  const routing = useRoutes(routes);

  return routing;
}

function App() {
  return (
    <Router>
      <Suspense fallback={<SuspenseLoading />}>
        <AppRoutes />
      </Suspense>
    </Router>
  );
}

export default App;
