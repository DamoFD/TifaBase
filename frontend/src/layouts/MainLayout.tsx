import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
    return (
        <div className="h-screen w-full bg-white flex">
            <Sidebar />
            <Outlet />
        </div>
    );
}

export default MainLayout;
