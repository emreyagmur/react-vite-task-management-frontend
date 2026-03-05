import React from "react";
import { Loader } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "@/store/auth/auth";
import axios from "axios";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    delete axios.defaults.headers.common.Authorization;
    localStorage.removeItem("accessToken");
    dispatch(authActions.logoutStore());
    navigate("/", { replace: true });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Loader className="h-4 w-4 animate-spin" />
    </div>
  );
};

export default Logout;
