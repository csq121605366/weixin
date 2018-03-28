<template>
  <section>
    <div>test.html</div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  asyncData({ req }) {
    return {
      name: req ? "server" : "client"
    };
  },
  head() {
    return {
      title: "测试页面"
    };
  },
  beforeMount() {
    const wx = window.wx;
    const url = location.href.split("#")[0];
    this.$store.dispatch("wechatSignature", url).then(res => {
      let param = this.$store.getters["get_WXJSSDKPARAMS"];
      param.nonceStr = param.noncestr;
      let config = Object.assign({}, param, {
        debug: true,
        jsApiList: [
          "previewImage",
          "chooseImage",
          "uploadImage",
          "downloadImage",
          "onMenuShareTimeLine",
          "showMenuItems"
        ]
      });
      console.log(config);
      wx.config(config);
      wx.ready(() => {
        console.log("success");
      });
    });
  }
};
</script>

<style>

</style>
