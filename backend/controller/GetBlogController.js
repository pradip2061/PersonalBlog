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
    const { blogid } = req.body;
    const { userid } = req.user; // assuming middleware sets req.user

    if (!blogid) {
      return res.status(400).json({ message: "Blog ID is required" });
    }

    const blog = await Blog.findById(blogid);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }


    // Only add if user hasn't viewed before
    if (!blog.views.includes(userid)) {
      blog.views.push(userid);
      await blog.save();
    }

    res.status(200).json({
      message: "View recorded successfully"
    });

  } catch (error) {
    console.error("Error recording view:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = {getBlog,getBlogSingle,getblogcategory,viewscalc};
