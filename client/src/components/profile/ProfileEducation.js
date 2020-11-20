import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({ edu }) => {
  const { school, degree, fieldofstudy, to, from } = edu;
  return (
    <>
      <h3 className='text-dark'>{school}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment> -{' '}
        {!to ? 'Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Field of study: </strong>
        {fieldofstudy}
      </p>
    </>
  );
};

ProfileEducation.propTypes = {
  edu: PropTypes.object.isRequired,
};

export default ProfileEducation;
