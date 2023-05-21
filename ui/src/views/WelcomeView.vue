<template>
    <div>
        <div>
            <v-btn>Login</v-btn>
            <Login></Login>
        </div>
        <div>
            <v-btn>SignUp</v-btn>
            <Signup></Signup>
        </div>
    </div>
</template>

<script setup>
import  Login from '../components/LoginComponents.vue'
import  Signup from '../components/SignupComponents.vue'

//import { ref } from 'vue'

//const hideMe = ref(false)

</script>

<style lang="scss" scoped>

</style>