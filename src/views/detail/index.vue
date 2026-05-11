<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/stores/index';
import { info } from '@/mock/data';
const store = useStore();
const router = useRouter();
const item = ref({} as any);
onMounted(() => {
  item.value = store.currentItem;
})
</script>

<template>
  <main class="p-32 md:p-64">
    <div class="container">
      <!-- 标题区域 - 增加装饰线 -->
      <div class="title-wrapper">
        <h2>{{ info.title }}</h2>
        <div class="title-divider"></div>
      </div>

      <div class="mt-48 text-48">
        <div>{{ item.title }}</div>
      </div>
      <div class="desc-text mt-32 mb-40 tracking-wide flex items-center">
        <div>Published</div>
        <div ml-100>{{ item.date }}</div>
      </div>
      <template v-if="item.detail && item.detail.length && Array.isArray(item.detail)">
        <div v-for="(i, idx) in item.detail" :key="idx" mt-44>
          <h3 v-if="i.title" mb-32>{{ i.title }}</h3>
          <div v-if="i.desc" mb-32 leading-30>{{ i.desc }}</div>
          <div v-if="i.image" mb-32 class="w-full">
            <img :src="i.image" alt="" class="w-full h-full object-cover" />
          </div>
          <div v-if="i.video" mb-32>
            <video controls class="w-full h-300" control muted autoplay>
              <source :src="i.video" type="video/mp4" />
            </video>
          </div>
        </div>
      </template>
    </div>
  </main>
</template>
<style lang="scss" scoped>
$theme-color: rgb(30, 173, 17);

main {
  background-color: #f8f9fa; // 更换背景色（原：rgb(230, 238, 229)）
  min-height: 100vh;
  color: #2d3748; // 主文字色

  .container {
    width: 100%;
    height: 100%;
    max-width: 768px; // 微调宽度
    margin: 0 auto; // 居中（原未居中）
  }

  .title-wrapper {
    position: relative;

    h2 {
      font-size: 36px; // 调整字号
      font-weight: 500; // 调整字重
      margin: 0;
      color: #2b4257; // 标题专属色

      // 媒体查询
      @media (max-width: 768px) {
        font-size: 28px; // 调整字号
      }
    }

    .title-divider {
      width: 80px;
      height: 3px;
      background-color: $theme-color; // 装饰线颜色
      margin-top: 16px;
    }
  }

  // 描述文本样式
  .desc-text {
    font-size: 15px;
    color: #4a5568;

  }

}
</style>
