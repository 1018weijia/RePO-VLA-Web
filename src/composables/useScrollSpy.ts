import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Tracks which section is currently in view for the sticky navigation.
 * `ids` must be ordered top-to-bottom on the page.
 */
export function useScrollSpy(ids: string[], offset = 140) {
  const active = ref(ids[0] ?? '')

  const update = () => {
    const y = window.scrollY + offset
    let current = ''
    for (const id of ids) {
      const el = document.getElementById(id)
      if (!el) continue
      if (el.getBoundingClientRect().top + window.scrollY <= y) {
        current = id
      }
    }
    const nearBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 160
    active.value = nearBottom ? (ids[ids.length - 1] ?? current) : current || (ids[0] ?? '')
  }

  let frame = 0
  const onScroll = () => {
    if (frame) return
    frame = requestAnimationFrame(() => {
      frame = 0
      update()
    })
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    if (frame) cancelAnimationFrame(frame)
  })

  return active
}
