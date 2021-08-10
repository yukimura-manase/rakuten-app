<template>
  <div class="like">
    <h1>お気に入り商品たち！！</h1>
    
    <div>
      <table>
        <tr v-for="(likeResult,index) in like" :key="index">
            <td>

              <div>
                  <!-- JS側でAPIから取得したデータに対して、画面側では属性を紐付け・データ連携している！ -->
                  <a :href="likeResult.url">{{likeResult.name}}</a>
              </div>

              <!-- JS側でAPIから取得したデータに対して、画面側では属性を紐付け・データ連携している！ -->
              <div><img :src="likeResult.image"></div>

              <!-- APIで取得したデータを画面側に埋め込んでいる！ -->
              <div>値段：{{likeResult.price}}円</div>

              <div>取扱店：{{likeResult.shop}}</div>

              <div>
                  <button @click="noLike(likeResult)">お気に入りを解除する！</button>
              </div>

            </td>
        </tr>
        </table>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {

  data(){
    return {
      like:[],
    }
  },
  created(){
    this.like = this.$store.state.like;
  },
  methods:{
    ...mapActions(['removeLike']),


    // likeResultにはindex番号が紐づいている！
    noLike(likeResult){
      if(confirm('お気に入りを解除して、本当にいいの？？？')){

        console.log('お気に入り解除ボタン、起動！')
        console.log(likeResult)

        //this.$route.paramus

        this.removeLike(likeResult)
      }
      
    }
  }

}
</script>

