<template>
  <div class="home">

    <h1>買い物しようぜ！HOME</h1>

    <div>
      <button @click="login">Googleアカウントでログイン！！</button>
    </div>
    
    <h2 v-if="$store.state.login_user !== null">Hello!!{{$store.state.login_user.displayName}}</h2>
    <img v-if="$store.state.login_user !== null" :src="$store.state.login_user.photoURL" alt="グンマー帝国、万歳！！">

    <div v-if="$store.state.login_user !== null">
      <button @click="logout">ログアウト！！</button>
    </div>

    <h2>『ロボ玉』(当サイトのマスコット＆開発者のペット)</h2>
    <img alt="Vue logo" src="../assets/logo.png">
    <img alt="Vue logo" src="../assets/logo.png">
    <img alt="ロボ玉" src="../assets/robotama.webp">
    <img alt="Vue logo" src="../assets/logo.png">
    <img alt="Vue logo" src="../assets/logo.png">

  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'Home',

  methods:{
    ...mapActions(['login','logout'])
  }
  
}
</script>
