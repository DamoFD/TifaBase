import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export const get = async (url: string) => {
    const response = await apiClient.get(url);
    return response.data;
};

export const post = async (url: string, data: any) => {
    const response = await apiClient.post(url, data);
    return response.data;
}

interface authRequest {
    email: string;
    password: string;
}

export const registerUser = (data: authRequest) => post('/register', data);
export const loginUser = (data: authRequest) => post('/login', data);
export const getUser = () => get('/@me');
export const logoutUser = () => post('/logout', {});
