import { Link } from 'react-router-dom';
import { GoDatabase } from 'react-icons/go';
import { BsGraphUp } from 'react-icons/bs';
import { RiToolsLine } from 'react-icons/ri';
import { FaRegUser } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    }

    const linkStyles = (path: string) => {
        return isActive(path) ? 'p-2 border-gray-800 rounded-xl cursor-pointer border-2' : 'p-2 border-transparent rounded-xl cursor-pointer border-2';
    }

    return (
        <div className="h-full flex flex-col items-center p-4 border-r border-gray-200 justify-between text-gray-800">
            <div className="flex flex-col items-center space-y-8">
                <Link to="/" className="text-xl font-extrabold cursor-pointer">TB</Link>
                <Link to="/" className={linkStyles("/")}>
                    <GoDatabase className="size-6" />
                </Link>
                <Link to="/logs" className={linkStyles("/logs")}>
                    <BsGraphUp className="size-6" />
                </Link>
                <Link to="/settings" className={linkStyles("/settings")}>
                    <RiToolsLine className="size-6" />
                </Link>
            </div>
            <div className="p-2 cursor-pointer rounded-full bg-gray-800">
                <FaRegUser className="size-6 text-white" />
            </div>
        </div>
    );
}

export default Sidebar;
