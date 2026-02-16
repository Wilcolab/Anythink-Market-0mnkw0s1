const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;
// Hey GitHub Copilot, I want to create a new comment on a post. The comment should have the following fields: content, author, postId. The content field should be a string, the author field should be a reference to the User model, and the postId field should be a reference to the Post model. Please write the code for the route handler that creates a new comment.

/**
 * GET /
 * Retrieves all comments from the database
 * 
 * @route GET /api/comments
 * @returns {Array} 200 - Array of all comment objects
 * @returns {Object} 500 - Error object with error message
 */
router.get("/", async (_req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * POST /
 * Creates a new comment
 * 
 * @route POST /api/comments
 * @param {string} req.body.content - The comment content
 * @param {string} req.body.author - Reference to the User model (author ID)
 * @param {string} req.body.postId - Reference to the Post model (post ID)
 * @returns {Object} 201 - The newly created comment object
 * @returns {Object} 500 - Error object with error message
 */
router.post("/", async (req, res) => {
  const { content, author, postId } = req.body;
  try {
    const newComment = new Comment({
      content,
      author,
      postId,
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE /:id
 * Deletes a comment by its ID
 * 
 * @route DELETE /api/comments/:id
 * @param {string} req.params.id - The ID of the comment to delete
 * @returns {void} 204 - No content on successful deletion
 * @returns {Object} 500 - Error object with error message
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Comment.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});