<script setup lang="ts">
import { computed, ref } from 'vue'
import AppIcon from './AppIcon.vue'
import { demoSections } from '@/mock/data'
const featured = [
  {
    ...demoSections[0]!.videos[0]!,
    label: 'Human perturbation',
    environment: 'FRBench-Real',
    caption: 'Liquid pouring under a physical disturbance.',
  },
  {
    ...demoSections[0]!.videos[2]!,
    label: 'Bimanual execution',
    environment: 'FRBench-Real',
    caption: 'Contact-rich, long-horizon vegetable preparation.',
  },
  {
    ...demoSections[3]!.videos[0]!,
    label: 'Grasp slip recovery',
    environment: 'FRBench-Sim',
    caption: 'Restoring object control after a forced grasp slip.',
  },
]
const selected = ref(0)
const current = computed(() => featured[selected.value]!)
const player = ref<HTMLVideoElement>()
const started = ref(false)
const onPlay = () => {
  started.value = true
  document.querySelectorAll<HTMLVideoElement>('video').forEach((video) => {
    if (video !== player.value) video.pause()
  })
}
const play = async () => {
  if (!player.value) return
  started.value = true
  try {
    await player.value.play()
  } catch {
    started.value = false
  }
}
const select = (index: number) => {
  player.value?.pause()
  selected.value = index
  started.value = false
}
</script>
<template>
  <div id="showcase" class="hero-demo">
    <div class="demo-chrome">
      <span><i></i> Recovery in action</span
      ><span>{{ current.environment }}<span class="chrome-plus"> +</span></span>
    </div>
    <div class="demo-layout">
      <div class="demo-player">
        <video
          :key="current.src"
          ref="player"
          :src="current.src"
          :poster="current.poster"
          :controls="started"
          :aria-label="current.title"
          muted
          playsinline
          loop
          preload="none"
          @play="onPlay"
        ></video>
        <button
          v-if="!started"
          type="button"
          class="hero-play"
          :aria-label="`Play ${current.title}`"
          @click="play"
        >
          <AppIcon name="play" :size="25" />
        </button>
        <span v-if="!started" class="video-label">{{ current.caption }}</span>
      </div>
      <aside class="demo-story">
        <span class="mono-label">Resilient embodied intelligence</span>
        <h2>
          Execution drifts.<br /><em>Recovery<br />is learned.</em>
        </h2>
        <p>One policy learns to act, correct, and continue from the state it finds itself in.</p>
        <svg
          class="trajectory"
          viewBox="0 0 300 100"
          fill="none"
          aria-label="Illustrative trajectory from nominal execution through drift and recovery"
          role="img"
        >
          <path d="M12 51H287" stroke="#96ae9b" stroke-opacity=".3" stroke-dasharray="3 5" />
          <path
            d="M12 51C49 51 52 24 91 25C129 25 137 77 174 77"
            stroke="#d9b37b"
            stroke-width="2"
            stroke-dasharray="4 4"
          />
          <path
            d="M174 77C205 77 203 22 236 25C257 27 263 51 287 51"
            stroke="#b8d1a4"
            stroke-width="2.4"
          />
          <circle cx="12" cy="51" r="4" fill="#b8d1a4" />
          <circle cx="174" cy="77" r="5" fill="#d9b37b" />
          <circle cx="287" cy="51" r="5" fill="#b8d1a4" />
          <text x="4" y="91" fill="#b0c1b4" font-size="9" font-family="monospace">NOMINAL</text>
          <text x="150" y="98" fill="#d9b37b" font-size="9" font-family="monospace">DRIFT</text>
          <text x="227" y="12" fill="#c7dbb9" font-size="9" font-family="monospace">RECOVERY</text>
        </svg>
        <a href="#method">Explore the method <AppIcon name="arrow" :size="16" /></a>
      </aside>
    </div>
    <div class="demo-selector" aria-label="Featured demonstrations">
      <button
        v-for="(clip, index) in featured"
        :key="clip.label"
        type="button"
        :class="{ selected: selected === index }"
        :aria-pressed="selected === index"
        @click="select(index)"
      >
        <span class="clip-number">0{{ index + 1 }}</span
        ><span>{{ clip.label }}</span
        ><AppIcon name="arrow" :size="15" />
      </button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.hero-demo {
  background: #1e382d;
  border: 1px solid #1e382d;
  border-radius: 12px;
  overflow: hidden;
  text-align: left;
  box-shadow: 0 12px 40px -24px #14271d55;
}
.demo-chrome {
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 22px;
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  color: #c2cec0;
  border-bottom: 1px solid #ffffff18;
}
.demo-chrome > span {
  display: flex;
  align-items: center;
  gap: 8px;
}
.demo-chrome i {
  width: 6px;
  height: 6px;
  background: #b8d1a4;
  border-radius: 50%;
}
.chrome-plus {
  margin-left: 16px;
  font-size: 18px;
  color: #77917d;
}
.demo-layout {
  display: grid;
  grid-template-columns: 1.8fr 1fr;
}
.demo-player {
  position: relative;
  min-width: 0;
  background: #0d1711;
}
.demo-player video {
  width: 100%;
  height: 100%;
  aspect-ratio: 4/3;
  object-fit: contain;
}
.hero-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background: #fafbf9eb;
  color: var(--ink);
  display: grid;
  place-items: center;
  border: 1px solid #ffffff80;
  box-shadow: 0 6px 24px #0003;
  transition:
    background 0.2s,
    scale 0.2s;
}
.hero-play svg {
  margin-left: 4px;
}
.hero-play:hover {
  background: white;
  scale: 1.08;
}
.video-label {
  position: absolute;
  bottom: 16px;
  left: 18px;
  color: #fff;
  font-size: 10px;
  padding: 5px 10px;
  background: #14271d9e;
  backdrop-filter: blur(8px);
  border-radius: 4px;
  max-width: calc(100% - 36px);
}
.demo-story {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px 34px;
  color: #f0f2e8;
  overflow: hidden;
}
.demo-story .mono-label {
  color: #b1c2b2;
  font-size: 8px;
  letter-spacing: 0.09em;
}
.demo-story h2 {
  font-family: var(--serif);
  font-size: clamp(28px, 3.1vw, 43px);
  line-height: 1.13;
  letter-spacing: -1px;
  font-weight: 400;
  margin-top: 26px;
}
.demo-story h2 em {
  font-weight: 400;
  color: #c2d9ac;
}
.demo-story p {
  font-size: 12px;
  line-height: 1.8;
  color: #b2c1b5;
  margin-top: 20px;
  max-width: 260px;
}
.trajectory {
  width: 100%;
  height: auto;
  max-height: 120px;
  margin-block: 24px 20px;
}
.demo-story > a {
  font-size: 11px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #e4eadc;
}
.demo-story > a:hover {
  color: #c2d9ac;
}
.demo-selector {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  background: #f3f5ee;
  border-top: 1px solid #dfe5dd;
}
.demo-selector button {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 62px;
  text-align: left;
  padding: 14px 22px;
  color: var(--muted);
  font-size: 11px;
  border-right: 1px solid var(--rule);
  position: relative;
}
.demo-selector button:last-child {
  border: 0;
}
.demo-selector button > svg {
  margin-left: auto;
  opacity: 0.4;
}
.clip-number {
  font-family: var(--mono);
  font-size: 9px;
  color: var(--faint);
}
.demo-selector button.selected {
  color: var(--accent-ink);
  background: #e7eddf;
}
.demo-selector button.selected:before {
  content: '';
  position: absolute;
  top: 0;
  height: 2px;
  left: 0;
  right: 0;
  background: var(--accent);
}
.demo-selector button.selected > svg {
  opacity: 1;
}
@media (max-width: 950px) {
  .demo-story {
    padding: 24px;
  }
  .demo-story h2 {
    font-size: 32px;
    margin-top: 18px;
  }
  .demo-story p {
    margin-top: 14px;
  }
  .trajectory {
    margin-block: 16px;
  }
  .demo-story .mono-label {
    font-size: 7px;
  }
  .demo-selector button {
    padding: 12px 16px;
    gap: 8px;
  }
}
@media (max-width: 700px) {
  .demo-layout {
    grid-template-columns: 1fr;
  }
  .demo-story {
    display: none;
  }
  .demo-chrome {
    height: 38px;
    padding: 0 15px;
    font-size: 8px;
  }
  .demo-selector button {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    padding: 12px;
    font-size: 10px;
    min-height: 68px;
  }
  .demo-selector button > svg {
    display: none;
  }
  .video-label {
    font-size: 9px;
    bottom: 12px;
    left: 12px;
  }
  .hero-play {
    width: 56px;
    height: 56px;
  }
}

@media (min-width: 701px) and (max-width: 900px) {
  .demo-layout {
    grid-template-columns: 1.5fr 1fr;
  }
  .demo-story {
    padding: 20px;
  }
  .demo-story h2 {
    font-size: 28px;
    margin-top: 12px;
  }
  .demo-story p {
    font-size: 11px;
    margin-top: 12px;
  }
  .demo-story .mono-label {
    font-size: 6px;
  }
  .trajectory {
    margin-block: 12px;
    max-height: 85px;
  }
  .demo-story > a {
    font-size: 10px;
  }
  .demo-selector button {
    font-size: 10px;
  }
}
</style>
