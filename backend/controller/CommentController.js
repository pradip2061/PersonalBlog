const Blog = require("../model/BlogModel");

const comment = async (req, res) => {
  try {
    const { text, blogid } = req.body;
    const { userid, profilepic, Name } = req.user;

    if (!text || !blogid) {
      return res.status(400).json({ message: "Comment text and blog ID are required" });
    }

    const blog = await Blog.findById(blogid);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.comments.push({
      userid,
      profilepic, // ✅ This can be Google image URL or your stored URL
      username: Name,
      comment: text,
      createdAt: new Date()
    });

    await blog.save();

    return res.status(200).json({
      message: "Comment added successfully",
      comments: blog.comments // or just return the new comment
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const liked = async (req, res) => {
  try {
    const { blogid, commentid } = req.body;
    const { userid } = req.user;

    if (!blogid || !commentid) {
      return res.status(400).json({ message: "Blog ID and comment ID are required" });
    }

    const blog = await Blog.findById(blogid);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const targetComment = blog.comments.id(commentid);
    if (!targetComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // ✅ Check if user already liked
    const alreadyLiked = targetComment.likes.some((like) => like.toString() === userid);

    if (alreadyLiked) {
      // Remove like
      targetComment.likes = targetComment.likes.filter((id) => id.toString() !== userid);
    } else {
      // Add like
      targetComment.likes.push(userid);
    }

    await blog.save();

    return res.status(200).json({
      message: "Like status updated",
      likes: targetComment.likes.length, // Send updated count
      isLiked: !alreadyLiked
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const deleteComment = async (req, res) => {
  try {
    const { blogid, commentid } = req.body;
    const { userid } = req.user; // ✅ User ID from JWT middleware

    if (!blogid || !commentid) {
      return res.status(400).json({ message: "Blog ID and Comment ID are required" });
    }

    // Find blog
    const blog = await Blog.findById(blogid);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Find comment
    const targetComment = blog.comments.id(commentid);
    if (!targetComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // ✅ Check if user owns the comment
    if (targetComment.userid.toString() !== userid.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this comment" });
    }

    // ✅ Remove the comment
    blog.comments.pull(commentid);
    await blog.save();

    return res.status(200).json({
      message: "Comment deleted successfully",
      comments: blog.comments // return updated comments list
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports ={comment,liked,deleteComment}

