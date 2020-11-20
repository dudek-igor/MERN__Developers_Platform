import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import { getProfileById } from '../../actions/profile';

const Profile = ({
  match,
  auth,
  getProfileById,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match]);
  if (loading || profile === null) return <Spinner />;
  return (
    <>
      <Link to='/profiles' className='btn btn-light'>
        Back To Profiles
      </Link>
      {auth.isAuthenticated &&
        !auth.loading &&
        auth.user._id === profile.user._id && (
          <Link to='/edit-profile' className='btn btn-dark'>
            Edit Profile
          </Link>
        )}
      <div className='profile-grid my-1'>
        <ProfileTop profile={profile} />
        <ProfileAbout profile={profile} />
        <div className='profile-exp bg-white p-2'>
          <h2 className='text-primary'>Experience</h2>
          {profile.experience.length > 0 ? (
            <>
              {profile.experience.map((exp) => (
                <ProfileExperience key={exp._id} exp={exp} />
              ))}
            </>
          ) : (
            <h4>No experience credentials</h4>
          )}
        </div>
        <div className='profile-edu bg-white p-2'>
          <h2 className='text-primary'>Education</h2>
          {profile.education.length > 0 ? (
            <>
              {profile.education.map((edu) => (
                <ProfileEducation key={edu._id} edu={edu} />
              ))}
            </>
          ) : (
            <h4>No education credentials</h4>
          )}
        </div>
        {profile.githubusername && (
          <ProfileGithub username={profile.githubusername} />
        )}
      </div>
    </>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

const mapDispatchToProps = { getProfileById };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
