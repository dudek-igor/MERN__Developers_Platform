import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  console.log();
  return (
    <div className='profile-about bg-light p-2'>
      <h2 className='text-primary'>
        {name.charAt(0).toUpperCase() + name.slice(1)}'s Bio
      </h2>
      {bio && <p>{bio}</p>}
      <div className='line'></div>
      <h2 className='text-primary'>Skill Set</h2>
      <div className='skills'>
        {skills[0].split(', ').map((skill) => (
          <div className='p-1' key={skill}>
            <i className='fa fa-check'></i> {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
