<script setup lang="ts">
defineProps<{
  index: string
  kicker: string
  title: string
  lede?: string
  align?: 'left' | 'center'
}>()
</script>
<template>
  <header class="section-heading" :class="{ 'section-heading--center': align === 'center' }">
    <div class="heading-meta">
      <span>{{ index }}</span
      ><span class="meta-line"></span><span>{{ kicker }}</span>
    </div>
    <h2>{{ title }}</h2>
    <p v-if="lede">{{ lede }}</p>
  </header>
</template>
<style scoped lang="scss">
.section-heading {
  margin-bottom: 38px;
  max-width: 760px;
}
.heading-meta {
  display: flex;
  gap: 12px;
  align-items: center;
  font-family: var(--mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--accent);
  margin-bottom: 16px;
}
.heading-meta > span:first-child {
  color: var(--faint);
}
.meta-line {
  width: 25px;
  height: 1px;
  background: var(--rule-strong);
}
h2 {
  font-family: var(--serif);
  font-size: clamp(30px, 3.4vw, 44px);
  line-height: 1.16;
  letter-spacing: -1.4px;
  font-weight: 450;
  text-wrap: balance;
}
p {
  font-size: 14px;
  color: var(--muted);
  max-width: 650px;
  margin-top: 18px;
  line-height: 1.85;
}
.section-heading--center {
  text-align: center;
  margin-inline: auto;
}
.section-heading--center .heading-meta {
  justify-content: center;
}
.section-heading--center p {
  margin-inline: auto;
}
@media (max-width: 700px) {
  .section-heading {
    margin-bottom: 28px;
  }
  h2 {
    font-size: 32px;
    letter-spacing: -0.8px;
  }
}
</style>
