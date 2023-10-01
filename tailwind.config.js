/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "blue-c": "#4C82F6",
        "gray-light": "#EDF2FE",
        "gray-transparent": "#edf2fe69;",
        "green-c": "#28D280",
        "red-c": "#E63E19",
        "royal-green": "#9BDFB6",
        "royal-yellow": "#F4F5B4",
        "royal-purp": "#E0B4F5",
        dark: "#475569",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
