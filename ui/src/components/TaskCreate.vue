<template>
   <v-dialog v-model="createDialog" persistent width="500">
            <v-card>
                <v-card-title class="text-h5">
                  Create new Task
                </v-card-title>
                <v-card-item>
                  <v-container>
                      <v-row class="justify-space-between">
                    <v-col cols="6">
                      <v-text-field v-model="createState.newTitle" variant="underlined" label="Title"
                        required></v-text-field>
                    </v-col>
                    <v-col cols="5">
                      <v-text-field v-model="createState.newAuthor" variant="underlined" label="Who made this?"
                        ></v-text-field>
                    </v-col>
                      </v-row>
                      <v-row>
                    <v-col cols="12">
                      <v-textarea v-model="createState.newDescription" variant="solo" label="Description"
                        ></v-textarea>
                    </v-col>
                    <v-col cols="12">
                      Comments:
                      <v-textarea v-model="createState.newComments" variant="solo" disabled>
                      
                      </v-textarea>
                            <v-text-field
                            v-model="newComments"
                            label=""
                            variant="solo"
                            @keydown.enter="createComment()"
                            >
                              
                            </v-text-field>
                         
                        </v-col>
                      </v-row>

                  </v-container>
                </v-card-item>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red-darken-1" variant="tonal" @click="closeModal()">
                    Close
                  </v-btn>
                  <v-btn color="green-darken-1" variant="tonal" @click="newTask()">
                    Create
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
// defineProps({
//   createDialog: Boolean
// })
const emits = defineEmits(['close'])

const createState = ref ({
        newTitle: '',
        newAuthor: '',
        newDescription: '',
        newComments: ''
      })
   
// const createDialog = ref(false)
const route = useRoute()
const projectId = computed(() => route.params.id)
         
const closeModal = () => {
  emits('close')
}

const newTask = async () => {
    const reqPOST = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // "auth-token": state.token
      },
      body: JSON.stringify({
        title: createState.value.newTitle,
        author: createState.value.newAuthor,
        description: createState.value.newDescription,
        comments: createState.value.newComments,
        projectId: projectId.value
        // users: pState.value.newUsers,
      })
    }
    await fetch('http://localhost:5500/api/task/create', reqPOST)
     closeModal()
    await getSpecificProject()
}

const getSpecificProject = async () => {
    try {
        await fetch(`http://localhost:5500/api/projects/${projectId.value}`)
            .then(res => res.json())
            .then(data => {
              console.log(data)
              createState.value.projects = data
              })
              console.log("Project",projectId.value)
    } catch (err) {
        console.log("ERROR",err)
    }
}
      
getSpecificProject()
  
</script>

<style lang="scss" scoped>

</style>