<template>
    <div class="container">
        <br>
        <h2 id="h2">Welcome to the Admin page</h2>
        <br>
        <v-btn @click="showForm = true">Create a new user account</v-btn>
        <br>
        <v-card v-model="showForm">

            <v-form v-if="showForm" id="Forms">
                <v-card-title style="font-size: medium;">
                    <h2>Create User</h2>
                </v-card-title>
                <v-text-field v-model="state.value.newUser.username" label="Username" required></v-text-field>
                <v-text-field v-model="state.value.newUser.name" label="Name" required></v-text-field>
                <v-text-field v-model="state.value.newUser.email" label="Email" required></v-text-field>
                <v-text-field v-model="state.value.newUser.password" label="Password" required></v-text-field>
                <v-select v-model="state.value.newUser.role" :items="['USER', 'ADMIN']" label="Role"></v-select>
                <v-actions> <v-btn @click="createUser">Create a new user account</v-btn>
                    <v-btn @click="showForm = false">Cancel</v-btn></v-actions>
            </v-form>
        </v-card>
        <v-card v-model="showForm_2">
            <v-form v-if="showForm_2" id="Forms">
                <v-card-title style="font-size: medium;">
                    <h2>Edit User</h2>
                </v-card-title>
                <v-text-field v-model="selectedUser.username" label="Username" required></v-text-field>
                <v-text-field v-model="selectedUser.name" label="Name" required></v-text-field>
                <v-text-field v-model="selectedUser.email" label="Email" required></v-text-field>
                <v-text-field v-model="selectedUser.password" label="Password" required></v-text-field>
                <v-select v-model="selectedUser.role" :items="['USER', 'ADMIN']" label="Role"></v-select>
                <v-actions> <v-btn @click="updateUser(selectedUser._id)">Update</v-btn>
                    <v-btn @click="showForm_2 = false">Cancel</v-btn></v-actions>
                <br><br>
            </v-form>
        </v-card>
        <br>
        <div v-if="selectedUser">
            <v-card>
                <v-card-title style="font-size: medium;">
                    <h2>Selected User</h2>
                    <v-card-subtitle>
                        <v-card-text style="font-size: larger;">
                            <p>Username: {{ selectedUser.username }}</p>
                            <p>Name: {{ selectedUser.name }}</p>
                            <p>Email: {{ selectedUser.email }}</p>
                            <p>Role: {{ selectedUser.role }}</p>
                            <p>Created: {{ formatDate(selectedUser.date) }}</p>
                            <v-card-actions>
                                <v-btn @click="selectedUser = null">Close</v-btn>
                                <v-btn color="primary" @click="showForm_2 = true"
                                    data-id="{{selectedUser.id}}">Edit</v-btn>
                                <v-btn color="error" @click="deleteUser(selectedUser._id)">Delete</v-btn>
                            </v-card-actions>
                        </v-card-text>
                    </v-card-subtitle>
                </v-card-title>
            </v-card>
        </div>
        <v-table v-if="!showForm || !showForm_2" fixed-header height="500px" id="tbal">
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
                <tr v-for="user in users" :key="user.id" @click="selectUser(user)" id="tuser">
                    <td>{{ user.username }}</td>
                    <td>{{ user.email }}</td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script setup>
import { ref } from 'vue';

        const state = ref({
            users: {},
            
            newUser: {
                username: '',
                name: '',
                email: '',
                password: '',
            },
        })

        const selectedUser = ref(null)

        const showForm = ref(false)
        const showForm_2 = ref(false)

        function formatDate(value) {
            const createdDate = new Date(value);
            return createdDate.toLocaleString();
        }



        const getAllUsers = async() => {
        try {
            await fetch('http://localhost:5500/api/user')
                .then(res => res.json())
                .then(data => {
                    state.value.users = data

            })
        }catch (err) {
            console.log("cannot fetch users", err)
                }
        }

        function selectUser(user) {
            state.value.selectedUser = user
            console.log("selected user:", user)
        }

        //In summary, { ...state.newUser } creates a shallow copy of the state.newUser object,
        //allowing us to work with a separate object that won't be modified unintentionally when making changes.
        async function createUser() {
            if (!state.value.newUser.username || !state.value.newUser.name || !state.value.value.newUser.email || !state.value.newUser.password) {
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
            if (state.value.users.find(user => user.username === state.value.newUser.username)) {
                alert("Username already exists")
                return
            }
            if (state.value.users.find(user => user.email === state.value.newUser.email)) {
                alert("Email already exists")
                return
            }
            await fetch("http://localhost:5500/api/user/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...state.value.newUser }),
            })
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
        // there is no checks for valid password and email in the update function
        async function updateUser(id) {
            if (state.value.selectedUser.password.length < 8) {
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
            await fetch(`http://localhost:5500/api/user/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user: id, ...state.value.selectedUser }),
            })
                .then(res => res.json())
                .then(data => {
                    getAllUsers()
                    clearForm()
                    alert("User updated successfully!")
                    console.log("user updated:", data)
                    console.log("user id:", id)

                }).catch((err) => {
                    console.log(err, "user not updated")
                })
        }
        async function deleteUser(id) {
            await fetch(`http://localhost:5500/api/user/${id}`, {
                method: "DELETE",
            })
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

        getAllUsers()
        // return { state, getAllUsers, selectUser, createUser, clearForm, updateUser, deleteUser, formatDate }

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