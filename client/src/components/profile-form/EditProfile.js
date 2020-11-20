import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createAndEditProfile, getCurrentProfile } from '../../actions/profile';
import { Redirect } from 'react-router-dom';

const initialState = {
  company: '',
  website: '',
  location: '',
  status: '',
  skills: '',
  githubusername: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: '',
};

const EditProfile = ({
  createAndEditProfile,
  getCurrentProfile,
  profile: { profile, loading },
}) => {
  const history = useHistory();
  const [visibleSocialInput, setVisibleSocialInut] = useState(false);
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(', ');
      setFormData(profileData);
    }
  }, [getCurrentProfile, loading, profile]);

  const handleForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createAndEditProfile(formData, history, profile ? true : false);
  };
  if (!profile) {
    return <Redirect to='/create-profile' />;
  }
  return (
    <>
      <h1 className='large text-primary'>Update Your Profile</h1>
      <p className='lead'>
        <i className='fa fa-user-circle-o'></i> Let's get some information to
        make your profile stand out
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => handleSubmit(e)}>
        <div className='form-group'>
          <select
            name='status'
            value={formData.status}
            onChange={(e) => handleForm(e)}
          >
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Company'
            name='company'
            value={formData.company}
            onChange={(e) => handleForm(e)}
          />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            onChange={(e) => handleForm(e)}
            value={formData.website}
            placeholder='Website'
            name='website'
          />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            onChange={(e) => handleForm(e)}
            value={formData.location}
          />
          <small className='form-text'>
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            onChange={(e) => handleForm(e)}
            value={formData.skills}
          />
          <small className='form-text'>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubusername'
            onChange={(e) => handleForm(e)}
            value={formData.githubusername}
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            onChange={(e) => handleForm(e)}
            value={formData.bio}
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button
            type='button'
            className='btn btn-light'
            onClick={() => setVisibleSocialInut((isOpen) => !isOpen)}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {visibleSocialInput && (
          <>
            {' '}
            <div className='form-group social-input'>
              <i className='fa fa-twitter fa-2x'></i>
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                onChange={(e) => handleForm(e)}
                value={formData.twitter}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fa fa-facebook-official fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                onChange={(e) => handleForm(e)}
                value={formData.facebook}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fa fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                onChange={(e) => handleForm(e)}
                value={formData.youtube}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fa fa-linkedin-square fa-2x'></i>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                onChange={(e) => handleForm(e)}
                value={formData.linkedin}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fa fa-instagram fa-2x'></i>
              <input
                type='text'
                onChange={(e) => handleForm(e)}
                value={formData.instagram}
                placeholder='Instagram URL'
                name='instagram'
              />
            </div>
          </>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </>
  );
};

EditProfile.propTypes = {
  createAndEditProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  createAndEditProfile,
  getCurrentProfile,
})(EditProfile);