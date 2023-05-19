<script setup>
import { RouterView } from 'vue-router'
import SideNav from './components/SideNav.vue';
</script>

<template>
  <v-container fluid>
    <v-layout>
      <SideNav></SideNav>
      <v-main>
        <RouterView />
      </v-main>
    </v-layout>
  </v-container>
</template>
