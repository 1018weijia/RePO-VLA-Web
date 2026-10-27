const BASE = import.meta.env.BASE_URL
const asset = (path: string) => `${BASE}${path.replace(/^\//, '')}`

export const info = {
  title: 'RePO-VLA',
  subtitle: 'Recovery-Driven Policy Optimization for Vision-Language-Action Model',
  venue: 'NeurIPS 2026',
  desc: 'Learning from success, failure, and recovery to build more resilient bimanual robots.',
  tags: ['Vision-Language-Action', 'Bimanual Manipulation', 'Failure Recovery', 'Robot Learning'],
}

export const authorEntries = [
  { name: 'Weijia Liufu', affiliations: [1], marks: ['*'] },
  { name: 'Xiaoyu Guo', affiliations: [2, 3], marks: ['*', '†'] },
  { name: 'Ruiyi Chen', affiliations: [1] },
  { name: 'Jingzhi Liu', affiliations: [1] },
  { name: 'Kaidong Zhang', affiliations: [1] },
  { name: 'Xiwen Liang', affiliations: [1] },
  { name: 'Jianqi Lin', affiliations: [1] },
  { name: 'Dawei Sun', affiliations: [1] },
  { name: 'Yuze Wang', affiliations: [4] },
  { name: 'Rongtao Xu', affiliations: [5] },
  { name: 'Bingqian Lin', affiliations: [1] },
  { name: 'Bowen Yang', affiliations: [6] },
  { name: 'Tongtong Cao', affiliations: [6] },
  { name: 'Bowen Peng', affiliations: [3] },
  { name: 'Dongyu Zhang', affiliations: [1] },
  { name: 'Guangrun Wang', affiliations: [1] },
  { name: 'Min Wang', affiliations: [2] },
  { name: 'Liang Lin', affiliations: [1, 3], marks: ['‡'] },
  { name: 'Xiaodan Liang', affiliations: [1, 3], marks: ['‡'] },
]

export const affiliationItems = [
  { id: 1, name: 'Sun Yat-sen University' },
  { id: 2, name: 'South China University of Technology' },
  { id: 3, name: 'Pengcheng Laboratory' },
  {
    id: 4,
    name: 'Harbin Institute of Technology, Shenzhen',
    fullName: 'Harbin Institute of Technology, Shenzhen',
  },
  { id: 5, name: 'Institute of Automation, Chinese Academy of Sciences' },
  { id: 6, name: "Huawei Noah's Ark Lab" },
]

export const authorNotes = [
  { symbol: '*', text: 'Equal contribution' },
  { symbol: '†', text: 'Project leader' },
  { symbol: '‡', text: 'Corresponding authors' },
]

export const institutionLogos = [
  { name: 'Sun Yat-sen University', src: asset('logos/sysu.png') },
  { name: 'South China University of Technology', src: asset('logos/scut.png') },
  { name: 'Pengcheng Laboratory', src: asset('logos/pcl.png') },
  { name: 'Harbin Institute of Technology, Shenzhen', src: asset('logos/hit.png') },
  { name: 'Institute of Automation, Chinese Academy of Sciences', src: asset('logos/CASIA.png') },
  { name: "Huawei Noah's Ark Lab", src: asset('logos/Huawei.png') },
]

export const projectLinks = [
  { label: 'Read the paper', href: 'https://arxiv.org/pdf/2605.09410', kind: 'paper' },
  { label: 'Code', href: 'https://github.com/1018weijia/FR_Bench', kind: 'github' },
  { label: 'Dataset', href: 'https://huggingface.co/datasets/Jerry2003/FR_Bench', kind: 'dataset' },
  { label: 'BibTeX', href: '#citation', kind: 'cite' },
]

export const highlights = [
  {
    value: '20 → 75%',
    label: 'Real-world adversarial success',
    note: 'Average on 2 tasks · 4× recovery data',
  },
  {
    value: '+27.6',
    unit: 'pp',
    label: 'Recovery gain in simulation',
    note: '15.4% → 43.0% · randomized split',
  },
  { value: '23,453', label: 'Simulation episodes', note: 'Including 6,392 verified recoveries' },
  { value: '46', label: 'Bimanual simulation tasks', note: 'FRBench-Sim dataset' },
]

export const abstractText = `Vision-Language-Action (VLA) models remain brittle in long-horizon, contact-rich manipulation because success-only imitation provides little supervision for execution drift, while failed rollouts are often discarded. We introduce RePO-VLA, a recovery-driven policy optimization framework that assigns distinct roles to success, recovery, and failure trajectories. RePO-VLA first applies Recovery-Aware Initialization (RAI), slicing each corrective suffix into a new episode so corrective actions depend on the current adverse state rather than the preceding failure. It then learns a Progress-Aware Semantic Value Function (PAS-VF), aligning spatiotemporal trajectory features with instructions and successful references. The resulting labels salvage useful failure prefixes via reliability decay, while low-value labels mark drift and terminal breakdowns, teaching differences among nominal, failed, and corrective actions. The data engine turns adverse states into planner-generated or human-collected corrective rollouts, teaching recovery to the success manifold. Value-Conditioned Refinement (VCR) trains the policy to prefer high-progress actions. At deployment, a fixed high-value token biases actions toward the learned success manifold without online failure detectors or heuristic retries. We introduce the Failure-Recovery Benchmark (FRBench), with standardized error injection and recovery-focused evaluation. Across simulated and real-world bimanual tasks, RePO-VLA improves robustness, raising adversarial success from 20% to 75% on average and up to 80% in scaled real-world trials.`

export const contributions = [
  {
    index: '01',
    title: 'Recovery-aware supervision',
    desc: 'RAI and VCR reuse failed rollouts instead of discarding them: progress alignment preserves useful failure prefixes, low-value labels expose drift-to-correction boundaries, and adverse states become corrective rollouts.',
  },
  {
    index: '02',
    title: 'FRBench',
    desc: 'A recovery benchmark with structured E1–E4 error injection in RoboTwin simulation, complemented by human-induced physical perturbations in real-world bimanual settings.',
  },
  {
    index: '03',
    title: 'Empirical validation',
    desc: 'Strong recovery gains over success-only SFT baselines, with a consistent scaling trend as recovery-data density grows from 1× to 4×.',
  },
]

export const figures = {
  teaser: {
    src: asset('Figures/Intro.png'),
    alt: 'Recovery-driven trajectory utilization: prior VLAs imitate successes and fail under drift, while RePO-VLA assigns distinct supervision to success, recovery, and failure trajectories.',
    caption:
      'Recovery-driven trajectory utilization. Prior VLAs mainly imitate successful demonstrations and often fail under execution drift. RePO-VLA assigns distinct supervision to success, recovery, and failure trajectories, enabling autonomous correction from adverse states.',
  },
  method: {
    src: asset('Figures/Method.png'),
    alt: 'Overview of RePO-VLA: recovery-data engine, progress-aware semantic value alignment, and inference with value guidance.',
    caption:
      'Overview of RePO-VLA. The framework builds recovery data, learns a progress-aware semantic value signal, and refines a value-conditioned VLA policy. At inference, constant high-value conditioning (v = 1.0) steers execution back toward the success manifold after drift.',
  },
  value: {
    src: asset('Figures/value_arch.png'),
    alt: 'Semantic value alignment architecture with frozen visual and language encoders and trainable adapters.',
    caption:
      'Semantic value alignment. Frozen visual and language encoders are projected into a shared latent manifold; cosine similarity to successful references provides a dense progress signal.',
  },
  dataEngine: {
    src: asset('Figures/data_engine.png'),
    alt: 'Failure-recovery data engine combining synthetic error injection with policy-induced rollouts.',
    caption:
      'Failure-Recovery Data Engine. Recovery data combines control-intercepted error injection with policy-induced rollouts.',
  },
  realWorld: {
    src: asset('Figures/real_world_tasks.png'),
    alt: 'Real-world bimanual evaluation tasks: tidy the desk, pour water, cook vegetable and fold towel.',
    caption:
      'Real-world evaluation tasks. Four contact-rich bimanual tasks with top and wrist camera views: Tidy Desk, Pour Water, Cook Vegetable, and Fold Towel.',
  },
  ablations: {
    src: asset('Figures/ablations.png'),
    alt: 'Real-world ablations on data composition, inference value guidance, and decay rate.',
    caption:
      'Real-world ablations. (a) Raw failure-recovery aggregation is substantially worse than Phase I. (b) Changing only the inference condition from v = 0 to the high-value token on Fold Towel improves success from 14/30 to 22/30. (c) On Fold Towel, α = 1, 3, 10 yield 40%, 70%, and 40%.',
  },
}

export const methodStages = [
  {
    tag: 'Phase I',
    title: 'Recovery-Aware Initialization',
    abbr: 'RAI',
    desc: 'A raw recovery episode mixes the failure prefix with the corrective suffix. Trajectory Slicing with Episode Reset discards the prefix and serializes the correction as a new episode, so recovery is learned as a state-conditioned skill — not as a replay of a particular failure.',
    detail: 'Episode reset is dataset bookkeeping; the policy uses a single-timestamp observation.',
  },
  {
    tag: 'Value',
    title: 'Progress-Aware Semantic Value',
    abbr: 'PAS-VF',
    desc: 'Frozen V-JEPA and text encoders with lightweight adapters map trajectories and instructions into a shared manifold. Cosine similarity to successful references yields a dense progress value, and reliability decay keeps useful early motion of pure failures while down-weighting terminal breakdowns.',
    detail:
      'Dense labels: success and recovery v = 1.0, error segments v = 0.0, failures decayed with α = 3.',
  },
  {
    tag: 'Phase II',
    title: 'Value-Conditioned Refinement',
    abbr: 'VCR',
    desc: 'A value token is appended to the flow-matching π₀.₅ policy, letting the same observation map to different action modes. At deployment the policy is conditioned on a fixed high-value token, turning the learned success manifold into an attractor for corrective behavior.',
    detail: 'One network, no online failure detector, no heuristic retry controller.',
  },
]

export const benchmarkPhases = [
  {
    phase: 'Nominal',
    state: 'φt = Nominal',
    control: 'Policy executes under clean or randomized conditions.',
    measure: 'Baseline reaching, grasping, and task progress.',
  },
  {
    phase: 'Error',
    state: 'φt = Error',
    control: 'Structured E1–E4 perturbation projects the scene into an adverse state.',
    measure: 'Reproducible physical breakdown, independent of policy scoring.',
  },
  {
    phase: 'Recovery',
    state: 'φt = Recovery',
    control: 'The policy continues from the adverse state without external retry logic.',
    measure: 'Corrective actions that restore task progress.',
  },
]

export const errorTypes = [
  { code: 'E1', name: 'Premature Close', desc: 'Early gripper closure during approach.' },
  { code: 'E2', name: 'Grasp Slip', desc: 'Forced gripper opening during lift.' },
  { code: 'E3', name: 'Position Offset', desc: 'Translational grasp-target offset.' },
  { code: 'E4', name: 'Orientation Mismatch', desc: 'Rotational mismatch with a lateral shift.' },
]

export const datasetStats = [
  { value: '23,453', label: 'total episodes' },
  { value: '17,061', label: 'nominal successes' },
  { value: '6,392', label: 'verified recovery episodes' },
  { value: '46', label: 'bimanual tasks' },
]

export interface SimRow {
  model: string
  venue: string
  clean: number
  random: number
  highlight?: boolean
  gains?: number[]
}

export const simNominalRows: SimRow[] = [
  { model: 'RDT', venue: "ICLR'25", clean: 22.5, random: 8.8 },
  { model: 'GO-1', venue: "arXiv'25", clean: 28.1, random: 26.0 },
  { model: 'π₀', venue: "RSS'25", clean: 33.9, random: 12.9 },
  { model: 'π₀.₅', venue: "CoRL'25", clean: 27.4, random: 33.6 },
  { model: 'Phase I (w/o Fail)', venue: 'RAI only', clean: 44.6, random: 44.0, highlight: true },
]

export const simInjectedRows: SimRow[] = [
  { model: 'π₀.₅', venue: "CoRL'25", clean: 15.0, random: 15.4 },
  {
    model: 'RePO-VLA Full',
    venue: 'Ours',
    clean: 37.0,
    random: 43.0,
    highlight: true,
    gains: [22.0, 27.6],
  },
]

export const realWorldRows = [
  {
    task: 'Pour Water',
    standard: [40, 30, 60, 50],
    adversarial: [20, 20, 60, 30],
  },
  {
    task: 'Cook Vegetable',
    standard: [10, 10, 30, 40],
    adversarial: [0, 10, 30, 30],
  },
  {
    task: 'Tidy Desk',
    standard: [20, 20, 40, 40],
    adversarial: [10, 30, 40, 30],
  },
  {
    task: 'Fold Towel',
    standard: [40, 40, 40, 30],
    adversarial: [20, 20, 20, 30],
  },
]

export const realWorldAverage = {
  standard: [27.5, 25.0, 42.5, 40.0],
  adversarial: [12.5, 20.0, 37.5, 30.0],
}

export const scalingRows = [
  { condition: 'Standard', task: 'Pour Water', baseline: 30, phase1: 60, x1: 50, x2: 80, x4: 90 },
  { condition: 'Standard', task: 'Fold Towel', baseline: 40, phase1: 40, x1: 30, x2: 60, x4: 70 },
  {
    condition: 'Standard',
    task: 'Average',
    baseline: 35,
    phase1: 50,
    x1: 40,
    x2: 70,
    x4: 80,
    isAverage: true,
  },
  {
    condition: 'Adversarial',
    task: 'Pour Water',
    baseline: 20,
    phase1: 60,
    x1: 30,
    x2: 70,
    x4: 80,
  },
  {
    condition: 'Adversarial',
    task: 'Fold Towel',
    baseline: 20,
    phase1: 20,
    x1: 30,
    x2: 60,
    x4: 70,
  },
  {
    condition: 'Adversarial',
    task: 'Average',
    baseline: 20,
    phase1: 40,
    x1: 30,
    x2: 65,
    x4: 75,
    isAverage: true,
  },
]

export const demoSections = [
  {
    id: 'real',
    title: 'Real-World Executions',
    short: 'Real World',
    desc: 'Bimanual Dobot X-Trainer rollouts under practical disturbances: precision pouring, deformable-object manipulation, and long-horizon coordination.',
    videos: [
      {
        title: 'Pour Water with Human Perturbation',
        src: asset('videos/real/pour_water_with_perturbation.mp4'),
        poster: asset('posters/real_pour_water_with_perturbation.jpg'),
        tag: 'Adversarial',
      },
      {
        title: 'Pour Water with Human Perturbation II',
        src: asset('videos/real/pour_water_with_perturbation2.mp4'),
        poster: asset('posters/real_pour_water_with_perturbation2.jpg'),
        tag: 'Adversarial',
      },
      {
        title: 'Cook Vegetable',
        src: asset('videos/real/cook_vegetable.mp4'),
        poster: asset('posters/real_cook_vegetable.jpg'),
        tag: 'Long-horizon',
      },
      {
        title: 'Pick Fruits',
        src: asset('videos/real/pick_fruits.mp4'),
        poster: asset('posters/real_pick_fruits.jpg'),
        tag: 'Long-horizon',
      },
    ],
  },
  {
    id: 'inference',
    title: 'Inference Under Disturbance',
    short: 'Inference',
    desc: 'End-to-end RePO-VLA rollouts showing autonomous recovery during contact-rich bimanual execution.',
    videos: [
      {
        title: 'Inference Demo 1',
        src: asset('Demo/inference/demo1.mp4'),
        poster: asset('posters/inference_demo1.jpg'),
        tag: 'Real robot',
      },
      {
        title: 'Inference Demo 2',
        src: asset('Demo/inference/demo2.mp4'),
        poster: asset('posters/inference_demo2.jpg'),
        tag: 'Real robot',
      },
      {
        title: 'Inference Demo 3',
        src: asset('Demo/inference/demo3.mp4'),
        poster: asset('posters/inference_demo3.jpg'),
        tag: 'Real robot',
      },
      {
        title: 'Inference Demo 4',
        src: asset('Demo/inference/demo4.mp4'),
        poster: asset('posters/inference_demo4.jpg'),
        tag: 'Real robot',
      },
    ],
  },
  {
    id: 'injected',
    title: 'Injected Error Recovery',
    short: 'Injected Errors',
    desc: 'Controlled error-injection cases used to evaluate whether the policy can restore task progress from adverse states.',
    videos: [
      {
        title: 'Injected Error Demo 1',
        src: asset('Demo/inject_error/demo1.mp4'),
        poster: asset('posters/inject_error_demo1.jpg'),
        tag: 'FRBench-Sim',
      },
      {
        title: 'Injected Error Demo 2',
        src: asset('Demo/inject_error/demo2.mp4'),
        poster: asset('posters/inject_error_demo2.jpg'),
        tag: 'FRBench-Sim',
      },
      {
        title: 'Injected Error Demo 3',
        src: asset('Demo/inject_error/demo3.mp4'),
        poster: asset('posters/inject_error_demo3.jpg'),
        tag: 'FRBench-Sim',
      },
      {
        title: 'Injected Error Demo 4',
        src: asset('Demo/inject_error/demo4.mp4'),
        poster: asset('posters/inject_error_demo4.jpg'),
        tag: 'FRBench-Sim',
      },
    ],
  },
  {
    id: 'failure-modes',
    title: 'Failure Mode Examples',
    short: 'Failure Modes',
    desc: 'Bottle-picking examples covering grasp slip, position offset, and premature close, including a failure case that is not recovered.',
    videos: [
      {
        title: 'Grasp Slip Recovery',
        src: asset('Demo/pick_diverse_bottles_grasp_slip_recovery.mp4'),
        poster: asset('posters/pick_diverse_bottles_grasp_slip_recovery.jpg'),
        tag: 'E2 · recovery',
      },
      {
        title: 'Grasp Slip Recovery II',
        src: asset('Demo/pick_diverse_bottles_grasp_slip_recovery2.mp4'),
        poster: asset('posters/pick_diverse_bottles_grasp_slip_recovery2.jpg'),
        tag: 'E2 · recovery',
      },
      {
        title: 'Position Offset Failure',
        src: asset('Demo/pick_diverse_bottles_position_offset_failure.mp4'),
        poster: asset('posters/pick_diverse_bottles_position_offset_failure.jpg'),
        tag: 'E3 · failure',
      },
      {
        title: 'Position Offset Recovery',
        src: asset('Demo/pick_diverse_bottles_position_offset_recovery.mp4'),
        poster: asset('posters/pick_diverse_bottles_position_offset_recovery.jpg'),
        tag: 'E3 · recovery',
      },
      {
        title: 'Premature Close Recovery I',
        src: asset('Demo/pick_diverse_bottles_premature_close_recovery1.mp4'),
        poster: asset('posters/pick_diverse_bottles_premature_close_recovery1.jpg'),
        tag: 'E1 · recovery',
      },
      {
        title: 'Premature Close Recovery II',
        src: asset('Demo/pick_diverse_bottles_premature_close_recovery2.mp4'),
        poster: asset('posters/pick_diverse_bottles_premature_close_recovery2.jpg'),
        tag: 'E1 · recovery',
      },
      {
        title: 'Premature Close Recovery III',
        src: asset('Demo/pick_diverse_bottles_premature_close_recovery3.mp4'),
        poster: asset('posters/pick_diverse_bottles_premature_close_recovery3.jpg'),
        tag: 'E1 · recovery',
      },
    ],
  },
]

export const foldTowelControls = [
  { model: 'Success-only BC', data: 'None', value: 'No', standard: 40, adversarial: 20 },
  { model: 'Raw DAgger-style', data: 'Raw', value: 'No', standard: 0, adversarial: null },
  {
    model: 'Phase-I DAgger-style',
    data: 'Sliced + reset',
    value: 'No',
    standard: 40,
    adversarial: 20,
  },
  { model: 'Full-4×, no value', data: 'Full 4×', value: 'No', standard: 20, adversarial: 20 },
  { model: 'SARM + RA-BC', data: 'Full 4×', value: 'External', standard: 50, adversarial: 20 },
  {
    model: 'RePO-VLA Full-4×',
    data: 'Full 4×',
    value: 'Yes',
    standard: 70,
    adversarial: 70,
    highlight: true,
  },
]

export const recapRows = [
  { condition: 'Standard', task: 'Pour Water', baseline: 30, recap1: 60, recap2: 80, full2: 80 },
  { condition: 'Standard', task: 'Fold Towel', baseline: 40, recap1: 50, recap2: 70, full2: 60 },
  {
    condition: 'Standard',
    task: 'Average',
    baseline: 35,
    recap1: 55,
    recap2: 75,
    full2: 70,
    isAverage: true,
  },
  { condition: 'Adversarial', task: 'Pour Water', baseline: 20, recap1: 40, recap2: 70, full2: 70 },
  { condition: 'Adversarial', task: 'Fold Towel', baseline: 20, recap1: 20, recap2: 50, full2: 60 },
  {
    condition: 'Adversarial',
    task: 'Average',
    baseline: 20,
    recap1: 30,
    recap2: 60,
    full2: 65,
    isAverage: true,
  },
]

export const bibtex = `@inproceedings{liufu2026repovla,
  title     = {RePO-VLA: Recovery-Driven Policy Optimization for
               Vision-Language-Action Model},
  author    = {Weijia Liufu and Xiaoyu Guo and Ruiyi Chen and Jingzhi Liu and
               Kaidong Zhang and Xiwen Liang and Jianqi Lin and Dawei Sun and
               Yuze Wang and Rongtao Xu and Bingqian Lin and Bowen Yang and
               Tongtong Cao and Bowen Peng and Dongyu Zhang and Guangrun Wang and
               Min Wang and Liang Lin and Xiaodan Liang},
  booktitle = {Advances in Neural Information Processing Systems},
  year      = {2026}
}`

export const footerDesc = 'RePO-VLA · NeurIPS 2026'
