import { Outlet } from "react-router-dom";

import { AuthNavbar } from "@/components/auth/auth-navbar";

const AuthLayout = () => {
  return (
    <>
      <AuthNavbar />
      <div className="flex flex-col h-screen mx-auto">
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
