import axios from 'axios';
import authHeader from './auth-header';

const API_URL: string = 'http://localhost:4000/productos/';

export const crearProducto = (nombre: any, cantidad: any, precio: any) => {
    return axios.post(API_URL + 'crearProducto', {nombre, cantidad, precio}, {headers: authHeader()})
};

export const listaProductos = () => {
    return axios.get(API_URL + 'listaProductos');
};

export const listaProductosEnVenta = () => {
    return axios.get(API_URL + 'listaProductosEnVenta');
};

export const listaProductosUsuario = (id_usuario: any) => {
    return axios.get(API_URL + `listaProductos/${id_usuario}`)
}

export const detallesProducto = (id: any) => {
    return axios.get(API_URL + `detallesProducto/${id}`)
}

export const modificarProducto = (id: number, data: any) => {
    return axios.put(API_URL + `modificar/${id}`, {data}, {headers: authHeader()})
}

export const comprarProducto = (id: any, cantidad: number) => {
    return axios.put(API_URL + `comprarProducto/${id}`, {cantidad}, {headers: authHeader()})
}

export const borrarProducto = (id: number) => {
    return axios.delete(API_URL + `borrarProducto/${id}`, {headers: authHeader()})
}