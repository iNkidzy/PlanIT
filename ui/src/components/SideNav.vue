<template>
  <v-navigation-drawer theme="dark" rail permanent>
    <v-list-item nav prepend-avatar="https://randomuser.me/api/portraits/women/75.jpg"></v-list-item>

    <v-divider></v-divider>

  </v-navigation-drawer>
  <v-navigation-drawer permanent>
    <v-btn @click="logOut()">Log out</v-btn>
    <v-list>
      <v-list-item title="SpaceFun" value="SpaceFun"></v-list-item>

      <v-list-item title="Projects" value="Projects"></v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn block color="black">
          Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>


<script setup>

const logOut = async () => {
  await localStorage.removeItem('token');
  window.location.href = '/';
}
</script>


<style lang="scss" scoped></style>