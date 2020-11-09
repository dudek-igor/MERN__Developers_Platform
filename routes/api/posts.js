const express = require('express');
const Post = require('../../model/Post');
const {
  postsValidationRules,
  commentsValidationRules,
  validate,
} = require('../../utils/validator');
const { authorizationViaToken } = require('../../middleware/auth');
const {
  getPosts,
  getPost,
  createPost,
  deletePost,
  likePost,
  unlikePost,
  commentPost,
  deleteComment,
} = require('../../controllers/Posts');

const router = express.Router();

router
  .route('/')
  .all(authorizationViaToken)
  .get(getPosts)
  .post(postsValidationRules, validate, createPost);

router.route('/:id').all(authorizationViaToken).get(getPost).delete(deletePost);

router.route('/like/:id').all(authorizationViaToken).put(likePost);

router.route('/unlike/:id').all(authorizationViaToken).put(unlikePost);

router
  .route('/comment/:id')
  .all(authorizationViaToken)
  .put(commentsValidationRules, validate, commentPost);
router
  .route('/:id/:comment_id')
  .all(authorizationViaToken)
  .delete(deleteComment);

module.exports = router;
