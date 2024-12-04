import { useLogout } from "../hooks/useUser";
import { useAuth } from '../contexts/UserContext';

const Dashboard = () => {

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

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}

export default Dashboard;
