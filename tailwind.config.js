/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            colors: {
                'brand-blue': '#444CE7',
                'blue': {
                    50: '#EEF4FF',
                    100: '#E0EAFF',
                    200: '#C7D7FE',
                    300: '#A4BCFD',
                    400: '#8098F9',
                    500: '#6172F3',
                    600: '#444CE7',
                    700: '#3538CD',
                    800: '#2D31A6',
                    900: '#2D3282',
                },
            },
            letterSpacing: {
                tight: '-0.03em',
                tighter: '-0.05em',
            },
        },
    },
    plugins: [],
}
