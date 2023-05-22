<template>
    <v-container fluid>
        <v-row class="justify-end">
            <v-col cols="10">
              <h2 class="btns text-h4 ps-4">Plan<span class="text-green">IT</span></h2>
            </v-col>
            <v-col cols="2" class="align-self-end">
                <v-btn class="btns mr-6" variant="text" @click="hideMe = true">Login</v-btn>
                <v-btn class="btns" variant="tonal" @click="hideMeSignup = true">SignUp</v-btn>
            </v-col>
        </v-row> 
        <v-row class="justify-center">
            <v-col cols="12">
                <Login v-if="hideMe" @cancel="hideMe = false"></Login>
                <Signup v-if="hideMeSignup" @cancel="hideMeSignup = false"></Signup>
            </v-col>
            <v-col cols="10">
                <img src="../assets/frontpage.jpg"/>
                <h2 class="text-white text-h4 ps-4"> Start planning today!</h2>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>

import Login from '../components/LoginComponents.vue'
import Signup from '../components/SignupComponents.vue'
import { ref } from 'vue'

const hideMe = ref(false)
const hideMeSignup = ref(false)

</script>

<style scoped>
.btns{
  color: white; 
}
.color{
    background-color: aqua;
}

</style>