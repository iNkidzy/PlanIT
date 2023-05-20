<template>
    <v-container fluid>
          <v-card  min-width="70vw" height="90vh" class="scroll">
                <v-row class="justify-space-between headline">
                  <v-col cols="4">
                    <v-card-title>Tasks in <span class="nameFun">{{ tState.projects.name }}</span></v-card-title>
                  </v-col>
                  <v-col cols="2" >
                    <v-card-actions>
                      <v-btn variant="tonal" flat color="primary" @click="createDialog = true">+ Create New</v-btn>
                    </v-card-actions>
                  </v-col>
                  <v-divider class="border-opacity-95"></v-divider>
                </v-row>
  
              <v-card-item v-for="task in tState.projects.task" :key="task._id">
                <v-card :elevation="isHovering ? 24 : 6" class="my-4 pa-6">
                <v-row class="justify-space-between headline">
                   
                    <h4 class="titles">{{ task.title }}</h4>
                        <v-col cols="6">
                        <p class="taskInfos"> Created by: {{ task.author }} </p>
                        <p>Created at: {{ task.creationDate }} </p>
                          

                    <!-- <v-hover v-slot="{ isHovering, props }">
                             <div
                            v-bind="props"
                            :class="`elevation-${isHovering ? 24 : 6}`"
                            class="mx-auto pa-6 transition-swing"
                        >
                        Class based elevation
                        </div>
                    </v-hover> -->

                    </v-col>          
                  <v-col cols="2" class="align-self-end">
                    <v-card-actions>
                      <v-btn variant="tonal" flat color="info" @click="openUpdate(task)">Edit</v-btn>
                      <v-btn variant="tonal" flat color="error" @click="deleteTask(task._id)">Delete</v-btn>
                    </v-card-actions>
                  </v-col>       
                  
                </v-row>
            </v-card>
              </v-card-item>
            
  
                  <v-label>I am Empty .. Please create new Task</v-label>
  
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
                      <v-text-field v-model="tState.newTitle" variant="underlined" label="Title"
                        required></v-text-field>
                    </v-col>
                    <v-col cols="5">
                      <v-text-field v-model="tState.newAuthor" variant="underlined" label="Who made this?"
                        ></v-text-field>
                    </v-col>
                      </v-row>
                      <v-row>
                    <v-col cols="12">
                      <v-textarea v-model="tState.newDescription" variant="solo" label="Description"
                        ></v-textarea>
                    </v-col>
                    <v-col cols="12">
                      Comments:
                      <v-textarea v-model="tState.newComments" variant="solo" disabled>
                      
                      </v-textarea>
                            <v-text-field
                            v-model="newComments"
                            label=""
                            variant="solo"
                            >
                               <!--   @keydown.enter="createComment()"-->
                            </v-text-field>
                         
                    </v-col>
                      </v-row>
                      <!-- <v-col cols="12">
                        <v-text-field 
                        v-model="tState.newTitle" 
                        label="Please enter a title for your Task"
                        hide-details="auto" 
                        variant="underlined"
                        required
                        ></v-text-field>
  
                      </v-col> -->
                    

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
                <span class="text-h5">Update your Task</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row class="justify-space-between">
                    <v-col cols="6">
                      <v-text-field v-model="tasksToEdit.title" variant="underlined" label="Title"
                        required></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field v-model="tasksToEdit.author" variant="underlined" label="Who is this?"
                        ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-textarea v-model="tasksToEdit.description" variant="solo" label="Description"
                        ></v-textarea>
                    </v-col>
                    <v-col cols="12">
                      Comments:
                      <v-textarea v-model="tasksToEdit.comments" variant="solo" disabled>
                      
                      </v-textarea>
              
                            <v-text-field
                            v-model="newComment"
                            label=""
                            variant="solo"
                            @keydown.enter="createComment()"
                            >
                            </v-text-field>
                         
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red-darken-1" variant="tonal" @click="updateDialog = false">
                  Close
                </v-btn>
                <v-btn color="green-darken-1" variant="tonal" @click="updateTasks()" click="updateModal = false">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
  
          </v-card>
    </v-container>
  </template>
    
  <script setup>
  import { ref,computed } from 'vue'
  import { useRoute } from 'vue-router'
  
      const tState = ref ({
        newTitle: '',
        newAuthor: '',
        newDescription: '',
        newComments: '',
        newCreationDate: Date.now,
        projects: [{}]
        //newComment: ''
      })
  
    // const createComment = () => {
    //     tState.value.tasks.comments.push({
    //         commments: tState.value.newComment
    //     })
    //     tState.value.newTask = null
    // }

  
      const createDialog = ref(false)
      const updateDialog = ref(false)
      
      const tasksToEdit = ref(null)
    
      
      const openUpdate = async (data) => {
          tasksToEdit.value = data
          updateDialog.value = true
  }
  
  
      const route = useRoute()
      const projectId = computed(() => route.params.id)
      
     // const projects = ref({})
  
      const getSpecificProject = async () => {
          try {
              await fetch(`http://localhost:5500/api/projects/${projectId.value}`)
                  .then(res => res.json())
                  .then(data => {
                    console.log(data)
                    tState.value.projects = data
                   })
                   console.log("Project",projectId.value)
          } catch (err) {
              console.log("ERROR",err)
          }
      }
      
      getSpecificProject()
  
      const getTasks = async () => {
          try {
            await fetch('http://localhost:5500/api/task/' + projectId.value)
                //.then(res => res.json())
                .then(data => {
              tState.value.projects.task = data
              })
              console.log("getTask:", tState.value.projects.task)
          } catch (err) {
            console.log("GeTTaskERR",err)
          }
        }
        getTasks()
  
  
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
          // users: pState.value.newUsers,
          // createdAt: pState.value.newCreatedAt,
        })
      }
    await fetch('http://localhost:5500/api/task/create', reqPOST)
        .then(createDialog.value = false)
        .then(getTasks())
  }
  
  
  const updateTasks = async () => {
        fetch(`http://localhost:5500/api/task/${tasksToEdit.value._id}`, {
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
        })
          .then(res => res.json())
          .then(data => {
            getTasks()
            updateDialog.value = false
            console.log("Task updated successfully!")
            console.log("Task updated:", data)
            console.log("Task id:", tasksToEdit.value._id)
  
  
  
      }).catch((err) => {
        console.log(err, "Task is not updated")
      })
  }
  
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5500/api/task/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => {
        getTasks()
        console.log("Task deleted successfully!")
        console.log("Task deleted:", data)
      })
  }
  
  
  
    </script>
  
   
    
  <style lang="scss" scoped>
  .scroll {
  overflow-y: scroll
}
   .nameFun {
      color: darkslateblue
    }
  
    .headline{
      padding-top: 1%;
      padding-left: 1%;
    }

    .titles{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        color: darkslateblue
    }
  </style>
    