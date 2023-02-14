<template>
  <div class="footer">
    <div class="footer-info wrap-v1">
      <ul>
        <li v-for="(item, index) in footerData" :key="index">
          <h4>{{ item.title }}</h4>
          <a
            target="_blank"
            href="/"
            v-for="(tech, indexInner) in item.technology"
            :key="indexInner"
            >{{ tech }}</a
          >
        </li>
      </ul>
      <div class="copy-right">@ 2023 Harry, Inc . All rights reserved.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface IProps {
  title?: string
}

// 配置props类型与默认值
const props = withDefaults(defineProps<IProps>(), {
  title: ''
})

const footerData = ref([
  {
    title: '前端',
    technology: ['Vue3', 'Nuxt3', 'Pinia', 'TypeScript']
  },
  {
    title: '后端',
    technology: ['Java', 'Mybatis', 'Mybatis-puls', 'SpringBoot']
  }
])
</script>

<style lang="scss" scoped>
.footer {
  border-top: 1px solid #ccc;
  margin-top: 100px;
  margin-bottom: 20px;

  ul {
    display: flex;
    justify-content: center;
    gap: 150px;

    li {
      display: flex;
      flex-direction: column;

      a {
        color: #999;
        text-decoration: none;
        margin-bottom: 10px;
        font-size: 14px;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .copy-right {
    text-align: center;
    border-top: 1px solid #ccc;
    padding: 10px 0;
    color: #666;
  }
}
</style>
