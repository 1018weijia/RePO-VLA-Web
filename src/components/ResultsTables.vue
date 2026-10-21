<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  foldTowelControls,
  realWorldAverage,
  realWorldRows,
  recapRows,
  scalingRows,
  simInjectedRows,
  simNominalRows,
} from '@/mock/data'
const tabs = [
  { id: 'simulation', label: 'Simulation' },
  { id: 'real', label: 'Real world' },
  { id: 'scaling', label: 'Data scaling' },
  { id: 'controls', label: 'Matched controls' },
]
const activeTab = ref('simulation')
const injected = ref(true)
const adversarial = ref(true)
const condition = computed(() => (adversarial.value ? 'Adversarial' : 'Standard'))
const scalingAverage = computed(
  () => scalingRows.find((row) => row.condition === condition.value && row.isAverage)!,
)
const curve = computed(() => [
  scalingAverage.value.x1,
  scalingAverage.value.x2,
  scalingAverage.value.x4,
])
const baseline = computed(() => scalingAverage.value.baseline)
const y = (value: number) => 235 - value * 1.8
const xs = [76, 290, 505]
const curvePath = computed(() =>
  curve.value.map((value, i) => `${i ? 'L' : 'M'}${xs[i]} ${y(value)}`).join(' '),
)
const moveTab = (event: KeyboardEvent, index: number) => {
  let next: number
  if (event.key === 'ArrowRight') next = (index + 1) % tabs.length
  else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length
  else if (event.key === 'Home') next = 0
  else if (event.key === 'End') next = tabs.length - 1
  else return
  event.preventDefault()
  activeTab.value = tabs[next]!.id
  document.getElementById(`result-tab-${activeTab.value}`)?.focus()
}
const realCols = ['π₀', 'π₀.₅', 'Phase I', 'Full 1×']
const fmt = (value: number | null) => (value === null ? '—' : value.toFixed(1))
</script>
<template>
  <div>
    <div class="scaling-feature">
      <div class="scaling-chart">
        <div class="chart-heading">
          <span class="mono-label">Recovery data scaling</span>
          <div class="condition-toggle" aria-label="Chart evaluation condition">
            <button
              type="button"
              :aria-pressed="adversarial"
              :class="{ selected: adversarial }"
              @click="adversarial = true"
            >
              Adversarial</button
            ><button
              type="button"
              :aria-pressed="!adversarial"
              :class="{ selected: !adversarial }"
              @click="adversarial = false"
            >
              Standard
            </button>
          </div>
        </div>
        <svg
          viewBox="0 0 590 280"
          role="img"
          :aria-label="`${condition} success: baseline ${baseline} percent; RePO-VLA at 1, 2 and 4 times recovery data: ${curve.join(', ')} percent. Average of Pour Water and Fold Towel.`"
        >
          <text x="20" y="25" class="axis-title">Task success (%) ↑</text>
          <g v-for="tick in [0, 25, 50, 75, 100]" :key="tick">
            <line x1="60" x2="545" :y1="y(tick)" :y2="y(tick)" class="grid-line" />
            <text x="43" :y="y(tick) + 3" class="axis-label" text-anchor="end">{{ tick }}</text>
          </g>
          <path :d="`${curvePath} L505 235 L76 235 Z`" fill="#e8efdf" opacity=".65" />
          <line
            x1="60"
            x2="545"
            :y1="y(baseline)"
            :y2="y(baseline)"
            stroke="#b1b5aa"
            stroke-width="1.4"
            stroke-dasharray="5 5"
          />
          <path
            :d="curvePath"
            fill="none"
            stroke="#326449"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <g v-for="(point, index) in curve" :key="index">
            <circle
              :cx="xs[index]"
              :cy="y(point)"
              r="4.5"
              fill="#326449"
              stroke="white"
              stroke-width="2"
            />
            <text :x="xs[index]" :y="y(point) - 14" class="point-label" text-anchor="middle">
              {{ point }}%
            </text>
            <text :x="xs[index]" y="257" class="axis-label" text-anchor="middle">
              {{ [1, 2, 4][index] }}×
            </text>
          </g>
          <text x="545" :y="y(baseline) - 7" class="baseline-label" text-anchor="end">
            π₀.₅ · {{ baseline }}%
          </text>
        </svg>
        <div class="chart-footer">
          <span><i></i>RePO-VLA Full</span><span><i class="baseline-key"></i>Success-only π₀.₅</span
          ><span>Recovery-data multiplier →</span>
        </div>
      </div>
      <div class="scaling-callout">
        <span class="mono-label">{{ condition }} · full 4×</span>
        <div class="callout-number">{{ curve[2] }}<span>%</span></div>
        <h3>Average task success</h3>
        <p>Across Pour Water and Fold Towel with 4× recovery data.</p>
        <div class="gain-label">
          +{{ curve[2]! - baseline }} percentage points<span>over success-only π₀.₅</span>
        </div>
        <p class="scaling-caveat">
          At 1× data, Full does not consistently outperform Phase I. Denser recovery coverage
          reduces this bottleneck.
        </p>
      </div>
    </div>

    <div class="results-browser">
      <div class="result-tabs" role="tablist" aria-label="Experimental results">
        <button
          v-for="(tab, index) in tabs"
          :id="`result-tab-${tab.id}`"
          :key="tab.id"
          role="tab"
          type="button"
          :aria-selected="activeTab === tab.id"
          :aria-controls="`result-panel-${tab.id}`"
          :tabindex="activeTab === tab.id ? 0 : -1"
          :class="{ selected: activeTab === tab.id }"
          @click="activeTab = tab.id"
          @keydown="moveTab($event, index)"
        >
          {{ tab.label }}</button
        ><span>Success rate (%) ↑</span>
      </div>
      <div
        :id="`result-panel-${activeTab}`"
        :key="activeTab"
        role="tabpanel"
        :aria-labelledby="`result-tab-${activeTab}`"
        tabindex="0"
        class="result-panel"
      >
        <template v-if="activeTab === 'simulation'">
          <div class="table-heading">
            <div>
              <h3>FRBench-Sim</h3>
              <p>10 RoboTwin tasks · 50 rollouts per task and split</p>
            </div>
            <div class="condition-toggle" aria-label="Simulation protocol">
              <button
                type="button"
                :class="{ selected: injected }"
                :aria-pressed="injected"
                @click="injected = true"
              >
                Injected failure</button
              ><button
                type="button"
                :class="{ selected: !injected }"
                :aria-pressed="!injected"
                @click="injected = false"
              >
                Nominal
              </button>
            </div>
          </div>
          <div
            class="table-scroll"
            role="region"
            aria-label="Simulation results table"
            tabindex="0"
          >
            <table>
              <caption class="sr-only">
                Average task success on clean and randomized simulation splits
              </caption>
              <thead>
                <tr>
                  <th scope="col">Model</th>
                  <th scope="col">Clean</th>
                  <th scope="col">Randomized</th>
                  <th v-if="injected" scope="col">Δ clean / randomized</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in injected ? simInjectedRows : simNominalRows"
                  :key="row.model"
                  :class="{ ours: row.highlight }"
                >
                  <th scope="row">
                    {{ row.model }}<span class="model-venue">{{ row.venue }}</span>
                  </th>
                  <td>{{ fmt(row.clean) }}</td>
                  <td>{{ fmt(row.random) }}</td>
                  <td v-if="injected" class="gain">
                    {{
                      row.gains ? row.gains.map((value) => `+${value.toFixed(1)}`).join(' / ') : '—'
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="table-note">
            {{
              injected
                ? 'The gripper is held open for 30 frames at grasp initiation, forcing the policy to re-establish object control. Gains are percentage points over π₀.₅ within the same split.'
                : 'Phase I is the recovery-aware initialization checkpoint. Baselines train on optimal nominal-success demonstrations. Shading identifies RePO-VLA.'
            }}
          </p>
        </template>
        <template v-else-if="activeTab === 'real'">
          <div class="table-heading">
            <div>
              <h3>FRBench-Real</h3>
              <p>Four bimanual tasks · 10 trials per task and condition</p>
            </div>
          </div>
          <div
            class="table-scroll"
            role="region"
            aria-label="Real-world results table"
            tabindex="0"
          >
            <table class="wide-table">
              <caption class="sr-only">
                Real-world task success under standard and adversarial conditions at the base
                recovery-data scale
              </caption>
              <thead>
                <tr>
                  <th rowspan="2" scope="col">Task</th>
                  <th colspan="4" scope="colgroup" class="group-heading">Standard</th>
                  <th colspan="4" scope="colgroup" class="group-heading">Adversarial</th>
                </tr>
                <tr>
                  <th v-for="(col, i) in [...realCols, ...realCols]" :key="i" scope="col">
                    {{ col }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in realWorldRows" :key="row.task">
                  <th scope="row">{{ row.task }}</th>
                  <td
                    v-for="(value, i) in [...row.standard, ...row.adversarial]"
                    :key="i"
                    :class="{ 'ours-cell': i % 4 >= 2 }"
                  >
                    {{ value }}
                  </td>
                </tr>
                <tr class="average">
                  <th scope="row">Average</th>
                  <td
                    v-for="(value, i) in [
                      ...realWorldAverage.standard,
                      ...realWorldAverage.adversarial,
                    ]"
                    :key="i"
                    :class="{ 'ours-cell': i % 4 >= 2 }"
                  >
                    {{ fmt(value) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="table-note">
            Adversarial trials include one human-induced displacement, kinematic interference, or
            forced slip. Phase I averages 37.5% and Full 1× averages 30.0% under perturbation; both
            exceed the 20.0% π₀.₅ baseline.
          </p>
        </template>
        <template v-else-if="activeTab === 'scaling'">
          <div class="table-heading">
            <div>
              <h3>Recovery-data scaling</h3>
              <p>Two representative tasks · 1×, 2×, and 4× recovery data</p>
            </div>
          </div>
          <div
            class="table-scroll"
            role="region"
            aria-label="Recovery data scaling results table"
            tabindex="0"
          >
            <table class="scaling-table">
              <caption class="sr-only">
                Real-world success as recovery-data quantity increases
              </caption>
              <thead>
                <tr>
                  <th scope="col">Condition</th>
                  <th scope="col">Task</th>
                  <th scope="col">π₀.₅</th>
                  <th scope="col">Phase I</th>
                  <th scope="col">Full 1×</th>
                  <th scope="col">Full 2×</th>
                  <th scope="col">Full 4×</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in scalingRows"
                  :key="row.condition + row.task"
                  :class="{ average: row.isAverage }"
                >
                  <th scope="row">{{ row.condition }}</th>
                  <td class="task-cell">{{ row.task }}</td>
                  <td>{{ row.baseline }}</td>
                  <td>{{ row.phase1 }}</td>
                  <td>{{ row.x1 }}</td>
                  <td>{{ row.x2 }}</td>
                  <td class="ours-cell">{{ row.x4 }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="table-note">
            Full 4× raises average adversarial success from 20% to 75%, reaching 80% on Pour Water
            and 70% on Fold Towel. Standard-setting average success rises from 35% to 80%.
          </p>
        </template>
        <template v-else>
          <div class="table-heading">
            <div>
              <h3>What makes recovery work?</h3>
              <p>Matched Fold Towel controls · latest paper comparison</p>
            </div>
          </div>
          <div
            class="table-scroll"
            role="region"
            aria-label="Fold Towel controls table"
            tabindex="0"
          >
            <table class="control-table">
              <caption class="sr-only">
                Fold Towel matched controls for data composition and value guidance
              </caption>
              <thead>
                <tr>
                  <th scope="col">Setting</th>
                  <th scope="col">Recovery data</th>
                  <th scope="col">Value</th>
                  <th scope="col">Standard</th>
                  <th scope="col">Adversarial</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in foldTowelControls"
                  :key="row.model"
                  :class="{ ours: row.highlight }"
                >
                  <th scope="row">{{ row.model }}</th>
                  <td>{{ row.data }}</td>
                  <td>{{ row.value }}</td>
                  <td>{{ fmt(row.standard) }}</td>
                  <td>{{ fmt(row.adversarial) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="table-note">
            Full-4× without value and RePO-VLA Full-4× share initialization, data, budget, and
            protocol. SARM + RA-BC is the external progress baseline. “—” indicates a condition that
            was not evaluated.
          </p>
          <details class="recap-detail">
            <summary>Offline RECAP comparison <span>+</span></summary>
            <div
              class="table-scroll"
              role="region"
              aria-label="Offline RECAP comparison table"
              tabindex="0"
            >
              <table class="scaling-table">
                <caption class="sr-only">
                  Offline advantage-conditioned RECAP reproduction compared with RePO-VLA
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Condition</th>
                    <th scope="col">Task</th>
                    <th scope="col">π₀.₅</th>
                    <th scope="col">RECAP 1×</th>
                    <th scope="col">RECAP 2×</th>
                    <th scope="col">Full 2×</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="row in recapRows"
                    :key="row.condition + row.task"
                    :class="{ average: row.isAverage }"
                  >
                    <th scope="row">{{ row.condition }}</th>
                    <td class="task-cell">{{ row.task }}</td>
                    <td>{{ row.baseline }}</td>
                    <td>{{ row.recap1 }}</td>
                    <td>{{ row.recap2 }}</td>
                    <td class="ours-cell">{{ row.full2 }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="table-note">
              RLinf’s offline RECAP reproduction uses the same π₀.₅ backbone, training steps,
              recovery-data budget, and blind protocol. 1× is N = 50 and 2× is N = 100. Only the
              offline advantage-conditioned component is compared. Full 2× averages 65% adversarial
              and 70% standard success versus RECAP 2× at 60% and 75%, respectively.
            </p>
          </details>
        </template>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.scaling-feature {
  display: grid;
  grid-template-columns: 1.65fr 1fr;
  border: 1px solid var(--rule);
  border-radius: 10px;
  overflow: hidden;
  background: var(--paper-raised);
  margin-bottom: 30px;
}
.scaling-chart {
  padding: 24px 26px 22px;
  min-width: 0;
}
.chart-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}
.chart-heading .mono-label {
  font-size: 8px;
}
.condition-toggle {
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 3px;
  background: var(--paper-sunken);
  border: 1px solid var(--rule);
  border-radius: 5px;
}
.condition-toggle button {
  padding: 5px 9px;
  font-size: 9px;
  border-radius: 3px;
  color: var(--muted);
  white-space: nowrap;
}
.condition-toggle button.selected {
  background: white;
  color: var(--accent-ink);
  box-shadow: var(--shadow-sm);
}
.scaling-chart > svg {
  width: 100%;
  margin-top: 14px;
  overflow: visible;
}
.axis-title {
  font-family: var(--sans);
  font-size: 10px;
  fill: var(--muted);
}
.grid-line {
  stroke: #e7ebe2;
  stroke-width: 1;
  stroke-dasharray: 3 4;
}
.axis-label,
.baseline-label {
  font-family: var(--mono);
  font-size: 9px;
  fill: var(--muted);
}
.baseline-label {
  font-size: 9px;
  fill: #798474;
}
.point-label {
  font-family: var(--mono);
  font-size: 11px;
  fill: var(--accent);
  font-weight: 600;
}
.chart-footer {
  display: flex;
  align-items: center;
  gap: 18px;
  font-size: 8px;
  color: var(--muted);
}
.chart-footer > span {
  display: flex;
  align-items: center;
  gap: 5px;
}
.chart-footer > span:last-child {
  margin-left: auto;
  font-family: var(--mono);
  font-size: 7px;
}
.chart-footer i {
  display: block;
  width: 15px;
  height: 2px;
  background: var(--accent);
}
.chart-footer .baseline-key {
  background: repeating-linear-gradient(90deg, #b1b5aa 0 3px, transparent 3px 6px);
}
.scaling-callout {
  background: #eaf0e3;
  border-left: 1px solid var(--rule);
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.scaling-callout .mono-label {
  font-size: 8px;
  color: var(--accent);
}
.callout-number {
  font-family: var(--serif);
  font-size: 82px;
  line-height: 1.2;
  font-weight: 400;
  letter-spacing: -5px;
  margin-top: 12px;
  color: var(--accent-ink);
}
.callout-number > span {
  font-size: 46px;
  margin-left: 3px;
}
.scaling-callout h3 {
  font-size: 14px;
  font-weight: 550;
  margin-top: 4px;
}
.scaling-callout > p {
  font-size: 10px;
  color: var(--muted);
  line-height: 1.85;
  margin-top: 7px;
  max-width: 245px;
}
.gain-label {
  border-top: 1px solid #d0dcc7;
  margin-top: 18px;
  padding-top: 14px;
  font-size: 12px;
  font-weight: 550;
  color: var(--accent);
}
.gain-label span {
  display: block;
  font-size: 9px;
  color: var(--muted);
  font-weight: 400;
  margin-top: 2px;
}
.scaling-callout > .scaling-caveat {
  font-size: 9px;
  margin-top: 14px;
  line-height: 1.8;
}
.results-browser {
  border: 1px solid var(--rule);
  border-radius: 10px;
  overflow: hidden;
  background: white;
  min-width: 0;
}
.result-tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--rule);
  padding-inline: 24px;
  align-items: stretch;
}
.result-tabs button {
  padding: 18px 17px;
  font-size: 11px;
  color: var(--muted);
  position: relative;
  white-space: nowrap;
}
.result-tabs button:first-child {
  padding-left: 0;
}
.result-tabs button.selected {
  color: var(--accent);
  font-weight: 550;
}
.result-tabs button.selected:after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 17px;
  right: 17px;
  height: 2px;
  background: var(--accent);
}
.result-tabs button:first-child:after {
  left: 0;
}
.result-tabs > span {
  margin-left: auto;
  font-family: var(--mono);
  font-size: 8px;
  color: var(--muted);
  align-self: center;
  white-space: nowrap;
}
.result-panel {
  padding: 25px 28px;
  min-width: 0;
}
.table-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
}
.table-heading h3 {
  font-size: 16px;
  font-weight: 550;
  letter-spacing: -0.3px;
}
.table-heading p {
  font-size: 10px;
  color: var(--muted);
  margin-top: 5px;
}
.table-scroll {
  overflow-x: auto;
  width: 100%;
  scrollbar-width: thin;
  scrollbar-color: var(--rule-strong) transparent;
}
table {
  border-collapse: collapse;
  width: 100%;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  line-height: 1.6;
}
th,
td {
  padding: 12px 15px;
  text-align: right;
  border-bottom: 1px solid var(--rule);
  white-space: nowrap;
}
thead th {
  font-family: var(--mono);
  font-weight: 400;
  font-size: 9px;
  color: var(--muted);
  background: #f8faf6;
  border-top: 1px solid var(--rule-strong);
  border-bottom: 1px solid var(--rule-strong);
}
th:first-child {
  text-align: left;
}
tbody th {
  font-weight: 500;
}
tbody tr:last-child > * {
  border-bottom: 1px solid var(--rule-strong);
}
tbody tr.ours {
  background: #edf3e7;
  color: var(--accent-ink);
}
tbody tr.ours th {
  font-weight: 650;
}
.model-venue {
  display: inline-block;
  font-family: var(--mono);
  font-size: 8px;
  color: var(--muted);
  margin-left: 12px;
  font-weight: 400;
}
.gain {
  font-family: var(--mono);
  color: var(--accent);
  font-size: 9px;
}
.ours-cell {
  background: #edf3e7;
  color: var(--accent-ink);
}
.average {
  font-weight: 600;
  background: #f6f8f3;
}
.average th {
  font-weight: 600;
}
.group-heading {
  text-align: center;
  border-left: 1px solid var(--rule);
}
.wide-table {
  min-width: 740px;
}
.wide-table th,
.wide-table td {
  padding-inline: 12px;
}
.task-cell {
  text-align: left;
}
.table-note {
  font-size: 10px;
  color: var(--muted);
  line-height: 1.9;
  margin-top: 18px;
  max-width: 900px;
}
.recap-detail {
  margin-top: 22px;
  border-top: 1px solid var(--rule);
}
.recap-detail summary {
  padding: 16px 0;
  font-size: 11px;
  list-style: none;
  cursor: pointer;
  font-weight: 550;
  display: flex;
  justify-content: space-between;
}
.recap-detail summary::-webkit-details-marker {
  display: none;
}
.recap-detail summary > span {
  font-size: 18px;
  font-weight: 400;
  color: var(--accent);
}
.recap-detail[open] summary > span {
  transform: rotate(45deg);
}
@media (max-width: 1000px) {
  .scaling-feature {
    grid-template-columns: 1.5fr 1fr;
  }
  .scaling-callout {
    padding: 24px;
  }
  .scaling-chart {
    padding: 20px;
  }
  .chart-footer {
    gap: 12px;
  }
  .chart-footer > span:last-child {
    display: none;
  }
  .chart-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }
  .result-tabs {
    padding-inline: 20px;
  }
  .result-tabs button {
    padding-inline: 14px;
    font-size: 10px;
  }
  .result-tabs > span {
    font-size: 7px;
  }
  .scaling-table {
    min-width: 640px;
  }
}
@media (max-width: 700px) {
  .axis-label {
    font-size: 17px;
  }
  .point-label {
    font-size: 20px;
  }
  .baseline-label {
    font-size: 14px;
  }
  .axis-title {
    font-size: 17px;
  }
  .scaling-feature {
    grid-template-columns: 1fr;
  }
  .scaling-chart {
    padding: 20px 15px;
  }
  .chart-heading {
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
  .chart-heading .mono-label {
    font-size: 7px;
  }
  .condition-toggle button {
    font-size: 8px;
    padding: 6px 7px;
  }
  .chart-footer {
    font-size: 8px;
    padding-inline: 6px;
  }
  .scaling-callout {
    border-left: 0;
    border-top: 1px solid var(--rule);
    padding: 20px 22px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
  }
  .scaling-callout .mono-label {
    grid-column: 1/-1;
    font-size: 8px;
  }
  .callout-number {
    font-size: 69px;
    grid-column: 1;
    grid-row: 2/5;
    margin-top: 7px;
  }
  .callout-number > span {
    font-size: 36px;
  }
  .scaling-callout h3 {
    font-size: 12px;
    grid-column: 2;
    margin-top: 14px;
  }
  .scaling-callout > p {
    font-size: 9px;
    grid-column: 2;
  }
  .gain-label {
    grid-column: 1/-1;
    font-size: 11px;
    display: flex;
    gap: 10px;
    align-items: baseline;
    margin-top: 14px;
    padding-top: 12px;
  }
  .gain-label span {
    font-size: 8px;
  }
  .scaling-callout > .scaling-caveat {
    grid-column: 1/-1;
    max-width: 100%;
    font-size: 9px;
    margin-top: 8px;
  }
  .result-tabs {
    padding-inline: 15px;
    justify-content: space-between;
    gap: 7px;
  }
  .result-tabs button {
    padding: 15px 0;
    font-size: 9px;
  }
  .result-tabs button.selected:after {
    left: 0;
    right: 0;
  }
  .result-tabs > span {
    display: none;
  }
  .result-panel {
    padding: 20px 15px;
  }
  .table-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
    margin-bottom: 18px;
  }
  .table-heading h3 {
    font-size: 15px;
  }
  .table-heading p {
    font-size: 9px;
  }
  .table-heading .condition-toggle button {
    font-size: 9px;
  }
  table {
    font-size: 10px;
  }
  th,
  td {
    padding: 11px 10px;
  }
  thead th {
    font-size: 8px;
  }
  .model-venue {
    display: block;
    margin: 3px 0 0;
    font-size: 7px;
  }
  .gain {
    font-size: 8px;
  }
  .control-table {
    min-width: 570px;
  }
  .table-note {
    font-size: 9px;
  }
  .result-panel:focus-visible {
    outline-offset: -4px;
  }
}

@media (min-width: 901px) {
  table {
    font-size: 12px;
  }
  .table-note {
    font-size: 11px;
  }
  .condition-toggle button {
    font-size: 10px;
  }
  .chart-heading .mono-label {
    font-size: 9px;
  }
  .chart-footer {
    font-size: 9px;
  }
}
@media (min-width: 701px) and (max-width: 900px) {
  .scaling-feature {
    grid-template-columns: 1fr;
  }
  .chart-heading {
    flex-direction: row;
    align-items: center;
  }
  .scaling-callout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 25px;
    border-left: 0;
    border-top: 1px solid var(--rule);
  }
  .scaling-callout > .mono-label {
    grid-column: 1/-1;
  }
  .callout-number {
    grid-row: 2/5;
    margin-top: 8px;
  }
  .scaling-callout h3 {
    grid-column: 2;
    align-self: end;
  }
  .scaling-callout > p {
    grid-column: 2;
    max-width: 100%;
  }
  .gain-label {
    grid-column: 1/-1;
  }
  .scaling-callout > .scaling-caveat {
    grid-column: 1/-1;
    font-size: 10px;
  }
  .result-tabs > span {
    display: none;
  }
  .result-tabs {
    gap: 15px;
  }
  .result-tabs button {
    flex: 1;
    padding-inline: 0;
  }
  .result-tabs button.selected:after {
    left: 0;
    right: 0;
  }
}
</style>
