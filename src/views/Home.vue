<script setup lang="ts">

</script>

<template>
    <h2>Bienvenido</h2>
    <button>
        <RouterLink :to="{name: 'signup'}">Sign Up</RouterLink>
    </button>
    <button>
        <RouterLink :to="{name: 'login'}">Login</RouterLink>
    </button>
</template>

<style>

</style>