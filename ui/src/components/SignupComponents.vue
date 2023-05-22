<template>
    <v-card>
        <v-form id="Forms">
            <v-card-title style="font-size: medium;">
                <h2>Create User</h2>
            </v-card-title>
            <v-text-field v-model="state.newUser.username" label="Username" required></v-text-field>
            <v-text-field v-model="state.newUser.name" label="Name" required></v-text-field>
            <v-text-field v-model="state.newUser.email" label="Email" required></v-text-field>
            <v-text-field v-model="state.newUser.password" label="Password" required></v-text-field>
            <v-actions> <v-btn @click="createUser()">Create a new user account</v-btn>
                <v-btn @click="$emit('cancel')">Cancel</v-btn></v-actions>
        </v-form>
    </v-card>
</template>

<script setup>
defineEmits(["cancel"])
import { ref } from 'vue';
import { authHeader } from '../AuthHelper.vue'

const state = ref({
    newUser: {
        username: '',
        name: '',
        email: '',
        password: '',
    }
})


const createUser = async () => {
    if (!state.value.newUser.username || !state.value.newUser.name || !state.value.newUser.email || !state.value.newUser.password) {
        alert("Please fill out all fields")
        return
    }
    if (state.value.newUser.password.length < 8) {
        alert("Password must be at least 8 characters")
        return
    } if (!state.value.newUser.email.includes("@")) {
        alert("Please enter a valid email address")
        return
    } if (!state.value.newUser.email.includes(".")) {
        alert("Please enter a valid email address")
        return

    } if (state.value.newUser.email.includes("*", "!", (","), "#", "$", "%", "^", "&", "*", "(", ")", "+", "=", "?", "/", "<", ">", "~", "`", "[", "]", "{", "}", "|", ":", ";", "'", '"', "\\")) {
        alert("Please enter a valid email address")
        return
    }
    if (state.value.newUser.username.length < 4) {
        alert("Username must be at least 4 characters")
        return
    } if (state.value.newUser.name.length < 4) {
        alert("Name must be at least 4 characters")
        return
    }
    // if (state.value.users.findOne(user => user.username === state.value.newUser.username)) {
    //     alert("Username already exists")
    //     return
    // }


    const postReq = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: state.value.newUser.username,
            name: state.value.newUser.name,
            email: state.value.newUser.email,
            password: state.value.newUser.password,
        })
    }
    await fetch("http://localhost:5500/api/user/signup", authHeader(postReq))
        .then(res => res.json())
        .then(data => {
            console.log("new user created:", data)
            clearForm()
            alert("User created successfully!")

        }).catch((err) => {
            console.log(err, "user not created")
        })
}
const clearForm = () => {
    state.value.newUser.username = ""
    state.value.newUser.name = ""
    state.value.newUser.email = ""
    state.value.newUser.password = ""
}

</script>

<style>
#Forms {
    padding: 5%;
    height: 500px;
    width: 450px;
    margin: auto;
}
</style>