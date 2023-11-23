const express = require("express");

const {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPosts
} = require('../../blogController/post-controller.js');

const {
  uploadImage,
  getImage
} = require('../../blogController/image-controller.js');

const {
  newComment,
  getComments,
  deleteComment
} = require('../../blogController/comment-controller.js');

// const {
//   loginUser,
//   singupUser,
//   logoutUser
// } = require('../../blogController/user-controller.js');

const {
  authenticateToken,
  createNewToken
} = require('../../blogController/jwt-controller.js');

const upload = require('../../utils/upload.js');

const blogRouter = express.Router(); // Fix this line

// blogRouter.post('/login', loginUser);
// blogRouter.post('/signup', singupUser);
// blogRouter.post('/logout', logoutUser);

blogRouter.post('/token', createNewToken);

blogRouter.post('/create', authenticateToken, createPost);
blogRouter.put('/update/:id', authenticateToken, updatePost);
blogRouter.delete('/delete/:id', authenticateToken, deletePost);

blogRouter.get('/post/:id', authenticateToken, getPost);
blogRouter.get('/posts', authenticateToken, getAllPosts);

blogRouter.post('/file/upload', upload.single('file'), uploadImage);
blogRouter.get('/file/:filename', getImage);

blogRouter.post('/comment/new', authenticateToken, newComment);
blogRouter.get('/comments/:id', authenticateToken, getComments);
blogRouter.delete('/comment/delete/:id', authenticateToken, deleteComment);

module.exports = blogRouter;
