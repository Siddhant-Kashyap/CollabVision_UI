/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        proteststrike:['Protest Strike', 'sans-serif'],
        lato:['Lato','sans-serif'],
        protestriot:[ 'Protest Riot', 'sans-serif'],
        robotomono:[ 'Roboto Mono', 'monospace'],
        kodemono:[ 'Kode Mono' ,'monospace'],
        spaceGrotesk:['Space Grotesk','monospace'],
      },
      boxShadow: {
        'custom': '0px 1px 2px rgba(0,255,255,0.5), 0px 2px 4px rgba(0,255,255,0.5), 0px 4px 8px rgba(0,255,255,0.5), 0px 8px 16px rgba(0,255,255,0.5)',
        'purpleshade':'0px 1px 2px rgba(139, 0, 139, 0.5),0px 2px 4px rgba(139, 0, 139, 0.5),0px 4px 8px rgba(139, 0, 139, 0.5),0px 8px 16px rgba(139, 0, 139, 0.5);'
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('tailwind-scrollbar-hide')
   
   
  
  ],
}

