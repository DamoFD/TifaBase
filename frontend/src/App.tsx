import AppRoutes from '@/router'
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './contexts/UserContext';

const queryClient = new QueryClient();

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </QueryClientProvider>
    )
}

export default App
