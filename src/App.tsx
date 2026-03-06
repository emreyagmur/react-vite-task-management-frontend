import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import AuthLayout from "@/components/auth/auth-layout";
import LandingPage from "@/pages/auth/landing-page";
import SignInPage from "@/pages/auth/sign-in-page";
import SignUpPage from "@/pages/auth/sign-up-page";
import ProtectedRoutes from "@/utils/protected-routes";
import { MainLayout } from "@/components/main/main-layout";
import DashboardPage from "@/pages/dashboard/dashboard-page";
import Logout from "@/pages/auth/logout-page";
import ForgetPassword from "@/pages/auth/forget-password-page";
import ResetPassword from "@/pages/auth/reset-password";
import TaskPage from "@/pages/task/task-page";
import ColumnPage from "@/pages/setting/column/column-page";
import ProjectUserPage from "@/pages/setting/user/project-user-page";

export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          {/* public routes */}
          <Route element={<AuthLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Route>

          {/* private routes */}
          <Route element={<MainLayout />}>
            <Route index path="/dashboard" element={<DashboardPage />} />
            <Route path="/task" element={<TaskPage />} />
            <Route path="/column" element={<ColumnPage />} />
            <Route path="/column/:action" element={<ColumnPage />} />
            <Route path="/column/:action/:id" element={<ColumnPage />} />
            <Route path="/user" element={<ProjectUserPage />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
