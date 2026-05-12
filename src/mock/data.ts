const BASE = import.meta.env.BASE_URL
const asset = (path: string) => `${BASE}${path}`

export const info = {
  title: 'RePO-VLA',
  subtitle: 'Recovery-Driven Policy Optimization for Vision-Language-Action Models',
  desc: 'RePO-VLA teaches bimanual robot policies to recover from execution drift, grasp failures, object slips, and contact-rich disturbances by learning from success, failure, and recovery trajectories.',
  venue: 'Project Page',
  tags: ['Vision-Language-Action', 'Bimanual Manipulation', 'Failure Recovery', 'Robot Learning'],
}

export const members = [
  'Weijia Liufu',
  'Xiaoyu Guo',
  'Ruiyi Chen',
  'Jingzhi Liu',
  'Kaidong Zhang',
  'Xiwen Liang',
  'Jianqi Lin',
  'Dawei Sun',
  'Yuze Wang',
  'Rongtao Xu',
  'Bingqian Lin',
  'Bowen Yang',
  'Tongtong Cao',
  'Bowen Peng',
  'Dongyu Zhang',
  'Guangrun Wang',
  'Min Wang',
  'Liang Lin',
  'Xiaodan Liang',
]

export const affiliations = [
  'Sun Yat-sen University',
  'South China University of Technology',
  'Peng Cheng Laboratory',
  'Harbin Institute of Technology',
  'Institute of Automation, Chinese Academy of Sciences',
  "Huawei Noah's Ark Lab",
]

export const authorAffiliations = [
  { id: 1, name: 'Sun Yat-sen University' },
  { id: 2, name: 'South China University of Technology' },
  { id: 3, name: 'Peng Cheng Laboratory' },
  { id: 4, name: 'Harbin Institute of Technology' },
  { id: 5, name: 'Institute of Automation, Chinese Academy of Sciences' },
  { id: 6, name: "Huawei Noah's Ark Lab" },
]

export const authorEntries = [
  { name: 'Weijia Liufu', indices: '1,*' },
  { name: 'Xiaoyu Guo', indices: '2,3,*,†' },
  { name: 'Ruiyi Chen', indices: '1' },
  { name: 'Jingzhi Liu', indices: '1' },
  { name: 'Kaidong Zhang', indices: '1' },
  { name: 'Xiwen Liang', indices: '1' },
  { name: 'Jianqi Lin', indices: '1' },
  { name: 'Dawei Sun', indices: '1' },
  { name: 'Yuze Wang', indices: '4' },
  { name: 'Rongtao Xu', indices: '5' },
  { name: 'Bingqian Lin', indices: '1' },
  { name: 'Bowen Yang', indices: '6' },
  { name: 'Tongtong Cao', indices: '6' },
  { name: 'Bowen Peng', indices: '3' },
  { name: 'Dongyu Zhang', indices: '1' },
  { name: 'Guangrun Wang', indices: '1' },
  { name: 'Min Wang', indices: '2' },
  { name: 'Liang Lin', indices: '1,3' },
  { name: 'Xiaodan Liang', indices: '1,3,‡' },
]

export const authorNotes = [
  '*Equal contribution.',
  '†Project leader.',
  '‡Corresponding author.',
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
    value: '23,453',
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
  },
  {
    label: 'Code',
    href: 'https://1018weijia.github.io/RePO-VLA-Web/',
  },
  // {
  //   label: 'Benchmark',
  //   href: 'https://1018weijia.github.io/RePO-VLA-Web/',
  // },
  {
    label: 'BibTeX',
    href: '#bibtex',
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
    title: 'Inference Normal',
    desc: 'End-to-end RePO-VLA rollouts showing autonomous recovery during contact-rich bimanual execution.',
    videos: [
      {
        title: 'Open Laptop',
        src: asset('Demo/inference/demo1.mp4'),
      },
      {
        title: 'Blocks Ranking RGB',
        src: asset('Demo/inference/demo2.mp4'),
      },
      {
        title: 'Blocks Ranking RGB',
        src: asset('Demo/inference/demo3.mp4'),
      },
      {
        title: 'Lift Pot',
        src: asset('Demo/inference/demo4.mp4'),
      },
    ],
  },
  {
    title: 'Injected Error Recovery',
    desc: 'Controlled error-injection cases used to evaluate whether the policy can restore task progress from adverse states.',
    videos: [
      {
        title: 'Open Laptop',
        src: asset('Demo/inject_error/demo1.mp4'),
      },
      {
        title: 'Blocks Ranking RGB',
        src: asset('Demo/inject_error/demo2.mp4'),
      },
      {
        title: 'Move Stapler Pad',
        src: asset('Demo/inject_error/demo3.mp4'),
      },
      {
        title: 'Blocks Ranking Size',
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
]

export const resources = [
  {
    label: 'Paper PDF',
    href: 'https://arxiv.org/pdf/2605.09410',
  },
  {
    label: 'Code',
    href: 'https://1018weijia.github.io/RePO-VLA-Web/',
  },
  {
    label: 'Dataset / Benchmark',
    href: 'https://1018weijia.github.io/RePO-VLA-Web/',
  },
  {
    label: 'BibTeX',
    href: '#bibtex',
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

export const abstractText = `Vision-Language-Action models remain brittle in long-horizon, contact-rich manipulation because success-only imitation provides little supervision for execution drift, while failed rollouts are often discarded. RePO-VLA assigns distinct roles to success, recovery, and failure trajectories, turning adverse states into corrective rollouts and using value-conditioned refinement to bias actions toward the learned success manifold.`

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
