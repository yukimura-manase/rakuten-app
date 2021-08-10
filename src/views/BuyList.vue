<template>
    <div>

        <h2 v-if="$store.state.login_user !== null">{{$store.state.login_user.displayName}}さんの購入履歴</h2>
        <img v-if="$store.state.login_user !== null" :src="$store.state.login_user.photoURL" alt="グンマー帝国、万歳！！">

        <div>
            <table border="1">
                <tr v-for="(buyItem,index) in buyList" :key="index">
                    <td>

                        <h2>{{buyItem.product.name}}</h2>

                        <div><img :src="buyItem.product.image"></div>
 
                        <p>{{buyItem.product.price}}円の商品を{{buyItem.buyNum}}購入！</p>
                        <h3>購入金額：{{buyItem.priceResult}}円</h3>

                        <div>販売店:{{buyItem.product.shop}}</div>
                        <span><a :href="buyItem.product.url">販売店情報(楽天市場)</a></span>

                        <div>
                            <button @click="Buy(buyItem)" style="width:300px">再度、購入する！</button>
                        </div>
                        
                    </td>
                </tr>
            </table>
        </div>

    </div>
</template>


<script> // ・購入履歴画面では購入したデータを一覧表示してみることができる。
import { mapActions } from 'vuex';

export default {
    data(){
        return {
            buyList:[],
        }
    },
    created(){
        this.buyList = this.$store.state.buyList;
    },
    methods:{
        ...mapActions(['BuyInCart']),

        Buy(buyItem){
            console.log('再度、購入するボタンが押されました！');
            console.log(buyItem);

            this.BuyInCart(buyItem);

            this.$router.push('/thanks');
        },
    },


}

</script>

