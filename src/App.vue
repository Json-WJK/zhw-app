<template>
 <div class="app-container">
    <router-view></router-view>
    <foot></foot>
 </div>
</template>
<script>
   import footer from "./components/Footer/Footer.vue"
      export default{
         data(){
            return{

            }
         },
         components:{
               "foot":footer
      }
   }
</script>
<style>
   body,html{
      background-color: #f0f0f0;
      max-width: 768px;
      font-size:17px;
      font-family: sans-serif;
      margin:0 auto;
      color:#3d4145;
   }
      /*公共样式*/
   p,h1,h2,h3,h4,h5,h6,body,ul,ol,dl,pre{
      margin:0;
      padding:0;
   }
   a{
      text-decoration:none;
   }
   ul{
      list-style:none;
   }
   body{
      background:#f6f6f6;
   }
   input,button,select,textarea{outline:none;}
   /**/
   
   .app-container{
      
   }
   router-view{
      
   }
</style>
