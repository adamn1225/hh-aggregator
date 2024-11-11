/** @type {import('tailwindcss').Config} */
export const content = [
  './components/**/*.{js,ts,jsx,tsx}',
  './pages/**/*.{js,ts,jsx,tsx}',
  './app/**/*.{js,ts,jsx,tsx}', // Include the app directory if you have one
];

export const theme = {
  extend: {
    colors: {
      'accent-1': '#333',
    },
    mode: 'jit',
  },
};
export const variants = {};
export const plugins = [];