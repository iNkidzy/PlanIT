<template>
  <v-navigation-drawer theme="dark" rail permanent>
    <v-list-item nav></v-list-item>

    <v-divider></v-divider>

  </v-navigation-drawer>
  <v-navigation-drawer permanent>
    <v-list>
      <v-list-item @click="spaceFunPage()" title="SpaceFun" value="SpaceFun"></v-list-item>
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
import { useRouter } from 'vue-router'

const router = useRouter()

const { setUser } = inject('authenticatedUser');

const spaceFunPage = () => {
  router.push('/spaceFun')
}

const projectsPage = () => {
  router.push('/projects')
}

const logOut = async () => {
  await localStorage.removeItem('token');
  setUser({});
  router.push('/')
}

const spacefunPage = () => {
  router.push('/spacefun')
}

</script>


<style lang="scss" scoped></style>