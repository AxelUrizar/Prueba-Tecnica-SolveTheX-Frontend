<script lang="ts" setup>
import { crearProducto, listaProductosUsuario } from '@/services/axios/llamadasProductos';
import { perfil, perfilUsuario } from '@/services/axios/llamadasUsuarios';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

if(!localStorage.getItem('usuario')) window.location.href = '/'

const route = useRoute();
const id = route.params.id

const usuario = ref()
const usuarioProductos = ref()
const productos = ref()

const nombreProducto = ref('')
const cantidadProducto = ref(1)
const precioProducto = ref(0)

const toggleAñadirProducto = ref(false)

perfilUsuario().then(res => usuario.value = res.data)
perfil(id).then(res => usuarioProductos.value = res.data);
listaProductosUsuario(id).then(res => productos.value = res.data)

const handleCantidadMas = () => {
    cantidadProducto.value++
}

const handleCantidadMenos = () => {
    if(cantidadProducto.value < 2) return
    cantidadProducto.value--
}

const handleToggleAñadirProducto = () => {
    if(toggleAñadirProducto.value){
        toggleAñadirProducto.value = false
    } else {
        toggleAñadirProducto.value = true
    }
}

const handleCrear = () => {
    crearProducto(nombreProducto.value, cantidadProducto.value, precioProducto.value).then(() => window.location.href = '/productosUsuario/' + usuarioProductos.value.id )
}

</script>

<template>
    <div v-if="(usuarioProductos || productos)">
        <h2 id="titulo">Productos de {{usuarioProductos?.nombre}}</h2>
        <div v-if="(usuarioProductos?.id === usuario?.id)">
            <div id="botonCrear"  v-if="!toggleAñadirProducto"><button @click="handleToggleAñadirProducto">+ Añadir Producto</button></div>
            <div id="cajaOpcionesProducto" v-else>
                <div id="opcionesProducto">
                    <div class="cantidad">
                        <h2>Nombre: </h2>
                        <input id="nombreInput" type="text" name="nombreProducto" placeholder="Nombre Producto" v-model="nombreProducto">
                    </div>
                    <div class="cantidad">
                        <h2>Cantidad</h2>
                        <button @click="handleCantidadMenos">-</button>
                        <h2 id="cantidadValue">{{cantidadProducto}}</h2>
                        <button @click="handleCantidadMas">+</button>
                        <h2>📦</h2>
                    </div>
                    <div class="cantidad">
                        <h2>Precio: </h2>
                        <input id="precioInput" type="number" name="precioProducto" v-model="precioProducto">
                        <h2>🪙</h2>
                    </div>
                </div>

                <div id="botonCrear"><button @click="handleCrear">Crear</button></div>
            </div>
        </div>
        <h2 v-if="(productos?.length < 1)">Este usuario no tiene ningún producto.</h2>
        <ul id="listaProductosUsuario" v-else>
            <li class="productos">
                <h2>Nombre</h2>
                <h2>Unidades</h2>
                <h2>Precio/unidad</h2>
                <h2>En venta</h2>
            </li>
            <hr />
            <RouterLink v-for="producto in productos" :to="{path: `/detallesProducto/${producto.id}`}">
                <li class="productos productosHover">
                    <h2>{{producto.nombre}}</h2>
                    <h2>{{producto.cantidad}} </h2>
                    <h2>{{producto.precio}}🪙</h2>
                    <h2 v-if="(producto.enVenta === 1)">✔️</h2>
                    <h2 v-else>❌</h2>
                </li>
            </RouterLink>
        </ul>
    </div>
</template>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
a{
    text-decoration: none;
    color: black;
}
#titulo{
    font-size: 3em;
}

#cajaOpcionesProducto{
    display: flex;
    align-items: center;
    justify-content: center;
}

#opcionesProducto{
    display: flex;
    flex-direction: row;
}

.cantidad{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    text-align: start;
    height: 30px;
    border: solid rgb(124, 114, 143) 2px;
    border-radius: 50px;
    background-color: rgb(161, 144, 188);
    padding: 5px;
    margin: 0 10px;
    width: fit-content;
}

    .cantidad button{
        border: none;
        cursor: pointer;
    }
    .cantidad h2, .cantidad button{
        margin: 0 5px;
        font-size: 1.5em;
        background-color: rgb(161, 144, 188);
        color: white;
    }

#nombreInput{
    background: none;
    border: none;
    color: white;
    width: 50%;
    /* font-weight: bolder; */
}
    #nombreInput::placeholder{
        color: rgb(220, 220, 220);
    }
    #nombreInput:focus{
        outline: none;
        border: none;
    }

#precioInput{
    background: none;
    border: none;
    color: white;
    width: 40%;
    text-align: center;
}

    #precioInput:focus{
        outline: none;
        border: none;
    }

#botonCrear button{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    text-align: start;
    height: 30px;
    border: solid rgb(124, 114, 143) 2px;
    border-radius: 50px;
    background-color: rgb(161, 144, 188);
    color: white;
    font-weight: bolder;
    font-size: 1em;
    padding: 15px;
    margin: 0 10px;
    width: fit-content;
    cursor: pointer;
}
#listaProductosUsuario{
    list-style: none;
    padding: 0;
    width: 90%;
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
#listaProductosUsuario .productos{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    transition: all ease-in-out 150ms;
}
    #listaProductosUsuario .productosHover:hover{
        background-color: rgba(206, 206, 206, 0.604);
        border-radius: 50px;
        cursor: pointer;
    }
</style>