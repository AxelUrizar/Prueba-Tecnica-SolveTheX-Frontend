<script setup lang="ts">
import { login, signup } from '@/services/axios/llamadasUsuarios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

if(localStorage.getItem('usuario')) window.location.href = '/'

const router = useRouter()

const nombre = ref('');
const email = ref('');
const contraseña = ref('');

const handleSubmit = async (e: any) => {
    e.preventDefault()
    await signup(nombre.value, email.value, contraseña.value);
    const usuario = await login(email.value, contraseña.value)
    if(usuario){
        localStorage.setItem('usuario', usuario.data.token);
        // router.push({name: 'home'});
        window.location.href = '/'
    }
}
</script>

<template>
    <div>
        <h2>Sign Up</h2>
        <form @submit="handleSubmit">
            <input type="text" name="nombre" placeholder="Nombre" v-model="nombre">
            <input type="text" name="email" placeholder="Email" v-model="email">
            <input type="password" name="contraseña" placeholder="Contraseña" v-model="contraseña">
            <button type="submit">Enviar</button>
        </form>
        <RouterLink :to="{name: 'home'}">Volver atrás</RouterLink>
    </div>
</template>

<style>
form{
    display: flex;
    flex-direction: column;
}

    form input{
        margin: 10px 0;
        border-radius: 20px;
        padding: 8px;
    }

    form button{
        margin: 10px 0;
        width: fit-content;
        align-self: center;
        border-radius: 20px;
        padding: 6px 10px;
        cursor: pointer;
    }
</style>