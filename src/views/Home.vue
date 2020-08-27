<template>
  <div class="home">
   <v-app-bar
      color="white accent-4"
      dense
      flat
      height="38px"
      
    >
      <v-toolbar-title class="display-2 mt-6" style="color:#043353" >i-Planner</v-toolbar-title>

      <v-spacer></v-spacer>
    <v-btn color="#043353" class="mt-6 display-1" text>Sign Up</v-btn>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        
      </v-menu>
    </v-app-bar>
    <v-divider></v-divider>
    <v-content>
     <v-row no-gutters class="ml-12"  >
      <v-col
        :cols="8"
      >
       <v-card height="800px" flat>
   <v-img
      class="black--text align-top"
      height="700px"
        src="@/assets/backlogin.png"
    >
      <v-card-title class="display-3 text-center" >
      <span class="blue--text text--lighten-1" > Thinking</span> 
      <span class="red--text text--lighten-3"> Task Management?</span>
      </v-card-title>
    <v-card-title class="display-3 text-center" >
      <span class="blue--text text--lighten-1" >Think</span>
      <span class="blue-grey--text text--darken-4 display-4" > i-Planner</span>
      </v-card-title>
      <v-card-subtitle class=" display-1 blue-grey--text text--darken-1">With 100% Cloud Storage guranteed</v-card-subtitle>
    </v-img>
    <v-card-subtitle class="display-1 align-top red--text text--lighten-3">your greatest resource is your time"</v-card-subtitle>
    <v-card-subtitle class="display-1 text-right red--text text--lighten-3">-Brian Tracy</v-card-subtitle>
</v-card>
      </v-col>
       <v-col
        :cols="4"
      >
       <v-card class="mt-12 pa-12" flat>
<v-card-title class="display-5" style="color:#043353">
Login to Your Account
</v-card-title>
<v-form @submit.prevent="authuser" action=" ">
  <v-text-field
    label="E-mail"
      outlined
      v-model="email"
      prepend-inner-icon="email">
      </v-text-field>

      <v-text-field
    label="Username"
      outlined
      v-model="username"
      prepend-inner-icon="person">
      </v-text-field>

      <v-text-field
       prepend-inner-icon="lock"
    label="Password"
    :type="show1 ? 'text' : 'password'"
    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="show1 = !show1"
      v-model="password"
      outlined>
      </v-text-field>
      <v-checkbox label="Remember Me"></v-checkbox>
      <v-card-actions class="">
      <v-btn color="#043353" dark large class="mb-4 ml-auto" width="300px" @click="signin()">Login</v-btn></v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text small class="text-right" router to='/about'>Don't have an account? Join us</v-btn>
</v-form>
</v-card>
      </v-col>
    </v-row>
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src

import firebase from "../firebase";
import 'firebase/auth'
export default {
    name: 'Home',
  data(){
    return{
        show1: false,
        email:"",
        username:"",
        password:"",
       usersData:[],
        items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ],
    }

  },
  methods: {
       signin(){
       firebase.auth().signInWithEmailAndPassword(this.email,this.password).
       then(user=>{
         console.log(`You are Logged in as ${user.email}`);

        this.$router.push('/user');
       },
       err=>{alert(err.message); }
       );

       }
  

 
}
};
</script>
