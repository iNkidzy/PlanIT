<template>
    <v-container fluid>
        <v-row class="justify-end">
            <v-col cols="11">
              <h2 class="btns text-h4 ps-4">Plan<span class="text-green">IT</span></h2>
            </v-col>
            <v-col cols="1" class="align-self-end">
                <v-btn class="btns" variant="tonal" @click="back()" >Back</v-btn>
            </v-col>
        </v-row> 

        <v-row class="justify-space-between">

            <v-col cols="5">
                <div style="margin-bottom:20%">
                    <img src="../assets/nachilogo2.png" width="520" height="320"/>
                
                    <h5 class="text-white-smoke text-h5 ps-4"> 
                        Created by this.developers  
                        <br><br>
                        It all started this week :D 
                        <br><br>
                        Here is our links to the book series of 
                        <br>
                        "How to slay in a day":
                        <br><br>
                        <a href="https://github.com/iNkidzy/">Book 1</a>
                        <br><br>
                        <a href="https://github.com/Chililove">Book 2</a>
                    </h5>
            </div>
            </v-col>
            <v-col cols="7" class="align-self-end">
                <img src="../assets/nachi.png" width="900" height="820"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { useRouter} from 'vue-router'

const router = useRouter()
const back = () => {router.push('/')}
</script>

<style scoped>
.btns{
  color: white; 
}

</style>