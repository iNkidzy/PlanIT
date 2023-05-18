<template>
<v-layout >
  <v-container>
    <v-row>
      <v-col>
        <h1>SpaceFun Details</h1>

          <h4> Name: {{ spacefun.name }}</h4>
          <p> ProjectId: {{ spacefun.project }}</p>

      </v-col>
    </v-row>
  </v-container>
</v-layout>
  
    <!-- <tr v-for="(spacefun, index) in spacefuns" :key="index">
      <td>{{spacefun.name}}</td>
      <td>{{spacefun.project}}</td>
    </tr> -->

    <!-- <div>
      <h1>SpaceFun Details:</h1>
      <hr />
      <div v-for="project in spacefuns" :key="project._id">
        <h4>ProjectId: {{ project._id }}</h4>
        </div>
    </div> -->
  </template>
  
<script setup>
import { ref,computed } from 'vue'
import { useRoute } from 'vue-router';

    // const state = ref ({
    //   spacefuns: {},
    //   project: ''
    // })

    const route = useRoute()
    const spacefunId = computed(() => route.params.id)




    const spacefun = ref({})
    const getSpecificSpaceFun = async () => {
        try {
            await fetch(`http://localhost:5500/api/spaceFun/${spacefunId.value}`)
                .then(res => res.json())
                .then(data => {
                  console.log(data)
                    spacefun.value = data
                 })
                 console.log(spacefunId.value)
        } catch (err) {
            console.log(err)
        }
    }
    
    getSpecificSpaceFun()




  // import SpaceFun from '../modules/SpaceFun'
  
  // const { state, updateSpaceFun, spacefun, getSpecificSpaceFun } = SpaceFun()
  
  // getSpecificSpaceFun()
  </script>
  
  <style lang="scss" scoped></style>
  