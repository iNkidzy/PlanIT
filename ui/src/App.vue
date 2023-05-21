<template>
  <v-container fluid>
    <v-layout>

      <SideNav v-if="authenticatedUser.role == 'USER'"></SideNav>

      <v-main>
        <RouterView />
      </v-main>
    </v-layout>
  </v-container>
</template>
<script setup>
import SideNav from './components/SideNav.vue';
import { RouterView } from 'vue-router';
import { provide, ref } from 'vue';

function initialUser() {
  const token = localStorage.getItem('token');
  return token ? JSON.parse(atob(token.split('.')[1])) : {};
}

const authenticatedUser = ref(initialUser())

function setUser(user) {
  authenticatedUser.value = user;
}

//available to all components
provide('authenticatedUser', { authenticatedUser, setUser });

</script>
