<script lang="ts" setup>
import { login } from '@/services/axios/llamadasUsuarios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

if(localStorage.getItem('usuario')) window.location.href = '/'

const router = useRouter();

const email = ref('');
const contraseña = ref('');

const mensajeError = ref('')
let error: boolean = false

const handleSubmit = async (e: any) => {
    e.preventDefault();
    login(email.value, contraseña.value)
        .then(res => {
            localStorage.setItem('usuario', res.data.token);
            // router.push({name: 'home'});
            window.location.href = '/'

        })
        .catch((err) => {
            error = true
            mensajeError.value = err.response.data
            setTimeout(() => {
                error = false;
                mensajeError.value = ''
            }, 3000);

        })
}
</script>

<template>
    <div>
        <h2>Login</h2>
        <form @submit="handleSubmit">
            <input type="text" name="email" placeholder="Email" v-model="email">
            <input type="password" name="contraseña" placeholder="Contraseña" v-model="contraseña">
            <button type="submit">Enviar</button>
        </form>
        <h2 id="errorLogin" v-if="(error = true)">{{mensajeError}}</h2>
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