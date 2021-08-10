<template>
    <div>

        <h2 v-if="$store.state.login_user !== null">{{$store.state.login_user.displayName}}さん専用のカート</h2>
        <img v-if="$store.state.login_user !== null" :src="$store.state.login_user.photoURL" alt="グンマー帝国、万歳！！">

        <div v-if="$store.state.login_user !== null">
            <table border="1">
                <tr v-for="(cart,index) in cartContent" :key="index">
                    <td>

                        <h2>{{cart.product.name}}</h2>

                        <div><img :src="cart.product.image"></div>
 
                        <p>{{cart.product.price}}円の商品 × {{cart.buyNum}}個で・・・</p>
                        <h3>値段：{{cart.priceResult}}円</h3>

                        <div>販売店:{{cart.product.shop}}</div>
                        <span><a :href="cart.product.url">販売店情報(楽天市場)</a></span>

                        <div>
                            <button @click="Buy(cart)" style="width:300px">購入する！</button>
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
        return{
            cartContent:[],
        }
    },
    created(){
        if(this.$store.state.login_user !== null){

            this.cartContent = this.$store.state.cartContent;

            this.cartContent.forEach(ailias => {
                let PriceResult = ailias.product.price * ailias.buyNum; 
                ailias.priceResult = PriceResult; // 配列に価格 * 個数の計算結果を追加する！

            });
            console.log('cartContentにセット完了！');
            console.log(this.cartContent);

        } else {
            alert('同志グンマーよ！まずはログインだ！');
        }

        
    },
    methods:{
        ...mapActions(['BuyInCart']),

        Buy(cart){

            console.log('購入ボタンが押されました！');
            console.log(cart);

            this.BuyInCart(cart);

            this.$router.push('/thanks');

        },


    },



}

// ・カート画面では、カートに入れている商品の一覧が表示可能
// ・最後に購入ボタンを押すと購入することができる（実際位は購入はしないで、購入履歴にデータを追加する）
// ・購入履歴画面では購入したデータを一覧表示してみることができる。
</script>


