import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Instagram, Facebook, Linkedin, Twitter, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState('0px');

  const navLinks = [
    { to: '/category/Projects', label: 'Projects' },
    { to: '/category/Tutorials', label: 'Tutorials' },
    { to: '/category/coding facts and jokes', label: 'Coding Facts & Jokes' },
    {to:'https://portfolio1-phi-wine.vercel.app/',label:'porfolio'}
  ];

  useEffect(() => {
    if (menuRef.current) {
      setMaxHeight(menuOpen ? `${menuRef.current.scrollHeight}px` : '0px');
    }
  }, [menuOpen]);

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-8 lg:px-28">
        <div className="flex flex-row items-center lg:justify-between py-4 gap-28 lg:gap-0">
          <div className="hidden lg:flex items-center space-x-4">
            {[Instagram, Facebook, Linkedin, Twitter].map((Icon, i) => (
              <Icon
                key={i}
                className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 cursor-pointer transition-colors"
              />
            ))}
          </div>

          <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-200 transition-colors mr-0 sm:mr-16">
            PRODEV <span className="text-red-500">TECH</span>
          </h1>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400 dark:text-yellow-300" />
              )}
            </button>

            <button
              onClick={() => setMenuOpen(prev => !prev)}
              className="sm:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
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

        {/* Desktop menu */}
        <nav className="hidden sm:block border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center flex-wrap gap-8 py-4">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-lg transition-colors ${
                    isActive
                      ? 'text-red-500 dark:text-red-400 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Mobile menu */}
        <nav
          ref={menuRef}
          className="sm:hidden border-t border-gray-200 dark:border-gray-700 overflow-hidden transition-[max-height] duration-300 ease-in-out"
          style={{ maxHeight }}
        >
          <div className="flex flex-col items-center py-4 space-y-3">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-lg transition-colors ${
                    isActive
                      ? 'text-red-500 dark:text-red-400 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
