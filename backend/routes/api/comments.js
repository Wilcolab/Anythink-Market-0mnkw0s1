const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

// Hey GitHub Copilot, I want to create a new comment for a post. The comment should have the following fields: content, author, postId. The content should be a string, the author should be a reference to the User model, and the postId should be a reference to the Post model. Please write the code for the route that creates a new comment.

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// add another endpoint for deleting a comment
router.delete("/:id", async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        
        res.json({ message: "Comment deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});