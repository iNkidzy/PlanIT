<template>
    <v-btn>Create a new user account</v-btn>
    <div>
    <div>
        <v-table fixed-header height="300px">
            <thead>
                <tr>
                    <th class="text-left">
                        username
                    </th>
                    <th class="text-left">
                        email
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
</div>
</template>

<script>
import { reactive } from 'vue';

export default {
    setup() {
        const state = reactive({
            users: {},
            selectedUser: null
        })

        function getAllUsers() {
            fetch("http://localhost:5500/api/user")
                .then(res => res.json())
                .then(data => {
                    state.users = data
                }) 
        }

        function selectUser (user){
state.selectedUser = user
            console.log("selected user:", user)
        }


        getAllUsers()
        return { state, getAllUsers, selectUser }
    }

}
</script>