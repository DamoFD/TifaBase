import { BrowserRouter, Route, Routes } from "react-router-dom"
import AdminLogin from "@/pages/AdminLogin";

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AdminLogin />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
