<template>
    <v-card v-model="loginForms" id="formLogin">
        <v-form v-if="loginForms = true">
            <v-card-title style="font-size: medium;">
                <h2>Login</h2>
            </v-card-title>
            <v-text-field v-model="state.user.username" type="username" id="username" label="Username"
                required></v-text-field>
            <v-text-field v-model="state.user.password" type="password" id="password" label="Password"
                required></v-text-field>
            <v-actions>
                <v-btn @click="login()">Login</v-btn>
                <v-btn @click="$emit('cancel')">Cancel</v-btn>
            </v-actions>
        </v-form>
    </v-card>
</template>

<script setup>
defineEmits(["cancel"])
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router'


const state = ref({
    users: [],
    user: {
        username: '',
        password: '',
        role: ''
    }
})

const router = useRouter()

const { setUser } = inject('authenticatedUser');

const loginForms = ref(false)

const login = async () => {
    if (state.value.user.username === '' || state.value.user.password === '') {
        console.log('Please enter username and password')
        return
    }
    if (state.value.users.find(user => user.username === !state.value.user.username)) {
        alert("Wrong login, please try again")
        return

    }
    if (state.value.users.find(user => user.email === state.value.user.email)) {
        alert("Wrong login, please try again")
        return
    }

    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: state.value.user.username,
            password: state.value.user.password,
        })
    }
    await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/user/login`, request)
        .then(response =>
            response.json())
        .then(data => {

            console.log(data)
            const token = data.data.token
            localStorage.setItem('token', token);
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser(payload)
            // Check if user is admin or user role here,and then sent to either admin page or spacefun page on login
            if (payload.role === 'ADMIN') {
                console.log('admin')
                router.push('/admin')

            } else {
                console.log('user')
                router.push('/spacefun')

            }
        })
        .catch(() => { alert("Wrong login, please try again") })
}
</script>

<style>
#formLogin {
    padding: 5%;
    height: 300px;
    width: 450px;
    margin: auto;
}
</style>