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
    <v-slide-y-transition mode="out-in">
      <v-layout row align-left wrap>
        <v-flex xs12><h2> {{groupboardname}} </h2></v-flex>
        <v-flex sm3 v-for="list in lists" :key="list.listname" pa-1>
          <v-card>
            <v-card-title primary-title color="primary">
              <div class="headline" >
                {{list.listname}}
              </div>
            </v-card-title>
            <v-card v-for="card in cards" :key=card.card_id>
             {{cardname}}
            </v-card>
             <v-text-field
            label="Add Card"
            outlined
            full-width
            prepend-inner-icon="add"
            v-model="cardname"
          ></v-text-field>
            <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="createCardUnderList">ADD</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex sm3 pa-2>
          <v-card width="300px">
           <v-card-title primary-title style="flex-direction:column">
              <div class="headline">Create lists</div>
              <div><v-form>
                <v-text-field v-model="listname" title="name" required></v-text-field>
              </v-form>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn text color="secondary" class="ma-auto" @click="createlist">Create</v-btn>
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
name: 'groupboards',
  data(){
    return{
    drawer: false,
    dialog: false,
    title:'',
    groupboardname:null,
    groupslug:'',
    priority:null,
    listname:'',
    board_id:'',
    groupbid:'',
    groupbidcontainer:'',
    cardname:'',
    card_id:'',


    list_id:'',
    due:null,
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

    groupboards:[],
    tasks:[],
    lists:[],
    cards:[],
    inprogresstasks:[],
    completedtasks:[],
    
    }
    
  },
    beforeRouteEnter(to,from,next){
         var user = firebase.auth().currentUser;
      db.collection('users').doc(user.uid).collection('groupgroupboards').where('groupslug', '==', to.params.groupslug).get()
      .then(querySnapshot=>{
          querySnapshot.forEach(doc=>{
              next(vm=>{
                  vm.groupboardname=doc.data().groupboardname
                  vm.groupbid=doc.data().groupslug
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
             db.collection('users').doc(user.uid).collection('groupboards').where('groupslug','==', this.$route.params.groupslug).get()
             .then(querySnapshot=>{
                 querySnapshot.forEach(doc=>{
                     this.groupboardname=doc.data().groupboardname
                     this.groupslug=doc.data().groupslug
                     this.groupbid=doc.data().groupslug
                     
                 })
             })
        },
        listTask(){
           var user = firebase.auth().currentUser;
           this.currentUser=firebase.auth().currentUser.email;
           this.groupbid=this.$route.query.groupslug;
           this.groupbid=this.$route.params.groupslug;
           db.collection('users').doc(user.uid).collection('groupboards').
           doc(this.groupbid).collection('lists').get().then(querySnapshot=>{
             querySnapshot.forEach(doc=>{
               const data={
                 'id':doc.id,
                 'listname': doc.data().listname,
                 'groupslug':doc.data().groupslug
                 
               }
              this.list_id=doc.data().groupslug;
               console.log(data);
               console.log(this.list_id);
               console.log(doc.data().groupslug);
             })
           })  
        },
         getList(){
           var user = firebase.auth().currentUser;
           this.currentUser=firebase.auth().currentUser.email;
           this.groupbid=this.$route.query.groupslug;
           this.groupbid=this.$route.params.groupslug;
           db.collection('users').doc(user.uid).collection('groupboards').doc(this.groupbid).collection('lists')
           .where('board_id','==',this.groupbid).get().then(querySnapshot=>{
             querySnapshot.forEach(doc=>{
               const data={
                 'id':doc.id,
                 'listname': doc.data().listname,
                 'groupslug':doc.data().groupslug
                 
               }
              this.lists.push(data);
                console.log(this.list_id);
               console.log(data);
               console.log(doc.data().groupslug);
             
             })
           })  
        },
        listCard(){
           var user = firebase.auth().currentUser;
           this.currentUser=firebase.auth().currentUser.email;
           this.groupbid=this.$route.query.groupslug;
           this.groupbid=this.$route.params.groupslug;
           db.collection('users').doc(user.uid).collection('groupboards').
           doc(this.groupbid).collection('lists').doc(this.list_id).collection('cards').get().then(querySnapshot=>{
             querySnapshot.forEach(doc=>{
               const data={
                 'id':doc.id,
                 'cardname': doc.data().cardname,
                 'card_id':doc.data().card_id
                 
               }
              this.list_id=doc.data().list_id;
               console.log(data);
               console.log(this.list_id);
               console.log(doc.data().groupslug);
             })
           })  
        },
         getCardUnderList(){
           var user = firebase.auth().currentUser;
           this.currentUser=firebase.auth().currentUser.email;
           this.groupbid=this.$route.query.groupslug;
           this.groupbid=this.$route.params.groupslug;
           db.collection('users').doc(user.uid).collection('groupboards').doc(this.groupbid)
           .collection('lists').doc(this.list_id).collection('cards').
           where('list_id','==',this.list_id).get().then(querySnapshot=>{
             querySnapshot.forEach(doc=>{
               const data={
                 'id':doc.id,
                 'cardname': doc.data().cardname,
                 'card_id':doc.data().card_id,
                  'list_id':doc.data().list_id
               }
              this.cards.push(data);
                console.log(this.list_id);
               console.log(data);
               console.log(doc.data().card_id);
             
             })
           }) 
        },
    testing(){
       var user = firebase.auth().currentUser;
           this.currentUser=firebase.auth().currentUser.email;
           db.collection('users').doc(user.uid).collection('groupboards')
           .doc(this.groupbidcontainer).collection('lists').orderBy('groupboardname').get().then(querySnapshot=>{
             querySnapshot.forEach(doc=>{
               const data={
                 'groupboardname': doc.data().groupboardname,
                 'groupslug':doc.data().groupslug
                 
               }
               this.groupboards.push(data);
               console.log(doc.data().groupslug);
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
          createlist(){
            var user=firebase.auth().currentUser;
            this.list_id=this.generateUUID()
            if(user &&this.listname!=''){
               db.collection('users').doc(user.uid).collection('groupboards').doc(this.groupbid).collection('lists').doc(this.list_id).set({
                listname:this.listname,
                groupslug:this.list_id,
                board_id:this.groupbid
              })
              this.listname=''
              this.lists.splice(0,this.lists.length)
              this.getCard()
             
              
            }
          },
              createCardUnderList(){
            var user=firebase.auth().currentUser;
            this.card_id=this.generateUUID()
            if(user &&this.cardname!=''){
              
               db.collection('users').doc(user.uid).collection('groupboards').doc(this.groupbid).collection('lists')
               .doc(this.list_id).collection('cards').doc(this.card_id)
               .set({
                cardname:this.cardname,
                card_id:this.card_id,
                list_id:this.list_id
              })
              
              this. cards.splice(0,this.cards.length)
              this.cardname=''
             this.getCardUnderList();
              console.log("success");
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
    this.listTask();
    this.getList();
    this.getCardUnderList();
  },
   created(){
          this.listTask();
          this.listCard();
         
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