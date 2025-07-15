/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "lg:text-xl",
    "text-md",
    "font-bold",
    "dark:text-white",
    "bg-gray-300",
    "p-4",
    "text-white",
    "bg-red-500",
    "lg:p-10",
    "text-black",
    "p-2"
    // Add all dynamic classes used in DB content
  ],
  darkMode: "class", // make sure dark mode is enabled
};

