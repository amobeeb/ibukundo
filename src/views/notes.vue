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
        <p style="color:#043353">Hi, {{currentUser}}</p>
         <span class="mt-0" style="color:#B79D9D">Welcome back to i-Planner</span>

      </v-col>
      <v-spacer></v-spacer>
      <v-col><span class="display-1" style="color:#043353">10:45 AM</span>
      <br><div class="headline" style="color:#043353"> 
        Friday, 10th January 2020
      </div>
      </v-col>
      </v-row>
        
         <v-text-field
      class="ml-5 mb-5"
        solo-inverted
        flat
        hide-details
        label="Search all notes and notes"
        prepend-inner-icon="search"
      ></v-text-field>
      <span class="ml-5" style="color:#043353">NOTES</span>
     
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-flex md12>
        <v-card
        shaped
          :elevation="hover ? 24 : 6"
          class="mx-6 pa-6 mt-6 ml-6"
          md6
          v-for="note in notes" :key="note.id"
          :class="`note ${note.priority}`"
        >
         <div> {{note.note_id}} {{note.title}}</div>
         <div class="h4 mt-5"> <v-icon>today</v-icon>{{note.content}}</div>
          <v-row
          align="center"
          justify="end"
        >
      <router-link class="secondary-content" 
      v-bind:to="{ name: 'notedetails',
       params: { note_id: note.note_id }}"><v-icon> edit</v-icon></router-link>
        </v-row>
        </v-card>
        </v-flex>
      </template>
    </v-hover>
    <template>
     <v-row justify="end" ma-2>
       <v-dialog v-model="dialog" persistent max-width="600px">
         <template v-slot:activator="{ on, attrs }">
     <v-btn class="mx-2" fab dark color="indigo"
      v-bind="attrs"
      v-on="on"
          >
      <v-icon dark
          >mdi-plus</v-icon>
    </v-btn>
         </template>
          <v-card>
        <v-card-title>
          <span class="headline">ADD note</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="ID*" required v-model="note_id"></v-text-field>
                <v-text-field label="Title*" required v-model="title"></v-text-field>
                   <v-textarea label="Content*" required v-model="content"></v-textarea>
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
          <v-btn color="blue darken-1" text @click="addnote" :loading="loading">Save</v-btn>
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
// @ is an alias to /src
import firebase from "../firebase";
import 'firebase/auth'
const db = firebase.firestore();
export default {

  data(){
    return{
    drawer: null,
    dialog: false,
    title:'',
    note_id:'',
    content:'',
    priority:'',
    username:'',
    isloggedin:false,
    loading:false,
    currentUser:false,
      date: new Date().toISOString().substr(0, 10),
      modal:false,
   items: [
      { icon: 'today', text: 'TASKS', route:'/user' },
      { icon: 'notes', text: 'NOTES', route:'/notes' },
      
    ],

    notes:[],
    }
    
  },
  methods:{
          addnote(){
       var user = firebase.auth().currentUser;
       if(user && this.title!=""){
         this.loading=true;
               db.collection('users').doc(user.uid).collection('notes').doc().set({
                       note_id:this.note_id,
                       title:this.title,
                       priority:this.priority,
                       content:this.content
                       
               })
               this.loading=false;
               console.log(this.title);
               console.log(user.email);
               this.dialog=false;
               this.title='',
                 this.priority='',
                this.content='',
                this.note_id=''
       }
          },
          logout(){
            firebase.auth().signOut().then(()=>
            {
              this.$router.push("/");
            }
            );
          },
          del(doc){
              var user = firebase.auth().currentUser;
            db.collection('users').doc(user.uid).collection('notes').doc(doc).delete().then(function() {
            console.log('Document succesfully deleted');
                }).catch(function(error){
    console.error('Error removing document :',error)
          });
          },
          update(){

          }
  },
  created(){
           var user = firebase.auth().currentUser;
           this.currentUser=firebase.auth().currentUser.email;
           db.collection('users').doc(user.uid).collection('notes').orderBy('title').get().then(querySnapshot=>{
             querySnapshot.forEach(doc=>{
               const data={
                 'id':doc.id,
                 'note_id': doc.data().note_id,
                 'title':doc.data().title,
                 'priority':doc.data().priority,
                 'content':doc.data().content
               }
               this.notes.push(data);
             })
           })
              
  }
};
  

</script>

<style >
/* #keep .v-navigation-drawer__border {display: none;} */

.note.Low{
  border-left:4px solid #3cd1c2; 
}
.note.High{
  border-left:4px solid orange; 
}
.note.Medium{
  border-left:4px solid tomato; 
}
</style>
