<template>
    <div>

        <h2>商品名:{{productInfo.name}}</h2>

        <div><img :src="productInfo.image"></div>

        <h3>{{productInfo.catchcopy}}</h3>

        <h2>価格:{{productInfo.price}}円</h2>

        <h3>
            <span v-if="productInfo.credit === 1">クレジット利用可！</span>
            <span v-else>クレジット決済はできません</span>
        </h3>

        <div>販売店:{{productInfo.shop}}</div>
        <span><a :href="productInfo.url">販売店情報(楽天市場)</a></span>

        <div style="margin:20px" >
            <button @click="Good(productInfo)" style="width:300px">お気に入り！</button>
        </div>

        <div>
            <button style="width:300px" @click="goCart()">カートに商品を入れる！</button>

            <div>
                <span>カートに入れる個数を選んでね！！</span>
                <select v-model="buyOption">
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                </select>
            </div>
            
        </div>

    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    data(){
        return{
            productInfo:null,
            buyOption:0,
        }
    },

    created(){
        this.productInfo = this.$store.state.productInfo;
        console.log(this.productInfo);
    },

    methods:{
        ...mapActions(['likePush','GoGoCart']),

        Good(hikisu){

            console.log('お気に入りボタンが押されました！')
            console.log(hikisu);

            this.likePush(hikisu);
            
        },

        goCart(){

            if(this.buyOption !== 0){
                console.log('ゴー・カート！！');

                let product = this.productInfo;
                let buyNum = this.buyOption;

                console.log(product);
                console.log(buyNum)

                let productCart = {product,buyNum}; // actionsやmutaitionsは、第二引数までしか受け取れない！ => ゆえにまとめる！
                                                    // 「keyでありvalueである * 2」を格納する！

                this.GoGoCart(productCart);

                this.$router.push('/cart');

            } else {
                alert('カートに入れる個数を選んでね！！');
            }
            

        },

    },

}

// name: itemName,
// image: itemImage,
// catchcopy:itemCatchcopy,
// price: itemPrice,
// credit:itemCreditCard,
// url: itemUrl,
// shop: itemShop

// ・検索結果の商品を選択すると、商品詳細画面が表示される。
// ・商品詳細画面では個数選択、お気に入り登録、カートに入れることが可能。
</script>
