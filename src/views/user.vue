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
    <v-container class="my-5" fluid>
       <div text-lg-h6> <v-icon>person</v-icon>PERSONAL BOARDS</div>
       <hr/>
    <v-slide-y-transition mode="out-in">
      <v-layout row align-left wrap ma-5>
        <v-flex sm3 v-for="board in boards" :key="board.slug" pa-1>       
          <v-card raised >
               <router-link   v-bind:to="{ name: 'boards', params: {slug: board.slug }}">
            <v-card-title primary-title>
                {{board.boardname}}
            </v-card-title></router-link>
            <v-card-actions>
              <v-btn  text @click="openmember(board.slug,board.boardname)"> <v-icon>group</v-icon> ADD MEMBERS</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex sm3 pa-2>
          <v-card width="300px" raised >
            <v-card-title primary-title style="flex-direction:column">
              <div class="headline">Create Boards</div>
              <div><v-form>
                <v-text-field v-model="boardname" title="name" required ></v-text-field>
              </v-form>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn text color="secondary" class="ma-auto" @click="createboard">Create</v-btn>
            </v-card-actions>

          </v-card>
        </v-flex>

      </v-layout>
    </v-slide-y-transition>
  <div text-lg-h6> <v-icon>group</v-icon>GROUP BOARDS</div>
  <hr/>
  <v-slide-y-transition mode="out-in">
 <v-layout row align-left wrap ma-5>
        <v-flex sm3 v-for="member in members" :key="member.member_id" pa-1>       
          <v-card raised >
               <router-link   v-bind:to="{ name: 'boards', params: {slug: member.board_id }}">
            <v-card-title primary-title>
                {{member.boardname}}
            </v-card-title></router-link>
            <v-card-actions>
              <v-btn  text @click="openmember(member.board_id,member.boardname)"> <v-icon>group</v-icon> ADD MEMBERS</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
 </v-layout>
    </v-slide-y-transition>
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
          <span class="headline">ADD TASK</span>
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
          <v-btn color="blue darken-1" text @click="addTask" :loading="loading">Save</v-btn>
        </v-card-actions>
      </v-card>
       </v-dialog>
  </v-row>
  <v-dialog v-model="addmember" scrollable max-width="370px">
      <v-card>
        <v-card-title>Add A Member to a Board</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 200px;">
  <v-row>
     <v-col cols="12" sm="12"> <v-text-field outlined label="Member Email" v-model="email_param" v-on:keyup="fetchUserdata(email_param)"></v-text-field></v-col>
       <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text >{{susername}}</v-btn>
          <v-btn color="blue darken-1" text @click="addmembertodb()" :loading="loading" >ADD</v-btn>
        </v-card-actions> 
      
        </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="red darken-1" text @click="addmember = false">close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
//import draggable from 'vuedraggable'
export default {

  data(){
    return{
      member_board_id :"",
      email_param:'',
      susername:'',
    drawer: false,
    dialog: false,
    title:'',
    task_id:'',
    priority:null,
    boardname:'',
    groupboardname:'',
    tempforbid:'',
    temforbname:'',
    due:null,
    slug:null,
    groupslug:null,
    bid:'',
    member_id:'',
    groupbid:'',
    username:'',
    
    addmember:false,
    isloggedin:false,
    loading:false,
    search:'',
    currentUser:false,
      date: new Date().toISOString().substr(0, 10),
      modal:false,
   items: [
      { icon: 'today', text: 'BOARDS', route:'/user' },
      { icon: 'notes', text: 'NOTES', route:'/notes' },
      
    ],

    tasks:[],
    boards:[],
    members:[],
    groupboards:[],
    inprogresstasks:[],
    completedtasks:[],
    
    }
    
  },
  methods:{
    openmember(tempforbid,temforbname){
      this.addmember=!this.addmember
      this.tempforbid=tempforbid
      this.temforbname=temforbname
    },
    fetchUserdata($value){
             db.collection('users').where('email','==', $value).get()
             .then(querySnapshot=>{
                 querySnapshot.forEach(doc=>{
                     this.susername=doc.data().username 
                     
                 })
             })
            
        },
        addmembertodb(){
            this.member_id=this.generateUUID()
            var user=firebase.auth().currentUser;
            if(user &&this.susername!=''){
            db.collection('members').doc(this.member_id).set({
                email:this.email_param,
                board_id:this.tempforbid,
                 member_id: this.member_id,
                 username:this.susername,
                 owner_id:user.uid,
                 boardname:this.temforbname,
                 
              })
              this.susername=''  
            }
        },
    fetchdata(){
      var user =firebase.auth().currentUser;
      this.currentUser=firebase.auth().currentUser.email;
      db.collection('users').doc(user.uid).collection('boards').orderBy('boardname').get().then(querySnapshot=>{
        querySnapshot.forEach(doc=>{
          const data={
            'id':doc.id,
            'boardname':doc.data().boardname,
            'slug':doc.data().slug
          }
          this.boards.push(data);
          console.log(doc.data().slug)
        })
      })
    },
    fetchmembers(){
      var user =firebase.auth().currentUser;
      this.currentUser=firebase.auth().currentUser.email;
      db.collection('members').where('email','==',user.email).get().then(querySnapshot=>{
        querySnapshot.forEach(doc=>{
          const data={
            'id':doc.id,
            'boardname':doc.data().boardname,
            'board_id':doc.data().board_id,
            'email':doc.data().email,
            'member_id':doc.data.member_id,
            'owner_id':doc.data.owner_id,
            'username':doc.data.username
          }
          this.members.push(data);
          console.log(doc.data())
        })
      })
    },
          addTask(){
       var user = firebase.auth().currentUser;
       if(user && this.title!=""){
         this.loading=true;
               db.collection('users').doc(user.uid).collection('tasks').doc().set({
                       title:this.title,
                       priority:this.priority,
                       due:this.due
                       
               })
               this.loading=false;
               console.log(this.title);
               console.log(user.email);
               this.dialog=false;
               this.title='',
                 this.priority='',
                this.due=''
       }
          },
          createboard(){
            this.bid=this.generateUUID()
            var user=firebase.auth().currentUser;
            if(user &&this.boardname!=''){
              db.collection('users').doc(user.uid).collection('boards').doc(this.bid).set({
                boardname:this.boardname,
                 slug: this.bid,
                 owner_id:user.uid
                 
              })
              this.boardname=''
              this.boards.splice(0,this.boards.length)
              this.fetchdata();
              
            }
          },
           creategroupboard(){
            this.groupbid=this.generateUUID()
            var user=firebase.auth().currentUser;
            if(user &&this.groupboardname!=''){
              db.collection('users').doc(user.uid).collection('groupboards').doc(this.groupbid).set({
                groupboardname:this.groupboardname,
                 groupslug: this.groupbid
                 
              })
              this.groupboardname=''
              this.groupboards.splice(0,this.groupboards.length)
              this.fetchgroupdata();
              
            }
          },

          logout(){
            firebase.auth().signOut().then(()=>
            {
              this.$router.push("/");
            }
            );
          },
          generateUUID () {
          let uuid = Math.floor(100000 + Math.random() * 900000).toString()
          return uuid
        },
          del(doc){
              var user = firebase.auth().currentUser;
            db.collection('users').doc(user.uid).collection('tasks').doc(doc).delete().then(function() {
            console.log('Document succesfully deleted');
                }).catch(function(error){
    console.error('Error removing document :',error)
          });
          },
          update(){

          }
  },
  mounted(){
    // this.fetchUserdata('alukoibk@icloud.com');
  },
  created(){
           this.fetchdata(); 
           this.fetchmembers();
  },
  
};
  

</script>

<style >
/* #keep .v-navigation-drawer__border {display: none;} */

.task.Low{
  border-left:4px solid #3cd1c2; 
}
.task.High{
  border-left:4px solid orange; 
}
.task.Medium{
  border-left:4px solid tomato; 
}
</style>
