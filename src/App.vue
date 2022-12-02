<script setup lang="ts">
import { RouterView } from 'vue-router'
import type { Usuario } from '@/services/interfaces';
import { perfilUsuario, logout } from './services/axios/llamadasUsuarios';
import { ref, toRefs } from 'vue';

let logeado: boolean = false;
const usuario = ref()
const idUsuario = ref({})

if (localStorage.getItem('usuario')) {
  logeado = true
  perfilUsuario().then(res => {
    usuario.value = res.data
    idUsuario.value = res.data.id
  })
}

</script>

<template>
  <nav>
    <RouterLink :to="{ name: 'home' }"><h2 id="logo">Stocks</h2></RouterLink>

    <template v-if="!logeado">
      <ul>
        <li>
          <RouterLink :to="{ name: 'signup' }"><button>Sign Up</button></RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'login' }"><button>Login</button></RouterLink>
        </li>
      </ul>
    </template>
    <template v-else>
      <ul>
        <li>
          <RouterLink :to="{ path: `/productosUsuario/${idUsuario}` }"><button>Tus Productos</button></RouterLink>
        </li>
        <li>
          <RouterLink :to="{ path: `/perfil/${idUsuario}` }"><button>Perfil</button></RouterLink> 
        </li>
        <li>
          <div>
            <p id="monedasUsuario">{{usuario?.monedas}}🪙</p>
          </div>
        </li>
      </ul>
    </template>
  </nav>
  <section id="cuerpo">
    <RouterView id="routerView" />
  </section>
</template>

<style scoped>
a {
  text-decoration: none;
  /* color: black; */
}

a:hover{
  text-decoration: none;
}

button{
  border-radius: 20px;
  border: none;
  padding: 8px 10px;
  margin: 10px 0;
  cursor: pointer;
  color: rgb(133, 113, 165);
  background-color: white;
  font-weight: bolder;
  transition: all ease-in-out 200ms;
}

button:hover{
  background-color: rgb(169, 149, 202);
  color: white;
}

nav {
  max-width: 100vw;
  height: 70px;
  padding: 0 40px;
  background-color: rgb(125, 107, 154);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

nav ul {
  list-style: none;
  display: flex;
  align-items: center;
  height: 100%;
}

nav ul li {
  margin: 0 10px;
}

#cuerpo {
  height: calc(100vh - 70px);
  width: 100vw;
}

#logo{
  color: white;
  transition: all ease-in-out 300ms;
}

  #logo:hover{
    transform: scale(1.3);
  }

#monedasUsuario{
  color: white;
  font-weight: bolder;
}

#routerView {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
