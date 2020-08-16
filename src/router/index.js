import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import user from '../views/user.vue'
import note from '../views/notes.vue'
import boards from '../views/boards.vue'
import taskdetails from '../views/taskdetails.vue'
import notedetails from '../views/notedetails.vue'
import firebase from 'firebase'



Vue.use(VueRouter)

  const routes = [
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

const router = new VueRouter({
  routes
})



router.beforeEach((to,from,next)=>{
  if(to.matched.some(record=>record.meta.requiresAuth)){
    if(!firebase.auth().currentUser){
      next({
        path:'/',
        query:{ redirect:to.fullPath}
      })
    }
    else{
      next();
    }
  }
  else if(to.matched.some(record=>record.meta.requiresGuest)){
    if(firebase.auth().currentUser){
      next({
        path:'/user',
        query:{ redirect:to.fullPath}
      })
    }
    else{
      next();
    }
  }
  else{
    next();
  }
})
export default router;