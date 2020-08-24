<template>
<v-flex sm12 > 
    <v-card
    :loading="loading"
    class=""
    max-width="374"
    flat>
    <v-card-title></v-card-title>
    <v-card-text>
       <div>
        <v-text-field
        label="Add A Task"
          outlined
              prepend-inner-icon="add"
              v-model="cardname">
              </v-text-field>
        </div>  
    </v-card-text>
<v-card-actions>
  <v-btn color="primary" text @click="createCardUnderList">ADD</v-btn>
    </v-card-actions>
  </v-card>
  </v-flex>
</template>





<script>
import firebase from "../firebase";
import 'firebase/auth'
const db = firebase.firestore();
export default {
  name:'Createcard',
  props:['list_id','bid'],
   data(){
    return {
    drawer: false,
    dialog: false,
    title:'',
    boardname:null,
    slug:'',
    priority:null,
    listname:'',
    board_id:'',
    bidcontainer:'',
    cardname:'',
    card_id:'',
    due:null,
    username:'',
    activitytext:'',
    activity_id:'',
    card: {
      title: '',
      members: [],
    },
    isloggedin:false,
    loading:false,
    currentUser:false,
      date: new Date().toISOString().substr(0, 10),
      modal:false,
   items: [
      { icon: 'today', text: 'TASKS', route:'/user' },
      { icon: 'notes', text: 'NOTES', route:'/notes' },
      
    ],

    boards:[],
    tasks:[],
    lists:[],
    cards:[],
    activities:[],
    inprogresstasks:[],
    completedtasks:[],
    
    }
    },
    methods:{
        createCardUnderList(){
            var user=firebase.auth().currentUser;
            this.card_id=this.generateUUID()
            if(user &&this.cardname!=''){
              
               db.collection('users').doc(user.uid).collection('boards').doc(this.bid).collection('cards').doc(this.card_id)
               .set({
                cardname:this.cardname,
                card_id:this.card_id,
                list_id:this.list_id,
                board_id:this.bid
              })
               this.createlistactivity(`${user.email} created card ${this.cardname}`)
              this.cardname=''
              this.cards.splice(0,this.cards.length)
              }
              this.getCardUnderList();
          }, 

          getCardUnderList(){
           var user = firebase.auth().currentUser;
           this.currentUser=firebase.auth().currentUser.email;
           this.bid=this.$route.query.slug;
           this.bid=this.$route.params.slug;
           db.collection('users').doc(user.uid).collection('boards').doc(this.bid)
           .collection('cards').
           where('board_id','==',this.bid).get().then(querySnapshot=>{
             querySnapshot.forEach(doc=>{
               const data={
                 'id':doc.id,
                 'cardname': doc.data().cardname,
                 'card_id':doc.data().card_id,
                  'list_id':doc.data().list_id,
                  'board_id':doc.data().board_id
               }
              this.cards.push(data);
                console.log(this.slug);
               console.log(data);
               console.log(doc.data().card_id);
             
             })
           }) 
        },  createlistactivity(text){
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
        generateUUID () {
           let uuid = Math.floor(100000 + Math.random() * 900000).toString()
          return uuid
        },
    }
};
</script>