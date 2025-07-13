const Blog = require("../model/BlogModel");

const getBlog = async (req, res) => {
  try {
    const projects = await Blog.find({ category: "Projects" });
    const tutorials = await Blog.find({ category: "Tutorials" });
    const codingandjokes = await Blog.find({ category: "coding facts and jokes" });

    res.status(200).json({
      projects, 
      tutorials,
      codingandjokes,
    });
  } catch (error) {
    console.log(error);
  }
};

const getBlogSingle= async (req, res) => {
  try {
    const{blogid}=req.query
    const blogcontent = await Blog.findOne({_id:blogid});
    res.status(200).json({
        blogcontent
    });
  } catch (error) {
    console.log(error);
  }
};

const getblogcategory = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const data = await Blog.find({ category });

    if (data.length === 0) {
      return res.status(404).json({ message: "No blogs found for this category" });
    }

    res.status(200).json({data});
  } catch (error) {
    console.error("Error fetching blog category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {getBlog,getBlogSingle,getblogcategory};
