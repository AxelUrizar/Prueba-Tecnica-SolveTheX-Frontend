<script lang="ts" setup>
import { detallesProducto } from '@/services/axios/llamadasProductos';
import { perfil } from '@/services/axios/llamadasUsuarios';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const producto = ref();
const vendedor = ref();

const id = route.params.id;
detallesProducto(id).then(res => {
    producto.value = res.data
    perfil(res.data.id_usuario).then(res => vendedor.value = res.data)
})

// perfil(producto.value.id_usuario).then(res => vendedor.value = res.data)

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
</style>