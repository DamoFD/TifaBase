import { useQuery, useMutation } from 'react-query';
import { getUser, loginUser, registerUser, logoutUser } from '../apiService';

export const useUser = () => {
    // Fetch the current user
    return useQuery('user', getUser, {
        retry: false,
        onSuccess: (data) => {
            console.log('User:', data);
        },
        onError: (error: any) => {
            console.error('Server error:', error.response?.data?.message || 'An error occurred, please try again later');
        }
    });
};

export const useRegister = () => {
    // Register mutation
    return useMutation(registerUser, {
        onSuccess: (data) => {
            console.log('Registration successful:', data);
        },
        onError: (error: any) => {
            console.error('Server error:', error.response?.data?.message || 'An error occurred, please try again later');
        },
    });
};

export const useLogin = () => {
    // Login mutation
    return useMutation(loginUser, {
        onSuccess: (data) => {
            console.log('Login successful:', data);
        },
        onError: (error: any) => {
            console.error('Server error:', error.response?.data?.message || 'An error occurred, please try again later');
        },
    });
};

export const useLogout = () => {
    // Logout mutation
    return useMutation(logoutUser, {
        onSuccess: (data) => {
            console.log('Logout successful:', data);
        },
        onError: (error: any) => {
            console.error('Server error:', error.response?.data?.message || 'An error occurred, please try again later');
        },
    })
}
