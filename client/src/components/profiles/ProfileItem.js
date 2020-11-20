import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='avatar' className='round-img' />
      <div>
        <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <Link to={`profile/${_id}`} className='btn btn-primary'>
          View profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill) => (
          <li className='text-primary' key={skill}>
            <i className='fa fa-check'></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
