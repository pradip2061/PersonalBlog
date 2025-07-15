/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "lg:text-2xl",
    "text-md",
    "lg:text-3xl",
    "font-bold",
    "dark:text-white",
    "bg-gray-100",
    "p-4",
    "text-white",
    "bg-red-500",
    "lg:p-10",
    "text-black",
    "pb-2",
    "mb-4",
    "pb-4",
    "mt-5",
    "font-bold",
    "pl-4",
    "px-10"
    // Add all dynamic classes used in DB content
  ],
  darkMode: "class", // make sure dark mode is enabled
};

