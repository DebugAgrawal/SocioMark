module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: theme => ({
        'primary': '#8435E9',
      }),
      backgroundImage: theme => ({
        'login-img': "url('Login Page.png')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
