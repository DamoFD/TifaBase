import { useLogout } from "../hooks/useUser";
import Button from '../components/Button';
import { useAuth } from '../contexts/UserContext';

const Dashboard = () => {

    const mutation = useLogout();

    const { getUser, user } = useAuth();

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
            <p>hello {user?.email}</p>
            <Button text="logout" onClick={handleLogout} isLoading={mutation.isLoading} />
        </div>
    );
}

export default Dashboard;
