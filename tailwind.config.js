/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './*.html',
    './src/**/*.{html,js,jsx}',
    './public/**/*.{html,js}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-\[url\(.*?\)\]/, // Whitelist dynamic bg-[url(...)] classes
    }
  ],
}
