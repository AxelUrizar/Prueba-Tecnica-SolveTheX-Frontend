import axios from 'axios';
import authHeader from './auth-header';

const API_URL: string = 'http://localhost:4000/productos/';

export const crearProducto = (nombre: string, cantidad: number, precio: number) => {
    return axios.post(API_URL + 'crearProducto', {nombre, cantidad, precio})
};

export const listaProductos = () => {
    return axios.get(API_URL + 'listaProductos');
};

export const listaProductosUsuario = (id_usuario: number) => {
    return axios.get(API_URL + `listaProductos/${id_usuario}`)
}

export const modificarProducto = (id: number, data: any) => {
    return axios.put(API_URL + `modificar/${id}`, {data}, {headers: authHeader()})
}

export const comprarProducto = (id: number, cantidad: number) => {
    return axios.put(API_URL + `comprarProducto/${id}`, {cantidad}, {headers: authHeader()})
}

export const borrarProducto = (id: number) => {
    return axios.delete(API_URL + `borrarProducto/${id}`, {headers: authHeader()})
}