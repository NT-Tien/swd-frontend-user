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
            colors: {
                'primary-bg-color': '#f4f0ea',
                'primary-theme': '#ffa500',
                'secondary-theme': '#4d3d30',
                'secondary-bg-color': '#e8e0d4',
                'text-light-menu-color': '#4d3d30',
                'text-light-color': '#1b1816'
            },
            screens: {
                xs: '320px',
                sm: '640px',

                md: '768px',
            },
        },
    },
    plugins: [],
}
