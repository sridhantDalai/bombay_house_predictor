/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8FAFC',
        primary: {
          DEFAULT: '#2563EB',
          dark: '#1D4ED8',
          light: '#3B82F6',
        },
        accent: {
          DEFAULT: '#F97316',
          dark: '#EA580C',
          light: '#FB923C',
        },
        textColor: {
          DEFAULT: '#111827',
          secondary: '#4B5563',
          muted: '#9CA3AF',
        },
        cardBg: 'rgba(255, 255, 255, 0.7)',
        borderBg: 'rgba(226, 232, 240, 0.8)',
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '28px',
        '5xl': '32px',
      },
      fontFamily: {
        heading: ['Poppins', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        jetbrains: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'premium': '0 20px 60px rgba(0, 0, 0, 0.08)',
        'premium-hover': '0 30px 80px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(37, 99, 235, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(37, 99, 235, 0.4)' },
        }
      }
    },
  },
  plugins: [],
}
