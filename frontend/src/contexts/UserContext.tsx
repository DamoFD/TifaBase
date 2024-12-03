import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    getUser: () => Promise<void>; // Fetch user manually
    isLoading: boolean;
    isError: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    const getUser = async () => {
        setIsLoading(true); // Start loading
        setIsError(false); // Reset error state

        try {
            const response = await axios.get('http://localhost/api/v1/@me', {
                withCredentials: true, // Include cookies for authentication
            });
            setUser(response.data.user); // Update user state on success
        } catch (error) {
            console.error('Error fetching user:', error);
            setUser(null); // Clear user on failure
            setIsError(true); // Mark as error
        } finally {
            setIsLoading(false); // Always stop loading
        }
    };

    // Fetch user data on mount
    useEffect(() => {
        getUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, getUser, isLoading, isError }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
