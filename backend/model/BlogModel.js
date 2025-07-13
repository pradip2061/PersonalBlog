const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String
  },
  category: {
    type: String
  },
  image: {
    type: String
  },
  excerpt: {
    type: String
  },
  author: {
    type: String
  },
  readTime: {
    type: String
  },
  content: {
    type: String
  }
}, { timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
