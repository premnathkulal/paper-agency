import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RoutesList } from "./routes/main-route";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo");

  let isAuthenticated = false;
  if (userInfo) {
    isAuthenticated = JSON.parse(userInfo).isAuthenticated;
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(RoutesList.LOGIN);
    }
  }, [isAuthenticated, history]);

  return isAuthenticated ? <>{children}</> : null;
};

export default AuthGuard;
