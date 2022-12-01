import axios from 'axios';
import authHeader from './auth-header';

const API_URL: string = 'http://localhost:4000/usuarios/';

export const signup = (nombre: any, email: any, contraseña: any) => {
    return axios.post(API_URL + 'signUp', {nombre, email, contraseña});
};

export const login = (email: any, contraseña: any) => {
    return axios.post(API_URL + 'login', {email, contraseña});
};

export const logout = () => {
    return axios.delete(API_URL + 'logout', {headers: authHeader()});
};

export const perfil = (id: any) => {
    return axios.get(API_URL + `perfil/${id}`);
};

export const editarUsuario = (data: any) => {
    return axios.put(API_URL + 'editarUsuario', {data}, {headers: authHeader()});
};

export const borrarUsuario = () => {
    return axios.delete(API_URL + 'borrarUsuario', {headers: authHeader()});
};
