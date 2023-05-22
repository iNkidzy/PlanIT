<template>
  <v-container fluid>
    <v-card min-width="70vw" height="90vh" class="scroll">
      <v-row class="justify-space-between headline">
        <v-col cols="4">
          <v-card-title>Tasks in <span class="nameFun">{{ tState.projects.name }}</span></v-card-title>
        </v-col>
        <v-col cols="2">
          <v-card-actions>
            <v-btn variant="tonal" flat color="primary" @click="createDialog = true">+ Create New</v-btn>
          </v-card-actions>
        </v-col>
        <v-divider class="border-opacity-95"></v-divider>
      </v-row>

      <v-card-item v-for="task in tState.projects.task" :key="task._id">
        <v-row class="justify-space-between headline">
          <v-col cols="10">
            <v-card :elevation="6" class="my-4 pa-6" @click="openUpdate(task)">
              <h4 class="titles"> {{ task.title }}</h4>
              <p class="taskInfos"> Created by: {{ task.author }} </p>
              <p>Created at: {{ formatDate(task.creationDate) }} </p>
            </v-card>
          </v-col>
          <v-col cols="2" class="align-self-center">
            <v-card-actions>
              <v-btn variant="tonal" flat color="error" @click="deleteTask(task._id)">Delete</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card-item>

      <!--Create project dialog-->
      <v-dialog v-model="createDialog" persistent width="500">
        <v-card>
          <v-card-title class="text-h5">
            Create new Task
          </v-card-title>
          <v-card-item>
            <v-container>
              <v-row class="justify-space-between">
                <v-col cols="6">
                  <v-text-field v-model="tState.newTitle" variant="underlined" label="Title" required></v-text-field>
                </v-col>
                <v-col cols="5">
                  <v-text-field v-model="tState.newAuthor" variant="underlined" label="Who made this?"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-textarea v-model="tState.newDescription" variant="solo" label="Description"></v-textarea>
                </v-col>
                <!-- <v-col cols="12">
                      Comments:
                      <v-textarea v-for="com in tState.projects.task.comments" :key="com.comments" variant="solo" disabled>
                      
                      </v-textarea>
                            <v-text-field
                            v-model="tState.newComments"
                            label=""
                            variant="solo"
                            @keydown.enter="createComment()"
                            >
                              
                      </v-text-field>
                         
                    </v-col> -->
              </v-row>

            </v-container>
          </v-card-item>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red-darken-1" variant="tonal" @click="createDialog = false">
              Close
            </v-btn>
            <v-btn color="green-darken-1" variant="tonal" @click="newTask()">
              Create
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!--UpdateModal-->
      <v-dialog v-model="updateDialog" persistent width="600">
        <v-card>
          <v-card-title>
            <v-row class="justify-space-between">
              <v-col cols="3">
                <span class="text-h5">{{ tasksToEdit.title }}</span>
              </v-col>
              <v-col cols="2">
                <v-btn color="red-darken-1" variant="tonal" @click="updateDialog = false">
                  Close
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row class="justify-space-between">
                <v-col cols="6">
                  <v-text-field v-model="tasksToEdit.title" variant="underlined" label="Title" required></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field v-model="tasksToEdit.author" variant="underlined" label="Who is this?"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-textarea v-model="tasksToEdit.description" variant="solo" label="Description" required></v-textarea>
                </v-col>
                <!--Comments -->
                <!-- <v-col cols="12">
                      <v-text-field
                          v-model="tState.newComments"
                          label="What are you working on?"
                          variant="solo"
                          @keydown.enter="createComment"
                        >
                          <template v-slot:append>
                            <v-fade-transition>
                              <v-icon
                                v-if="tState.newComments"
                                @click="createComment"
                              >
                                mdi-plus-circle
                              </v-icon>
                            </v-fade-transition>
                          </template>
                        </v-text-field>

                        <v-card>
                          <v-slide-y-transition
                            class="py-0"
                            group
                            tag="v-list"
                          >
                            <template v-for="(comments, i) in tState.comments" :key="`${i}-${comments.text}`">
                              <v-divider
                                v-if="i !== 0"
                                :key="`${i}-divider`"
                              ></v-divider>
                              </template>
                              </v-slide-y-transition>
                      </v-card>


                        <v-divider class="mt-4"></v-divider>

                      Comments:
                      <v-card-item v-for="com in tasksToEdit.comments" :key="com.comments">
                          {{ com.newComments }}
                      </v-card-item>
                      <v-textarea variant="solo" disabled>
                     
                      </v-textarea>
              
                            <v-text-field
                            v-model="tState.newComments"
                            label=""
                            variant="solo"
                            @keydown.enter="createComment()"
                            >
                            </v-text-field>
                         
                    </v-col> -->
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green-darken-1" variant="tonal" @click="updateTasks()">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-card>
  </v-container>
</template>
    
<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { authHeader } from '../AuthHelper.vue'


const tState = ref({
  newTitle: '',
  newAuthor: '',
  newDescription: '',
  newComments: '',
  newCreationDate: Date.now,
  projects: {},
  comments: []
})


//TODO: Fix Comments


// const createComment = () => {
//     tState.value.comments.push({
//         commments: tState.value.comments
//     })
//     tState.value.comments = null
// }


const route = useRoute()
const projectId = computed(() => route.params.id)

const createDialog = ref(false)
const updateDialog = ref(false)
const tasksToEdit = ref(null)


const openUpdate = async (data) => {
  tasksToEdit.value = data
  updateDialog.value = true
}

function formatDate(value) {
  const createdDate = new Date(value);
  return createdDate.toLocaleString();
}


const getSpecificProject = async () => {
  try {
    await fetch(`http://localhost:5500/api/projects/${projectId.value}`, authHeader())
      .then(res => res.json())
      .then(data => {
        console.log(data)
        tState.value.projects = data
      })
    console.log("Project", projectId.value)
  } catch (err) {
    console.log("ERROR", err)
  }
}

getSpecificProject()


const newTask = async () => {
  const reqPOST = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // "auth-token": state.token
    },
    body: JSON.stringify({
      title: tState.value.newTitle,
      author: tState.value.newAuthor,
      description: tState.value.newDescription,
      comments: tState.value.newComments,
      projectId: projectId.value
    })
  }
  await fetch('http://localhost:5500/api/task/create', authHeader(reqPOST))
  createDialog.value = false
  await getSpecificProject()
  clearForm()

}


const updateTasks = async () => {
  fetch(`http://localhost:5500/api/task/${tasksToEdit.value._id}`, authHeader({
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      task: tasksToEdit.value._id,
      title: tasksToEdit.value.title,
      author: tasksToEdit.value.author,
      description: tasksToEdit.value.description,
      comments: tasksToEdit.value.comments
    }),
  }))
    .then(res => res.json())
    .then(data => {
      getSpecificProject()
      updateDialog.value = false
      clearForm()
      console.log("Task updated successfully!")
      console.log("Task updated:", data)
      console.log("Task id:", tasksToEdit.value._id)



    }).catch((err) => {
      console.log(err, "Task is not updated")
    })
}

const deleteTask = async (id) => {
  await fetch(`http://localhost:5500/api/task/${id}`, authHeader({
    method: "DELETE",
  }))
    .then(res => res.json())
    .then(data => {
      getSpecificProject()
      console.log("Task deleted successfully!")
      console.log("Task deleted:", data)
    })
}

function clearForm() {
  tState.value.newTitle = ''
  tState.value.newAuthor = ''
  tState.value.newDescription = ''
}
</script>
   
<style scoped>
.scroll {
  overflow-y: scroll
}

.nameFun {
  color: darkslateblue
}

.headline {
  padding-top: 1%;
  padding-left: 1%;
}

.titles {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: darkslateblue
}
</style>
    