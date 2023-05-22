<template>
    <v-container fluid>
        <v-row class="justify-space-between">
            <v-col cols="8">
              <h2 class="btns text-h4 ps-4">Plan<span class="text-green">IT</span></h2>
            </v-col>
            <v-col cols="3" class="align-self-end">
                <v-btn class="aboutbtn ml-2" variant="text" @click="about()">About</v-btn>
                <v-btn class="btns mr-3" variant="text" @click="hideMe = true">Login</v-btn>
                <v-btn class="btns ml-1" variant="tonal" @click="hideMeSignup = true">SignUp</v-btn>
            </v-col>
        </v-row> 
        <v-row class="justify-space-between">
            <v-col cols="7">
                <div style="margin-top:5%">
                    <h2 class="text-white text-h4 ps-4"> Start planning today</h2>
                    <br>
                    <h5 class="text-white-smoke text-h5 ps-6"> 
                    PlanIT is a project managment tool <br>
                    where you can plan and have fun in your SpaceFun
                   
                    </h5>
                    <br><br>
                    <img src="../assets/new.png" width="800" height="450"/> 
                </div>             
            </v-col>
        <v-col cols="5" class="align-self-top">
                <Login v-if="hideMe" @cancel="hideMe = false"></Login>
                <Signup v-if="hideMeSignup" @cancel="hideMeSignup = false"></Signup>
        </v-col>
        </v-row>
    </v-container>
</template>

<script setup>

import Login from '../components/LoginComponents.vue'
import Signup from '../components/SignupComponents.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const hideMe = ref(false)
const hideMeSignup = ref(false)
const router = useRouter()
const about = () =>
{
    router.push('/about')
}
</script>

<style scoped>
.aboutbtn{
    color: palevioletred
}
.btns{
  color: white; 
}

</style>