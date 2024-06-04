/**@type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      animation: {
        tilt: "tilt 4s infinite linear",
        sliding: "sliding 15s infinite linear",
        rotate: "rotate 2s linear 0s infinite"
      },
      keyframes: {
        tilt: {
          "0%, 50%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(15deg)" },
          "75%": { transform: "rotate(-8deg)" }
        },
        sliding: {
          "0%, 100%": { left: 0 },
          "50%": { left: "-40%" }
        },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        }
      }
    }
  },
  variants: {},
  plugins: []
}
