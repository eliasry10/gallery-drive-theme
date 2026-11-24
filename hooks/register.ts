import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// Showroom charcoal by night, bright studio-white by day, one signal-red accent.
const { theme, problems } = makeColors({
  label: 'Gallery Drive Studio',
  roles: { accent: '#d2452f', danger: '#c4332b', success: '#3f8f5b', warning: '#b8841c', pro: '#6a7fb5' },
  light: {
    gray: {
      anchors: {
        'surface-0': '#eceeef',
        'surface-1': '#f3f4f5',
        'surface-2': '#fafafb',
        'text-primary': '#16191c',
        'text-secondary': '#3d444a',
        'text-muted': '#59626a',
      },
    },
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#14171a',
        'surface-1': '#1b1f23',
        'surface-2': '#22272c',
        'surface-3': '#292f35',
        'text-primary': '#eef0f2',
        'text-secondary': '#c3c9ce',
        'text-muted': '#9aa3ab',
      },
    },
  },
})

const LOOK: ThemeSetArgs = { colors: theme }

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }
    const set = await $.theme.set(LOOK)

    if (!set.isDrawn) {
      $.ui.status(set.reason)
    }

    return next(e)
  })
}
