<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import AppIcon from './AppIcon.vue'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { projectLinks } from '@/mock/data'
const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'method', label: 'Method' },
  { id: 'benchmark', label: 'FRBench' },
  { id: 'results', label: 'Results' },
  { id: 'demos', label: 'Demos' },
]
const active = useScrollSpy(sections.map((s) => s.id))
const menuOpen = ref(false)
const closeMenu = () => {
  menuOpen.value = false
}
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeMenu()
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>
<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-nav">
    <div class="shell nav-inner">
      <a class="wordmark" href="#top" aria-label="RePO-VLA home" @click="closeMenu"
        ><span class="brand-icon"><AppIcon name="recovery" :size="20" /></span>RePO<span
          class="wordmark-dash"
          >-</span
        >VLA</a
      >
      <nav class="desktop-nav" aria-label="Main navigation">
        <a
          v-for="section in sections"
          :key="section.id"
          :href="`#${section.id}`"
          :class="{ active: active === section.id }"
          :aria-current="active === section.id ? 'location' : undefined"
          >{{ section.label }}</a
        >
      </nav>
      <div class="nav-actions">
        <a :href="projectLinks[1]!.href" class="nav-code" target="_blank" rel="noopener noreferrer"
          ><AppIcon name="github" :size="16" /><span>Code</span
          ><span class="external-arrow">↗</span></a
        >
        <button
          class="menu-toggle"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          :aria-label="menuOpen ? 'Close navigation' : 'Open navigation'"
          @click="menuOpen = !menuOpen"
        >
          <AppIcon :name="menuOpen ? 'close' : 'menu'" />
        </button>
      </div>
    </div>
    <nav v-if="menuOpen" id="mobile-menu" class="mobile-nav" aria-label="Mobile navigation">
      <a v-for="section in sections" :key="section.id" :href="`#${section.id}`" @click="closeMenu"
        >{{ section.label }}<span>↗</span></a
      >
      <a href="#citation" @click="closeMenu">Citation<span>↗</span></a>
    </nav>
  </header>
</template>
<style scoped lang="scss">
.site-nav {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgb(250 251 249 / 93%);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--rule);
}
.nav-inner {
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.wordmark {
  display: flex;
  align-items: center;
  font-size: 20px;
  letter-spacing: -0.8px;
  font-weight: 750;
  white-space: nowrap;
  gap: 0;
}
.brand-icon {
  color: var(--accent);
  margin-right: 9px;
  display: flex;
}
.wordmark-dash {
  color: var(--accent);
}
.desktop-nav {
  display: flex;
  gap: 30px;
  height: 100%;
  align-items: center;
}
.desktop-nav a {
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  font-size: 12px;
  font-weight: 500;
  color: var(--muted);
  transition: color 0.2s;
}
.desktop-nav a:hover,
.desktop-nav a.active {
  color: var(--accent);
}
.desktop-nav a.active:after {
  content: '';
  height: 2px;
  background: var(--accent);
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
}
.nav-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}
.nav-code {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
}
.external-arrow {
  color: var(--muted);
  font-size: 16px;
}
.menu-toggle {
  display: none;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--rule);
  border-radius: 6px;
}
.mobile-nav {
  padding: 8px var(--gutter) 18px;
  border-top: 1px solid var(--rule);
  background: var(--paper);
}
.mobile-nav a {
  display: flex;
  justify-content: space-between;
  padding: 11px 0;
  font-size: 14px;
  color: var(--ink-soft);
}
.skip-link {
  position: fixed;
  top: -80px;
  left: 20px;
  z-index: 100;
  background: var(--accent);
  color: white;
  padding: 10px 18px;
}
.skip-link:focus {
  top: 12px;
}
@media (max-width: 850px) {
  .desktop-nav {
    gap: 20px;
  }
}
@media (max-width: 700px) {
  .nav-inner {
    height: 62px;
  }
  .desktop-nav {
    display: none;
  }
  .menu-toggle {
    display: flex;
  }
}
</style>
