import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import AdminLogin from "@/pages/AdminLogin";
import AdminRegister from "@/pages/AdminRegister";
import Dashboard from "@/pages/Dashboard";
import { useAuth } from "@/contexts/UserContext";

interface RouteProps {
    element: JSX.Element;
}

const ProtectedRoute: React.FC<RouteProps> = ({ element }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return element;
};

const GuestRoute: React.FC<RouteProps> = ({ element }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (user) {
        return <Navigate to="/" />;
    }

    return element;
}

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
                <Route path="/login" element={<GuestRoute element={<AdminLogin />} />} />
                <Route path="/register" element={<GuestRoute element={<AdminRegister />} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
