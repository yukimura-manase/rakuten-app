<template>
  <div id="app">

    <div id="nav">
      <router-link to="/">Home</router-link> 
      <router-link to="/like" v-if="this.$store.state.login_user !== null"> | お気に入り商品 | </router-link>
      <router-link to="/cart" v-if="this.$store.state.login_user !== null">買い物カゴ | </router-link>
      <router-link to="/buylist" v-if="this.$store.state.login_user !== null">購入履歴</router-link>
    </div>
    
    <div>
      <!-- デフォルトで検索窓を設置 -->
      <SearchAPI />
    </div>

    <!-- パスによってここの画面表示は、切り替わる -->
    <router-view/>

  </div>
</template>

<script>
import SearchAPI from './components/SearchAPI'
import firebase from 'firebase'
import {mapActions} from 'vuex'

export default {
  name: 'App',

  components:{
    SearchAPI
  },

  created(){
    firebase.auth().onAuthStateChanged(user => { // ログイン認証によるリダイレクト後を想定した処理。
      if(user){
        this.setLoginUser(user); // ユーザー情報があるならセット
      } else {
        this.deleteLoginUser()
      }
    })
  },

  methods:{
    ...mapActions(['setLoginUser','deleteLoginUser']),

  },

  

}

// 振り返り課題 Level1）
// ・楽天APIを使用した商品検索サイトの作成
// Vueのアプリケーションで楽天APIの商品検索を行い、検索結果を画面に表示するアプリケーションを作成せよ。=> クリア

// 応用課題1 Level3)
// ・楽天APIを使用したお気にいり商品の管理システム、検索結果の商品から、気に入った商品をお気に入り登録することが可能。 =>クリア

// ・ログインが必須、ログインしているユーザーがお気にいり登録をすることができる（firebase authenticationとfirestoreを使用） => クリア

// 応用課題2 Level7)
// ・楽天APIを使用したECサイトの構築
// ・ログインが必須 => クリア
// ・お気に入り登録が可能 => クリア
// ・検索結果の商品を選択すると、商品詳細画面が表示される。 => クリア
// ・商品詳細画面では個数選択、お気に入り登録、カートに入れることが可能。 => クリア
// ・カート画面では、カートに入れている商品の一覧が表示可能 => クリア
// ・最後に購入ボタンを押すと購入することができる（実際は購入はしないで、購入履歴にデータを追加する）=> クリア
// ・購入履歴画面では購入したデータを一覧表示してみることができる。 => クリア


// <Vueコンポーネント設計の基本を守りつつ、Vuexを適材適所で活用するためのデータ受け渡しの方針>
// 1.親子関係のあるコンポーネント間のデータの受け渡しは「Event Up, Props down」で
// 2.親子関係のないコンポーネント間のデータの共有はVuexで
// 3.コンポーネントの固有のデータはコンポーネントのローカルステート(data)で
// 4.グローバルなデータはVuexで

</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
