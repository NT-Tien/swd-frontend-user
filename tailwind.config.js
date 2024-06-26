/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/**/*.{js,jsx}',
        './src/**/**/*.{html,js,jsx}',
        './src/**/**/**/*.{html,js,jsx}',
        './src/*.{html,js,jsx}',
        './index.html',
    ],
    theme: {
        extend: {
            animation: {
                'spin-slow': 'spin 3s linear infinite',
            },
            colors: {
                'cart-item-color': '#ece7df',
                'primary-bg-color': '#f4f0ea',
                'primary-theme': '#ffa500',
                'secondary-theme': '#4d3d30',
                'secondary-bg-color': '#e8e0d4',
                'text-light-menu-color': '#4d3d30',
                'text-light-color': '#1b1816',
            },
            screens: {
                xs: '320px',
                sm: '640px',
                'max-md': {'max': '767px'},
                md: '768px',
                xl: '1440px'
            },
            backgroundImage: {
                'about-us': "url('./src/assets/pictures/about-us-bg.jpg')",
            },
        },
    },
    plugins: [],
}
