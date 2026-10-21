<script setup lang="ts">
import { computed, ref } from 'vue'
interface DemoVideo {
  title: string
  src: string
  poster: string
  tag?: string
}
interface DemoSection {
  id: string
  title: string
  short: string
  desc: string
  videos: DemoVideo[]
}
const props = defineProps<{ sections: DemoSection[] }>()
const activeId = ref(props.sections[0]?.id ?? '')
const active = computed(() => props.sections.find((section) => section.id === activeId.value))
const changeCategory = (id: string) => {
  document.querySelectorAll<HTMLVideoElement>('video[data-demo]').forEach((video) => video.pause())
  activeId.value = id
}
const onPlay = (event: Event) => {
  document.querySelectorAll<HTMLVideoElement>('video').forEach((video) => {
    if (video !== event.target) video.pause()
  })
}
const moveTab = (event: KeyboardEvent, index: number) => {
  let next: number
  if (event.key === 'ArrowRight') next = (index + 1) % props.sections.length
  else if (event.key === 'ArrowLeft')
    next = (index - 1 + props.sections.length) % props.sections.length
  else if (event.key === 'Home') next = 0
  else if (event.key === 'End') next = props.sections.length - 1
  else return
  event.preventDefault()
  changeCategory(props.sections[next]!.id)
  document.getElementById(`demo-tab-${activeId.value}`)?.focus()
}
</script>
<template>
  <div class="gallery">
    <div class="gallery-tabs" role="tablist" aria-label="Demonstration categories">
      <button
        v-for="(section, index) in sections"
        :id="`demo-tab-${section.id}`"
        :key="section.id"
        type="button"
        role="tab"
        :aria-controls="`demo-panel-${section.id}`"
        :aria-selected="activeId === section.id"
        :tabindex="activeId === section.id ? 0 : -1"
        :class="{ selected: activeId === section.id }"
        @click="changeCategory(section.id)"
        @keydown="moveTab($event, index)"
      >
        {{ section.short }}<span>{{ section.videos.length.toString().padStart(2, '0') }}</span>
      </button>
    </div>
    <div
      v-if="active"
      :id="`demo-panel-${active.id}`"
      :key="active.id"
      class="gallery-panel"
      role="tabpanel"
      :aria-labelledby="`demo-tab-${active.id}`"
      tabindex="0"
    >
      <p class="gallery-description">{{ active.desc }}</p>
      <div class="gallery-grid">
        <figure v-for="(video, index) in active.videos" :key="video.src" class="clip">
          <div class="clip-player">
            <video
              data-demo
              :src="video.src"
              :poster="video.poster"
              :aria-label="video.title"
              controls
              muted
              playsinline
              loop
              preload="none"
              @play="onPlay"
            ></video
            ><span
              v-if="video.tag"
              class="clip-tag"
              :class="{ 'clip-tag--failure': video.tag.includes('failure') }"
              >{{ video.tag }}</span
            >
          </div>
          <figcaption>
            <span class="clip-index">{{ (index + 1).toString().padStart(2, '0') }}</span
            ><span>{{ video.title }}</span
            ><span class="clip-arrow" aria-hidden="true">↗</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.gallery-tabs {
  display: flex;
  border-bottom: 1px solid var(--rule);
  gap: 28px;
}
.gallery-tabs button {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--muted);
  padding: 0 0 16px;
  position: relative;
  white-space: nowrap;
}
.gallery-tabs button > span {
  font-family: var(--mono);
  font-size: 8px;
  color: var(--faint);
}
.gallery-tabs button.selected {
  color: var(--accent-ink);
  font-weight: 550;
}
.gallery-tabs button.selected:after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent);
}
.gallery-tabs button.selected > span {
  color: var(--accent);
}
.gallery-description {
  font-size: 12px;
  line-height: 1.8;
  color: var(--muted);
  max-width: 740px;
  margin-block: 22px 26px;
}
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 30px 25px;
}
.clip {
  min-width: 0;
}
.clip-player {
  position: relative;
  background: #13221a;
  overflow: hidden;
  border: 1px solid var(--rule);
  border-radius: 8px;
}
.clip-player video {
  width: 100%;
  height: auto;
  aspect-ratio: 4/3;
  object-fit: contain;
}
.clip-tag {
  position: absolute;
  pointer-events: none;
  top: 12px;
  left: 12px;
  background: #f5f7f1eb;
  backdrop-filter: blur(8px);
  color: var(--accent-ink);
  border-radius: 3px;
  padding: 3px 8px;
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.02em;
}
.clip-tag--failure {
  color: #994e37;
  background: #f8e9ddec;
}
figcaption {
  display: flex;
  align-items: baseline;
  gap: 12px;
  font-size: 11px;
  line-height: 1.5;
  margin-top: 13px;
  font-weight: 500;
}
.clip-index {
  font-family: var(--mono);
  font-size: 8px;
  font-weight: 400;
  color: var(--muted);
}
.clip-arrow {
  margin-left: auto;
  font-size: 16px;
  line-height: 1;
  color: var(--muted);
}
@media (max-width: 700px) {
  .gallery-tabs {
    gap: 16px;
  }
  .gallery-tabs button {
    font-size: 9px;
    gap: 5px;
    padding-bottom: 13px;
  }
  .gallery-tabs button > span {
    font-size: 7px;
  }
  .gallery-description {
    font-size: 11px;
    margin-block: 18px 22px;
  }
  .gallery-grid {
    gap: 24px 15px;
  }
  figcaption {
    font-size: 10px;
    gap: 8px;
    margin-top: 10px;
  }
  .clip-tag {
    top: 8px;
    left: 8px;
    font-size: 7px;
    padding: 3px 6px;
  }
  .clip-arrow {
    display: none;
  }
}
@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }
  .gallery-tabs {
    justify-content: space-between;
    gap: 6px;
  }
  .gallery-tabs button {
    font-size: 8px;
    gap: 4px;
  }
  .clip-tag {
    font-size: 8px;
  }
  .clip-index {
    font-size: 9px;
  }
  figcaption {
    font-size: 11px;
    gap: 10px;
  }
  .clip-arrow {
    display: block;
  }
}
</style>
