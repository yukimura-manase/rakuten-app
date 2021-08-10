<template>
    <div>
        <h1>「{{this.$store.state.searchWord}}」で検索しました</h1>
        <div>
            <table>
                <tr v-for="(result,index) in APIresult" :key="index">
                    <td>

                        <div>
                            <!-- JS側でAPIから取得したデータに対して、画面側では属性を紐付け・データ連携している！ -->
                            <a :href="result.url">{{result.name}}</a>
                        </div>

                        <!-- JS側でAPIから取得したデータに対して、画面側では属性を紐付け・データ連携している！ -->
                        <div><img :src="result.image"></div>

                        <!-- APIで取得したデータを画面側に埋め込んでいる！ -->
                        <div>値段：{{result.price}}円</div>

                        <div>取扱店：{{result.shop}}</div>

                        <div>
                            <button @click="Good(result)">お気に入り！</button>
                        </div>

                        <div>
                            <button @click="detail(result)">商品詳細をチェックする！</button>
                        </div>
                        
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>


<script>
    
    import {mapActions} from 'vuex'

    export default{

        data(){
            return{
                APIresult:[]
            }
        },

        // 画面生成時に、storeからデータを取得して、セットする！
        created(){
            this.APIresult = this.$store.state.APIresult;
        },

        methods:{
            ...mapActions(['likePush','productDetail']),

            Good(result){

                console.log('お気に入りボタンが押されました！')
                console.log(result);

                if(this.$store.state.login_user !== null){
                    this.likePush(result);
                } else {
                    alert('ログインしないとお気に入り機能は使えないぜよ！！');
                }
                
            },

            detail(result){

                console.log('商品詳細ボタンが押されました！');
                console.log(result);
                this.productDetail(result);
            },
            
            
        }

    }
</script>



