<template>
  <v-container fluid>
        <v-card  min-width="70vw" height="90vh" class="scroll">
              <v-row class="justify-space-between headline">
                <v-col cols="4">
                  <v-card-title>Projects in <span class="nameFun">{{ state.spacefun.name }}</span></v-card-title>
                </v-col>
                <v-col cols="2" >
                  <v-card-actions>
                    <v-btn variant="tonal" flat color="primary" @click="createDialog = true">+ Create New</v-btn>
                  </v-card-actions>
                </v-col>
                <v-divider class="border-opacity-95"></v-divider>
              </v-row>

            <v-card-item v-for="project in state.spacefun.project" :key="project._id">
              <v-row class="justify-space-between headline">
                <v-col cols="3" class="sizeName">
                  <router-link :to="`/tasks/${project._id}`">
                    {{ project.name }}
                  </router-link>
                </v-col>
                <v-col cols="4" class="align-self-end">
                  <v-card-actions>
                    <v-btn variant="tonal" flat color="success" @click="inviteUsers(project._id)">Invite</v-btn>
                    <v-btn variant="tonal" flat color="info" @click="openUpdate(project)">Edit</v-btn>
                    <v-btn variant="tonal" flat color="error" @click="deleteProject(project._id)">Delete</v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card-item>
          
                      <!--Create project dialog-->
      <v-dialog v-model="createDialog" persistent width="500">
            <v-card>
              <v-card-title class="text-h5">
                Create new Project
              </v-card-title>
              <v-card-item>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field 
                      v-model="state.newName" 
                      label="Please enter a title for your project"
                      hide-details="auto" 
                      variant="underlined"
                      required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-item>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red-darken-1" variant="tonal" @click="createDialog = false">
                  Close
                </v-btn>
                <v-btn color="green-darken-1" variant="tonal" @click="newProject()">
                  Create
                </v-btn>
              </v-card-actions>
            </v-card>
      </v-dialog>

                        <!--Update Dialog-->
        <v-dialog v-model="updateDialog" persistent width="600">
          <v-card>
            <v-card-title>
              <span class="text-h5">Update your Project</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="projectToEdit.name" variant="underlined" label="Please eneter the new name"
                      required></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red-darken-1" variant="tonal" @click="updateDialog = false">
                Close
              </v-btn>
              <v-btn color="green-darken-1" variant="tonal" @click="updateProject()">
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
import { useRoute } from 'vue-router';
import { authHeader } from '../AuthHelper.vue';

    const state = ref ({
      newName: '',
      spacefun: {}
    })

    const createDialog = ref(false)
    const updateDialog = ref(false)
    
    const projectToEdit = ref(null)
    
    const openUpdate = async (data) => {
        projectToEdit.value = data
        updateDialog.value = true
}

    const route = useRoute()
    const spacefunId = computed(() => route.params.id)

    const getSpecificSpaceFun = async () => {
        try {
            await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/spaceFun/${spacefunId.value}`, authHeader())
                .then(res => res.json())
                .then(data => {
                  console.log(data)
                    state.value.spacefun = data
                 })
                 console.log("Project",spacefunId.value)
        } catch (err) {
            console.log(err)
        }
    }
    
    getSpecificSpaceFun()

    const newProject = async () => {
        const reqPOST = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: state.value.newName,
            spacefunId: spacefunId.value
          })
        }
          await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/projects/create`, authHeader(reqPOST))
          createDialog.value = false
          await getSpecificSpaceFun()
    }

  const updateProject = async () => {
      fetch(`${import.meta.env.VITE_BASE_API_URL}/api/projects/${projectToEdit.value._id}`, authHeader({
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ project: projectToEdit.value._id, name: projectToEdit.value.name }),
      }))
        .then(res => res.json())
        .then(data => {
          getSpecificSpaceFun()
          updateDialog.value = false
          console.log("Project updated successfully!")
          console.log("Project updated:", data)
    }).catch((err) => {
      console.log(err, "Project not updated")
    })
}

const deleteProject = async (id) => {
  await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/projects/${id}`, authHeader( {
    method: "DELETE",
  }))
    .then(res => res.json())
    .then(data => {
      getSpecificSpaceFun()
      console.log("Projects deleted successfully!")
      console.log("Projects deleted:", data)
    })
}

</script>
  
<style scoped>
.sizeName{
  font-size: 20px
}
 .nameFun {
    color: darkslateblue
  }

  .scroll {
  overflow-y: scroll
}
  .headline{
    padding-top: 1%;
    padding-left: 1%;
  }
</style>
  