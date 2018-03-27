module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "starter",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [{ src: "http://res.wx.qq.com/open/js/jweixin-1.2.0.js" }]
  },
  // 全部引用的时候需要用到
  // 'element-ui/lib/theme-chalk/index.css'
  css: [
    { src: "static/style/base.scss", lang: "scss" },
    { src: "element-ui/lib/theme-chalk/index.css", lang: "css" }
  ],
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#3B8070" },
  vender: ["element-ui", "axios"],
  babel: {
    plugins: [
      [
        "component",
        [
          {
            libraryName: "element-ui",
            styleLibraryName: "theme-default"
          },
          "transform-async-to-generator",
          "transform-runtime"
        ]
      ]
    ],
    comments: true
  },
  plugins: [{ src: "~plugins/element-ui", ssr: true }]
};
