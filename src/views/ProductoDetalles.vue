<script lang="ts" setup>
import { comprarProducto, detallesProducto } from '@/services/axios/llamadasProductos';
import { perfil } from '@/services/axios/llamadasUsuarios';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const producto = ref();
const vendedor = ref();
const cantidad = ref(0);


const id = route.params.id;
detallesProducto(id).then(res => {
    producto.value = res.data
    perfil(res.data.id_usuario).then(res => vendedor.value = res.data)
})

const handleCantidadMas = () => {
    if(cantidad.value >= producto.value.cantidad) return cantidad.value = producto.value.cantidad
    cantidad.value++
}

const handleCantidadMenos = () => {
    if(cantidad.value < 1) return
    cantidad.value--
}

const handleComprar = () => {
    console.log(cantidad.value)
    if(cantidad.value > 1) return
    comprarProducto(id, cantidad.value).then(() => window.location.href = '/')
}

</script>

<template>
    <div v-if="(producto || vendedor)">
        <div id="cajaDetalles">
            <img id='imagenProducto' src="../assets/imagen-producto.png" alt="imagen-producto">
            <ul id="listaEspecificaciones">
                <li>
                    <h2>Producto: {{producto.nombre}}</h2>
                </li>
                <li>
                    <h2>Unidades: {{producto.cantidad}}</h2>
                </li>
                <li>
                    <h2>Precio/unidad: {{producto.precio}}🪙</h2>
                </li>
                <li>
                    <h2>Vendedor: <RouterLink :to="{path: `/perfil/${vendedor?.id}`}">{{vendedor?.nombre}}</RouterLink></h2>
                    <p>(Click para entrar a su perfil)</p>
                </li>
                <li id="cajaCompra">
                    <div id="cantidad">
                        <button @click="handleCantidadMenos">-</button>
                        <h2 id="cantidadValue">{{cantidad}}</h2>
                        <button @click="handleCantidadMas">+</button>
                    </div>
                    <button id="comprar" @click="handleComprar">Comprar</button>
                </li>
            </ul>
        </div>

    </div>
</template>

<style>
a{
    text-decoration: none;
    color: black;
}

li{
    display: flex;
    align-items: baseline;
}

li p{
    margin-left: 10px;
}
#cajaDetalles{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
}

#imagenProducto{
    width: 50%;
}

#listaEspecificaciones{
    width: 50%;
    list-style: none;
    padding: 0;
}

#cajaCompra{
    display: flex;
    align-items: center;
}

#cantidad{
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid rgb(124, 114, 143) 2px;
    border-radius: 50px;
    background-color: rgb(161, 144, 188);
    padding: 5px;
}

    #cantidad button{
        border: none;
        cursor: pointer;
    }
    #cantidad h2, #cantidad button{
        margin: 0 5px;
        font-size: 1.5em;
        background-color: rgb(161, 144, 188);
        color: white;
    }
#comprar{
    margin-left: 20px;
}
    button{
        border-radius: 20px;
        border: solid 2px rgb(124, 114, 143);
        padding: 8px 10px;
        margin: 10px 0;
        cursor: pointer;
        background-color: rgb(161, 144, 188);
        color: white;
        font-weight: bolder;
        transition: all ease-in-out 200ms;
    }

    button:hover{
        color: rgb(161, 144, 188);
        background-color: white;
    }  
</style>