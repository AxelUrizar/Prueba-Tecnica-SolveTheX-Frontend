<script lang="ts" setup>
import { listaProductosUsuario } from '@/services/axios/llamadasProductos';
import { perfil } from '@/services/axios/llamadasUsuarios';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

if(!localStorage.getItem('usuario')) window.location.href = '/'

const route = useRoute();
const id = route.params.id

const usuario = ref()
const productos = ref()
perfil(id).then(res => usuario.value = res.data);
listaProductosUsuario(id).then(res => productos.value = res.data)

</script>

<template>
    <div v-if="(usuario || productos)">
        <h2>Productos de {{usuario?.nombre}}</h2>
        <h2 v-if="(productos?.length < 1)">Este usuario no tiene ningún producto.</h2>
        <ul id="listaProductosUsuario" v-else>
            <li>
                <h2>Nombre</h2>
                <h2>Unidades</h2>
                <h2>Precio/unidad</h2>
                <h2>En venta</h2>
            </li>
            <hr />
            <li v-for="producto in productos">
                <h2>{{producto.nombre}}</h2>
                <h2>{{producto.cantidad}} </h2>
                <h2>{{producto.precio}}🪙</h2>
                <h2 v-if="(producto.enVenta === 1)">✔️</h2>
                <h2 v-else>❌</h2>
            </li>
        </ul>
    </div>
</template>

<style>
#listaProductosUsuario{
    list-style: none;
    padding: 0;
    width: 100%;
}
    #listaProductosUsuario li{
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 100%;
    }
        #listaProductosUsuario li h2{
            width: calc(100% / 3);
            text-align: center;
        }

hr{
    margin: 0 30px;
}
</style>