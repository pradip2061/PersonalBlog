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
  },
  comments:[{
    username:{
      type:String
    },
    userid:{
      type:String
    },
    profilepic:{
      type:String
    },
    comment:{
      type:String
    },
    likes:[
     String
    ],
    views:[String],
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
