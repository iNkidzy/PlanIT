<template>
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
                <tr v-for="user in state.users" :key="user.id">
                    <td>{{ user.username }}</td>
                    <td>{{ user.email }}</td>
                </tr>
            </tbody>
        </v-table>

    </div>
</template>

<script>
import { reactive } from 'vue';

export default {
    setup() {
        const state = reactive({
            users: {}
        })

        function getAllUsers() {
            fetch("http://localhost:5500/api/user")
                .then(res => res.json())
                .then(data => {
                    state.users = data
                })
        }
        getAllUsers()
        return { state, getAllUsers }
    }

}
</script>