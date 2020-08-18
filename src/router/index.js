import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import user from '../views/user.vue'
import note from '../views/notes.vue'
import boards from '../views/boards.vue'
import taskdetails from '../views/taskdetails.vue'
import notedetails from '../views/notedetails.vue'
// import firebase from 'firebase'



Vue.use(VueRouter)
export default new VueRouter({
  mode:'history',
  base:process.env.BASE_URL,
 routes : [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      requiresGuest:true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta:{
      requiresGuest:true
    }
  },
  {
    path: '/user',
    name: 'user',
    component: user,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/notes',
    name: 'notes',
    component: note,
    meta:{
      requiresAuth:true
    }
  },



  {
    path: '/:task_id',
    name: 'taskdetails',
    component: taskdetails,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/:slug',
    name: 'boards',
    component:boards,
    meta:{
      requiresAuth:true
    }
  },

{
  path:'/:note_id',
  name:'notedetails',
  component:notedetails,
  meta:{
    requiresAuth:true
  }
}  
]

})

