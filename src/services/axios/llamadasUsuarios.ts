import axios from 'axios';
import authHeader from './auth-header';

const API_URL: string = 'https://localhost:4000/';

export const signup = (nombre: string, email: string, contraseña: string) => {
    return axios.post(API_URL + 'signUp', {nombre, email, contraseña});
};

export const login = (email: string, contraseña: string) => {
    return axios.post(API_URL + 'login', {email, contraseña});
};

export const logout = () => {
    return axios.delete(API_URL + 'logout', {headers: authHeader()});
};

export const perfil = (id: string) => {
    return axios.get(API_URL + `perfil/${id}`);
};

export const editarUsuario = (data: any) => {
    return axios.put(API_URL + 'editarUsuario', {data}, {headers: authHeader()});
};

export const borrarUsuario = () => {
    return axios.delete(API_URL + 'borrarUsuario', {headers: authHeader()});
};
