const BASE = import.meta.env.BASE_URL
const asset = (path: string) => `${BASE}${path}`

export const info = {
  title: 'RePO-VLA',
  subtitle: 'Recovery-Driven Policy Optimization for Vision-Language-Action Models',
  // desc: 'RePO-VLA teaches bimanual robot policies to recover from execution drift, grasp failures, object slips, and contact-rich disturbances by learning from success, failure, and recovery trajectories.',
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
    href: asset('files/repo-vla.pdf'),
  },
  {
    label: 'Code',
    href: '',
  },
  {
    label: 'Benchmark',
    href: '',
  },
  {
    label: 'BibTeX',
    href: '',
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
]

export const resources = [
  {
    label: 'Paper PDF',
    href: asset('files/repo-vla.pdf'),
  },
  {
    label: 'Code',
    href: '',
  },
  {
    label: 'Dataset / Benchmark',
    href: '',
  },
  {
    label: 'BibTeX',
    href: '',
  },
]

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
    link: asset('files/repo-vla.pdf'),
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
