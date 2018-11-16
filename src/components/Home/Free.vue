<template>
    <div class="free">
        <div class="free-header">
            <img src="http://localhost:1997/app/experience.png" alt="">
            <span>免费体验</span>
            <a href="">进入专区</a>
        </div>
        <div class="f_slide">
            <div class="f_slide_item">
                <a v-for="(item,i) in f_imgs" :key="i"><img :src="f_imgs[i]" alt=""><span>{{game_name[i]}}</span></a>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
        return {
            f_imgs:[],
            game_name:[],
        }  
        },
        methods:{
            free_game(){
                var url="search/gameclassify";
                this.$http.get(url).then(result=>{
                    console.log(result.body)
                    for(var item of result.body){
                        if(item.game_family_id==1009) return
                        this.f_imgs.push(item.classify_app)
                        this.game_name.push(item.game_names)
                    }
                })
            }
        },
        created(){
            this.free_game()
        }
    }
</script>
<style>
    .free{
        background:#fff;
        margin-top:1rem;
    }
    .free .free-header{
        width:95%;
        margin:0 auto;
        font-size:.9rem;
        font-weight:bold;
        height:2rem;
    }  
    .free .free-header>span{
        font-weight:bold;
        margin-top:.6rem;
    } 
    .free .free-header>a{
        font-weight:bold;
        color:#ffd005;
        float:right;
        margin-top:.6rem;
    }  
    .free .free-header>img{
        width:.75rem;
        margin:.6rem .3rem 0 .3rem;
    } 

    /*左右滑动图片*/
    .free .f_slide{
        width:100%;
        overflow-x:auto;
    }
    .free .f_slide .f_slide_item{
        white-space:nowrap;
        width:48.8rem;
    }
    .free .f_slide .f_slide_item a{
        position:relative;
        display:inline-block;
        width:5.5rem;
        height:5.5rem;
        margin:1rem .3rem;
        border-radius:8px;
        overflow: hidden;
    }
    .free .f_slide .f_slide_item a>span{
        position: absolute;
        bottom:.3rem;
        left:0;
        height:1.5rem;
        line-height:1.5rem;
        width:100%;
        color:#fff;
        opacity:.7;
        font-size:.8rem;
        text-align:center;
        z-index: 2;
        background:#00000030;
    }
    .free .f_slide .f_slide_item a>img{
        width:100%;
        height:100%;
    }
</style>