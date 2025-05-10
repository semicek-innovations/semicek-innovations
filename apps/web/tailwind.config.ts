import { heroui, ThemeColors } from '@heroui/react'
import { tailwindScrollbar } from '@raulscoelho/tailwind-scrollbar'
import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../node_modules/.pnpm/@heroui+theme*/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: [
    tailwindScrollbar(),
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              50: '#ECEAF5',
              100: '#D6D0EC',
              200: '#B7ACDF',
              300: '#9788D2',
              400: '#7D6CC3',
              500: '#42337E',
              600: '#382C6E',
              700: '#2F255E',
              800: '#241D4B',
              900: '#1A1438',
              DEFAULT: '#42337E',
              foreground: '#FFFFFF'
            },
            secondary: {
              50: '#FFF8EA',
              100: '#FEEEC9',
              200: '#FEE29E',
              300: '#FDD675',
              400: '#FDCB5E',
              500: '#FDC752',
              600: '#E2AD3E',
              700: '#C39531',
              800: '#A57B26',
              900: '#86601B',
              DEFAULT: '#FDC752',
              foreground: '#000000'
            },
            success: {
              50: '#ECFDF3',
              100: '#D1FADF',
              200: '#A6F4C5',
              300: '#6EE7B7',
              400: '#34D399',
              500: '#22C55E',
              600: '#16A34A',
              700: '#15803D',
              800: '#166534',
              900: '#14532D',
              DEFAULT: '#22C55E',
              foreground: '#FFFFFF'
            },
            warning: {
              50: '#FFFBEB',
              100: '#FEF3C7',
              200: '#FDE68A',
              300: '#FCD34D',
              400: '#FBBF24',
              500: '#FACC15',
              600: '#EAB308',
              700: '#CA8A04',
              800: '#A16207',
              900: '#854D0E',
              DEFAULT: '#FACC15',
              foreground: '#000000'
            },
            danger: {
              50: '#FEF2F2',
              100: '#FEE2E2',
              200: '#FECACA',
              300: '#FCA5A5',
              400: '#F87171',
              500: '#EF4444',
              600: '#DC2626',
              700: '#B91C1C',
              800: '#991B1B',
              900: '#7F1D1D',
              DEFAULT: '#EF4444',
              foreground: '#FFFFFF'
            },
            ['info' as keyof ThemeColors]: {
              50: '#EAF2FE',
              100: '#D5E4FD',
              200: '#A9C9FB',
              300: '#7EADF9',
              400: '#5292F8',
              500: '#3B82F6',
              600: '#2563EB',
              700: '#1E4FCC',
              800: '#193DA8',
              900: '#122B7F',
              DEFAULT: '#3B82F6',
              foreground: '#FFFFFF'
            },
            ['violet-a' as keyof ThemeColors]: {
              50: '#F1E9FC',
              100: '#E1D1F8',
              200: '#CDAAF3',
              300: '#B983EE',
              400: '#A461E8',
              500: '#8654D4',
              600: '#6F45B2',
              700: '#5B3B92',
              800: '#473071',
              900: '#322450',
              DEFAULT: '#8654D4',
              foreground: '#FFFFFF'
            },
            ['violet-b' as keyof ThemeColors]: {
              50: '#F1E9FC',
              100: '#E2D2F8',
              200: '#CDAAF3',
              300: '#B883EE',
              400: '#A162E7',
              500: '#8553D3',
              600: '#6C48B2',
              700: '#583D92',
              800: '#433071',
              900: '#2F234F',
              DEFAULT: '#8553D3',
              foreground: '#FFFFFF'
            },
            ['violet-c' as keyof ThemeColors]: {
              50: '#EDE7F9',
              100: '#D6C8F2',
              200: '#BBA2E9',
              300: '#A07CE0',
              400: '#875ED4',
              500: '#6C48B2',
              600: '#593C94',
              700: '#473075',
              800: '#362456',
              900: '#251837',
              DEFAULT: '#6C48B2',
              foreground: '#FFFFFF'
            }
          }
        },
        dark: {
          colors: {
            primary: {
              50: '#201C36',
              100: '#292144',
              200: '#322753',
              300: '#3B2D63',
              400: '#433373',
              500: '#4C3993',
              600: '#6256A7',
              700: '#8C83C3',
              800: '#B9B3E0',
              900: '#E4E1F5',
              DEFAULT: '#4C3993',
              foreground: '#FFFFFF'
            },
            secondary: {
              50: '#2E2610',
              100: '#3D3215',
              200: '#5E491E',
              300: '#806026',
              400: '#A2772E',
              500: '#C48F36',
              600: '#EBAB45',
              700: '#FDC752',
              800: '#FFE091',
              900: '#FFF4D3',
              DEFAULT: '#C48F36',
              foreground: '#000000'
            },
            success: {
              50: '#0F1D18',
              100: '#153127',
              200: '#1F4D39',
              300: '#2A684B',
              400: '#33935F',
              500: '#22C55E',
              600: '#4CDB89',
              700: '#88EFC0',
              800: '#C6F7E0',
              900: '#E8FDF3',
              DEFAULT: '#22C55E',
              foreground: '#FFFFFF'
            },
            warning: {
              50: '#2E2407',
              100: '#3C3009',
              200: '#5C470D',
              300: '#7E5D11',
              400: '#A07215',
              500: '#FACC15',
              600: '#FFDE4D',
              700: '#FCE98C',
              800: '#FFF4BF',
              900: '#FFFCE7',
              DEFAULT: '#FACC15',
              foreground: '#000000'
            },
            danger: {
              50: '#2B1515',
              100: '#3D1B1B',
              200: '#5E2525',
              300: '#7E2F2F',
              400: '#9E3939',
              500: '#EF4444',
              600: '#F96D6D',
              700: '#FDB0B0',
              800: '#FFE1E1',
              900: '#FFF4F4',
              DEFAULT: '#EF4444',
              foreground: '#FFFFFF'
            },
            ['info' as keyof ThemeColors]: {
              50: '#162032',
              100: '#1B2A44',
              200: '#224060',
              300: '#2B5480',
              400: '#3368A0',
              500: '#3B82F6',
              600: '#5C9BFA',
              700: '#91BBFB',
              800: '#C1DAFD',
              900: '#E9F2FE',
              DEFAULT: '#3B82F6',
              foreground: '#FFFFFF'
            },
            ['violet-a' as keyof ThemeColors]: {
              50: '#271D3A',
              100: '#34234D',
              200: '#432B65',
              300: '#53337E',
              400: '#653F9C',
              500: '#8654D4',
              600: '#9F77DC',
              700: '#BC9BEC',
              800: '#DCCBF7',
              900: '#F2EEFD',
              DEFAULT: '#8654D4',
              foreground: '#FFFFFF'
            },
            ['violet-b' as keyof ThemeColors]: {
              50: '#241C38',
              100: '#2F2149',
              200: '#3F2961',
              300: '#4F3179',
              400: '#613D98',
              500: '#8553D3',
              600: '#9A75DC',
              700: '#B698EB',
              800: '#D6C6F6',
              900: '#F0ECFD',
              DEFAULT: '#8553D3',
              foreground: '#FFFFFF'
            },
            ['violet-c' as keyof ThemeColors]: {
              50: '#1E1830',
              100: '#281D40',
              200: '#35255A',
              300: '#422D73',
              400: '#523891',
              500: '#6C48B2',
              600: '#886DD1',
              700: '#A896E5',
              800: '#CEC2F4',
              900: '#EDE9FB',
              DEFAULT: '#6C48B2',
              foreground: '#FFFFFF'
            }
          }
        }
      }
    })
  ]
} satisfies Config
