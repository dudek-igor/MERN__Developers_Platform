import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  addLike,
  removeLike,
  deletePost,
  showActions,
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='Avatar' />
          <h4>{name.charAt(0).toUpperCase() + name.slice(1)}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
        </p>
        {showActions && (
          <>
            <button
              type='button'
              className='btn btn-light'
              onClick={() => addLike(_id)}
            >
              <i className='fa fa-thumbs-up'></i>{' '}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button
              type='button'
              className='btn btn-light'
              onClick={() => removeLike(_id)}
            >
              <i className='fa fa-thumbs-down'></i>
            </button>
            <Link to={`/posts/${_id}`} className='btn btn-primary'>
              {comments.length > 0 ? (
                <>
                  <span>Discussion</span>{' '}
                  <span className='comment-count'>{comments.length}</span>
                </>
              ) : (
                <span>Add Comment</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                type='button'
                className='btn btn-danger'
                onClick={() => deletePost(_id)}
              >
                <i className='fa fa-times'></i>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  addLike,
  removeLike,
  deletePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
