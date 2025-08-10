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
    console.log("===== Incoming Request to /views =====");
    console.log("req.body:", req.body);
    console.log("req.user:", req.user);

    const blogid = req.body.id;

    if (!blogid) {
      return res.status(400).json({ message: "Blog ID is required" });
    }

    // Check if blogid is a valid Mongo ObjectId
    if (!mongoose.Types.ObjectId.isValid(blogid)) {
      return res.status(400).json({ message: "Invalid Blog ID format" });
    }

    if (!req.user || !req.user.userid) {
      return res.status(400).json({ message: "Token is missing or invalid" });
    }

    const blog = await Blog.findOne({ _id: blogid });
    console.log("Blog found:", blog);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Make sure views is always an array
    if (!Array.isArray(blog.views)) {
      console.log("⚠️ blog.views is not an array, resetting it.");
      blog.views = [];
    }

    // Only add if user hasn't viewed before
    if (!blog.views.includes(req.user.userid)) {
      console.log(`Adding user ${req.user.userid} to blog views`);
      blog.views.push(req.user.userid);
      await blog.save();
    } else {
      console.log(`User ${req.user.userid} already viewed this blog`);
    }

    res.status(200).json({
      message: "View recorded successfully"
    });

  } catch (error) {
    console.error("🔥 Error recording view:", error);
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);

    res.status(500).json({
      message: error.message,
      stack: error.stack // remove in production
    });
  }
};


module.exports = {getBlog,getBlogSingle,getblogcategory,viewscalc};
