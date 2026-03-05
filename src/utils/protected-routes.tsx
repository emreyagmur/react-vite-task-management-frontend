import { authActions } from "@/store/auth/auth";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const publicRoutes = [
  "/",
  "/sign-in",
  "/sign-up",
  "/forget-password",
  "/reset-password",
  "/reset-password/:token",
];

const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    const isPublicRoute = publicRoutes.includes(location.pathname);

    if (!token && !isPublicRoute) {
      dispatch(authActions.logoutStore());
      navigate("/", { replace: true });
    }

    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime && !isPublicRoute) {
        delete axios.defaults.headers.common.Authorization;
        localStorage.removeItem("accessToken");
        dispatch(authActions.logoutStore());
        navigate("/", { replace: true });
      }

      if (decodedToken.exp > currentTime && isPublicRoute) {
        navigate("/dashboard", { replace: true });
      }

      if (decodedToken.exp > currentTime) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    }
  }, [token, navigate]);

  return <Outlet />;
};

export default ProtectedRoutes;
