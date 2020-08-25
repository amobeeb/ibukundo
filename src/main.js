import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import axios from 'axios';
import firebase from 'firebase'
import 'firebase';

Vue.prototype.$axios = axios;
Vue.config.productionTip = false

let app;
// eslint-disable-next-line no-unused-vars
firebase.auth().onAuthStateChanged(user => {
    if (!app) {
        app = new Vue({
            router,
            vuetify,
            render: h => h(App),

        }).$mount('#app')
    }
});