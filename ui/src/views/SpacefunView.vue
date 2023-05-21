<template>
<v-container>
    <v-row class="justify-center">
          <v-card min-width="70vw" height="90vh" class="scroll">
            <v-row class="justify-space-between headline">
              <v-col cols="3">
                <v-card-title>My SpaceFuns</v-card-title>
              </v-col>
              <v-col cols="2">
                <v-card-actions>
                  <v-btn variant="tonal" flat color="primary" @click="dialog = true">+ Create New</v-btn>
                </v-card-actions>
              </v-col>
              <v-divider class="border-opacity-95"></v-divider>
            </v-row>

            <v-card-item v-for="spacefun in state.spacefuns" :key="spacefun._id">
              <v-row class="justify-space-between headline">
                <v-col cols="3">
                  <router-link :to="`/projects/${spacefun._id}`">
                    {{ spacefun.name }}
                  </router-link>
                </v-col>
                <v-col cols="3" class="align-self-end">
                  <v-card-actions>
                    <v-btn variant="tonal" flat color="info" @click="openUpdateModal(spacefun)">Edit</v-btn>
                    <v-btn variant="tonal" flat color="error" @click="deleteSpaceFun(spacefun._id)">Delete</v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card-item>
       
          </v-card>


        <!--Create SpaceFun Dialog-->
        <v-dialog v-model="dialog" persistent width="500">

          <v-card>
            <v-card-title class="text-h5">
              Create new SpaceFun
            </v-card-title>
            <v-card-item>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="state.newName" label="Please enter a title for your SpaceFun"
                      hide-details="auto" variant="underlined"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-item>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red-darken-1" variant="tonal" @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="green-darken-1" variant="tonal" @click="newSpaceFun()">
                Create
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>




        <!--UpdateModal-->
        <v-dialog v-model="updateModal" persistent width="600">
          <v-card>
            <v-card-title>
              <span class="text-h5">Update your SpaceFun</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="spaceFunToEdit.name" variant="underlined" label="Please eneter the new name"
                      required></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red-darken-1" variant="tonal" @click="updateModal = false">
                Close
              </v-btn>
              <v-btn color="green-darken-1" variant="tonal" @click="updateSpaceFun()">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-row>
  </v-container>
</template>


  
<script setup>

import { ref } from 'vue'

const state = ref({
  spacefuns: {},
  newName: ''
})

const dialog = ref(false)
const updateModal = ref(false)



const fetchSpaceFun = async () => {
  try {
    await fetch('http://localhost:5500/api/spaceFun')
      .then(res => res.json())
      .then(data => {
        state.value.spacefuns = data
      })
  } catch (err) {
    console.log(err)
  }
}
fetchSpaceFun()

const deleteSpaceFun = async (id) => {
  await fetch(`http://localhost:5500/api/spaceFun/${id}`, {
    method: "DELETE",
  })
    .then(res => res.json())
    .then(data => {
      fetchSpaceFun()
      console.log("SpaceFun deleted successfully!")
      console.log("SpaceFun deleted:", data)
    })
}

const newSpaceFun = async () => {
  const reqPOST = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // "auth-token": state.token
    },
    body: JSON.stringify({
      name: state.value.newName
    })
  }
   await fetch('http://localhost:5500/api/spaceFun/create', reqPOST)
    .then(dialog.value = false)
    .then(() => {fetchSpaceFun()})
    

}

const spaceFunToEdit = ref(null)

const openUpdateModal = async (payload) => {
  spaceFunToEdit.value = payload
  updateModal.value = true
}

const updateSpaceFun = async () => {
  fetch(`http://localhost:5500/api/spaceFun/${spaceFunToEdit.value._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ spacefun: spaceFunToEdit.value._id, name: spaceFunToEdit.value.name }),
  })
    .then(res => res.json())
    .then(data => {
      fetchSpaceFun()
      updateModal.value = false
      console.log("SpaceFun updated successfully!")
      console.log("spacefun updated:", data)
      console.log("spacefun id:", spaceFunToEdit.value._id)



    }).catch((err) => {
      console.log(err, "spacefun not updated")
    })
}


</script>
  
<style scoped>
.scroll {
  overflow-y: scroll
}
.headline{
    padding-top: 1%;
    padding-left: 1%;
  }
</style>
 