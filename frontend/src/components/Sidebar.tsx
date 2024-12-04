import { Link } from 'react-router-dom';
import { GoDatabase } from 'react-icons/go';
import { BsGraphUp } from 'react-icons/bs';
import { RiToolsLine } from 'react-icons/ri';
import { FaRegUser } from 'react-icons/fa';
import { MdAdminPanelSettings, MdOutlinePowerSettingsNew } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { useLogout } from "../hooks/useUser";
import { useAuth } from '../contexts/UserContext';

const Sidebar: React.FC = () => {
    const location = useLocation();
    const mutation = useLogout();
    const { getUser } = useAuth();

    const handleLogout = () => {
        mutation.mutate(undefined, {
            onSuccess: () => {
                getUser();
            },
            onError: (error: any) => {
                console.error('Server error:', error.response?.data?.message || 'An error occurred, please try again later');
            }
        });
    }

    const isActive = (path: string) => {
        return location.pathname === path;
    }

    const linkStyles = (path: string) => {
        return isActive(path) ? 'p-2 border-gray-800 rounded-xl cursor-pointer border-2 hover:bg-gray-200' : 'p-2 border-transparent rounded-xl cursor-pointer border-2 hover:bg-gray-200';
    }

    return (
        <div className="h-full flex flex-col items-center p-4 border-r border-gray-200 justify-between text-gray-800">
            <div className="flex flex-col items-center space-y-8">
                <Link to="/" className="text-xl font-extrabold cursor-pointer">TB</Link>
                <TooltipProvider delayDuration={100}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link to="/" className={linkStyles("/")}>
                                <GoDatabase className="size-6" />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>Collections</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider delayDuration={100}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link to="/logs" className={linkStyles("/logs")}>
                                <BsGraphUp className="size-6" />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>Logs</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider delayDuration={100}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link to="/settings" className={linkStyles("/settings")}>
                                <RiToolsLine className="size-6" />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>Settings</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="p-2 cursor-pointer rounded-full bg-gray-800">
                        <FaRegUser className="size-6 text-white" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" className="ml-4">
                    <DropdownMenuItem>
                        <div className="flex items-center">
                            <MdAdminPanelSettings className="size-6" />
                            <span>Manage Admins</span>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                        <div className="flex items-center">
                            <MdOutlinePowerSettingsNew className="size-6" />
                            <span className="ml-1">Logout</span>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default Sidebar;
