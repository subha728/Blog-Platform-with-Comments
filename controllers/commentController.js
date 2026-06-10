const Comment = require("../models/Comment");

const createComment = async (req, res) => {
  try {
    const { text, user, post } = req.body;

    if (!text || !user || !post) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const comment = await Comment.create({
      text,
      user,
      post,
    });

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.postId,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: comments.length,
      comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createComment,
  getCommentsByPost,
};