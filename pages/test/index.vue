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
    const url = window.location.href;
    this.$store.dispatch("wechatSignature", url).then(res => {
    let config = Object.assign({}, this.$store.getters("get_WXJSSDKPARAMS"), {
      debug: true,
      jsApiList: [
        "previewImage",
        "chooseImage",
        "uploadImage",
        "downloadImage",
        "onMenuShareTimeLine",
        "hideAllNonBaseMenuItem",
        "showMenuItems"
      ]
    });
    wx.config(config);
    wx.ready(() => {
      wx.hideAllNonBaseMenuItem();
      console.log("success");
    });
    });
  }
};
</script>

<style>

</style>
