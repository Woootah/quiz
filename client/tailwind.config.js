/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
  "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: 'Monument Extended', 
        secondary: 'Space Mono'
      }, 
      colors: {
        cred: '#e73213', 
        cwhite: '#efe6d5'
      }
    },
  },
  plugins: [],
}

