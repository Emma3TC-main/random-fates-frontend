import { Routes, Route, Navigate } from "react-router-dom";

import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import AdminGames from "../pages/AdminGames";
import AdminUsers from "../pages/AdminUsers";

import AdminProtectedRoute from "../guards/AdminProtectedRoute";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />

      <Route
        path="dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="games"
        element={
          <AdminProtectedRoute>
            <AdminGames />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="users"
        element={
          <AdminProtectedRoute>
            <AdminUsers />
          </AdminProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/admin/dashboard" />} />
    </Routes>
  );
}

export default AdminRoutes;
