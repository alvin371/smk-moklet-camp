import { QueryCache } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const handleUserNotLoginQuery = () => {
  return new QueryCache({
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          handleRedirectNotLogin();
        }
      } else if (err instanceof Response) {
        if (err.status === 401) {
          handleRedirectNotLogin();
        }
      }
    },
  });
};

export const handleRedirectNotLogin = () => {
  localStorage.removeItem("token");
  window.location.href = "/auth/login";
};
