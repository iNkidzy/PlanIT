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
import { ref } from 'vue';

const state = ref({
    users: [],
    user: {
        username: '',
        password: '',
        role: ''
        // token: ''
    }
})

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
            // username: state.value.user.username,
            // password: state.value.user.password
        })
    }
    await fetch('http://localhost:5500/api/user/login', request)
        .then(response =>
            response.json())
        .then(data => {

            console.log(data)
            const token = data.data.token
            localStorage.setItem('token', token);
            const payload = JSON.parse(atob(token.split('.')[1]));

            // Stores the token in localStorage, bad way to do it
            //  localStorage.setItem('token', token);

            // setting a cookie, better way to do it more secure because of http request
            //   Cookies.set('jwtToken', token, { expires: 7 });

            // Check if user is admin or user role here,  and then sent to eiter admin page or spacefun page on login
            if (payload.role === 'ADMIN') {
                console.log('admin')
                window.location.href = '/admin';
            } else {
                console.log('user')
                window.location.href = '/spacefun';
            }
        })
        .catch(error => { console.error('Login falied:', error) })
}


            // Stores the token in localStorage, bad way to do it
          //  localStorage.setItem('token', token);


            // setting a cookie, better way to do it more secure because of http request
            // Cookies.set('jwtToken', data.token, { expires: 7, path: '/spacefun' });

            // console.log("cookie is set", Cookies);
            // Check if user is admin or user role here,  and then sent to eiter admin page or spacefun page on login
            // Redirecting to page
            // if (state.value.user.role === 'ADMIN') {
            //     console.log('admin')
            //     window.location.href = '/admin';
            // } else {
            //     console.log('user')
            //     window.location.href = '/spacefun';
            // }
//         } else {
//             throw new Error('Login failed');
//         }

//     } catch (error) {

//         console.error("Error logging in", error.message);
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