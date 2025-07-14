import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 lg:pl-22">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Navigation */}
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-bold mb-6 inline-block hover:text-gray-300 transition-colors">
              PRODEV <span className="text-red-500">TECH</span>
            </Link>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-4">Categories</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><Link to="/category/projects" className="hover:text-red-400 transition-colors">Projects</Link></li>
                  <li><Link to="/category/tutorials" className="hover:text-red-400 transition-colors">Tutorials</Link></li>
                  <li><Link to="/category/education" className="hover:text-red-400 transition-colors">Education</Link></li>
                  <li><Link to="/category/coding%20jokes" className="hover:text-red-400 transition-colors">Coding Jokes</Link></li>
                  <li><Link to="/category/books" className="hover:text-red-400 transition-colors">Books</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Blog</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><Link to="/" className="hover:text-red-400 transition-colors">Home</Link></li>
                  <li><a href="#" className="hover:text-red-400 transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-red-400 transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-red-400 transition-colors">RSS Feed</a></li>
                  <li><Link to="/category/all" className="hover:text-red-400 transition-colors">All Posts</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Subscribe to Blog!</h3>
            <p className="text-gray-300 mb-4">Get the latest posts delivered to your inbox</p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
              />
              <button className="w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
          
          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-4">Social Media</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-red-400 transition-colors">
                <Instagram className="w-5 h-5" />
                <span>Instagram</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-red-400 transition-colors">
                <Facebook className="w-5 h-5" />
                <span>Facebook</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-red-400 transition-colors">
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-red-400 transition-colors">
                <Twitter className="w-5 h-5" />
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 prodevtech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;