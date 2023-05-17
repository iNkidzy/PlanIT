<template>
    <div>
        <v-btn @click="state.showForm = true">Create a new user account</v-btn>

        <v-card v-model="state.showForm">
            <v-card-title>
                <span class="headline">Create User</span>
            </v-card-title>
            <v-card-text>
                <v-form v-if="state.showForm">
                    <v-text-field v-model="state.newUser.username" label="Username" required></v-text-field>
                    <v-text-field v-model="state.newUser.name" label="Name" required></v-text-field>
                    <v-text-field v-model="state.newUser.email" label="Email" required></v-text-field>
                    <v-text-field v-model="state.newUser.password" label="Password" required></v-text-field>
                    <v-select v-model="state.newUser.role" :items="['user', 'admin']" label="Role"></v-select>
                    <v-actions> <v-btn @click="createUser">Create a new user account</v-btn>
                        <v-btn @click="state.showForm = false">Cancel</v-btn></v-actions>
                </v-form>
            </v-card-text>
        </v-card>

        <v-card v-model="state.showForm_2">
            <v-card-title>
                <span class="headline">Edit User</span>
            </v-card-title>
            <v-card-text>
                <v-form v-if="state.showForm_2">
                    <v-text-field v-model="state.selectedUser.username" label="Username" required></v-text-field>
                    <v-text-field v-model="state.selectedUser.name" label="Name" required></v-text-field>
                    <v-text-field v-model="state.selectedUser.email" label="Email" required></v-text-field>
                    <v-text-field v-model="state.selectedUser.password" label="Password" required></v-text-field>
                    <v-select v-model="state.selectedUser.role" :items="['user', 'admin']" label="Role"></v-select>
                    <v-actions> <v-btn @click="updateUser(state.selectedUser._id)">Update</v-btn>
                        <v-btn @click="state.showForm_2 = false">Cancel</v-btn></v-actions>
                </v-form>
            </v-card-text>
        </v-card>


        <br>
        <v-table v-if="!state.showForm || !state.showForm_2" fixed-header height="300px">
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
        <v-card>
            <v-card-title style="font-size: medium;">
                <h2>Selected User</h2>
                <v-card-subtitle>
                    <v-card-text style="font-size: larger;">
                        <p>Username: {{ state.selectedUser.username }}</p>
                        <p>Name: {{ state.selectedUser.name }}</p>
                        <p>Email: {{ state.selectedUser.email }}</p>
                        <p>Password: {{ state.newUser.password }}</p>
                        <v-card-actions>
                            <v-btn @click="state.selectedUser = null">Close</v-btn>
                            <v-btn color="primary" @click="state.showForm_2 = true">Edit</v-btn>
                            <v-btn color="error" @click="deleteUser">Delete</v-btn>
                        </v-card-actions>
                    </v-card-text>
                </v-card-subtitle>
            </v-card-title>
        </v-card>
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
            data() {
                return {
                    showForm: false,
                    showForm_2: false,
                };
            }

        })

        function getAllUsers() {
            fetch("http://localhost:5500/api/user")
                .then(res => res.json())
                .then(data => {
                    state.users = data

                }).catch(err => console.log(alert = "cannot fetch users", err))
        }

        function selectUser(user) {
            state.selectedUser = user
            state.selectedUser._id = user._id
            console.log("selected user:", user)
        }

        //In summary, { ...state.newUser } creates a shallow copy of the state.newUser object,
        //allowing us to work with a separate object that won't be modified unintentionally when making changes.
        function createUser() {
            if (!state.newUser.username || !state.newUser.name || !state.newUser.email || !state.newUser.password) {
                alert("Please fill out all fields")
                return
            }
            if (state.newUser.password.length < 8) {
                alert("Password must be at least 8 characters")
                return
            } if (!state.newUser.email.includes("@")) {
                alert("Please enter a valid email address")
                return
            } if (!state.newUser.email.includes(".")) {
                alert("Please enter a valid email address")
                return

            } if (state.newUser.email.includes("*", "!", (","), "#", "$", "%", "^", "&", "*", "(", ")", "+", "=", "?", "/", "<", ">", "~", "`", "[", "]", "{", "}", "|", ":", ";", "'", '"', "\\")) {
                alert("Please enter a valid email address")
                return
            }
            if (state.newUser.username.length < 4) {
                alert("Username must be at least 4 characters")
                return
            } if (state.newUser.name.length < 4) {
                alert("Name must be at least 4 characters")
                return
            }
            if (state.users.find(user => user.username === state.newUser.username)) {
                alert("Username already exists")
                return
            }
            if (state.users.find(user => user.email === state.newUser.email)) {
                alert("Email already exists")
                return
            }
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
                    clearForm()
                    alert("User created successfully!")

                })
        }

        function updateUser() {

            fetch("http://localhost:5500/api/user/:id", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user: state.selectedUser }),
            })
                .then(res => res.json())
                .then(data => {
                    getAllUsers()
                    clearForm()
                    // alert("User updated successfully!")
                    console.log("user updated:", data)

                }).catch((err) => {
                    console.log(err, "user not updated")
                })
        }

       
        function clearForm() {
            state.newUser.username = ''
            state.newUser.name = ''
            state.newUser.email = ''
            state.newUser.password = ''
        }



        function cancelForm() {
            state.showForm = false
            state.showForm_2 = false
            clearForm()
        }

        getAllUsers()
        return { state, getAllUsers, selectUser, createUser, cancelForm, clearForm, updateUser }
    }
}
</script>