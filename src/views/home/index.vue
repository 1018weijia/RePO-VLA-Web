<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import SiteNav from '@/components/SiteNav.vue'
import AppIcon from '@/components/AppIcon.vue'
import HeroDemo from '@/components/HeroDemo.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import FigureFrame from '@/components/FigureFrame.vue'
import DemoGallery from '@/components/DemoGallery.vue'
import ResultsTables from '@/components/ResultsTables.vue'
import {
  abstractText,
  affiliationItems,
  authorEntries,
  authorNotes,
  benchmarkPhases,
  bibtex,
  contributions,
  datasetStats,
  demoSections,
  errorTypes,
  figures,
  highlights,
  info,
  institutionLogos,
  methodStages,
  projectLinks,
} from '@/mock/data'

defineOptions({ name: 'ProjectHome' })

const titleSegments = info.subtitle
  .split(/(Re(?=covery)|P(?=olicy)|O(?=ptimization)|V(?=ision)|L(?=anguage)|A(?=ction))/)
  .map((text) => ({
    text,
    tone: ['Re', 'P', 'O'].includes(text)
      ? 'recovery'
      : ['V', 'L', 'A'].includes(text)
        ? 'action'
        : undefined,
  }))
const authorRows = [authorEntries.slice(0, 7), authorEntries.slice(7, 14), authorEntries.slice(14)]
const affiliationsWithLogos = affiliationItems.map((item) => ({
  ...item,
  logo: institutionLogos.find((logo) => logo.name === item.name)?.src,
}))
const corresponding: Record<string, string> = {
  'Liang Lin': 'linlng@mail.sysu.edu.cn',
  'Xiaodan Liang': 'liangxd9@mail.sysu.edu.cn',
}
const copied = ref(false)
const copyFailed = ref(false)
const citationCode = ref<HTMLElement>()
let copyTimer: ReturnType<typeof setTimeout>
const copyBibtex = async () => {
  try {
    await navigator.clipboard.writeText(bibtex)
    copied.value = true
    copyFailed.value = false
    clearTimeout(copyTimer)
    copyTimer = setTimeout(() => {
      copied.value = false
    }, 2500)
  } catch {
    const selection = window.getSelection()
    if (citationCode.value && selection) {
      const range = document.createRange()
      range.selectNodeContents(citationCode.value)
      selection.removeAllRanges()
      selection.addRange(range)
    }
    copyFailed.value = true
  }
}
onBeforeUnmount(() => clearTimeout(copyTimer))
</script>
<template>
  <div id="top">
    <SiteNav />
    <main id="main">
      <section class="hero">
        <div class="hero-grid" aria-hidden="true"></div>
        <div class="shell hero-inner">
          <div class="hero-eyebrow">
            <span class="venue-dot"></span><span>{{ info.venue }}</span
            ><span class="eyebrow-divider">/</span
            ><span>Robot learning & embodied intelligence</span>
          </div>
          <h1 class="hero-title">
            <span class="hero-wordmark"
              ><span class="title-recovery">RePO</span><span class="title-dash">-</span
              ><span class="title-action">VLA</span><span class="title-colon">:</span></span
            >
            {{ ' ' }}
            <span class="hero-subtitle"
              ><span
                v-for="(segment, index) in titleSegments"
                :key="index"
                :class="segment.tone ? `title-${segment.tone} title-initial` : undefined"
                >{{ segment.text }}</span
              ></span
            >
          </h1>
          <p class="hero-deck">{{ info.desc }}</p>
          <div class="authors" aria-label="Authors in paper order">
            <div v-for="(row, index) in authorRows" :key="index" class="author-row">
              <span v-for="author in row" :key="author.name" class="author"
                ><a
                  v-if="corresponding[author.name]"
                  :href="`mailto:${corresponding[author.name]}`"
                  :title="`Corresponding author: ${corresponding[author.name]}`"
                  >{{ author.name }}</a
                ><span v-else>{{ author.name }}</span
                ><sup>{{ [...author.affiliations, ...(author.marks ?? [])].join(',') }}</sup></span
              >
            </div>
          </div>
          <div class="affiliations" aria-label="Author affiliations">
            <span
              v-for="item in affiliationsWithLogos"
              :key="item.id"
              class="affiliation-item"
              :title="'fullName' in item ? item.fullName : item.name"
            >
              <img
                v-if="item.logo"
                :src="item.logo"
                alt=""
                width="28"
                height="28"
                decoding="async"
              />
              <span
                ><sup>{{ item.id }}</sup
                >{{ item.name }}</span
              >
            </span>
          </div>
          <div class="author-notes">
            <span v-for="note in authorNotes" :key="note.symbol"
              ><sup>{{ note.symbol }}</sup> {{ note.text }}</span
            >
          </div>
          <div class="resource-links">
            <a
              v-for="link in projectLinks"
              :key="link.kind"
              :href="link.href"
              :target="link.href.startsWith('#') ? undefined : '_blank'"
              :rel="link.href.startsWith('#') ? undefined : 'noopener noreferrer'"
              class="button"
              :class="{ 'button--primary': link.kind === 'paper' }"
              ><AppIcon :name="link.kind" :size="16" />{{ link.label
              }}<span v-if="link.kind === 'paper'" class="button-arrow">↗</span></a
            >
          </div>
          <HeroDemo />
        </div>
      </section>

      <section class="metrics" aria-label="Key findings">
        <div class="shell metric-grid">
          <div v-for="stat in highlights" :key="stat.value" class="metric">
            <div class="metric-value">
              {{ stat.value }}<span v-if="stat.unit"> {{ stat.unit }}</span>
            </div>
            <p>{{ stat.label }}</p>
            <span class="metric-note">{{ stat.note }}</span>
          </div>
        </div>
      </section>

      <section id="overview" class="section overview-section">
        <div class="shell">
          <div class="overview-intro">
            <SectionHeading
              index="01"
              kicker="The idea"
              title="Robots will make mistakes. Let’s teach them to recover."
            />
            <div>
              <p class="section-intro">
                Successful demonstrations teach a robot what to do when things go right. RePO-VLA
                also learns from what happens when they don’t: a slipped grasp, a shifted object, an
                interrupted action.
              </p>
              <a
                class="text-link"
                :href="projectLinks[0]!.href"
                target="_blank"
                rel="noopener noreferrer"
                >Read the full paper <AppIcon name="external" :size="13"
              /></a>
            </div>
          </div>
          <FigureFrame
            :src="figures.teaser.src"
            :alt="figures.teaser.alt"
            :caption="figures.teaser.caption"
            label="The core idea"
          />
          <div class="contribution-grid">
            <article v-for="item in contributions" :key="item.index">
              <span class="contribution-index">{{ item.index }} /</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </article>
          </div>
          <details class="abstract-disclosure">
            <summary>
              <span>Abstract</span
              ><span class="disclosure-hint"
                >Read the paper abstract <span class="disclosure-plus">+</span></span
              >
            </summary>
            <p>{{ abstractText }}</p>
          </details>
        </div>
      </section>

      <section id="method" class="section section--tinted">
        <div class="shell">
          <div class="heading-with-aside">
            <SectionHeading
              index="02"
              kicker="The method"
              title="Learn the correction. Condition on progress."
              lede="Two stages of fine-tuning turn mixed-quality trajectories into recovery behavior. A single policy handles both nominal execution and correction."
            /><span class="method-badge"><span></span>One policy · fixed v = 1.0</span>
          </div>
          <div class="stages">
            <article v-for="(stage, i) in methodStages" :key="stage.abbr" class="stage">
              <div class="stage-top">
                <span class="stage-tag">{{ stage.tag }}</span
                ><span class="stage-abbr">{{ stage.abbr }}</span>
              </div>
              <div class="stage-track" aria-hidden="true">
                <span>{{ i + 1 }}</span
                ><i></i><AppIcon name="arrow" :size="15" />
              </div>
              <h3>{{ stage.title }}</h3>
              <p>{{ stage.desc }}</p>
              <div class="stage-detail">{{ stage.detail }}</div>
            </article>
          </div>
          <FigureFrame
            :src="figures.method.src"
            :alt="figures.method.alt"
            :caption="figures.method.caption"
            label="Framework"
          />
          <div class="value-grid">
            <div class="value-copy">
              <span class="mono-label">Make failure data useful</span>
              <h3>Preserve the useful prefix.<br /><em>Down-weight the breakdown.</em></h3>
              <p>
                Failed rollouts often begin with valid motion. Reliability decay retains that early
                signal while reducing the value of actions near terminal failure.
              </p>
              <div
                class="equation"
                aria-label="v t equals V of tau fail times one minus t over T to the power alpha"
              >
                v<sub>t</sub> = V(τ<sub>fail</sub>) · (1 − t/T)<sup>α</sup>
              </div>
              <div class="value-labels">
                <span><i class="value-dot"></i> Success & correction <b>1.0</b></span
                ><span><i class="value-dot value-dot--error"></i> Error segments <b>0.0</b></span>
              </div>
              <p class="value-footnote">
                α = 3 in our experiments. At deployment, a fixed high-value token selects
                progress-oriented actions without an online value estimate or failure detector.
              </p>
            </div>
            <FigureFrame
              :src="figures.value.src"
              :alt="figures.value.alt"
              :caption="figures.value.caption"
              label="PAS-VF"
            />
          </div>
        </div>
      </section>

      <section id="benchmark" class="section benchmark-section">
        <div class="shell">
          <div class="heading-with-aside">
            <SectionHeading
              index="03"
              kicker="FRBench"
              title="A benchmark for the way back."
              lede="The Failure-Recovery Benchmark measures whether a policy can restore task progress after a verified physical breakdown, in simulation and the real world."
            /><a
              class="text-link"
              href="https://huggingface.co/datasets/Jerry2003/FR_Bench"
              target="_blank"
              rel="noopener noreferrer"
              >Explore the dataset <AppIcon name="external" :size="13"
            /></a>
          </div>
          <div class="benchmark-phases">
            <article v-for="(phase, i) in benchmarkPhases" :key="phase.phase" :class="`phase-${i}`">
              <div class="phase-head">
                <span class="phase-number">0{{ i + 1 }}</span>
                <h3>{{ phase.phase }}</h3>
                <AppIcon v-if="i < 2" name="arrow" :size="20" /><AppIcon
                  v-else
                  name="check"
                  :size="20"
                />
              </div>
              <p>{{ phase.control }}</p>
              <span class="phase-measure">{{ phase.measure }}</span>
            </article>
          </div>
          <div class="benchmark-detail">
            <div>
              <div class="taxonomy-heading">
                <span class="mono-label">Four controlled failure modes</span
                ><span class="mono-label">Simulation</span>
              </div>
              <div class="error-list">
                <article v-for="error in errorTypes" :key="error.code">
                  <span>{{ error.code }}</span>
                  <div>
                    <h4>{{ error.name }}</h4>
                    <p>{{ error.desc }}</p>
                  </div>
                </article>
              </div>
              <div class="dataset-stats">
                <div v-for="stat in datasetStats" :key="stat.label">
                  <strong>{{ stat.value }}</strong
                  ><span>{{ stat.label }}</span>
                </div>
              </div>
            </div>
            <div class="benchmark-figure">
              <FigureFrame
                :src="figures.dataEngine.src"
                :alt="figures.dataEngine.alt"
                :caption="figures.dataEngine.caption"
                label="Data engine"
              />
              <p class="collection-note">
                <strong>Simulated recovery is planner-generated.</strong> Real-world recovery is
                teleoperated: 200 expert demonstrations and 50 recovery episodes per task at the
                base data scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="results" class="section section--tinted">
        <div class="shell">
          <SectionHeading
            index="04"
            kicker="The evidence"
            title="More recovery experience. More resilient execution."
            lede="Recovery-aware initialization improves nominal competence. Value-conditioned refinement benefits from denser failure and recovery coverage, reaching 75% average adversarial success at 4× data on two real-world tasks."
          />
          <ResultsTables />
          <details class="supporting-figures">
            <summary>
              <span>More experimental detail</span
              ><span class="disclosure-hint"
                >Ablations & real-world setup <span class="disclosure-plus">+</span></span
              >
            </summary>
            <div class="supporting-grid">
              <FigureFrame
                :src="figures.ablations.src"
                :alt="figures.ablations.alt"
                :caption="figures.ablations.caption"
                label="Ablations"
              /><FigureFrame
                :src="figures.realWorld.src"
                :alt="figures.realWorld.alt"
                :caption="figures.realWorld.caption"
                label="Robot setup"
              />
            </div>
          </details>
        </div>
      </section>

      <section id="demos" class="section">
        <div class="shell">
          <div class="heading-with-aside">
            <SectionHeading
              index="05"
              kicker="See it in motion"
              title="Act. Adapt. Continue."
              lede="Explore real-world executions, controlled disturbances, and recovered and unrecovered failure cases. Select a category and play any clip."
            /><span class="demo-count"><span>19</span> research clips</span>
          </div>
          <DemoGallery :sections="demoSections" />
        </div>
      </section>

      <section id="citation" class="section citation-section">
        <div class="shell citation-grid">
          <div>
            <SectionHeading
              index="06"
              kicker="Build on this work"
              title="Research is better shared."
            />
            <p class="section-intro">
              If RePO-VLA or FRBench is useful to your research, please consider citing our work.
            </p>
            <div class="citation-links">
              <a
                class="text-link"
                href="https://github.com/1018weijia/FR_Bench"
                target="_blank"
                rel="noopener noreferrer"
                ><AppIcon name="github" :size="15" /> Code <AppIcon name="external" :size="12" /></a
              ><a
                class="text-link"
                href="https://huggingface.co/datasets/Jerry2003/FR_Bench"
                target="_blank"
                rel="noopener noreferrer"
                ><AppIcon name="dataset" :size="15" /> Dataset <AppIcon name="external" :size="12"
              /></a>
            </div>
            <p class="correspondence">
              <span class="mono-label">Correspondence</span
              ><a href="mailto:linlng@mail.sysu.edu.cn">Liang Lin <span>↗</span></a
              ><a href="mailto:liangxd9@mail.sysu.edu.cn">Xiaodan Liang <span>↗</span></a>
            </p>
          </div>
          <div class="citation-box">
            <div class="citation-bar">
              <span class="mono-label">BibTeX</span
              ><button type="button" @click="copyBibtex">
                <AppIcon :name="copied ? 'check' : 'copy'" :size="14" />{{
                  copied ? 'Copied' : 'Copy citation'
                }}</button
              ><span role="status" class="sr-only">{{
                copied ? 'Citation copied to clipboard' : ''
              }}</span>
            </div>
            <pre ref="citationCode"><code>{{ bibtex }}</code></pre>
            <p v-if="copyFailed" role="status" class="copy-fallback">
              Citation selected. Press Ctrl+C or ⌘C to copy.
            </p>
          </div>
        </div>
      </section>
    </main>
    <footer class="footer">
      <div class="shell footer-inner">
        <a href="#top" class="footer-brand"
          ><AppIcon name="recovery" :size="21" /> RePO-VLA<span>NeurIPS 2026</span></a
        ><span>Learning to recover. Continuing to act.</span
        ><a href="#top" class="back-top">Back to top <span>↑</span></a>
      </div>
    </footer>
  </div>
</template>
<style scoped lang="scss">
.hero {
  position: relative;
  padding: 38px 0 0;
  isolation: isolate;
}
.hero-grid {
  position: absolute;
  inset: 0 0 auto;
  height: 460px;
  z-index: -1;
  background-image:
    linear-gradient(#dfe5dd55 1px, transparent 1px),
    linear-gradient(90deg, #dfe5dd55 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse at 50% 10%, #0009, transparent 70%);
  pointer-events: none;
}
.hero-inner {
  text-align: center;
}
.hero-eyebrow {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  font-family: var(--mono);
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  color: var(--muted);
}
.venue-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
}
.eyebrow-divider {
  color: var(--rule-strong);
  margin-inline: 3px;
}
.hero-title {
  margin: 32px auto 0;
  font-size: clamp(21px, 2.1vw, 28px);
  line-height: 1.5;
  font-weight: 400;
  letter-spacing: -0.55px;
  text-wrap: balance;
}
.hero-wordmark {
  display: inline;
  font-family: var(--sans);
  font-size: 1.08em;
  font-weight: 720;
  letter-spacing: -1.1px;
  white-space: nowrap;
}
.title-recovery {
  color: #326449;
}
.title-action {
  color: #3d6b86;
}
.title-dash,
.title-colon {
  color: #82918a;
  font-weight: 450;
}
.title-colon {
  margin-right: 0.12em;
}
.hero-subtitle {
  display: inline;
  font-family: var(--serif);
}
.title-initial {
  font-weight: 650;
}
.hero-deck {
  color: var(--muted);
  font-size: 12px;
  margin-top: 16px;
}
.authors {
  margin: 22px auto 0;
  max-width: 920px;
}
.author-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px 18px;
  margin-bottom: 5px;
}
.author {
  font-size: 12px;
  white-space: nowrap;
  line-height: 1.8;
}
.author sup {
  font-size: 8px;
  color: var(--accent);
  margin-left: 2px;
}
.author a {
  border-bottom: 1px solid #a6b8a888;
}
.author a:hover {
  color: var(--accent);
}
.affiliations {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px 22px;
  max-width: 1080px;
  margin: 18px auto 0;
  color: var(--muted);
  font-size: 10px;
}
.affiliation-item {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  max-width: 100%;
  text-align: left;
}
.affiliation-item img {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  object-fit: contain;
  mix-blend-mode: multiply;
}
.affiliation-item > span {
  min-width: 0;
}
.affiliations sup {
  font-size: 8px;
  margin-right: 3px;
  color: var(--accent);
}
.author-notes {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px 16px;
  margin-top: 9px;
  font-size: 9px;
  color: var(--muted);
}
.author-notes sup {
  color: var(--accent);
}
.resource-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 9px;
  margin: 21px auto 30px;
}
.button-arrow {
  margin-left: 4px;
  font-size: 17px;
  line-height: 1;
}
.metrics {
  border-block: 1px solid var(--rule);
  background: #f0f3ec66;
}
.metric-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding-block: 32px;
}
.metric {
  padding-inline: 27px;
  border-right: 1px solid var(--rule);
}
.metric:first-child {
  padding-left: 0;
}
.metric:last-child {
  border-right: 0;
  padding-right: 0;
}
.metric-value {
  font-size: 34px;
  font-weight: 500;
  letter-spacing: -1.4px;
  line-height: 1.3;
  font-variant-numeric: tabular-nums;
  color: var(--accent-ink);
}
.metric-value > span {
  font-family: var(--mono);
  font-size: 13px;
  letter-spacing: -0.5px;
}
.metric p {
  font-size: 11px;
  font-weight: 550;
  margin-top: 10px;
}
.metric-note {
  display: block;
  font-size: 9px;
  color: var(--muted);
  margin-top: 3px;
}
.overview-intro {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 65px;
  align-items: start;
  margin-bottom: 38px;
}
.overview-intro .section-heading {
  margin: 0;
}
.overview-intro > div {
  padding-top: 35px;
}
.overview-intro .text-link {
  margin-top: 17px;
}
.contribution-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 34px;
  margin-top: 40px;
}
.contribution-grid article {
  border-top: 1px solid var(--rule);
  padding-top: 21px;
}
.contribution-index {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--accent);
}
.contribution-grid h3 {
  font-size: 16px;
  letter-spacing: -0.3px;
  font-weight: 550;
  margin-top: 12px;
}
.contribution-grid p {
  font-size: 12px;
  line-height: 1.9;
  color: var(--muted);
  margin-top: 10px;
}
.abstract-disclosure {
  margin-top: 36px;
  border-block: 1px solid var(--rule);
}
summary {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0;
  gap: 16px;
  font-size: 13px;
  font-weight: 550;
  cursor: pointer;
}
summary::-webkit-details-marker {
  display: none;
}
.disclosure-hint {
  display: flex;
  align-items: center;
  gap: 22px;
  font-weight: 400;
  font-size: 10px;
  color: var(--muted);
}
.disclosure-plus {
  font-size: 20px;
  font-weight: 300;
  line-height: 1;
  transition: transform 0.2s;
}
details[open] > summary .disclosure-plus {
  transform: rotate(45deg);
}
.abstract-disclosure > p {
  font-size: 13px;
  line-height: 2;
  color: var(--muted);
  max-width: 900px;
  padding-bottom: 25px;
}
.heading-with-aside {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
}
.heading-with-aside > .text-link {
  white-space: nowrap;
  flex-shrink: 0;
  margin-bottom: 28px;
}
.method-badge {
  flex-shrink: 0;
  border: 1px solid var(--rule-strong);
  border-radius: 5px;
  padding: 8px 11px;
  font-family: var(--mono);
  font-size: 9px;
  display: flex;
  align-items: center;
  gap: 7px;
  color: var(--accent);
  margin-bottom: 30px;
}
.method-badge > span {
  width: 5px;
  height: 5px;
  background: var(--accent);
  border-radius: 50%;
}
.stages {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
  margin-bottom: 42px;
}
.stage {
  min-width: 0;
}
.stage-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--mono);
  font-size: 10px;
}
.stage-tag {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
}
.stage-abbr {
  font-size: 9px;
  color: var(--accent);
  background: #e1e9db;
  border: 1px solid #cbd8c3;
  padding: 2px 7px;
  border-radius: 3px;
}
.stage-track {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-block: 18px;
  color: var(--accent);
}
.stage-track span {
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  background: var(--accent);
  color: white;
  font-family: var(--mono);
  font-size: 10px;
  border-radius: 50%;
}
.stage-track i {
  height: 1px;
  background: var(--rule-strong);
  flex: 1;
}
.stage:last-child .stage-track svg {
  opacity: 0;
}
.stage h3 {
  font-weight: 550;
  font-size: 15px;
  letter-spacing: -0.3px;
}
.stage > p {
  font-size: 12px;
  line-height: 1.95;
  color: var(--muted);
  margin-top: 13px;
}
.stage-detail {
  font-size: 10px;
  line-height: 1.8;
  color: var(--accent);
  border-top: 1px solid var(--rule);
  margin-top: 18px;
  padding-top: 12px;
}
.value-grid {
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: 60px;
  margin-top: 66px;
  align-items: center;
}
.value-copy h3 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: 29px;
  line-height: 1.3;
  letter-spacing: -0.6px;
  margin-top: 16px;
}
.value-copy h3 em {
  font-weight: 400;
  color: var(--accent);
}
.value-copy > p {
  font-size: 12px;
  color: var(--muted);
  margin-top: 18px;
}
.equation {
  font-family: var(--serif);
  font-style: italic;
  font-size: 23px;
  letter-spacing: -0.3px;
  white-space: nowrap;
  margin-block: 22px;
  padding-block: 18px;
  border-block: 1px solid var(--rule-strong);
}
.equation sub,
.equation sup {
  font-size: 12px;
}
.value-labels {
  display: flex;
  gap: 22px;
  font-size: 9px;
}
.value-labels > span {
  display: flex;
  gap: 6px;
  align-items: center;
}
.value-labels b {
  font-family: var(--mono);
  font-size: 9px;
  color: var(--accent);
}
.value-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
}
.value-dot--error {
  background: #bb8765;
}
.value-copy > .value-footnote {
  font-size: 10px;
  line-height: 1.9;
}
.benchmark-phases {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border: 1px solid var(--rule);
  border-radius: 10px;
  overflow: hidden;
}
.benchmark-phases article {
  padding: 25px;
  border-right: 1px solid var(--rule);
  background: white;
}
.benchmark-phases article:last-child {
  border: 0;
  background: #edf3e6;
}
.phase-head {
  display: flex;
  align-items: center;
  gap: 12px;
}
.phase-number {
  font-family: var(--mono);
  font-size: 9px;
  color: var(--faint);
}
.phase-head h3 {
  font-size: 16px;
  font-weight: 550;
}
.phase-head svg {
  margin-left: auto;
  color: var(--accent);
}
.phase-1 .phase-head h3,
.phase-1 .phase-head svg {
  color: #a66f43;
}
.benchmark-phases p {
  font-size: 12px;
  color: var(--ink-soft);
  line-height: 1.85;
  margin-top: 18px;
}
.phase-measure {
  display: block;
  font-size: 10px;
  line-height: 1.8;
  margin-top: 13px;
  color: var(--muted);
}
.benchmark-detail {
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 50px;
  margin-top: 46px;
  align-items: start;
}
.taxonomy-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--rule);
}
.taxonomy-heading .mono-label {
  font-size: 8px;
}
.error-list article {
  display: flex;
  gap: 20px;
  padding: 14px 0;
  border-bottom: 1px solid var(--rule);
}
.error-list article > span {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--amber);
  padding-top: 3px;
}
.error-list h4 {
  font-weight: 550;
  font-size: 12px;
}
.error-list p {
  font-size: 10px;
  color: var(--muted);
  margin-top: 2px;
}
.dataset-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 25px;
}
.dataset-stats > div {
  display: flex;
  flex-direction: column;
}
.dataset-stats strong {
  font-weight: 500;
  font-size: 24px;
  letter-spacing: -0.8px;
  color: var(--accent-ink);
}
.dataset-stats span {
  font-size: 10px;
  color: var(--muted);
}
.collection-note {
  padding: 16px 18px;
  border-left: 2px solid var(--rule-strong);
  margin-top: 24px;
  color: var(--muted);
  font-size: 11px;
  line-height: 1.9;
}
.collection-note strong {
  font-weight: 550;
  color: var(--ink-soft);
}
.supporting-figures {
  border-top: 1px solid var(--rule-strong);
  margin-top: 28px;
}
.supporting-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  padding-block: 20px;
}
.demo-count {
  font-family: var(--mono);
  color: var(--muted);
  font-size: 9px;
  white-space: nowrap;
  margin-bottom: 30px;
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.demo-count > span {
  font-family: var(--serif);
  font-size: 36px;
  color: var(--ink);
}
.citation-section {
  background: #edf1e8;
  border-top: 1px solid var(--rule);
}
.citation-grid {
  display: grid;
  grid-template-columns: 0.72fr 1.28fr;
  gap: 60px;
  align-items: start;
}
.citation-grid .section-heading {
  margin-bottom: 20px;
}
.citation-grid .section-intro {
  font-size: 12px;
  max-width: 285px;
}
.citation-links {
  display: flex;
  gap: 24px;
  margin-top: 24px;
}
.citation-links .text-link {
  font-size: 11px;
}
.correspondence {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 40px;
}
.correspondence .mono-label {
  font-size: 8px;
  margin-bottom: 5px;
}
.correspondence a {
  font-size: 11px;
  color: var(--ink-soft);
  width: fit-content;
}
.correspondence a span {
  margin-left: 7px;
  color: var(--accent);
}
.citation-box {
  border: 1px solid var(--rule-strong);
  background: #f8faf5;
  border-radius: 8px;
  overflow: hidden;
  min-width: 0;
}
.citation-bar {
  padding: 12px 18px;
  border-bottom: 1px solid var(--rule);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.citation-bar > .mono-label {
  font-size: 9px;
}
.citation-bar button {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  color: var(--accent);
  padding: 5px 0;
}
.citation-box pre {
  margin: 0;
  padding: 23px;
  overflow: auto;
  font-family: var(--mono);
  font-size: 9px;
  line-height: 2;
  color: var(--ink-soft);
  tab-size: 2;
}
.copy-fallback {
  font-size: 11px;
  color: var(--accent);
  padding: 0 22px 16px;
}
.footer {
  padding-block: 27px;
}
.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
  font-size: 9px;
  color: var(--muted);
}
.footer-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 650;
  letter-spacing: -0.4px;
  color: var(--ink);
}
.footer-brand svg {
  color: var(--accent);
}
.footer-brand > span {
  font-size: 8px;
  letter-spacing: 0;
  color: var(--muted);
  font-weight: 400;
  margin-left: 8px;
  padding-left: 15px;
  border-left: 1px solid var(--rule-strong);
}
.back-top {
  display: flex;
  align-items: center;
  gap: 14px;
}
.back-top > span {
  font-size: 17px;
  color: var(--accent);
}
@media (min-width: 900px) {
  .affiliations {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, max-content));
    gap: 10px 28px;
  }
}
@media (min-width: 1100px) {
  .hero-title {
    white-space: nowrap;
  }
}
@media (min-width: 1450px) {
  .hero {
    padding-top: 48px;
  }
}
@media (max-width: 1000px) {
  .overview-intro {
    gap: 35px;
  }
  .heading-with-aside {
    align-items: flex-start;
  }
  .heading-with-aside .method-badge {
    margin-top: 6px;
  }
  .heading-with-aside > .text-link {
    margin-top: 5px;
  }
  .metric {
    padding-inline: 18px;
  }
  .metric-value {
    font-size: 29px;
  }
  .metric-note {
    font-size: 8px;
  }
  .value-grid {
    gap: 35px;
  }
  .benchmark-detail {
    gap: 30px;
  }
  .citation-grid {
    gap: 35px;
  }
  .stages {
    gap: 24px;
  }
  .demo-count {
    margin-top: 0;
  }
}
@media (max-width: 700px) {
  .hero {
    padding-top: 35px;
  }
  .hero-eyebrow {
    font-size: 7px;
    letter-spacing: 0.04em;
    gap: 7px;
  }
  .eyebrow-divider {
    margin-inline: 2px;
  }
  .hero-title {
    margin-top: 24px;
    font-size: clamp(23px, 4.1vw, 27px);
    line-height: 1.45;
    letter-spacing: -0.4px;
  }
  .hero-deck {
    font-size: 11px;
    max-width: 330px;
    margin-inline: auto;
    margin-top: 15px;
  }
  .authors {
    margin-top: 24px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 5px 13px;
  }
  .author-row {
    display: contents;
  }
  .author {
    font-size: 11px;
  }
  .author sup {
    font-size: 7px;
  }
  .affiliations {
    font-size: 9px;
    gap: 10px 15px;
    margin-top: 15px;
  }
  .affiliation-item {
    gap: 5px;
  }
  .affiliation-item img {
    width: 23px;
    height: 23px;
  }
  .author-notes {
    font-size: 8px;
    gap: 6px 11px;
    margin-top: 10px;
  }
  .resource-links {
    gap: 7px;
    margin: 24px auto 28px;
  }
  .metric-grid {
    grid-template-columns: 1fr 1fr;
    padding-block: 7px;
  }
  .metric {
    padding: 21px 16px !important;
    border-right: 0;
  }
  .metric:nth-child(odd) {
    padding-left: 0 !important;
    border-right: 1px solid var(--rule);
  }
  .metric:nth-child(even) {
    padding-right: 0 !important;
    padding-left: 22px !important;
  }
  .metric:nth-child(-n + 2) {
    border-bottom: 1px solid var(--rule);
  }
  .metric-value {
    font-size: 29px;
  }
  .metric p {
    font-size: 10px;
    margin-top: 7px;
  }
  .metric-note {
    font-size: 8px;
  }
  .overview-intro {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 27px;
  }
  .overview-intro > div {
    padding-top: 0;
  }
  .overview-intro .section-intro {
    font-size: 13px;
  }
  .contribution-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 28px;
  }
  .contribution-grid article {
    display: grid;
    grid-template-columns: 40px 1fr;
    column-gap: 9px;
    padding-top: 18px;
  }
  .contribution-index {
    grid-row: 1/3;
    padding-top: 3px;
  }
  .contribution-grid h3 {
    margin-top: 0;
    font-size: 15px;
  }
  .contribution-grid p {
    margin-top: 7px;
    font-size: 11px;
  }
  .abstract-disclosure {
    margin-top: 26px;
  }
  .disclosure-hint {
    gap: 12px;
    font-size: 9px;
  }
  .abstract-disclosure > p {
    font-size: 12px;
  }
  .heading-with-aside {
    display: block;
  }
  .heading-with-aside > .text-link {
    margin: 0 0 28px;
  }
  .method-badge {
    display: none;
  }
  .stages {
    grid-template-columns: 1fr;
    gap: 27px;
    margin-bottom: 30px;
  }
  .stage {
    padding-left: 40px;
    position: relative;
  }
  .stage-track {
    position: absolute;
    top: 0;
    bottom: -27px;
    left: 0;
    margin: 0;
    display: block;
    width: 24px;
  }
  .stage-track i {
    position: absolute;
    width: 1px;
    top: 35px;
    bottom: 9px;
    left: 11px;
  }
  .stage-track svg {
    display: none;
  }
  .stage:last-child .stage-track i {
    display: none;
  }
  .stage-top {
    justify-content: flex-start;
    gap: 12px;
  }
  .stage h3 {
    font-size: 15px;
    margin-top: 11px;
  }
  .stage > p {
    font-size: 12px;
    margin-top: 7px;
  }
  .stage-detail {
    font-size: 10px;
    margin-top: 12px;
    padding-top: 10px;
  }
  .value-grid {
    grid-template-columns: 1fr;
    gap: 28px;
    margin-top: 40px;
  }
  .value-copy h3 {
    font-size: 27px;
  }
  .equation {
    font-size: 22px;
    margin-block: 18px;
  }
  .value-labels {
    font-size: 9px;
    gap: 17px;
  }
  .benchmark-phases {
    grid-template-columns: 1fr;
  }
  .benchmark-phases article {
    padding: 21px;
    border-right: 0;
    border-bottom: 1px solid var(--rule);
  }
  .benchmark-phases p {
    font-size: 12px;
    margin-top: 12px;
  }
  .phase-measure {
    margin-top: 8px;
  }
  .benchmark-detail {
    grid-template-columns: 1fr;
    gap: 30px;
    margin-top: 30px;
  }
  .error-list h4 {
    font-size: 13px;
  }
  .error-list p {
    font-size: 11px;
  }
  .dataset-stats {
    gap: 16px;
  }
  .supporting-grid {
    grid-template-columns: 1fr;
    gap: 27px;
  }
  .supporting-figures summary {
    font-size: 12px;
  }
  .supporting-figures .disclosure-hint {
    font-size: 8px;
  }
  .demo-count {
    display: none;
  }
  .citation-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .citation-grid .section-intro {
    max-width: 100%;
  }
  .correspondence {
    margin-top: 25px;
  }
  .correspondence a {
    font-size: 12px;
  }
  .citation-box pre {
    padding: 18px;
    font-size: 9px;
  }
  .footer-inner {
    flex-wrap: wrap;
    gap: 16px;
  }
  .footer-inner > span {
    display: none;
  }
  .footer-brand > span {
    font-size: 7px;
    padding-left: 8px;
    margin-left: 2px;
  }
  .footer-brand {
    font-size: 12px;
  }
  .back-top {
    font-size: 9px;
    gap: 9px;
  }
}
@media (max-width: 380px) {
  .hero-eyebrow {
    font-size: 6px;
    gap: 5px;
  }
  .hero-title {
    font-size: 22px;
  }
  .resource-links .button {
    padding-inline: 11px;
    font-size: 11px;
  }
  .metric-value {
    font-size: 26px;
  }
  .equation {
    font-size: 19px;
  }
}

@media (min-width: 701px) {
  .author {
    font-size: 13px;
  }
  .affiliations {
    font-size: 11px;
  }
  .author-notes {
    font-size: 10px;
  }
  .stage > p {
    font-size: 13px;
  }
  .contribution-grid p {
    font-size: 13px;
  }
  .value-copy > p {
    font-size: 13px;
  }
  .benchmark-phases p {
    font-size: 13px;
  }
  .collection-note {
    font-size: 12px;
  }
}
@media (min-width: 701px) and (max-width: 900px) {
  .hero {
    padding-top: 45px;
  }
  .hero-deck {
    font-size: 12px;
  }
  .heading-with-aside {
    display: block;
  }
  .heading-with-aside > .text-link {
    margin-top: 0;
  }
  .method-badge {
    display: none;
  }
  .value-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .value-copy {
    max-width: 600px;
  }
  .benchmark-detail {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .citation-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .citation-grid .section-intro {
    max-width: 500px;
  }
  .citation-grid pre {
    font-size: 10px;
  }
}
</style>
