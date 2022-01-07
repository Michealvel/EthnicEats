module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.js', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            sans: ['Roboto', 'sans-serif'],
            serif: ['"Roboto Slab"', 'serif'],
            body: ['Roboto', 'sans-serif'],
        },
        extend: {
            backgroundImage: () => ({
                'login-background':
                    "linear-gradient(rgba(0,0,0, 0.75), rgba(0,0,0, 0.75)), url('/src/assets/img/background-1920x1280.jpg')",
                'landing-background':
                    "linear-gradient(rgb(40 40 40 / 75%), rgba(0,0,0, 0.75)), url('https://media-www.sqspcdn.com/images/pages/vertical/restaurants/hero/hero-2500w.jpg')",
                'profile-background':
                    "linear-gradient(rgba(0,0,0, 0.75), rgba(0,0,0, 0.75)), url('/src/assets/img/background-1920x1080.jpg')",
                'stream-background':
                "linear-gradient(rgba(0,0,0, 0.75), rgba(0,0,0, 0.75)), url('/src/assets/img/background-stream.jpg')",
            }),
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
