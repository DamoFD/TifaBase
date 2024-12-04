import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import AdminLogin from "@/pages/AdminLogin";
import AdminRegister from "@/pages/AdminRegister";
import Collections from "@/pages/Collections";
import Logs from "@/pages/Logs";
import Settings from "@/pages/Settings";
import { useAuth } from "@/contexts/UserContext";
import MainLayout from "@/layouts/MainLayout";

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
                <Route path="/" element={<ProtectedRoute element={<MainLayout />} />}>
                    <Route path="/" element={<Collections />} />
                    <Route path="/logs" element={<Logs />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>
                <Route path="/login" element={<GuestRoute element={<AdminLogin />} />} />
                <Route path="/register" element={<GuestRoute element={<AdminRegister />} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
