import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "jquery";
import "popper.js";
import "bootstrap";
import firebase from "firebase/app";
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret);
library.add(faCoffee);
library.add(faEnvelope);

Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

const firebaseConfig = {
    apiKey: "AIzaSyDKhw55SP9oMwUm8wHuHHiYLps_buf-CHA",
    authDomain: "login1-b79c2.firebaseapp.com",
    databaseURL: "https://login1-b79c2.firebaseio.com",
    projectId: "login1-b79c2",
    storageBucket: "login1-b79c2.appspot.com",
    messagingSenderId: "346076197050",
    appId: "1:346076197050:web:d46106a801091eac7c5283",
    measurementId: "G-4KVLWGKV8N"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(userer => {
    console.log(userer);
    if (!app) {
        app = new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount("#app");
    }
});