<script setup lang="ts">
import {
  abstractText,
  authorAffiliations,
  authorEntries,
  authorNotes,
  affiliations,
  bibtex,
  demoSections,
  figures,
  footerDesc,
  highlights,
  info,
  members,
  methodCards,
  projectLinks,
  resultSummary,
} from '@/mock/data'
</script>

<template>
  <main class="project-page">
    <section class="hero">
      <h1>{{ info.title }}</h1>
      <p class="subtitle">{{ info.subtitle }}</p>
      <p class="hero-desc">{{ info.desc }}</p>

      <div class="author-list">
        <span v-for="author in authorEntries" :key="author.name" class="author-item">
          {{ author.name }}<sup>{{ author.indices }}</sup>
        </span>
      </div>

      <div class="affiliation-list compact mapped">
        <span v-for="affiliation in authorAffiliations" :key="affiliation.id">
          <sup>{{ affiliation.id }}</sup>{{ affiliation.name }}
        </span>
      </div>

      <div class="author-note-list">
        <span v-for="note in authorNotes" :key="note">{{ note }}</span>
      </div>

      <div class="link-row">
        <a
          v-for="link in projectLinks"
          :key="link.label"
          class="project-link"
          :class="{ disabled: !link.href }"
          :href="link.href || undefined"
          :target="link.href?.startsWith('#') ? undefined : '_blank'"
          :rel="link.href?.startsWith('#') ? undefined : 'noreferrer'"
        >
          {{ link.label }}
        </a>
      </div>
    </section>

    <section class="section metrics">
      <article v-for="item in highlights" :key="item.value" class="metric-card">
        <div class="metric-value">{{ item.value }}</div>
        <div class="metric-label">{{ item.label }}</div>
      </article>
    </section>

    <section class="section card-section">
      <div class="section-heading centered">
        <div class="section-kicker">Abstract</div>
        <h2 class="abstract-heading">Learning to recover from real execution drift</h2>
      </div>
      <p class="abstract-text">{{ abstractText }}</p>
    </section>

    <section class="section">
      <div class="section-heading centered">
        <div class="section-kicker">Main Figures</div>
        <h2>Recovery-driven policy optimization</h2>
      </div>

      <article v-for="figure in figures" :key="figure.src" class="figure-block">
        <div class="figure-copy">
          <h3>{{ figure.title }}</h3>
          <p>{{ figure.desc }}</p>
        </div>
        <div class="figure-frame">
          <img :src="figure.src" :alt="figure.title" />
        </div>
      </article>
    </section>

    <section id="method" class="section card-section">
      <div class="section-heading centered">
        <div class="section-kicker">Method</div>
        <h4>One policy for nominal execution and recovery</h4>
      </div>
      <div class="method-stack">
        <article v-for="(card, index) in methodCards" :key="card.title" class="method-row">
          <div class="method-index">0{{ index + 1 }}</div>
          <div>
            <h3>{{ card.title }}</h3>
            <p>{{ card.desc }}</p>
          </div>
        </article>
      </div>
    </section>

  <!-- 
    <section class="section">
      <div class="section-heading centered">
        <div class="section-kicker">Results</div>
        <h2>Robustness under adverse physical states</h2>
      </div>
      <div class="result-stack">
        <article v-for="result in resultSummary" :key="result" class="result-row">
          {{ result }}
        </article>
      </div>
    </section>
  -->

    <section id="demos" class="section">
      <div class="section-heading centered">
        <div class="section-kicker">Demos</div>
        <h2>Visual recovery behavior</h2>
      </div>

      <div v-for="section in demoSections" :key="section.title" class="demo-group">
        <div class="demo-heading">
          <h3>{{ section.title }}</h3>
          <p>{{ section.desc }}</p>
        </div>
        <div class="video-grid">
          <article v-for="video in section.videos" :key="video.src" class="video-card">
            <video :src="video.src" controls muted playsinline preload="metadata"></video>
            <div class="video-title">{{ video.title }}</div>
          </article>
        </div>
      </div>
    </section>

    <section id="bibtex" class="section card-section bibtex-section">
      <div class="section-heading centered">
        <div class="section-kicker">Citation</div>
      </div>
      <pre class="bibtex-block"><code>{{ bibtex }}</code></pre>
    </section>

<!--
    <section class="section card-section team-section">
      <div class="section-heading centered">
        <div class="section-kicker">Team</div>
        <h2>Authors and affiliations</h2>
      </div>
      <div class="author-list bottom">
        <span v-for="member in members" :key="member">{{ member }}</span>
      </div>
      <div class="affiliation-list">
        <span v-for="affiliation in affiliations" :key="affiliation">{{ affiliation }}</span>
      </div>
    </section>
-->

    <footer>{{ footerDesc }}</footer>
  </main>
</template>

<style lang="scss" scoped>
$bg: #f3fbf7;
$panel: rgba(255, 255, 255, 0.84);
$panel-strong: rgba(236, 253, 245, 0.9);
$line: rgba(15, 118, 110, 0.16);
$text: #12312b;
$muted: #54736b;
$accent: #14b981;
$accent-2: #0f766e;

.project-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(167, 243, 208, 0.64), transparent 34rem),
    radial-gradient(circle at 82% 8%, rgba(186, 230, 253, 0.55), transparent 32rem),
    linear-gradient(180deg, #f7fffb 0%, #eefaf5 48%, #f8fbff 100%),
    $bg;
  color: $text;
  font-family: 'Times New Roman', Times, 'Nimbus Roman No9 L', serif;
}

.hero,
.section,
footer {
  width: min(1080px, calc(100% - 40px));
  margin: 0 auto;
}

.hero {
  min-height: 86vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 72px 0 52px;
  text-align: center;
}

.venue,
.section-kicker {
  color: $accent;
  font-size: clamp(20px, 2.2vw, 30px);
  font-weight: 800;
  letter-spacing: -0.02em;
  text-transform: none;
}

h1,
h2,
h3,
p {
  margin: 0;
}

h1 {
  margin-top: 14px;
  font-size: clamp(64px, 11vw, 132px);
  line-height: 0.9;
  letter-spacing: -0.08em;
}

h2 {
  margin-top: 10px;
  font-size: clamp(34px, 4.8vw, 56px);
  line-height: 1.08;
  letter-spacing: -0.045em;
}

h3 {
  font-size: clamp(26px, 3.2vw, 34px);
  line-height: 1.16;
  letter-spacing: -0.025em;
}

.subtitle {
  margin-top: 18px;
  max-width: 920px;
  color: $accent-2;
  font-size: clamp(22px, 3vw, 36px);
  line-height: 1.18;
  font-weight: 700;
}

.hero-desc {
  margin-top: 22px;
  max-width: 840px;
  color: $muted;
  font-size: 18px;
  line-height: 1.75;
}

.author-list,
.affiliation-list,
.link-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.author-list {
  margin-top: 28px;
  max-width: 960px;

  span {
    color: $accent-2;
    font-size: 15px;
    font-weight: 700;
  }
}

.author-item {
  color: #0f172a;
  font-size: clamp(24px, 2.4vw, 38px) !important;
  font-weight: 800 !important;
  letter-spacing: -0.02em;
  line-height: 1.2;

  sup {
    margin-left: 2px;
    font-size: 0.52em;
    font-weight: 700;
    vertical-align: super;
  }
}

.author-list.bottom span {
  border: 1px solid $line;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  padding: 9px 12px;
}

.affiliation-list {
  margin-top: 18px;

  span {
    border: 1px solid $line;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.72);
    padding: 8px 12px;
    color: $muted;
    font-size: 14px;
  }
}

.affiliation-list.compact {
  margin-top: 16px;
}

.affiliation-list.compact.mapped {
  max-width: 1060px;

  span {
    border: none;
    background: transparent;
    padding: 0 6px;
    color: #1f2937;
    font-size: clamp(14px, 1.55vw, 33px);
    line-height: 1.55;
    sup {
      margin-right: 2px;
      font-size: 0.75em;
      vertical-align: super;
    }
  }
}

.author-note-list {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;

  span {
    color: #334155;
    font-size: 22px;
  }
}

.link-row {
  margin-top: 34px;
}

.project-link {
  border: 1px solid $line;
  border-radius: 999px;
  background: $accent;
  box-shadow: 0 14px 32px rgba(20, 185, 129, 0.24);
  padding: 13px 22px;
  color: #ffffff;
  font-weight: 800;
  text-decoration: none;
}

.project-link.disabled {
  background: rgba(255, 255, 255, 0.78);
  box-shadow: none;
  color: $muted;
  pointer-events: none;
}

.section {
  padding: 68px 0;
}

.section-heading {
  max-width: 820px;
  margin: 0 auto 38px;

  p {
    margin-top: 14px;
    color: $muted;
    line-height: 1.7;
  }
}

.abstract-heading {
  font-size: clamp(30px, 4.2vw, 48px);
}

.centered {
  text-align: center;
}

.metrics {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  padding-top: 8px;
}

.metric-card,
.card-section,
.figure-block,
.method-row,
.result-row,
.video-card {
  border: 1px solid $line;
  background: $panel;
  box-shadow: 0 20px 60px rgba(15, 118, 110, 0.1);
  backdrop-filter: blur(18px);
}

.metric-card {
  border-radius: 24px;
  padding: 24px;
  text-align: center;
}

.metric-value {
  color: $accent;
  font-size: 34px;
  font-weight: 900;
  letter-spacing: -0.04em;
}

.metric-label {
  margin-top: 10px;
  color: $muted;
  line-height: 1.45;
}

.card-section {
  border-radius: 34px;
  padding: 42px;
}

.abstract-text {
  max-width: 900px;
  margin: 0 auto;
  color: $muted;
  font-size: 19px;
  line-height: 1.85;
  text-align: center;
}

.figure-block {
  border-radius: 34px;
  padding: 28px;
  margin-top: 26px;
}

.figure-copy {
  max-width: 860px;
  margin: 0 auto 20px;
  text-align: center;

  p {
    margin-top: 12px;
    color: $muted;
    font-size: 17px;
    line-height: 1.7;
  }
}

.figure-frame {
  overflow: hidden;
  border: 1px solid $line;
  border-radius: 24px;
  background: #ffffff;
  padding: 16px;

  img {
    display: block;
    width: 100%;
    height: auto;
    min-height: 0;
    object-fit: contain;
  }
}

.method-stack,
.result-stack {
  display: grid;
  gap: 16px;
}

.method-row {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 20px;
  border-radius: 26px;
  padding: 24px;

  p {
    margin-top: 12px;
    color: $muted;
    font-size: 17px;
    line-height: 1.7;
  }
}

.method-index {
  color: $accent;
  font-size: 30px;
  font-weight: 900;
  letter-spacing: -0.04em;
}

.result-row {
  border-left: 4px solid $accent;
  border-radius: 22px;
  padding: 22px 24px;
  color: $muted;
  line-height: 1.7;
}

.demo-group {
  margin-top: 44px;
}

.demo-heading {
  max-width: 860px;
  margin: 0 auto 20px;
  text-align: center;

  p {
    margin-top: 12px;
    color: $muted;
    font-size: 17px;
    line-height: 1.7;
  }
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.video-card {
  overflow: hidden;
  border-radius: 28px;

  video {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    background: #dbeee8;
    object-fit: cover;
  }
}

.video-title {
  padding: 14px 18px 18px;
  color: $text;
  font-size: 15px;
  font-weight: 800;
}

.team-section {
  text-align: center;
}

.bibtex-section {
  scroll-margin-top: 24px;
}

.bibtex-block {
  margin: 0;
  border: 1px solid $line;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  color: $text;
  font-size: 14px;
  line-height: 1.65;
  overflow-x: auto;
  text-align: left;
  white-space: pre;
  font-family: inherit;
}

footer {
  padding: 10px 0 44px;
  color: $muted;
  text-align: center;
}

code {
  color: $accent-2;
}

@media (max-width: 900px) {
  .metrics,
  .video-grid {
    grid-template-columns: 1fr 1fr;
  }

  .figure-frame {
    padding: 12px;
  }
}

@media (max-width: 640px) {
  .hero,
  .section,
  footer {
    width: min(100% - 28px, 1080px);
  }

  .hero {
    min-height: auto;
    padding-top: 52px;
  }

  .section {
    padding: 46px 0;
  }

  .metrics,
  .video-grid {
    grid-template-columns: 1fr;
  }

  .card-section,
  .figure-block {
    padding: 24px;
    border-radius: 26px;
  }

  .method-row {
    grid-template-columns: 1fr;
  }

  .figure-frame {
    padding: 8px;
  }

  .author-item {
    font-size: clamp(20px, 4.8vw, 28px) !important;
  }

  .affiliation-list.compact.mapped span {
    font-size: clamp(20px, 3.5vw, 26px);
  }

  .author-note-list span {
    font-size: 20px;
  }
}
</style>
