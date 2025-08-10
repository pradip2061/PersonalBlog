const Blog = require("../model/BlogModel");

const getBlog = async (req, res) => {
  try {
    const projects = await Blog.find({ category: "Projects" }).sort({createdAt:-1})
    const tutorials = await Blog.find({ category: "Tutorials" }).sort({createdAt:-1})
    const codingandjokes = await Blog.find({ category: "coding facts and jokes" }).sort({createdAt:-1})

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
    const blogcontent = await Blog.findOne({_id:blogid})
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

    const data = await Blog.find({ category }).sort({createdAt:-1})

    if (data.length === 0) {
      return res.status(404).json({ message: "No blogs found for this category" });
    }

    res.status(200).json({data});
  } catch (error) {
    console.error("Error fetching blog category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const viewscalc = async (req, res) => {
  try {
    const blogid = req.body.id;

    if (!blogid) {
      return res.status(400).json({ message: "Blog ID is required" });
    }

    if (!req.user || !req.user.userid) {
      return res.status(401).json({ message: "Token is missing or invalid" });
    }

    // Add userid to views only if not already present
    const blog = await Blog.findByIdAndUpdate(
      blogid,
      { $addToSet: { views: { userid: req.user.userid } } },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "View recorded successfully",
      viewsCount: blog.views?.length ?? 0, // safe access
      blog,
    });
  } catch (error) {
    console.error("🔥 Error recording view:", error);
    res.status(500).json({
      message: error.message,
      stack: error.stack, // remove stack trace in production
    });
  }
};

module.exports = {getBlog,getBlogSingle,getblogcategory,viewscalc};
