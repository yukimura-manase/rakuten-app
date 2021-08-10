import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

import firebase from 'firebase'

import router from '../router/index.js'

Vue.use(Vuex)


// Storeは、グローバル変数のようなもの。コンポーネントのどこからでもアクセスできる！
export default new Vuex.Store({
  state: {

    searchWord:null,

    APIresponse:null, // APIのレスポンスの中からItemsの中身、何かの値(data)を格納する「空の空間」(無の空間)を用意！

    APIresult:[], // APIの結果(検索結果)から検索結果画面に表示するものを入れる配列

    like:[], // お気に入りのデータを入れる配列。

    login_user:null, // nullによって、空であること、無であることが明示的に定義 => 後からデータを何でも入れられる！ 

    productArray:[],// APIresponseから、条件を変えて抽出した配列！

    productInfo:null, // マッチした商品の詳細情報を保持する。

    cartContent:[], // カートに入れた商品の情報を保持する！

    buyList:[], // 購入履歴の管理をする配列！

    
  },
  mutations: {

    // 入力フォームの情報を取得する！
    search(state,res){

      state.APIresponse = res.data.Items; // APIのレスポンスの中からItemsの中身をすべて格納しておく。=> productDetailで使用する！

      res.data.Items.forEach(itemdata => {

          console.log('商品データ')
          console.log(itemdata);
          console.log(itemdata.Item.itemName); //商品名
          console.log(itemdata.Item.mediumImageUrls[0].imageUrl) //商品画像
          console.log(itemdata.Item.itemPrice); //商品金額
          console.log(itemdata.Item.itemUrl); //商品リンク
          console.log(itemdata.Item.shopName); //店舗名
          console.log('終わり！！')

          let itemName = itemdata.Item.itemName;
          let itemImage = itemdata.Item.mediumImageUrls[0].imageUrl;
          let itemPrice = itemdata.Item.itemPrice;
          let itemUrl = itemdata.Item.itemUrl;
          let itemShop = itemdata.Item.shopName;

          state.APIresult.push(
              {
                  name: itemName,
                  image: itemImage,
                  price: itemPrice,
                  url: itemUrl,
                  shop: itemShop
              }
          )
          console.log('APIresultにpush完了！');

      })
          
    },

    resultDelete(state){
      state.APIresult.splice(0,state.APIresult.length); // すべての検索結果を削除する！
      console.log('resultDelete完了！');
    },

    likePush(state,result){
      this.state.like.push(result);
      console.log('likePush完了！');

    },

    
    removeLike(state,likeResult){

      let removeIndex = this.state.like.findIndex(find => find === likeResult ) // お気に入りを解除する！

      console.log(removeIndex);

      this.state.like.splice(removeIndex,1);

      console.log('removeLike完了！');
    },

    setLoginUser(state,user){
      console.log(user);
      state.login_user = user;
      console.log('setLoginUser完了！');
    },
    
    deleteLoginUser(state){
      state.login_user = null;
      console.log('deleteLoginUser完了！');
      console.log(state.login_user);
    },

    productDetail(state,result){

      console.log('格納しているAPIレスポンスの中身を確認！')
      console.log(state.APIresponse);

      state.APIresponse.forEach(itemdata => {

        console.log('商品データの確認！')
        console.log(itemdata); // 配列の中にオブジェクトが入っている。
        console.log(itemdata.Item.itemName); //商品名
        console.log(itemdata.Item.mediumImageUrls[0].imageUrl) //商品画像
        console.log(itemdata.Item.catchcopy); //商品のキャッチコピー
        console.log(itemdata.Item.itemPrice); //商品金額
        console.log(itemdata.Item.creditCardFlag); //クレジットカード決済可能か？
        console.log(itemdata.Item.itemUrl); //商品リンク
        console.log(itemdata.Item.shopName); //店舗名
        console.log('商品データの確認、終わり！！')

        // 配列の中から特定の値を格納。
        let itemName = itemdata.Item.itemName;
        let itemImage = itemdata.Item.mediumImageUrls[0].imageUrl;
        let itemCatchcopy = itemdata.Item.catchcopy;
        let itemPrice = itemdata.Item.itemPrice;
        let itemCreditCard = itemdata.Item.creditCardFlag;
        let itemUrl = itemdata.Item.itemUrl;
        let itemShop = itemdata.Item.shopName;

        state.productArray.push(
            {
              // key:valueペアでセットしたオブジェクトを作成して、配列にpushする！
              name: itemName,
              image: itemImage,
              catchcopy:itemCatchcopy,
              price: itemPrice,
              credit:itemCreditCard,
              url: itemUrl,
              shop: itemShop
            }
        )
        console.log('ProductArrayに追加完了！');
      }) // forEachの処理はここまで！

      console.log('商品詳細画面専用の7項目の配列が完成！')
      console.log(state.productArray);

        state.productInfo = null; // 初期化処理

        // フィルターをかけて条件付きで配列の中から該当のものを探す！
        state.productArray.filter(match => {

          // 回覧されてきたデータ(result)と5つの条件でマッチするものを見つけたら格納！
          if(result.name === match.name && result.image === match.image && result.price === match.price 
            && result.url === match.url && result.shop === match.shop){
            
            state.productInfo = match;

            console.log('商品詳細ボタンが押された商品はこれだ！！')
            console.log(state.productInfo);
          }
        });
      

      console.log('productDetail完了なのだ！');

      router.push({name: 'Product'}); // 商品詳細画面に遷移する！
    },

    GoGoCart(state,productCart){
      state.cartContent.push(productCart); 
      console.log('GoGoCartにゴーゴー完了！！');
      console.log(state.cartContent);
    },

    BuyInCart(state,buyincart){
      state.buyList.push(buyincart);
      console.log('BuyInCart完了！');
      console.log(state.buyList);
    },


  },

  // 外部との通信は、actionsの役割！！
  actions: {

    search({commit},searchWord){

      console.log(`検索ワードは${searchWord}`);

      this.state.searchWord = searchWord; // 本当は、mutaitionsですべきことだが・・・

      console.log('通信を開始する！');

      axios.get('https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706',
          {params: {
                      applicationId: '1031636184299349316',
                      keyword: `${searchWord}`
                  }
          }
      )
          .then(res => {
              console.log('APIレスポンス');
              console.log(res); // APIからのレス内容を確認する！

              commit('search',res);
            })
    },

    resultDelete({commit}){
      console.log('resultDelete起動！');
      commit('resultDelete');
    },
    
    likePush({commit},result){

      console.log('likePush起動')
      commit('likePush',result);
      
    },

    removeLike({commit},likeResult){
      console.log('removeLike起動！');

      console.log('likeResultが回覧されてきた！');
      console.log(likeResult);

      commit('removeLike',likeResult);
    },

    // firebaseの「Authentication」機能によるGoogleアカウントを利用したログイン認証 => アプリ外部とのやり取りのみ！
    login(){
      const google_auth_provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(google_auth_provider); // リダイレクトされるメソッド！
      console.log('ログインするぜ、イェェェェェェェイ！'); // mutationは、使わない！ => stateをいじるわけではない！
    },

    logout(){ // ログアウト処理 => アプリ外部とのやり取りのみ！
      firebase.auth().signOut();
      console.log('ログアウト完了！'); // mutationは、使わない！ => stateをいじるわけではない！
    },

    setLoginUser({commit},user){ // ログイン時に、ログインユーザー情報をstateにセットする。 => アプリ内で利用するため。
      console.log('setLoginUser起動！')
      commit('setLoginUser',user);
    },

    deleteLoginUser({commit}){ // ログアウト時に、ログインユーザー情報を削除する。
      console.log('deleteLoginUser起動！');
      commit('deleteLoginUser');
    },

    productDetail({commit},result){
      console.log('productDetail起動！');
      commit('productDetail',result);
    },

    GoGoCart({commit},productCart){
      console.log('GoGoCart起動！');
      commit('GoGoCart',productCart);
    },

    BuyInCart({commit},buyincart){
      console.log('BuyInCart起動！');
      commit('BuyInCart',buyincart);
    },

  },



  modules: {

  }
})
