<script setup lang="ts">
import {
  abstractText,
  affiliationItems,
  authorEntries,
  authorNotes,
  bibtex,
  demoSections,
  figures,
  footerDesc,
  highlights,
  info,
  institutionLogos,
  methodCards,
  projectLinks,
  resources,
  resultSummary,
} from '@/mock/data'
</script>

<template>
  <main class="project-page">
    <section class="hero">
      <div class="hero-card">
        <h1>{{ info.title }}</h1>
        <p class="subtitle">{{ info.subtitle }}</p>
        <p class="hero-desc">{{ info.desc }}</p>

        <div class="author-list">
          <span v-for="author in authorEntries" :key="author.name" class="author-item">
            <span class="author-name">{{ author.name }}</span>
            <sup v-for="mark in author.marks || []" :key="`${author.name}-${mark}`" class="author-mark">{{ mark }}</sup>
            <sup v-for="affiliation in author.affiliations" :key="`${author.name}-${affiliation}`" class="author-affiliation">
              {{ affiliation }}
            </sup>
          </span>
        </div>

        <div class="affiliation-list compact">
          <span v-for="item in affiliationItems" :key="item.id">
            <sup>{{ item.id }}</sup>{{ item.name }}
          </span>
        </div>

        <div class="author-notes">
          <span v-for="note in authorNotes" :key="note.symbol">
            <sup>{{ note.symbol }}</sup>{{ note.text }}
          </span>
        </div>

        <div class="institution-logo-strip">
          <img v-for="logo in institutionLogos" :key="logo.name" :src="logo.src" :alt="logo.name" />
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
            <img v-if="link.iconSrc" class="link-icon" :class="link.iconClass" :src="link.iconSrc" :alt="`${link.label} icon`" />
            <span v-else-if="link.iconText" class="link-icon-text" :class="link.iconClass">{{ link.iconText }}</span>
            <span>{{ link.label }}</span>
          </a>
        </div>
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
      </div>
      <p class="abstract-text">{{ abstractText }}</p>
    </section>

    <section class="section">
      <div class="section-heading centered">
        <div class="section-kicker">Main Figures</div>
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
        <h3>One policy for nominal execution and recovery</h3>
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

    <section class="section">
      <div class="section-heading centered">
        <div class="section-kicker">Results</div>
      </div>
      <div class="result-stack">
        <article v-for="result in resultSummary" :key="result" class="result-row">
          {{ result }}
        </article>
      </div>
    </section>

    <section id="demos" class="section">
      <div class="section-heading centered">
        <div class="section-kicker">Demos</div>
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

      <pre class="bibtex-code"><code>{{ bibtex }}</code></pre>
    </section>

    <footer>{{ footerDesc }}</footer>
  </main>
</template>

<style lang="scss" scoped>
$bg: #f8fafc;
$panel: #ffffff;
$line: rgba(15, 23, 42, 0.08);
$text: #0f172a;
$muted: #475569;
$accent: #64748b;

.project-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(226, 232, 240, 0.45), transparent 36rem),
    radial-gradient(circle at 82% 8%, rgba(219, 234, 254, 0.28), transparent 34rem),
    linear-gradient(180deg, #ffffff 0%, #f8fafc 100%),
    $bg;
  color: $text;
  font-family:
    'Avenir Next',
    Avenir,
    Inter,
    'Helvetica Neue',
    Helvetica,
    Arial,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI';
}

.hero,
.section,
footer {
  width: min(1220px, calc(100% - 28px));
  margin: 0 auto;
}

.hero {
  min-height: auto;
  padding: 14px 0 24px;
}

.hero-card {
  width: 100%;
  border-radius: 28px;
  background: #ffffff;
  border: 1px solid $line;
  box-shadow: 0 14px 34px rgba(15, 23, 42, 0.05);
  padding: 40px 42px 36px;
  text-align: center;
}

h1,
h2,
h3,
p {
  margin: 0;
}

h1 {
  max-width: 980px;
  margin: 0 auto;
  font-size: clamp(42px, 5vw, 80px);
  line-height: 1.02;
  letter-spacing: -0.04em;
  color: #0f172a;
  font-family: inherit;
  font-weight: 800;
}

.subtitle {
  margin-top: 8px;
  font-size: clamp(22px, 2.3vw, 38px);
  line-height: 1.18;
  color: #1e293b;
  font-family: inherit;
  font-weight: 700;
}

.hero-desc {
  margin: 16px auto 0;
  max-width: 920px;
  color: $muted;
  font-size: 18px;
  line-height: 1.7;
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
  margin-top: 20px;
  max-width: 1020px;
  gap: 8px 14px;

  .author-item {
    color: #0f172a;
    font-size: 14px;
    font-weight: 600;
    font-family: inherit;
  }
}

.author-name {
  font-weight: 700;
}

.author-mark,
.author-affiliation {
  font-size: 0.75em;
  vertical-align: super;
  line-height: 0;
}

.affiliation-list {
  margin-top: 12px;
  max-width: 1060px;
  gap: 8px 18px;

  span {
    color: #334155;
    font-size: 14px;
    font-family: inherit;
  }
}

.author-notes {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px 20px;
  color: #475569;
  font-size: 13px;

  sup {
    font-size: 0.8em;
    vertical-align: super;
  }
}

.institution-logo-strip {
  margin: 14px auto 0;
  width: min(900px, 100%);
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 8px;
  align-items: center;
  justify-items: center;
}

.institution-logo-strip img {
  max-width: 100%;
  max-height: 66px;
  object-fit: contain;
}

.link-row {
  margin-top: 22px;
  gap: 12px;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  background: #f3f4f6;
  padding: 12px 20px;
  color: #374151;
  font-weight: 800;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.project-link:hover {
  background: #e5e7eb;
}

.project-link.disabled {
  background: #f3f4f6;
  color: #94a3b8;
  pointer-events: none;
}

.section {
  padding: 56px 0;
}

.section-kicker {
  color: $accent;
  font-size: clamp(16px, 1.5vw, 20px);
  font-weight: 800;
  letter-spacing: 0.02em;
}

.section-heading {
  max-width: 840px;
  margin: 0 auto 30px;

  p {
    margin-top: 12px;
    color: $muted;
    line-height: 1.7;
  }
}

h2 {
  margin-top: 8px;
  font-size: clamp(34px, 4.8vw, 56px);
  line-height: 1.08;
  letter-spacing: -0.04em;
  color: #0f172a;
  font-family: inherit;
  font-weight: 800;
}

h3 {
  font-size: clamp(24px, 3vw, 34px);
  line-height: 1.16;
  letter-spacing: -0.02em;
  color: #0f172a;
  font-family: inherit;
  font-weight: 700;
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
  gap: 14px;
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
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.05);
}

.metric-card {
  border-radius: 20px;
  padding: 22px;
  text-align: center;
}

.metric-value {
  color: #111827;
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
  border-radius: 28px;
  padding: 34px;
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
  border-radius: 28px;
  padding: 24px;
  margin-top: 20px;
}

.figure-copy {
  max-width: 860px;
  margin: 0 auto 18px;
  text-align: center;

  p {
    margin-top: 10px;
    color: $muted;
    font-size: 17px;
    line-height: 1.7;
  }
}

.figure-frame {
  overflow: hidden;
  border: 1px solid $line;
  border-radius: 20px;
  background: #ffffff;
  padding: 12px;

  img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: contain;
  }
}

.method-stack,
.result-stack {
  display: grid;
  gap: 14px;
}

.method-row {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 20px;
  border-radius: 20px;
  padding: 20px;

  p {
    margin-top: 10px;
    color: $muted;
    font-size: 17px;
    line-height: 1.7;
  }
}

.method-index {
  color: #475569;
  font-size: 30px;
  font-weight: 900;
  letter-spacing: -0.04em;
}

.result-row {
  border-left: 4px solid #cbd5e1;
  border-radius: 18px;
  padding: 18px 20px;
  color: $muted;
  line-height: 1.7;
}

.demo-group {
  margin-top: 34px;
}

.demo-heading {
  max-width: 860px;
  margin: 0 auto 18px;
  text-align: center;

  p {
    margin-top: 10px;
    color: $muted;
    font-size: 17px;
    line-height: 1.7;
  }
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.video-card {
  overflow: hidden;
  border-radius: 22px;

  video {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    background: #e2e8f0;
    object-fit: cover;
  }
}

.video-title {
  padding: 12px 16px 14px;
  color: #0f172a;
  font-size: 15px;
  font-weight: 700;
}

.bibtex-section {
  border-radius: 28px;
  padding: 34px;
}

.resource-row {
  margin: 8px 0 18px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.resource-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  background: #f3f4f6;
  padding: 10px 16px;
  color: #374151;
  font-weight: 700;
  text-decoration: none;
}

.resource-link:hover {
  background: #e5e7eb;
}

.link-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.arxiv-icon {
  filter: brightness(0) invert(0.18);
}

.huggingface-icon {
  width: 16px;
  height: 16px;
}

.link-icon-text {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  font-size: 15px;
  line-height: 1;
  color: currentColor;
}

.quote-icon {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.08em;
}

.bibtex-code {
  margin: 0 auto;
  max-width: 980px;
  padding: 18px;
  border-radius: 16px;
  border: 1px solid $line;
  background: #f8fafc;
  overflow-x: auto;
  color: #1f2937;
  font-size: 14px;
  line-height: 1.65;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
    monospace;
}

footer {
  padding: 8px 0 38px;
  color: #64748b;
  text-align: center;
}

@media (max-width: 900px) {
  .metrics,
  .video-grid {
    grid-template-columns: 1fr 1fr;
  }

  .institution-logo-strip {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .hero,
  .section,
  footer {
    width: min(100% - 20px, 1220px);
  }

  .hero {
    padding-top: 10px;
  }

  .hero-card {
    padding: 28px 18px 24px;
  }

  .section {
    padding: 40px 0;
  }

  .metrics,
  .video-grid {
    grid-template-columns: 1fr;
  }

  .card-section,
  .figure-block {
    padding: 20px;
    border-radius: 22px;
  }

  .method-row {
    grid-template-columns: 1fr;
  }

  .institution-logo-strip {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }
}
</style>
