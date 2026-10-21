<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import AppIcon from './AppIcon.vue'
withDefaults(
  defineProps<{
    src: string
    alt: string
    caption?: string
    label?: string
    tone?: 'paper' | 'plain'
    priority?: boolean
  }>(),
  { tone: 'paper', priority: false },
)
const dialog = ref<HTMLDialogElement>()
let previousOverflow = ''
const open = () => {
  previousOverflow = document.body.style.overflow
  dialog.value?.showModal()
  document.body.style.overflow = 'hidden'
}
const close = () => {
  dialog.value?.close()
}
const restore = () => {
  document.body.style.overflow = previousOverflow
}
onBeforeUnmount(() => {
  if (dialog.value?.open) {
    dialog.value.close()
    restore()
  }
})
</script>
<template>
  <figure class="figure" :class="`figure--${tone}`">
    <button type="button" class="figure-frame" :aria-label="`Enlarge figure: ${alt}`" @click="open">
      <img :src="src" :alt="alt" :loading="priority ? 'eager' : 'lazy'" decoding="async" />
      <span class="enlarge"><AppIcon name="expand" :size="14" /></span>
    </button>
    <figcaption v-if="caption || label">
      <span v-if="label" class="figure-label">{{ label }}</span
      ><span>{{ caption }}</span>
    </figcaption>
    <dialog
      ref="dialog"
      class="figure-dialog"
      :aria-label="alt"
      @close="restore"
      @click="
        (event) => {
          if (event.target === dialog) close()
        }
      "
    >
      <div class="dialog-content">
        <button
          type="button"
          class="dialog-close"
          aria-label="Close enlarged figure"
          autofocus
          @click="close"
        >
          <AppIcon name="close" /></button
        ><img :src="src" :alt="alt" />
        <p v-if="caption">{{ caption }}</p>
      </div>
    </dialog>
  </figure>
</template>
<style scoped lang="scss">
.figure {
  min-width: 0;
}
.figure-frame {
  position: relative;
  display: block;
  width: 100%;
  background: white;
  border: 1px solid var(--rule);
  padding: 22px;
  border-radius: 10px;
  text-align: left;
  cursor: zoom-in;
}
.figure-frame img {
  width: 100%;
  height: auto;
}
.enlarge {
  position: absolute;
  right: 9px;
  bottom: 9px;
  background: var(--paper);
  color: var(--muted);
  border: 1px solid var(--rule);
  border-radius: 4px;
  padding: 6px;
  display: flex;
  opacity: 0.75;
  transition: opacity 0.2s;
}
.figure-frame:hover .enlarge {
  opacity: 1;
}
figcaption {
  display: flex;
  align-items: baseline;
  gap: 12px;
  font-size: 11px;
  color: var(--muted);
  line-height: 1.8;
  margin-top: 14px;
}
.figure-label {
  font-family: var(--mono);
  text-transform: uppercase;
  font-size: 9px;
  color: var(--accent);
  white-space: nowrap;
}
.figure-dialog {
  width: min(1400px, 94vw);
  max-height: 90dvh;
  padding: 0;
  border: 1px solid var(--rule);
  border-radius: 12px;
  background: white;
  color: var(--ink);
  box-shadow: 0 20px 100px #0004;
}
.figure-dialog::backdrop {
  background: #112219b8;
  backdrop-filter: blur(5px);
}
.dialog-content {
  padding: 48px 26px 26px;
  position: relative;
}
.dialog-content img {
  width: 100%;
}
.dialog-content p {
  font-size: 12px;
  color: var(--muted);
  margin-top: 20px;
}
.dialog-close {
  position: absolute;
  right: 12px;
  top: 10px;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--paper-sunken);
}
@media (max-width: 700px) {
  .figure-frame {
    padding: 12px;
  }
  figcaption {
    font-size: 10px;
    gap: 8px;
  }
  .dialog-content {
    padding: 45px 12px 15px;
  }
}
</style>
