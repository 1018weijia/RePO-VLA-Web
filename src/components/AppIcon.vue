<script setup lang="ts">
withDefaults(defineProps<{ name: string; size?: number }>(), { size: 18 })
const paths: Record<string, string> = {
  paper: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M8 13h8 M8 17h6',
  github:
    'M9 19c-4.3 1.3-4.3-2-6-2.5 M15 22v-3.9a3.4 3.4 0 0 0-1-2.6c3.3-.4 6.7-1.6 6.7-7.4A5.8 5.8 0 0 0 19 4a5.4 5.4 0 0 0-.1-4s-1.3-.4-4.2 1.6a14.4 14.4 0 0 0-7.5 0C4.3-.4 3 0 3 0a5.4 5.4 0 0 0-.1 4 5.8 5.8 0 0 0-1.7 4.1c0 5.8 3.4 7 6.7 7.4a3.4 3.4 0 0 0-1 2.6V22',
  dataset:
    'M20 6c0 2.2-3.6 4-8 4s-8-1.8-8-4 3.6-4 8-4 8 1.8 8 4z M4 6v12c0 2.2 3.6 4 8 4s8-1.8 8-4V6 M4 12c0 2.2 3.6 4 8 4s8-1.8 8-4',
  cite: 'M10 5H4v7h6V5z M4 12v3c0 2 2 4 4 4 M20 5h-6v7h6V5z M14 12v3c0 2 2 4 4 4',
  arrow: 'M5 12h14 M13 6l6 6-6 6',
  external: 'M14 3h7v7 M21 3 10 14 M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5',
  play: 'M8 5v14l11-7z',
  pause: 'M8 5v14 M16 5v14',
  copy: 'M9 9h12v12H9z M15 9V3H3v12h6',
  check: 'M5 12l4 4L19 6',
  expand: 'M8 3H3v5 M16 3h5v5 M21 16v5h-5 M3 16v5h5',
  close: 'M6 6l12 12 M6 18 18 6',
  menu: 'M4 7h16 M4 17h16',
  recovery: 'M20 8a8 8 0 1 0 0 8 M20 3v5h-5 M8 12l3 3 5-6',
}
</script>
<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path :d="paths[name] || paths.arrow" />
  </svg>
</template>
