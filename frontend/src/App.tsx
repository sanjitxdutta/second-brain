import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignupPage from "./pages/Signup";
import SigninPage from "./pages/Signin";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import { StoreProvider } from "./context/StoreContext";
import PublicDashboard from "./pages/PublicDashboard";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <StoreProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/share/:shareId" element={<PublicDashboard />} />
            <Route path="/" element={<Navigate to="/signin" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </AuthProvider>
  );
};

export default App;
