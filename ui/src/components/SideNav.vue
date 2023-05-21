<template>
  <v-navigation-drawer theme="dark" rail permanent>
    <v-list-item nav prepend-avatar="https://randomuser.me/api/portraits/women/75.jpg"></v-list-item>

    <v-divider></v-divider>

  </v-navigation-drawer>
  <v-navigation-drawer permanent>
    <v-list>
      <v-list-item title="SpaceFun" value="SpaceFun"></v-list-item>

      <v-list-item title="Projects" value="Projects"></v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn @click="logOut()" block color="grey">
          Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>


<script setup>
import { inject } from 'vue';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const { setUser } = inject('authenticatedUser');


const logOut = async () => {
  await localStorage.removeItem('token');
  setUser({});
  router.push('/')
}


</script>


<style lang="scss" scoped></style>