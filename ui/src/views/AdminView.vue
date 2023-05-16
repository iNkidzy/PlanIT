<template>
    <div>
        <v-form>
            <v-text-field v-model="state.newUser.username" label="Username" required></v-text-field>
            <v-text-field v-model="state.newUser.name" label="Name" required></v-text-field>
            <v-text-field v-model="state.newUser.email" label="Email" required></v-text-field>
            <v-text-field v-model="state.newUser.password" label="Password" required></v-text-field>
            <v-select v-model="state.newUser.role" :items="['user', 'admin']" label="Role"></v-select>
            <v-btn @click="createUser">Create a new user account</v-btn>
        </v-form>
        <br>
        <v-table fixed-header height="300px">
            <thead>
                <tr>
                    <th class="text-left">
                        username:
                    </th>
                    <th class="text-left">
                        email:
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in state.users" :key="user.id" @click="selectUser(user)">
                    <td>{{ user.username }}</td>
                    <td>{{ user.email }}</td>
                </tr>

            </tbody>
        </v-table>

    </div>
    <div v-if="state.selectedUser">
        <h2>Selected User</h2>
        <p>Username: {{ state.selectedUser.username }}</p>
        <p>Email: {{ state.selectedUser.email }}</p>
        <!-- Add more details as needed -->
    </div>
</template>

<script>
import { reactive } from 'vue';

export default {
    setup() {
        const state = reactive({
            users: {},
            selectedUser: null,
            newUser: {
                username: '',
                name: '',
                email: '',
                password: '',

            },
        })



        function getAllUsers() {
            fetch("http://localhost:5500/api/user")
                .then(res => res.json())
                .then(data => {
                    state.users = data
                })
        }

        function selectUser(user) {
            state.selectedUser = user
            console.log("selected user:", user)
        }


        //In summary, { ...state.newUser } creates a shallow copy of the state.newUser object, allowing us to work with a separate object that won't be modified unintentionally when making changes.

        function createUser() {
            fetch("http://localhost:5500/api/user/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...state.newUser }),
            })
                .then(res => res.json())
                .then(data => {
                    console.log("new user created:", data)
                    getAllUsers()
                })
        }

        getAllUsers()
        return { state, getAllUsers, selectUser, createUser }
    }

}
</script>