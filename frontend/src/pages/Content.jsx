import {
  ArrowLeft,
  Clock,
  User,
  Facebook,
  Twitter,
  Linkedin,
  Share2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import nprogress from "nprogress";
import {
  addOverlay,
  removeOverlay,
} from "../components/context/SuspenseWithNProgress";
import { toast } from "react-toastify"; // ✅ Import toast
import "react-toastify/dist/ReactToastify.css"; // ✅ Toast styles

const Content = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [posting, setPosting] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = loggedInUser?.id;
  const date = new Date(data?.createdAt).toLocaleDateString();

  // ✅ Fetch Blog and Comments
  useEffect(() => {
    const getBlogSingle = async () => {
      try {
        nprogress.start();
        addOverlay();

        // Trigger Views only if logged in
     

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/getblogsingle?blogid=${id}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setData(response.data.blogcontent);
          setComments(response.data.blogcontent.comments || []);
            await Views(id);
        }
      } catch (error) {
        console.log(error?.response?.data?.message);
      } finally {
        nprogress.done();
        removeOverlay();
        setLoading(true);
      }
    };
    getBlogSingle();
  }, [id]);

  // ✅ Views function with guest restriction
  const Views = async (id) => {
    if (!loggedInUser) {
      toast.info("Please log in first to view this post");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/views`,
        { id },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error recording view:", error);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ✅ Post new comment
  const handleComment = async () => {
    if (!newComment.trim()) return;

    try {
      setPosting(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/comment`,
        { text: newComment, blogid: id },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setComments(response.data.comments);
        setNewComment("");
      }
    } catch (error) {
      console.error(error?.response?.data?.message || error.message);
    } finally {
      setPosting(false);
    }
  };

  // ✅ Like a comment
  const handleLike = async (commentId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/like`,
        { blogid: id, commentid: commentId },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const { likes } = response.data;
        setComments((prev) =>
          prev.map((c) =>
            c._id === commentId ? { ...c, likes: Array(likes).fill(0) } : c
          )
        );
      }
    } catch (error) {
      console.error(error?.response?.data?.message || error.message);
    }
  };

  // ✅ Delete a comment
  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/deletecomment`,
        {
          data: { blogid: id, commentid: commentId },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setComments(response.data.comments);
      }
    } catch (error) {
      console.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {data && (
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center lg:ml-10 space-x-2 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 mb-8 transition-colors"
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

            {/* ✅ Comment Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Comments
              </h3>

              {/* Comment Input */}
              <div className="flex items-center gap-3 mb-6">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 border rounded-lg p-2 dark:bg-gray-800 dark:text-white"
                />
                <button
                  onClick={handleComment}
                  disabled={posting}
                  className={`px-4 py-2 rounded-lg text-white ${
                    posting ? "bg-gray-500" : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {posting ? "Posting..." : "Post"}
                </button>
              </div>

              {/* Render Comments */}
              {comments.length === 0 ? (
                <p className="text-gray-500">No comments yet.</p>
              ) : (
                <div className="space-y-4">
                  {comments.map((c) => (
                    <div
                      key={c._id}
                      className="border-b border-gray-300 pb-4 dark:border-gray-700"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={c.profilepic || "/default-avatar.png"}
                          alt={c.username}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {c.username}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 ml-10">
                        {c.comment}
                      </p>
                      <small className="ml-10 text-gray-500">
                        {new Date(c.createdAt).toLocaleString()}
                      </small>

                      {/* ✅ Like and Delete Section */}
                      <div className="ml-10 mt-2 flex items-center gap-3">
                        <button
                          onClick={() => handleLike(c._id)}
                          className="text-red-500 hover:text-red-600 flex items-center gap-1"
                        >
                          👍 {c.likes?.length || 0}
                        </button>

                        {c.userid === loggedInUserId && (
                          <button
                            onClick={() => handleDeleteComment(c._id)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            🗑 Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </article>
        </div>
      )}

      {!data && loading && (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
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
      )}
    </div>
  );
};

export default Content;
