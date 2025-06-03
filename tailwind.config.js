/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        common01: 'linear-gradient(180deg, #5FADFF 0%, #4C73FF 100%);',
        'gradient-header': 'linear-gradient(90deg, #4C73FF 0%, #7DE4FB 67.77%, #6999FE 100%)',
        'live-button': 'linear-gradient(180deg, #C7B560 0%, #533611 100%)',
        'sport-button': 'linear-gradient(180deg, #007AFF 0%, #004999 100%)',
        'lottery-button': 'linear-gradient(180deg, #A2D834 0%, #668F13 100%)',
        'electronic-button': 'linear-gradient(180deg, #DB00FF 0%, #680099 100%)',
        vip: 'linear-gradient(180deg, #7CBFFD 0%, #8DD0FE 100%);',
        button: 'linear-gradient(90deg, #4E65FF 0%, #5CE2FC 100%)',
        'auth-panel': 'linear-gradient(0deg, rgba(5,20,45,1) 0%, rgba(26,65,145,1) 100%);',
      },
      colors: {
        'dark-100': '#F4F7FA',
        'dark-200': '#E4EAF1',
        'dark-300': '#CBD5E1',
        'dark-400': '#94A3B8',
        'dark-500': '#64748B',
        'dark-600': '#475569',
        'dark-700': '#334155',
        'dark-800': '#1E293B',
        'dark-900': '#0B1120',
        252525: '#252525',
        fff: '#FFFFFF',
        808080: '#808080',
        '343A40': '#343A40',
        '62AFFF': '#62AFFF',
        '41425E': '#41425E',
        282942: '#282942',
        362100: '#362100',
        '4d4d4d': '#4d4d4d',
        '484D66': '#484D66',
        212529: '#212529',
        aeaeae: '#AEAEB2',
      },
      fontFamily: {
        'noto-sans-tc': ['Noto Sans TC', 'sans-serif'],
      },
      boxShadow: {
        common01: '0px -2px 4px 0px #00000057 inset',
        marquee: '0px 0px 16px 0px #698BFD4D',
        'home-frame': '0px 0px 30px 0px #84A7FF8C inset',
        card: '0px 0px 20px 0px #0000001A',
        sidebar: '5px 5px 17px 0px #0000000F',
        'dashboard-sidebar': '0px 0px 15px 0px #3131311A',
      },
    },
  },
  plugins: [],
  future: {
    arbitraryValues: true,
  },
}
