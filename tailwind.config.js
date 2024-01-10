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
      colors: {
      "primary-bg-color": "#ece8e5",
      "primary-theme": "#f8cb3c",
      "secondary-theme": "#515151",
    }
    },
  },
  plugins: [],
}

