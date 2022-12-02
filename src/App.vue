<script setup lang="ts">
import { RouterView } from 'vue-router'
import type { Usuario } from '@/services/interfaces';

let logeado: boolean = false;

if(localStorage.getItem('usuario')) logeado = true
</script>

<template>
  <nav>
        <h2 id="logo">Stocks</h2>

        <template v-if="!logeado">
            <ul>
                <li>
                    <button>
                        <RouterLink :to="{name: 'signup'}">Sign Up</RouterLink>
                    </button>
                </li>
                <li>
                    <button>
                        <RouterLink :to="{name: 'login'}">Login</RouterLink>
                    </button>
                </li>
            </ul>
        </template>
        <template v-else>
            <ul>
                <li>
                    <button>
                        <RouterLink :to="{name: 'home'}">Home</RouterLink>
                    </button>
                </li>
                <li>
                    <button>
                        <RouterLink :to="{name: 'home'}">Lista Productos</RouterLink>
                    </button>
                </li>
                <li>
                    <button>
                        <RouterLink :to="{name: 'home'}">Perfil</RouterLink>
                    </button>
                </li>
            </ul>
        </template>
    </nav>
    <section id="cuerpo">
      <RouterView id="routerView" />
    </section>
</template>

<style scoped>
a{
  text-decoration: none;
  color: black;
}

nav{
  max-width: 100vw;
  height: 70px;
  padding: 0 20px;
  background-color: lightblue;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

  nav ul{
    list-style: none;
    display: flex;
  }

    nav ul li {
      margin: 0 10px;
    }

#cuerpo{
  height: calc(100vh - 70px);
  width: 100vw;
}

#routerView{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
