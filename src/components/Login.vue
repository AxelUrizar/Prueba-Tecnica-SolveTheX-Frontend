<script lang="ts" setup>
import { login } from '@/services/axios/llamadasUsuarios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const contraseña = ref('');

const handleSubmit = async (e: any) => {
    e.preventDefault();
    const usuario = await login(email.value, contraseña.value)
    if(usuario){
        localStorage.setItem('usuario', usuario.data.token);
        router.push({name: 'home'});
    }
}
</script>

<template>
    <h2>Login</h2>
    <form @submit="handleSubmit">
        <input type="text" name="email" placeholder="Email" v-model="email">
        <input type="password" name="contraseña" placeholder="Contraseña" v-model="contraseña">
        <button type="submit">Enviar</button>
    </form>
    <RouterLink :to="{name: 'home'}">Volver atrás</RouterLink>
</template>