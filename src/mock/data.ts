const BASE = import.meta.env.BASE_URL
const asset = (path: string) => `${BASE}${path}`

export const info = {
  title: 'RePO-VLA',
  subtitle: 'Recovery-Driven Policy Optimization for Vision-Language-Action Models',
  desc: 'RePO-VLA teaches bimanual robot policies to recover from execution drift, grasp failures, object slips, and contact-rich disturbances by learning from success, failure, and recovery trajectories.',
  venue: 'Project Page',
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
  { name: 'Liang Lin', affiliations: [1, 3] },
  { name: 'Xiaodan Liang', affiliations: [1, 3], marks: ['‡'] },
]

export const affiliationItems = [
  { id: 1, name: 'Sun Yat-sen University' },
  { id: 2, name: 'South China University of Technology' },
  { id: 3, name: 'Peng Cheng Laboratory' },
  { id: 4, name: 'Harbin Institute of Technology' },
  { id: 5, name: 'Institute of Automation, Chinese Academy of Sciences' },
  { id: 6, name: "Huawei Noah's Ark Lab" },
]

export const authorNotes = [
  { symbol: '*', text: 'Equal contribution.' },
  { symbol: '†', text: 'Project leader.' },
  { symbol: '‡', text: 'Corresponding author.' },
]

export const members = authorEntries.map(item => item.name)
export const affiliations = affiliationItems.map(item => item.name)

export const institutionLogos = [
  { name: 'Sun Yat-sen University', src: asset('Figures/sysu.png') },
  { name: 'South China University of Technology', src: asset('Figures/scut.jpg') },
  { name: 'Peng Cheng Laboratory', src: asset('Figures/pcl.png') },
  { name: 'Harbin Institute of Technology', src: asset('Figures/hit.png') },
  { name: 'Institute of Automation, Chinese Academy of Sciences', src: asset('Figures/CASIA.jpg') },
  { name: "Huawei Noah's Ark Lab", src: asset('Figures/Huawei.png') },
]

export const footerDesc = 'RePO-VLA Project Page'

export const highlights = [
  {
    value: '20% -> 75%',
    label: 'Average adversarial success in scaled real-world trials',
  },
  {
    value: '15% -> 43%',
    label: 'Injected-failure success on randomized FRBench-Sim',
  },
  {
    value: '20k+',
    label: 'Simulated episodes in FRBench',
  },
  {
    value: '46',
    label: 'Simulation tasks covering recovery-oriented evaluation',
  },
]

export const projectLinks = [
  {
    label: 'Paper',
    href: 'https://arxiv.org/pdf/2605.09410',
    iconSrc: 'https://arxiv.org/static/browse/0.3.4/images/arxiv-logomark-small-white.svg',
    iconClass: 'arxiv-icon',
  },
  {
    label: 'Code',
    href: 'https://1018weijia.github.io/RePO-VLA-Web/',
    iconSrc: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    iconClass: 'github-icon',
  },
  {
    label: 'Dataset',
    href: 'https://1018weijia.github.io/RePO-VLA-Web/',
    iconSrc: 'https://huggingface.co/front/assets/huggingface_logo.svg',
    iconClass: 'huggingface-icon',
  },
  {
    label: 'BibTeX',
    href: '#bibtex',
    iconText: '“”',
    iconClass: 'quote-icon',
  },
]

export const figures = [
  {
    title: 'Why Recovery Matters',
    desc: 'RePO-VLA targets execution drift in long-horizon bimanual manipulation, where adverse states are often recoverable but poorly supervised by success-only imitation.',
    src: asset('Figures/Intro.png'),
    type: 'image',
  },
  {
    title: 'Method Overview',
    desc: 'The framework builds recovery data, learns progress-aware semantic values, and refines a value-conditioned VLA policy.',
    src: asset('Figures/Method.png'),
    type: 'image',
  },
  // {
  //   title: 'Progress-Aware Value Function',
  //   desc: 'The value function aligns trajectory features with language instructions and successful references to produce dense recovery supervision.',
  //   src: '/Figures/Value_function_arch.png',
  //   type: 'image',
  // },
  // {
  //   title: 'Failure-Recovery Data Engine',
  //   desc: 'Recovery data combines controlled error injection with policy-induced rollouts to cover realistic adverse states.',
  //   src: '/Figures/DataEngine.png',
  //   type: 'image',
  // },
]

export const methodCards = [
  {
    title: 'Recovery-Aware Initialization',
    desc: 'Slices recovery trajectories and resets history so corrective behavior is learned from the current adverse state, not from memorized failure prefixes.',
  },
  {
    title: 'Progress-Aware Semantic Value',
    desc: 'Aligns trajectory features with instructions and successful references to convert success, failure, and recovery rollouts into dense progress labels.',
  },
  {
    title: 'Value-Conditioned Refinement',
    desc: 'Trains the policy to prefer high-progress actions. At inference, a fixed high value steers behavior back toward the success manifold.',
  },
]

export const demoSections = [
  {
    title: 'Inference Under Disturbance',
    desc: 'End-to-end RePO-VLA rollouts showing autonomous recovery during contact-rich bimanual execution.',
    videos: [
      {
        title: 'Inference Demo 1',
        src: asset('Demo/inference/demo1.mp4'),
      },
      {
        title: 'Inference Demo 2',
        src: asset('Demo/inference/demo2.mp4'),
      },
      {
        title: 'Inference Demo 3',
        src: asset('Demo/inference/demo3.mp4'),
      },
      {
        title: 'Inference Demo 4',
        src: asset('Demo/inference/demo4.mp4'),
      },
    ],
  },
  {
    title: 'Injected Error Recovery',
    desc: 'Controlled error-injection cases used to evaluate whether the policy can restore task progress from adverse states.',
    videos: [
      {
        title: 'Injected Error Demo 1',
        src: asset('Demo/inject_error/demo1.mp4'),
      },
      {
        title: 'Injected Error Demo 2',
        src: asset('Demo/inject_error/demo2.mp4'),
      },
      {
        title: 'Injected Error Demo 3',
        src: asset('Demo/inject_error/demo3.mp4'),
      },
      {
        title: 'Injected Error Demo 4',
        src: asset('Demo/inject_error/demo4.mp4'),
      },
    ],
  },
  {
    title: 'Failure Mode Examples',
    desc: 'Bottle-picking examples covering grasp slip, position offset, and premature close recovery.',
    videos: [
      {
        title: 'Grasp Slip Recovery',
        src: asset('Demo/pick_diverse_bottles_grasp_slip_recovery.mp4'),
      },
      {
        title: 'Grasp Slip Recovery 2',
        src: asset('Demo/pick_diverse_bottles_grasp_slip_recovery2.mp4'),
      },
      {
        title: 'Position Offset Failure',
        src: asset('Demo/pick_diverse_bottles_position_offset_failure.mp4'),
      },
      {
        title: 'Position Offset Recovery',
        src: asset('Demo/pick_diverse_bottles_position_offset_recovery.mp4'),
      },
      {
        title: 'Premature Close Recovery 1',
        src: asset('Demo/pick_diverse_bottles_premature_close_recovery1.mp4'),
      },
      {
        title: 'Premature Close Recovery 2',
        src: asset('Demo/pick_diverse_bottles_premature_close_recovery2.mp4'),
      },
      // {
      //   title: 'Premature Close Recovery 3',
      //   src: '/Demo/pick_diverse_bottles_premature_close_recovery3.mp4',
      // },
    ],
  },

  {
  title: 'Real-World Robot Demos',
  layout: 'real-world',
  desc: 'Real robot executions under practical disturbances and long-horizon tasks.',
  videos: [
    {
      title: 'Cook Vegetable',
      src: asset('Demo/Real_world/cook_vegetable.mp4'),
    },
    {
      title: 'Pick Fruits',
      src: asset('Demo/Real_world/pick_fruits.mp4'),
    },
    {
      title: 'Pour Water with Human Perturbation',
      src: asset('Demo/Real_world/pour_water_with_perturbation.mp4'),
    },
    {
      title: 'Pour Water with Human Perturbation2',
      src: asset('Demo/Real_world/pour_water_with_perturbation2.mp4'),
    },
  ],
}

]

export const resources = [
  {
    label: 'Paper PDF',
    href: 'https://arxiv.org/pdf/2605.09410',
    iconSrc: 'https://arxiv.org/static/browse/0.3.4/images/arxiv-logomark-small-white.svg',
    iconClass: 'arxiv-icon',
  },
  {
    label: 'Code',
    href: BASE,
    iconSrc: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    iconClass: 'github-icon',
  },
  {
    label: 'Dataset',
    href: BASE,
    iconSrc: 'https://huggingface.co/front/assets/huggingface_logo.svg',
    iconClass: 'huggingface-icon',
  },
  {
    label: 'BibTeX',
    href: '#bibtex',
    iconText: '“”',
    iconClass: 'quote-icon',
  },
]

export const bibtex = `@misc{liufu2026repovlarecoverydrivenpolicyoptimization,
      title={RePO-VLA: Recovery-Driven Policy Optimization for Vision-Language-Action Models},
      author={Weijia Liufu and Xiaoyu Guo and Ruiyi Chen and Jingzhi Liu and Kaidong Zhang and Xiwen Liang and Jianqi Lin and Dawei Sun and Yuze Wang and Rongtao Xu and Bingqian Lin and Bowen Yang and Tongtong Cao and Bowen Peng and Dongyu Zhang and Guangrun Wang and Min Wang and Liang Lin and Xiaodan Liang},
      year={2026},
      eprint={2605.09410},
      archivePrefix={arXiv},
      primaryClass={cs.RO},
      url={https://arxiv.org/abs/2605.09410},
}`

export const abstractText = `Vision-Language-Action (VLA) models remain brittle in long-horizon, contact-rich manipulation because success-only imitation provides little supervision for execution drift, while failed rollouts are often discarded. We introduce RePO-VLA, a recovery-driven policy optimization framework that assigns distinct roles to success, recovery, and failure trajectories. RePO-VLA first applies Recovery-Aware Initialization (RAI), slicing recovery segments and resetting history so corrective actions depend on the current adverse state rather than the preceding failure. It then learns a Progress-Aware Semantic Value Function (PAS-VF), aligning spatiotemporal trajectory features with instructions and successful references. The resulting labels salvage useful failure prefixes via reliability decay, while low-value labels mark drift and terminal breakdowns, teaching differences among nominal, failed, and corrective actions. The data engine turns adverse states into planner-generated or human-collected corrective rollouts, teaching recovery to the success manifold. Value-Conditioned Refinement (VCR) trains the policy to prefer high-progress actions. At deployment, a fixed high value (v=1.0) biases actions toward the learned success manifold without online failure detectors or heuristic retries. We introduce FRBench, with standardized error injection and recovery-focused evaluation. Across simulated and real-world bimanual tasks, RePO-VLA improves robustness, raising adversarial success from 20% to 75% on average and up to 80% in scaled real-world trials.`

export const resultSummary = [
  'FRBench evaluates recovery as a controlled state-transition problem: nominal execution, error projection, and recovery execution.',
  'RePO-VLA improves injected-failure success on FRBench-Sim from 15.0% / 15.4% to 37.0% / 43.0%.',
  'Real-world scaling improves adversarial success to 80% on Pour Water and 70% on Fold Towel with 4x recovery data.',
]

interface ListItem {
  title: string
  desc: string
  date: string
  link: string
  type: number
  detail?: any
}

export const list: ListItem[] = [
  {
    title: 'Project Overview',
    desc: abstractText,
    date: 'Project Page',
    link: 'https://arxiv.org/pdf/2605.09410',
    type: 1,
    detail: [
      {
        title: 'Abstract',
        desc: abstractText,
      },
      {
        title: 'Results',
        desc: resultSummary.join('\n\n'),
      },
    ],
  },
]
