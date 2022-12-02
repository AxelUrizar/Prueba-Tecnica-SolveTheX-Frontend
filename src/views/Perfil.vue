<script lang="ts" setup>
import { perfil } from '@/services/axios/llamadasUsuarios';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id
const usuario = ref()
const objetos = ref()

perfil(id).then(res => usuario.value = res.data);


</script>

<template>
    <div v-if="usuario">
        <h2>Perfil de {{usuario.nombre}}</h2>
        <h3>Dinero: {{usuario.monedas}}🪙</h3>
    </div>
</template>

