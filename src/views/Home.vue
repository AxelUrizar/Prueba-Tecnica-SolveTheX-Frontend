<script setup lang="ts">
import { listaProductosEnVenta } from '@/services/axios/llamadasProductos';
import { perfilUsuario } from '@/services/axios/llamadasUsuarios';
import { ref } from 'vue';

const productos = ref()
const usuario = ref()

listaProductosEnVenta().then(res => productos.value = res.data)
perfilUsuario().then(res => usuario.value = res.data)
</script>

<template>
    <div id="home" v-if="productos">
        <h2 class="titulo">Productos en venta</h2>
        <p>(No se muestran tus productos en venta)</p>
        <h2 v-if="(productos?.length < 1)">Este usuario no tiene ningún producto.</h2>
        <div id="cajaListaProductos" v-else>
            <ul id="listaProductos" >
                <li class="productos">
                    <h2>Nombre</h2>
                    <h2>Unidades</h2>
                    <h2>Precio/unidad</h2>
                </li>
                <hr />
                <RouterLink v-for="producto in productos" :to="{path: `/detallesProducto/${producto.id}`}">
                    <li v-if="(producto.id_usuario !== usuario?.id)" class="productos productosHover">
                        <h2>{{producto.nombre}}</h2>
                        <h2>{{producto.cantidad}} </h2>
                        <h2>{{producto.precio}}🪙</h2>
                    </li>
                </RouterLink>
        </ul>
        </div>
    </div>
</template>

<style>
ul{
    list-style: none;
    padding: 0;
}

a{
    text-decoration: none;
}

li{
    color: black;
}

.titulo{
    font-size: 3em;
}

#cajaListaProductos{
    width: 90%;
}
#listaProductos{
    list-style: none;
    padding: 0;
    width: 100%;
}
    #listaProductos .productos{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        transition: all ease-in-out 150ms;
    }

    #listaProductos .productosHover:hover{
        background-color: rgba(206, 206, 206, 0.604);
        border-radius: 50px;
        cursor: pointer;
    }
        #listaProductos li h2{
            width: calc(100% / 3);
            text-align: center;
        }
</style>