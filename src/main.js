import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import firebase from 'firebase'

Vue.config.productionTip = false

  // <firebaseの設定>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDpR4p1P4LOHIJg02inWRnykyfn7z21m3k",
    authDomain: "my-rakuten-project.firebaseapp.com",
    projectId: "my-rakuten-project",
    storageBucket: "my-rakuten-project.appspot.com",
    messagingSenderId: "1065195705598",
    appId: "1:1065195705598:web:37b1804c6a78a61220c1af",
    measurementId: "G-B0S5VLW9RF"
  };

  // Initialize Firebase <firebaseインスタンスの初期化>
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
