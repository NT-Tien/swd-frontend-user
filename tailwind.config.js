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
                'primary-bg-color': '#ece8e5',
                'primary-theme': '#ffae00',
                'secondary-theme': '#4d3d30',
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
