const Blog = require("../model/BlogModel");

const createBlog = async (req, res) => {
  try {
    const { title, category, excerpt, author, readTime, content } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image upload failed!" });
    }

    const image = req.file.path; 

    await Blog.create({
      title,
      category,
      image,
      excerpt,
      author,
      readTime,
      content,
      views:[]
    });

    res.status(200).json({ message: "Blog uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = createBlog;
