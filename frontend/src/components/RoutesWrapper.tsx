import { Navigate, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard";
import PublicDashboard from "../pages/PublicDashboard";

export const RoutesWrapper: React.FC = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (token && location.pathname === "/") {
            navigate("/dashboard");
        }
    }, [token, navigate, location.pathname]);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route
                path="/dashboard"
                element={<PrivateRoute><Dashboard /></PrivateRoute>}
            />
            <Route path="/share/:shareId" element={<PublicDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};
