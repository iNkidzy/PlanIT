<!-- <template>
    <div>
        <div>
            <v-btn @click="toggleLogin()">Login</v-btn>
            <Login v-if="state.showLogin"></Login>
        </div>
        <div>
            <v-btn @click="toggleSignup()">SignUp</v-btn>
            <Signup v-if="state.showSignup"></Signup>
        </div>
    </div>
</template>

<script setup>
import Login from '../components/LoginComponents.vue'
import Signup from '../components/SignupComponents.vue'

import ref from 'vue'

const state = ref({
    showLogin: false,
    showSignup: false
})

const toggleLogin = () => {
    state.value.showLogin = !state.value.showLogin;
}
const toggleSignup = () => {
    state.value.showSignup = !state.value.showSignup;
}

</script>

<style  scoped></style> -->



<template>
    <div>
        <div>
            <v-btn @click="hideMe = true">Login</v-btn>
            <Login v-if="hideMe" @cancel="hideMe = false"></Login>
        </div>
        <div>
            <v-btn @click="hideMeSignup = true">SignUp</v-btn>
            <Signup v-if="hideMeSignup" @cancel="hideMeSignup = false"></Signup>
        </div>
    </div>
</template>

<script setup>

import Login from '../components/LoginComponents.vue'
import Signup from '../components/SignupComponents.vue'

import { ref } from 'vue'

const hideMe = ref(false)
const hideMeSignup = ref(false)


</script>

<style lang="scss" scoped></style>