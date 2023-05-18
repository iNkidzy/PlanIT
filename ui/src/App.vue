<script setup>
import { RouterView } from 'vue-router'
import SideNav from './components/SideNav.vue';
</script>

<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12 sm12 md12>
        <SideNav></SideNav>
      </v-flex>
    </v-layout>
  </v-container>

  <RouterView />
</template>
