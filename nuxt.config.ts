// import ElementPlus from 'unplugin-element-plus/vite'
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['normalize.css', "@/assets/css/global.scss", 'element-plus/dist/index.css'],
  vite: {
    // 配置自动导入样式
    plugins: [
      // ElementPlus() as any
      Components({
        dts: true,
        resolvers: [ElementPlusResolver()]
      })
    ]
  },
  // build: {
  //   transpile: ['element-plus/es'],
  // },

  // 3.SEO优化
  app: {
    // 给所有的页面的head添加SEO信息
    head: {
      title: '英语学习助手',
      meta: [
        {
          name: 'keywords',
          content: 'EnglishHelper 英语学习助手'
        },
        {
          name: 'description',
          content: 'EnglishHelper 英语学习助手'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        }
      ],
      link: [
        { rel: "icon", type: 'image/x-icon', href: '/favicon.ico' }
      ],
      // 如果浏览器不支持脚本或者禁用脚本 提示需要脚本
      noscript: [{ children: "Javascript is required" }]
    }
  },
})
