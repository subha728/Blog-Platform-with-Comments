const express = require("express");

const router = express.Router();

const {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

router.post("/create", createPost);

router.get("/", getAllPosts);
router.get("/:id", getSinglePost);

router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;