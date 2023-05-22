<template>
    <v-container>
        <br>
        <h2 id="h2">Welcome to the Admin page </h2>
        <br>
        <v-btn @click="createForm = true">Create a new user account</v-btn>
        <br>
        <v-row class="justify-center">
            <v-col cols="5">
                <v-card v-model="createForm">
                    <v-form v-if="createForm" id="Forms">
                        <v-card-title style="font-size: medium;">
                            <h2>Create User</h2>
                        </v-card-title>
                        <v-text-field v-model="state.newUser.username" label="Username" required></v-text-field>
                        <v-text-field v-model="state.newUser.name" label="Name" required></v-text-field>
                        <v-text-field v-model="state.newUser.email" label="Email" required></v-text-field>
                        <v-text-field v-model="state.newUser.password" label="Password" required></v-text-field>
                        <v-select v-model="state.newUser.role" :items="['USER', 'ADMIN']" label="Role"></v-select>
                        <v-actions> <v-btn @click="createUser()">Create a new user account</v-btn>
                            <v-btn @click="createForm = false">Cancel</v-btn></v-actions>
                    </v-form>
                </v-card>
                <v-card v-model="updateForm">
                    <v-form v-if="updateForm" id="Forms">
                        <v-card-title style="font-size: medium;">
                            <h2>Edit User</h2>
                        </v-card-title>
                        <v-text-field v-model="state.selectedUser.username" label="Username" required></v-text-field>
                        <v-text-field v-model="state.selectedUser.name" label="Name" required></v-text-field>
                        <v-text-field v-model="state.selectedUser.email" label="Email" required></v-text-field>
                        <v-text-field v-model="state.selectedUser.password" label="Password"></v-text-field>
                        <v-select v-model="state.selectedUser.role" :items="['USER', 'ADMIN']" label="Role"></v-select>
                        <v-actions> <v-btn @click="updateUser(state.selectedUser._id)">Update</v-btn>
                            <v-btn @click="updateForm = false">Cancel</v-btn></v-actions>
                        <br><br>
                    </v-form>
                </v-card>
                <br>
                <div v-if="state.selectedUser">
                    <v-card>
                        <v-card-title style="font-size: medium;">
                            <h2>Selected User</h2>
                            <v-card-subtitle>
                                <v-card-text style="font-size: larger;">
                                    <p>Username: {{ state.selectedUser.username }}</p>
                                    <p>Name: {{ state.selectedUser.name }}</p>
                                    <p>Email: {{ state.selectedUser.email }}</p>
                                    <p>Role: {{ state.selectedUser.role }}</p>
                                    <p>Created: {{ formatDate(state.selectedUser.date) }}</p>
                                    <v-card-actions>
                                        <v-btn @click="state.selectedUser = null">Close</v-btn>
                                        <v-btn color="primary" @click="updateForm = true"
                                            data-id="{{state.selectedUser._id}}">Edit</v-btn>
                                        <v-btn color="error" @click="deleteUser(state.selectedUser._id)">Delete</v-btn>
                                    </v-card-actions>
                                </v-card-text>
                            </v-card-subtitle>
                        </v-card-title>
                    </v-card>
                </div>
            <v-table v-if="!createForm || !updateForm" fixed-header height="500px" id="tbal">
            <thead>
                <tr>
                    <th class="text-center">
                        Username:
                    </th>
                    <th class="text-center">
                        Email:
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in state.users" :key="user._id" @click="selectedUser(user)" id="tuser">
                    <td>{{ user.username }}</td>
                    <td>{{ user.email }}</td>
                </tr>
            </tbody>
            </v-table>
                <v-btn variant="outlined" @click="logOut()" block >
                Logout
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { authHeader } from '../AuthHelper.vue';
import { inject } from 'vue';
import { useRouter } from 'vue-router'

const { setUser } = inject('authenticatedUser');

const state = ref({
    users: {},

    newUser: {
        username: '',
        name: '',
        email: '',
        password: '',
    },
    selectedUser: null
})

const router = useRouter()
const createForm = ref(false)
const updateForm = ref(false)

function formatDate(value) {
    const createdDate = new Date(value);
    return createdDate.toLocaleString();
}

const getAllUsers = async () => {
    try {
        await fetch('http://localhost:5500/api/user', authHeader())
            .then(res => res.json())
            .then(data => {
                state.value.users = data

            })
    } catch (err) {
        console.log("cannot fetch users", err)
    }
}
getAllUsers()

function selectedUser(user) {
    state.value.selectedUser = user
    console.log("selected user:", user)
}

const createUser = async () => {
    if (!state.value.newUser.username || !state.value.newUser.name || !state.value.newUser.email) {
        alert("Please fill out all fields")
        return
    }
    if (state.value.newUser.password && state.value.newUser.password.length < 8) {
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
    if (state.value.users.find(user => user.username === state.value.newUser.username)) {
        alert("Username already exists")
        return
    }
    if (state.value.users.find(user => user.email === state.value.newUser.email)) {
        alert("Email already exists")
        return
    }

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
            role: state.value.newUser.role
        })
    }
    await fetch("http://localhost:5500/api/user/create", authHeader(postReq))
        .then(res => res.json())
        .then(data => {
            console.log("new user created:", data)
            getAllUsers()
            clearForm()
            alert("User created successfully!")

        }).catch((err) => {
            console.log(err, "user not created")
        })
}
async function updateUser(_id) {
    if (state.value.selectedUser.password && state.value.selectedUser.password.length < 8) {
        alert("Password must be at least 8 characters")
        return
    } if (!state.value.selectedUser.email.includes("@")) {
        alert("Please enter a valid email address")
        return
    } if (!state.value.selectedUser.email.includes(".")) {
        alert("Please enter a valid email address")
        return

    } if (state.value.selectedUser.email.includes("*", "!", (","), "#", "$", "%", "^", "&", "*", "(", ")", "+", "=", "?", "/", "<", ">", "~", "`", "[", "]", "{", "}", "|", ":", ";", "'", '"', "\\")) {
        alert("Please enter a valid email address")
        return
    }
    if (state.value.selectedUser.username.length < 4) {
        alert("Username must be at least 4 characters")
        return
    } if (state.value.selectedUser.name.length < 4) {
        alert("Name must be at least 4 characters")
        return
    }
    if (state.value.users.find(user => user.username === state.value.newUser.username)) {
        alert("Username already exists")
        return
    }
    if (state.value.users.find(user => user.email === state.value.newUser.email)) {
        alert("Email already exists")
        return
    }
    await fetch(`http://localhost:5500/api/user/${_id}`, authHeader({
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: _id, ...state.value.selectedUser }),
    }))
        .then(res => res.json())
        .then(data => {
            getAllUsers()
            clearForm()
            alert("User updated successfully!")
            console.log("user updated:", data)
            console.log("user id:", _id)

        }).catch((err) => {
            console.log(err, "user not updated")
        })
}
async function deleteUser(id) {
    await fetch(`http://localhost:5500/api/user/${id}`, authHeader({
        method: "DELETE",
    }))
        .then(res => res.json())
        .then(data => {
            console.log("user deleted:", data)
            getAllUsers()
            state.value.selectedUser = null
            alert("User deleted successfully!")
        }).catch((err) => {
            console.log(err, "user not deleted")
        })
}

function clearForm() {
    state.value.newUser.username = ''
    state.value.newUser.name = ''
    state.value.newUser.email = ''
    state.value.newUser.password = ''
}

const logOut = async () => {
    await localStorage.removeItem('token');
    setUser({});
    router.push('/')
}
</script>

<style>
#Forms {
    padding: 1%;
    height: 500px;
    width: 450px;
    z-index: 999;
    margin: auto;
}

#tbal {
    width: 600px;
    justify-self: center;
    text-align: center;
}

.text-center {
    text-align: center;
    font-size: large;
}
</style>