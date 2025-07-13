const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connectToDatabase = require('./database/index');
const createBlogRouter = require('./router/blogCreateRouter');
const getBlogRouter = require('./router/GetBlogRouter');

// Middleware
app.use(express.json());
app.use(cors({
  origin:["https://personal-blog-delta-ashen.vercel.app","http://localhost:5173"],
  credentials: true,
}));

// Connect DB
connectToDatabase();

// Routes
app.use('/prodevtech', createBlogRouter);
app.use('/prodevtech', getBlogRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
