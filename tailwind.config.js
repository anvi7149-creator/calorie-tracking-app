export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#237A57',
        mint: '#DDF3E5',
        cream: '#F8FAF7',
        ink: '#202923',
        muted: '#747C76',
        amber: '#D9A441',
        danger: '#C94F4F'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(30, 50, 41, 0.08)'
      }
    }
  },
  plugins: []
};
