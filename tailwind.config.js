/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx}",
		'./src/**/**/*.{html,js,jsx}',
		'./src/**/**/**/*.{html,js,jsx}',
		'./src/*.{html,js,jsx}',
		'./index.html',
  ],
  theme: {
    extend: {
      
    },
  },
  plugins: [],
}

