<script setup lang="ts">
import { editarUsuario, perfilUsuario } from '@/services/axios/llamadasUsuarios';
import { ref } from 'vue';

if(!localStorage.getItem('usuario')) window.location.href = '/'

const usuario = ref();
const nombreUsuario = ref('')
const toggleEditarNombre = ref(false)

const handleToggleEditarNombre = () => {
    if(toggleEditarNombre.value) {
        if(nombreUsuario.value.length < 1) return toggleEditarNombre.value = false
        editarUsuario(nombreUsuario.value).then(() => perfilUsuario().then(res => usuario.value = res.data))
        nombreUsuario.value = ''
        toggleEditarNombre.value = false
    } else{
        toggleEditarNombre.value = true
    } 

}

perfilUsuario().then(res => usuario.value = res.data);
</script>

<template>
    <div>
        <h2>Editar Perfil</h2>
        <template v-if="usuario">
            <ul>
                <li v-if="!toggleEditarNombre">
                    <h2>{{usuario.nombre}}</h2>
                    <button @click="handleToggleEditarNombre">Cambiar nombre</button>
                </li>
                <li v-else>
                    <input type="text" name="nombre" placeholder="Nuevo nombre" v-model="nombreUsuario" />
                    <button @click="handleToggleEditarNombre">Aceptar cambios</button>
                </li>
            </ul>
        </template>
    </div>
</template>

<style>

ul{
    list-style: none;
    padding: 0;
}
    ul li{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
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

input{
    padding: 10px;
    border-radius: 20px;
    text-align: center;
}
</style>