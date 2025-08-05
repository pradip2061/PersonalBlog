import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Filter, Search } from 'lucide-react';
import Card from '../components/common/Card';
import { useDispatch, useSelector } from 'react-redux';
import { FetchBlogCategoryThunk } from '../store/getblogcategory/getblogcategoryThunk';
import { setdata } from '../store/getblogcategory/getblogcategorySlice';
import nprogress from "nprogress";
import {
  addOverlay,
  removeOverlay,
} from "../components/context/SuspenseWithNProgress";

const NavbarCategory = () => {
  const { topic } = useParams();
  const dispatch = useDispatch();
  const blogdata = useSelector((state) => state.getblogcategory.data);
  const status = useSelector((state) => state.getblogcategory.status);

  const [searchInput, setSearchInput] = useState(""); // Input field state
  const [searchTopic, setSearchTopic] = useState(""); // Applied search state
  const [sortBy, setSortBy] = useState("date"); // Sort state

  const inputRef = useRef(null); // Ref to blur input after submit

  const label = topic === "codingfactsandjokes" ? "Coding Facts and Jokes" : topic;

  // Fetch data on topic change
  useEffect(() => {
    dispatch(setdata());
    dispatch(FetchBlogCategoryThunk(topic));
  }, [dispatch, topic]);

  // Handle progress bar
  useEffect(() => {
    if (status === "pending") {
      nprogress.start();
      addOverlay();
    } else if (status === "success" || status === "failed") {
      nprogress.done();
      removeOverlay();
    }
  }, [status]);

  // ✅ Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTopic(searchInput);

    // ✅ Close mobile keyboard
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  // ✅ Filter and Sort
  const filteredData = blogdata
    .filter((article) =>
      article.title.toLowerCase().includes(searchTopic.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.createdAt) - new Date(a.createdAt); // Latest first
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt); // Oldest first
      } else if (sortBy === "title-asc") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "title-desc") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 lg:px-20">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-1 h-12 bg-red-500"></div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{label}</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Explore the latest {label} news and insights
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative md:w-96">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search articles..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
            </div>
          </form>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
            >
              <option value="date">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title-asc">Title A–Z</option>
              <option value="title-desc">Title Z–A</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold">{filteredData.length}</span> articles
          </p>
        </div>

        {/* No Results */}
        {filteredData.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mb-4">
            No articles found matching your search.
          </p>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 lg:gap-6 pb-4">
          {filteredData.map((article, index) => (
            <Card key={index} data={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavbarCategory;
