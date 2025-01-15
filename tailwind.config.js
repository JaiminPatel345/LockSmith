/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './**/*.{js,jsx,ts,tsx}', // Includes all files in your project
    '!./node_modules/**/*', // Excludes everything in node_modules
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};
