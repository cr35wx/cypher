/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: { 
        "Blue"      : "#1d4ed8",      //700
        "darkBlue"  : "#1e3a8a",      //900
        "lightBlue" : "#3b82f6",      //500
        "lighterBlue" : "#93c5fd"     //300

      },


    },
  },
  plugins: [],
}

