import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const navLinks = [
    { to: "/category/Projects", label: "Projects" },
    { to: "/category/Tutorials", label: "Tutorials" },
    { to: "/category/coding facts and jokes", label: "Coding Facts & Jokes" },
    { to: "https://portfolio1-phi-wine.vercel.app/", label: "Portfolio" },
  ];

  useEffect(() => {
    if (menuRef.current) {
      setMaxHeight(menuOpen ? `${menuRef.current.scrollHeight}px` : "0px");
    }
  }, [menuOpen]);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/google`,
          { access_token: tokenResponse.access_token },
          { withCredentials: true }
        );
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
      } catch (err) {
        console.error("Google login error:", err);
      }
    },
    onError: () => console.log("Login Failed"),
    scope: "openid profile email",
  });

  const handleLogout = async () => {
    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/logout`,
      {},
      { withCredentials: true }
    );
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <header className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300 z-50">
      <div className="container mx-auto px-4 sm:px-8 lg:px-16">
        {/* Top Row */}
        <div className="flex items-center justify-between py-4">
          {/* Left: Social Icons (hidden on mobile) */}
          <div className="hidden lg:flex items-center space-x-4">
            {[Instagram, Facebook, Linkedin, Twitter].map((Icon, i) => (
              <Icon
                key={i}
                className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 cursor-pointer transition-colors"
              />
            ))}
          </div>

          {/* Center: Logo */}
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-200 transition-colors text-center flex-1 mr-24 lg:ml-64">
            PRODEV <span className="text-red-500">TECH</span>
          </h1>

          {/* Right: Theme toggle + (Desktop Auth Buttons) */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400 dark:text-yellow-300" />
              )}
            </button>

            {/* Auth Buttons (Desktop only) */}
            <div className="hidden lg:flex items-center">
              {user ? (
                <div className="flex items-center space-x-2">
                  <img
                    src={user.profilepic}
                    alt="#"
                    className="w-8 h-8 rounded-full bg-gray-800"
                  />
                  <span className="text-gray-800 dark:text-gray-200 font-medium">
                    {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => login()}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400 transition"
                >
                  Sign in
                </button>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="block lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle Menu"
            >
              {menuOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:block border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center flex-wrap gap-8 py-4">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-lg transition-colors ${
                    isActive
                      ? "text-red-500 dark:text-red-400 font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Mobile Nav */}
        <nav
          ref={menuRef}
          className="lg:hidden border-t border-gray-200 dark:border-gray-700 overflow-hidden transition-[max-height] duration-300 ease-in-out"
          style={{ maxHeight }}
        >
          <div className="flex flex-col items-center py-4 space-y-4">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-lg transition-colors ${
                    isActive
                      ? "text-red-500 dark:text-red-400 font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            {/* Auth Buttons (Mobile) */}
            <div className="mt-4 w-full text-center">
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-4/5 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    login();
                    setMenuOpen(false);
                  }}
                  className="w-4/5 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400 transition"
                >
                  Sign in with Google
                </button>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
