<template>
  <section class="container">
    <img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    
  </section>
</template>
<script>
import {mapState} from 'vuex';
export default {
  asyncData ({ req }) {
    return {
      name: req ? 'server' : 'client'
    }
  },
  head () {
    return {
      title: `测试页面`
    }
  },
  beforeMount(){
    let wx = window.wx;
    let url = encodeURIComponent(window.location.href);
    this.$store.dispatch('getWechatSignature',url).then(res=>{
      if(res.data.success){
        let params = res.data.params
        // 微信配置
        wx.config({
          debug:true,
          appId:params.appId,
          timestamp:params.timestamp,
          nonceStr:params.nonceStr,
          signature:params.signature,
          jsApiList:[
            'previewImage',
            'uploadImage',
            'downloadImage',
            'chooseImage',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'onMenuShareTimeline'
          ]
        })
        

        wx.ready(()=>{
          wx.hideAllNonBaseMenuItem();
          console.log('成功');
        })

      }
    })
  }
}
</script>

<style scoped>
.title
{
  margin-top: 50px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button
{
  margin-top: 50px;
}
</style>
