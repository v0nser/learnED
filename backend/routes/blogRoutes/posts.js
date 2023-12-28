const router = require("express").Router();
const User = require("../../models/User");
const Post = require("../../models/blogSection/Post");

// CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        console.error('Error updating post:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    console.error('Error finding post for update:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        console.error('Error deleting post:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    console.error('Error finding post for delete:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json("Post not found");
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    console.error('Error finding post:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({ categories: { $in: [catName] } });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
