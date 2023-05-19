<template>
    <v-card>
        <v-form id="Forms">
            <v-card-title style="font-size: medium;">
                <h2>Login</h2>
            </v-card-title>
            <v-text-field v-model="state.user.username" type="username" id="username" label="Username"
                required></v-text-field>
            <v-text-field v-model="state.user.password" type="password" id="password" label="Password"
                required></v-text-field>
            <v-actions> <v-btn @click="login()">Login</v-btn>
                <v-btn>Cancel</v-btn></v-actions>
        </v-form>
    </v-card>
</template>
<script setup>
import axios from 'axios';
import { ref } from 'vue';

const state = ref({
    user: {
        username: '',
        password: '',
        // token: ''
    }
})

const login = async () => {

    // this.$router.push('/spacefun')
    // console.log(response)

    try {
        const response = await axios.post('http://localhost:5500/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: state.value.username,
                password: state.value.password,
                // username: state.value.user.username,
                // password: state.value.user.password
            })
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.token;
            console.log(token, 'here is the token')

            // Stores the token in localStorage
            localStorage.setItem('token', token);

            // Redirecting to page 
            window.location.href = '/spacefun';
        } else {
            throw new Error('Login failed');
        }

    } catch (error) {

        console.error("Error logging in", error.message);
    }
}
// import { ref } from 'vue';

// const state = ref({
//     data() {
//         return {
//             username: '',
//             password: '',
//         }
//     }

// })


// const login = async () => {
//     try {
//         const response = await fetch('http://localhost:5500/api/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 username: state.username,
//                 password: state.password
//             })
//         });

//         if (response.ok) {
//             const data = await response.json();
//             const token = data.token;
//             // Stores the token in localStorage
//             console.log(token, 'here is the token')
//             localStorage.setItem('token', token);
//             window.location.href = '/spacefun';
//             // Redirecting to page 
//         } else {
//             throw new Error('Login failed');
//         }
//     } catch (error) {
//         // Handle login error (e.g., display error message)
//         console.error(error);
//     }
// }

</script>

<style>
#Forms {
    padding: 5%;
    height: 300px;
    width: 450px;
    margin: auto;
}
</style>