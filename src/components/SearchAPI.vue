<template>
    <div class="KensakuAPI">

        <div>
            <h1>楽天市場で買い物しよう！！お買い物検索サイト </h1>
            <h2>supported by 神聖グンマー帝国✨</h2>
        </div>

        <div>
            商品名を入力：<input type="text" v-model="kensaku">
            <button v-on:click="Kensaku(kensaku)">検索</button>
        </div>
        

    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    

    
    export default{
        name: 'SearchAPI',

        data(){
            return {
                kensaku:'',

            }
        },

        methods:{
            ...mapActions(['search','resultDelete']),

            Kensaku(kensaku){
                if(this.$store.state.login_user !== null){ // ログインしていなければ検索できない！

                    if(kensaku !== ''){ // 空文字検索でなければ、検索起動。

                    console.log('検索ボタン起動！');

                    // まず前回の検索結果を消す処理をする！
                    this.resultDelete();

                    // 検索文字列を使って検索する！
                    let searchWord = kensaku;
                    this.search(searchWord);

                        if(this.$router.currentRoute !== 'SearchResult'){
                            console.log('検索結果画面に移動するぜ！');
                            this.$router.push({name:'SearchResult'}).catch(() => {}); //結果画面に遷移する!
                        } else {
                            console.log('すでに検索結果画面にいるので、ページ遷移はしない！だがしかし、ちゃんと検索結果は更新される！')
                        }
                    }

                    if(kensaku === ''){ // 空文字検索の場合。
                        alert('検索文字が入っていません！')
                        console.log('アラート発生しました！')
                    }

                } else{
                    alert('ログインしないと検索できないのでござる！！');
                }

            }
        },

        
    }
</script>


