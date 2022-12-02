<script lang="ts" setup>
import { logout, perfil, perfilUsuario } from '@/services/axios/llamadasUsuarios';
import { listaProductosUsuario } from '@/services/axios/llamadasProductos';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id

const usuario = ref()
const usuarioPerfil = ref()
const objetos = ref()

perfilUsuario().then(res => usuario.value = res.data)
perfil(id).then(res => usuarioPerfil.value = res.data);
listaProductosUsuario(id).then(res => objetos.value = res.data)

const handleLogout = () => {
  logout().then(() => {
    localStorage.removeItem('usuario');
    window.location.href = '/';
  })
}

</script>

<template>
    <div>
        <div id="perfil" v-if="usuarioPerfil">
            <img src="../assets/foto-perfil.jpg" alt="foto-perfil" id="fotoPerfil">
            <div id="datosUsuario">
                <h2 id="titulo">Perfil de {{usuarioPerfil.nombre}}</h2>
                <h2>Dinero: {{usuarioPerfil.monedas}}🪙</h2>
                <h2>Productos: {{objetos?.length}} 📦</h2>
                <RouterLink :to="{path: `/productosUsuario/${usuarioPerfil.id}`}"><button>Ver los productos de {{usuarioPerfil.nombre}}</button></RouterLink>
            </div>
            <div id="botonesPerfil" v-if="(usuarioPerfil?.id === usuario?.id)">
                <button @click="handleLogout">Logout</button>
                <RouterLink :to="{path: `/editarPerfil/${usuarioPerfil?.id}`}"><button>Editar Perfil</button></RouterLink>
            </div>
        </div>
    </div>
</template>

<style>
#titulo{
    font-size: 3em;
}
#perfil{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100vw;
}

#fotoPerfil{
    border-radius: 50%;
    filter: hue-rotate(25deg);
}

#datosUsuario{
    display: flex;
    flex-direction: column;
    align-items: center;
}

#botonesPerfil{
    display: flex;
    flex-direction: column;
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

