/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(35, 77%, 61%)',
        accent: 'hsl(210, 90%, 50%)',
        bg: 'hsl(220, 24%, 14%)',
        surface: 'hsl(220, 24%, 18%)',
        text: 'hsl(0, 0%, 95%)',
        muted: 'hsl(0, 0%, 70%)',
      },
      spacing: {
        sm: '8px',
        md: '12px',
        lg: '20px',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
      },
      boxShadow: {
        card: '0 8px 24px hsla(0, 0%, 100%, 0.12)',
        glow: '0 0 20px hsla(35, 77%, 61%, 0.5)',
      },
      transitionDuration: {
        '150': '150ms',
        '250': '250ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'spin-reel': 'spinReel 2s cubic-bezier(0.22,1,0.36,1)',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        spinReel: {
          '0%': { transform: 'rotateX(0deg)' },
          '50%': { transform: 'rotateX(180deg)' },
          '100%': { transform: 'rotateX(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
