/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    // Existing safelist
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
    "pl-4",
    "px-10",

    // Added from Google OAuth tutorial code
    "bg-[#1e1e1e]",
    "text-[#4EC9B0]",
    "text-[#569CD6]",
    "text-[#C586C0]",
    "bg-[#252526]",
    "border-[#3c3c3c]",
    "text-gray-200",
    "text-gray-100",
    "text-gray-300",
    "bg-gray-700",
    "bg-blue-500",
    "hover:bg-blue-600"
  ],
  darkMode: "class",
};
