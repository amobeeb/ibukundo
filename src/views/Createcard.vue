<template>
<v-flex sm12 > 
    <v-card>
      <v-card-title primary-title style="flex-direction:column">
        <div>
        <v-text-field
        label="Add Card"
          outlined
            full-width
              prepend-inner-icon="add"
              v-model="cardname">
              </v-text-field>
        </div>
      </v-card-title>
    </v-card>
    <v-btn color="primary" text @click="createCardUnderList">ADD</v-btn>
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
    inprogresstasks:[],
    completedtasks:[],
    
    }
    },
    methods:{
        createCardUnderList(){
            var user=firebase.auth().currentUser;
            this.card_id=this.generateUUID()
            if(user &&this.cardname!=''){
              
               db.collection('users').doc(user.uid).collection('boards').doc(this.bid).collection('lists')
               .doc(this.list_id).collection('cards').doc(this.card_id)
               .set({
                cardname:this.cardname,
                card_id:this.card_id,
                list_id:this.list_id,
                board_id:this.bid
              })
              
              this. cards.splice(0,this.cards.length)
              this.cardname=''
             this.getCardUnderList();
              console.log("success");
              }
          }, 
          getCardUnderList(){
           var user = firebase.auth().currentUser;
           this.currentUser=firebase.auth().currentUser.email;
           this.bid=this.$route.query.slug;
           this.bid=this.$route.params.slug;
           db.collection('users').doc(user.uid).collection('boards').doc(this.bid)
           .collection('lists').doc('491488').collection('cards').
           where('board_id','==',this.bid).get().then(querySnapshot=>{
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
        generateUUID () {
           let uuid = Math.floor(100000 + Math.random() * 900000).toString()
          return uuid
        },
    }
};
</script>