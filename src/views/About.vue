<template>
  <div class="about">
   <v-app-bar
      color="white accent-4"
      dense
      flat
      height="38px"
    >
      <v-toolbar-title class="display-2 mt-6" style="color:#043353">i-Planner</v-toolbar-title>

      <v-spacer></v-spacer>
    <v-btn color="#043353" class="mt-6 display-1" text>LOGIN</v-btn>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="n in 5"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-divider></v-divider>
    <v-content>
     <v-row no-gutters class="ml-12" >
      <v-col
        :cols="8"
      >
       <v-card height="900px" flat>
   <v-img
      class="black--text align-top"
      height="900px"
        src="@/assets/backsignup.png"
    >
      <v-card-title class="display-3 text-center" >
      <span class="red--text text--lighten-3"> Become a member</span>
      </v-card-title>
    <v-card-title class="display-3 text-center" >
      <span class="blue--text text--lighten-1" >and get more</span>
      <span class="blue-grey--text text--darken-4 display-4" > Productive</span>
      </v-card-title>
      <v-card-subtitle class=" display-1 blue-grey--text text--darken-1">Cloud Storage for free</v-card-subtitle>
    </v-img>
    <v-card-subtitle class="display-1 align-top red--text text--lighten-3">"Never leave 'till tomorrow which you can do today"</v-card-subtitle>
    <v-card-subtitle class="display-1 text-right red--text text--lighten-3">-Benjamin Franklin</v-card-subtitle>
</v-card>
      </v-col>
       <v-col
        :cols="4"
      >
       <v-card class="mt-12 pa-12" flat>
<v-card-title class="display-1" style="color:#043353">
Register Account
</v-card-title>
<v-form @submit.prevent="register" action="">
  <v-text-field
    label="E-mail"
      outlined
      v-model="email"
      required
      prepend-inner-icon="email">
      </v-text-field>

      <v-text-field
       prepend-inner-icon="person"
    label="Username"  
    v-model="username"
    required
      outlined>
      </v-text-field>

      <v-text-field prepend-inner-icon="lock"
    label="Password"
    outlined
    :type="show1 ? 'text' : 'password'"
    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
    @click:append="show1 = !show1"
      v-model="password"
      required
    >

      </v-text-field>
      <v-text-field prepend-inner-icon="lock"
    label="Re-type password"
    :type="show2 ? 'text' : 'password'"
    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
    @click:append="show2 = !show2"
    v-model="confirmpassword"
    :rules="[comparepasswords]"
    outlined>

      </v-text-field>
      <v-card-actions class="">
      <v-btn color="#043353" dark large class="mb-4 ml-auto" width="300px" @click="signup()">Sign Up</v-btn></v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text small class="text-right" router to='/'>Already have an account? Login</v-btn>
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
const db = firebase.firestore();
export default {
   name: 'About',


  data(){
    return{
        show1: false,
        show2: false,
        email:"",
        username:"",
        password:"",
        confirmpassword:"",
     
    }
    },

      methods: {
      signup(){
        const promise= firebase.auth().createUserWithEmailAndPassword(this.email,this.password);
        promise.then(cred=>{
          alert(`Account Created for ${cred.email}`);
          return db.collection('users').doc(cred.user.uid).set({
            email:this.email,
            username:this.username,
            password:this.password,
            confirmpassword:this.confirmpassword
          })
        })
        promise.catch(e=>console.log(e.message));

        //add auth listener
        firebase.auth().onAuthStateChanged(user=>{
          if(user){
            console.log(user);
            this.$router.push('/user');
          }
          else{
            console.log('not logged in');
          }
        });

      }  
  },
   

    computed:{
      comparepasswords(){
        return this.password!==this.confirmpassword ?'Passwords do not match': ''
      }
    }
      
      };
</script>
