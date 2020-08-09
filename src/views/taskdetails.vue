<template>
 <div id="app">
  <v-app id="inspire">
    <v-app-bar
      app
      clipped-left
      color="grey-lighten-4"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <span class="title ml-3 mr-5">I&nbsp;<span class="font-weight-light">Planner</span></span>
      <v-spacer></v-spacer>
       <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        ><v-icon>notifications</v-icon></v-btn>
      </template>
      <span>Reminders</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          v-on:click="logout"
        ><v-icon>logout</v-icon></v-btn>
      </template>
      <span>Logout</span>
    </v-tooltip>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      color="#043353"
    >
      <v-list
        dense
       color="#043353"
      >
        <template v-for="(item, i) in items">
          <v-layout
            v-if="item.heading"
            :key="i"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex
              xs6
              class="text-xs-right"
            >
              <v-btn
                small
                text
              >edit</v-btn>
            </v-flex>
          </v-layout>
          <v-list-item
            v-else
            :key="i"
              router :to=item.route
          >
            <v-list-item-action>
              <v-icon color="grey">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text mb-5">
                <span class="headline .font-weight-bold">{{ item.text }} </span>
                <v-btn icon> <v-icon color="grey">add</v-icon></v-btn>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    
    <v-container>
      <v-row>
        <v-col  
        cols="4"
                sm="2"
                md="1"
                class="mr-2">
          <v-avatar
            slot="offset"
           
            size="100"
          >
            <img
              src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
            >
          </v-avatar>
        </v-col>
      <v-col class="mt-1 font-weight-bold">
        <p style="color:#043353">Hi, </p>
         <span class="mt-0" style="color:#B79D9D">Welcome back to i-Planner</span>

      </v-col>
      <v-spacer></v-spacer>
      <v-col><span class="display-1" style="color:#043353">10:45 AM</span>
      <br><div class="headline" style="color:#043353"> 
        Friday, 10th January 2020
      </div>
      </v-col>
      </v-row>
      <template>
  <v-card
    class="mx-auto"
    max-width="700"
    max-height="400"
    tile
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>{{task_id}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title>{{title}}</v-list-item-title>
        <v-list-item-subtitle>{{priority}}t</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title>{{due}}</v-list-item-title>
        <v-list-item-subtitle>
          {{due}},
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          consectetur adipiscing elit.
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-btn @click="back()" large color="primary">Back</v-btn>
       <v-btn @click="deltask()" color="error">Delete</v-btn>
    </v-card-actions>
  </v-card>
   <v-row justify="end" ma-2>
   <v-dialog v-model="dialog" persistent max-width="600px">
         <template v-slot:activator="{ on, attrs }">
     <v-btn class="mx-2" fab dark color="indigo"
      v-bind="attrs"
      v-on="on"
          >
      <v-icon dark
          >edit</v-icon>
    </v-btn>
         </template>
          <v-card>
        <v-card-title>
          <span class="headline">EDIT TASK</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Title*" required v-model="title"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                v-model="priority"
                  :items="['High', 'Medium', 'Low']"
                  label="Priority*"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Picker in dialog"
            prepend-icon="event"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
        </v-date-picker>
      </v-dialog>
    </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="update" :loading="loading">Save</v-btn>
        </v-card-actions>
      </v-card>
       </v-dialog>
   </v-row>
</template>
    </v-container>
   
  </v-app>
</div>
</template>


<script>
import firebase from "../firebase";
import 'firebase/auth'
const db = firebase.firestore();
export default {
    name:'taskdetails',
    data(){
      return{
          drawer: null,
          dialog: false,
          loading:false,
          task_id:null,
          title:null,
          priority:null,
          due:null,
          items: [
      { icon: 'today', text: 'TASKS', route:'/user' },
      { icon: 'notes', text: 'NOTES', route:'/notes' },
      
    ],
      }  
    },
    beforeRouteEnter(to,from,next){
         var user = firebase.auth().currentUser;
      db.collection('users').doc(user.uid).collection('tasks').where('task_id', '==', to.params.task_id).get()
      .then(querySnapshot=>{
          querySnapshot.forEach(doc=>{
              next(vm=>{
                  vm.task_id=doc.data().task_id
                  vm.title=doc.data().title
                  vm.priority=doc.data().priority
                  vm.due=doc.data().due
              })
          })
      })
    },
    watch:{
        '$route': 'fetchdata'
    },
    methods:{
        fetchdata(){
            var user = firebase.auth().currentUser;
             db.collection('users').doc(user.uid).collection('tasks').where('task_id','==', this.$route.params.task_id).get()
             .then(querySnapshot=>{
                 querySnapshot.forEach(doc=>{
                     this.task_id=doc.data().task_id
                     this.title=doc.data().title
                     this.priority=doc.data().priority
                     this.due=doc.data().due
                 })
             })
        },
           deltask(){
        if(confirm('Are You Sure?')){
            var user = firebase.auth().currentUser;
            db.collection('users').doc(user.uid).collection('tasks').where('task_id','==', this.$route.params.task_id).get()
             .then(querySnapshot=>{
                 querySnapshot.forEach(doc=>{
                  doc.ref.delete();
                  this.$router.push('/user')
                 })
             })
        }
    },
     logout(){
            firebase.auth().signOut().then(()=>
            {
              this.$router.push("/");
            }
            );
          },
    update(){
        var user = firebase.auth().currentUser;
             db.collection('users').doc(user.uid).collection('tasks').where('task_id','==', this.$route.params.task_id).get()
             .then(querySnapshot=>{
                 querySnapshot.forEach(doc=>{
                    doc.ref.update({
                        tasks_id:this.task_id,
                        title:this.title,
                        priority:this.priority,
                        due:this.due
                        

                    })
                    .then(()=>{
                        this.dialog=false
                    })
                 })
             })
    },
    back(){
        this.$router.push('/user')
    }
    },
 
}
</script>