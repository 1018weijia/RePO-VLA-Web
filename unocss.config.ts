// uno.config.ts

import { defineConfig, presetAttributify, presetUno  } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetRemToPx({
      baseFontSize: 4,
    }),
  ],
  rules: [
    [
      'p-c', // 使用时只需要写 p-c 即可应用该组样式
      {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      },
    ],
    [
      'shadow1',
      {
        'box-shadow': '0px 0px 12px rgba(0, 0, 0, .12)',
      },
    ],
    [
      /^border-#([0-9a-fA-F]+)$/,
      ([_, color]) => ({
        border: `1px solid #${color}`,
      }),
    ],
  ],
})
