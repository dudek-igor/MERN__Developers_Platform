const Post = require('../model/Post');
const User = require('../model/User');
const Profile = require('../model/Profile');

// @route POST api/posts
// @desc  Create Post
// @access Private

exports.createPost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    req.body.name = user.name;
    req.body.avatar = user.avatar;
    req.body.user = req.user.id;
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route GET api/posts
// @desc  Get Posts
// @access Private
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route GET api/posts/:id
// @desc  Get Post by id
// @access Private
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @route DELETE api/posts/:id
// @desc  Delete Post by id
// @access Private
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check if post exist
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await post.remove();
    res.status(200).json({ msg: 'Post remove' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @route PUT api/posts/like/:id
// @desc  Update Post with like
// @access Private
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //Check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.status(200).json(post.likes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// @route PUT api/posts/unlike/:id
// @desc  Update Post with like
// @access Private
exports.unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //Check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not been liked' });
    }
    //Get remove Index
    const removeIndex = post.likes.map((like) =>
      like.user.toString().indexOf(req.user.id)
    );
    post.likes.splice(removeIndex, 1);

    await post.save();
    res.status(200).json(post.likes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// @route PUT api/posts/comment/:id
// @desc  Comment on a post
// @access Private
exports.commentPost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const post = await Post.findById(req.params.id);
    req.body.name = user.name;
    req.body.avatar = user.avatar;
    req.body.user = req.user.id;

    post.comments.unshift(req.body);
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// @route DELETE api/posts/comment/:id/:comment_id
// @desc  Delete comment
// @access Private
exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }
    //Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    //Get remove Index
    const removeIndex = post.comments.map((comment) =>
      comment.user.toString().indexOf(req.user.id)
    );
    post.comments.splice(removeIndex, 1);

    await post.save();
    res.status(200).json(post.comments);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
