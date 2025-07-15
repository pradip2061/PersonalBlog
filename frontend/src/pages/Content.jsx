import {
  ArrowLeft,
  Clock,
  User,
  Tag,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentSection from "../components/blog/CommentSection";
import axios from "axios";
import nprogress from "nprogress";
import {
  addOverlay,
  removeOverlay,
} from "../components/context/SuspenseWithNProgress";


const Content = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const[loading,setLoading]=useState(false)
  const date = new Date(data?.createdAt).toLocaleDateString();

  
  useEffect(() => {
    const getblogsingle = async () => {
      try {
        nprogress.start();
        addOverlay();
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/getblogsingle?blogid=${id}`
        );
        if (response.status === 200) {
          setData(response.data.blogcontent);
        }
      } catch (error) {
        console.log(error?.response.data.message);
      } finally {
        nprogress.done();
        removeOverlay();
        setLoading(true)
      }
    };
    getblogsingle();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    {
      data &&   <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center  lg:ml-10 space-x-2 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <article className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded uppercase tracking-wide">
                {data?.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {data?.title}
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {data?.excerpt}
            </p>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 text-gray-500 dark:text-gray-400 mb-8">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{data?.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{data?.readTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>{date}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-8">
            <img
              src={data?.image}
              alt={data?.title}
              className="w-full h-40 sm:h-56 md:h-64 lg:h-80 xl:h-96 object-cover rounded-lg shadow-lg transition-all duration-300"
            />
          </div>
          {/* Article Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none mb-12 break-words whitespace-pre-wrap custom-prose"
            dangerouslySetInnerHTML={{ __html: data?.content }}
          />
          {/* Share Buttons */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-12">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Share this article
              </h3>
              <div className="flex items-center space-x-4">
                <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="p-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </button>
                <button className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </article>
        <CommentSection />
           {
        !data &&loading && <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Article Not Found
          </h1>
          <Link
            to="/"
            className="text-red-500 hover:text-red-600 font-semibold flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
      }
      </div>
    }
    </div>
  );
};

export default Content;
