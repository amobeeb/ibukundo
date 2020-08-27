 <template>
 <div id="app">
  <v-app id="inspire">
    <v-app-bar
      app
      clipped-left
      color="grey-lighten-4"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <span class="title ml-3 mr-5">I&nbsp;<span class="font-weight-light">Planner {{ set_reminder()   }}</span></span>
      <v-spacer></v-spacer>
       <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          color="#043353"
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
          color="#043353"
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
      <div class="display-2"> {{boardname}} </div>
      <hr>
      
    <v-layout>
      <v-flex xs9>
      <v-layout row wrap>
        <v-flex sm3 v-for="list in lists" :key="list.listname" px-2 pt-5 >
          <v-card @dragover="setdroppinglist($event,list)" color="#043353" :class="{'green lighten-4':droppinglist==list}">
            <v-card-title primary-title color="primary">
              <div class="headline" >
                <span class="white--text">
                {{list.listname}}
                </span>
              </div>
            </v-card-title>
            <v-flex xs12 class="pa-1" v-for="card in cards" :key="card.card_id">
              <v-card color="grey-lighten-4" pa-4 v-if="card.list_id == list.slug" 
              draggable="true" @dragstart="startdraggingcard(card)" @dragend="dropcard()">
                <v-container fluid grid-list-lg color="grey-lighten-4">
                  <v-layout row >
                    <v-flex xs12 class="pa-2">
                      <div color="grey-lighten-4">
                <div class="subtitle text-capitalize" color="grey-lighten-4">{{card.cardname}} <v-spacer></v-spacer> </div>
         <v-icon small right @click="open_modal(card.cardname,card.card_id,card.Description,card.Duedate)" > create</v-icon> 
                    </div>
                  
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
          
            </v-flex>
            <v-card-actions>
              <Createcard :list_id="list.id" :bid="$route.params.slug">
              </Createcard>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex sm3 pa-2>
          <v-card width="300px" mt-auto>
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
      </v-flex>
        <v-flex xs3>
          <v-card class="ml-5" flat>
            <v-card-title>Activities</v-card-title>
            <div v-for="activity in activitiesbydate" :key="activity.activity_id">
              <div class="overline pa-2" >{{activity.activitytext}}</div>
            </div>
          </v-card>
        </v-flex>
      </v-layout> 
    </v-container>
   
  </v-app>
    <v-row justify="center">
        <v-dialog v-model="card_details" persistent max-width="800px">
           <v-card>
        <v-card-title class="headline text-capitalize">{{num}} </v-card-title>        
           <v-col cols="16"> <v-text-field label="Description" required v-model="Description"
            @click="savedescription=false" ></v-text-field>
             {{cardDescription}}
              </v-col>
              <v-btn  color="green darken-1" text v-model="savedescription" :disabled="savedescription" @click="savedescriptionindb()">Save</v-btn>
              <v-col cols="12"> <v-text-field label="Comment" required v-model="Comment" @click="savecomment=false"></v-text-field>
              </v-col>
               <v-btn color="blue darken-1" text v-model="savecomment" :disabled="savecomment">ADD</v-btn>
        <v-card-text class="mt-4 mb-0">ADD TO CARD </v-card-text>
        <v-btn large text mt-0 ><v-icon>person</v-icon>MEMBERS</v-btn>
        <v-btn large text mt-0 @click="opendate"><v-icon>today</v-icon>DUE DATE</v-btn ><span>{{duedate}}</span>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="card_details = false">Close</v-btn>
          <v-btn color="green darken-1" text @click="card_details = false">Save</v-btn>
        </v-card-actions>
      </v-card>
                    </v-dialog>
                    </v-row>
  <v-dialog v-model="datepicker" scrollable max-width="370px">
      <v-card>
        <v-card-title>DUE DATE</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 700px;">
  <v-row>
    <v-col> <v-text-field outlined label="Date" v-model="date"></v-text-field></v-col>
    
    <v-col> <v-text-field outlined label="Time" v-model="dateinside"></v-text-field></v-col>
    <v-date-picker class="ma-auto" v-model="date"></v-date-picker>
    <v-card-subtitle> Set Reminder</v-card-subtitle>
     <v-select
          :items="items2"
          label="Reminder"
          outlined
        ></v-select>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="updateDate">Save</v-btn>
          <v-btn color="red darken-1" text @click="dialog = false">Remove</v-btn>
        </v-card-actions>
  </v-row>

        </v-card-text>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
</div>
</template>

<script>
// @ is an alias to /src
import firebase from "../firebase";
import 'firebase/auth'
const db = firebase.firestore();
import Createcard from './Createcard';
export default {
name: 'boards',
components:{
  Createcard
},
  data(){
    return{
    draggingcard:null,
    droppinglist:null,
    drawer: false,
    dialog: false,
    card_details:false,
    datepicker:false,
    title:'',
    boardname:null,
    Description:'',
    Comment:'',
    cardDescription:'',
    slug:'',
    priority:null,
    listname:'',
    board_id:'',
    bid:'',
    bidcontainer:'',
    cardname:'',
    card_id:'',
    num:'asa',
    cid:'',
    activitytext:'',
    list_id:'',
    activity_id:'',
    savedescription:true,
    savecomment:true,
    due:null,
    duedate:"",
    username:'',
    isloggedin:false,
    loading:false,
    dateinside:'',
    currentUser:false,
      date: new Date().toISOString().substr(0, 10),
      modal:false,
   items: [
      { icon: 'today', text: 'BOARDS', route:'/user' },
      { icon: 'notes', text: 'NOTES', route:'/notes' },
      
    ],
    items2: ['1 day before', '2 days before', '1 hour before', '2 hours before'],
    

    boards:[],
    tasks:[],
    lists:[],
    cards:[],
    activities:[],
    inprogresstasks:[],
    completedtasks:[],
    
    }
    
  },
    beforeRouteEnter(to,from,next){
         var user = firebase.auth().currentUser;
      db.collection('users').doc(user.uid).collection('boards').where('slug', '==', to.params.slug).get()
      .then(querySnapshot=>{
          querySnapshot.forEach(doc=>{
              next(vm=>{
                  vm.boardname=doc.data().boardname
                  vm.bid=doc.data().slug
                  })
                  })
                  })
    },
    watch:{
        '$route': 'fetchdata'
    },
     
  methods:{
     open_modal(value,cid,cardDescription,duedate){
      this.num = value;
      this.cid = cid;
      this.cardDescription=cardDescription
      this.duedate=duedate;
      this.card_details=!this.card_details
    },
    updateDate(){
         var user = firebase.auth().currentUser;
           this.currentUser=firebase.auth().currentUser.email;
            db.collection('users').doc(user.uid).collection('boards').doc(this.bid)
           .collection('cards').doc(this.cid).update({Duedate: this.date})
           this.Description=""
            this.datepicker=!this.datepicker;
    },
    opendate(){
      this.datepicker=!this.datepicker;
    },
       fetchdata(){
            var user = firebase.auth().currentUser;
             db.collection('users').doc(user.uid).collection('boards').where('slug','==', this.$route.params.slug).get()
             .then(querySnapshot=>{
                 querySnapshot.forEach(doc=>{
                     this.boardname=doc.data().boardname
                     this.slug=doc.data().slug
                     this.bid=doc.data().slug
                     
                 })
             })
        },

        startdraggingcard(card){
          console.log('started dragging',card);
          this.draggingcard=card;
        },

        setdroppinglist(event, list){
          this.droppinglist=list;
          event.preventDefault();
        },

        dropcard(){
           var user = firebase.auth().currentUser;
           this.currentUser=firebase.auth().currentUser.email;
          if(this.droppinglist){
            if(this.draggingcard.list_id!==this.droppinglist.slug){
              const fromlist=this.lists.find(list=>list.slug=== this.draggingcard.list_id)
              db.collection('users').doc(user.uid).collection('boards').doc(this.bid)
           .collection('cards').doc(this.draggingcard.card_id).update({list_id: this.droppinglist.slug})
           this.createlistactivity(`${user.email} moved ${this.draggingcard.cardname} from ${fromlist.listname} to ${this.droppinglist.listname}`)
           console.log(this.draggingcard.list_id,this.droppinglist.slug )
             this.draggingcard.list_id=this.droppinglist.slug;
            } }
        this.droppinglist=null;
        this.draggingcard=null;
        },
        savedescriptionindb(){
          var user = firebase.auth().currentUser;
           this.currentUser=firebase.auth().currentUser.email;
            db.collection('users').doc(user.uid).collection('boards').doc(this.bid)
           .collection('cards').doc(this.cid).update({Description: this.Description})
           this.Description=""
           console.lo('check'+this.card_id,this.bid)
        },
        listTask(){
           var user = firebase.auth().currentUser;
           this.currentUser=firebase.auth().currentUser.email;
           this.bid=this.$route.query.slug;
           this.bid=this.$route.params.slug;
           db.collection('users').doc(user.uid).collection('boards').
           doc(this.bid).collection('lists').get().then(querySnapshot=>{
             querySnapshot.forEach(doc=>{
               const data={
                 'id':doc.id,
                 'listname': doc.data().listname,
                 'slug':doc.data().slug
                 
               }
              this.list_id=doc.data().slug;
               console.log(data);
               console.log(this.list_id);
               console.log(doc.data().slug);
             })
           })  
        },
         getList(){
           var user = firebase.auth().currentUser;
           this.currentUser=firebase.auth().currentUser.email;
           this.bid=this.$route.query.slug;
           this.bid=this.$route.params.slug;
           db.collection('users').doc(user.uid).collection('boards').doc(this.bid).collection('lists')
           .where('board_id','==',this.bid).get().then(querySnapshot=>{
             querySnapshot.forEach(doc=>{
               const data={
                 'id':doc.id,
                 'listname': doc.data().listname,
                 'slug':doc.data().slug
                 
               }
              this.lists.push(data);
                console.log(this.list_id);
               console.log(data);
               console.log("slug"+doc.data().slug);
             
             })
           })  
        },
       
         getCardUnderList(){
           var user = firebase.auth().currentUser;
           this.currentUser=firebase.auth().currentUser.email;
           this.bid=this.$route.query.slug;
           this.bid=this.$route.params.slug;
           db.collection('users').doc(user.uid).collection('boards').doc(this.bid)
           .collection('cards').get().then(querySnapshot=>{
             querySnapshot.forEach(doc=>{
               const data={
                 'id':doc.id,
                 'cardname': doc.data().cardname,
                 'card_id':doc.data().card_id,
                  'list_id':doc.data().list_id,
                  'board_id':doc.data().board_id,
                  'Description':doc.data().Description,
                   'Duedate':doc.data().Duedate
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
           db.collection('users').doc(user.uid).collection('boards')
           .doc(this.bidcontainer).collection('lists').orderBy('boardname').get().then(querySnapshot=>{
             querySnapshot.forEach(doc=>{
               const data={
                 'boardname': doc.data().boardname,
                 'slug':doc.data().slug
                 
               }
               this.boards.push(data);
               console.log(doc.data().slug);
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
               db.collection('users').doc(user.uid).collection('boards').doc(this.bid)
               .collection('lists').doc(this.list_id).set({
                listname:this.listname,
                slug:this.list_id,
                board_id:this.bid
              })
              this.createlistactivity(`${user.email} created list ${this.listname}`)
              this.listname=''
              this.lists.splice(0,this.lists.length)
              this.getList() 
              }
          },
          createlistactivity(text){
             var user=firebase.auth().currentUser;
            this.activity_id=this.generateUUID()
               db.collection('users').doc(user.uid).collection('boards').doc(this.bid)
               .collection('activities').doc(this.activity_id).set({
                 activitytext:text,
                activity_id:this.activity_id,
                board_id:this.bid,
                list_id:this.list_id
                   })
                     this.activities.splice(0,this.lists.length)
                     this.getlistactivity()
                   console.log('done');
          },
          getlistactivity(){
            var user = firebase.auth().currentUser;
           this.currentUser=firebase.auth().currentUser.email;
           this.bid=this.$route.query.slug;
           this.bid=this.$route.params.slug;
           db.collection('users').doc(user.uid).collection('boards').doc(this.bid)
           .collection('activities').get().then(querySnapshot=>{
             querySnapshot.forEach(doc=>{
               const data={
                 'id':doc.id,
                 'activitytext': doc.data().activitytext,
                 'activity_id':doc.data().activity_id,
                  'list_id':doc.data().list_id,
                  'board_id':doc.data().board_id
               }
              this.activities.push(data);
             })
           }) 
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
  computed:{
    cardsbylistid(){
      return this.cards.reduce((byid,card)=>{
        byid[card.list_id]=byid[card.list_id]||byid[card.list_id].push(card);
        return byid;
      })
    },
    activitiesbydate(){
      return this.activities.slice().reverse();
    }
  },
  mounted(){
    this.listTask();
    this.getList();
    this.getCardUnderList();
    this.getlistactivity();
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