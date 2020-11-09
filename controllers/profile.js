const Profile = require('../model/Profile');
const User = require('../model/User');
const axios = require('axios');
const config = require('config');
// const Post = require('../model/Post');

// @route GET api/profile/me
// @desc  Get current user's profile
// Private
exports.getUserProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    return res.status(200).json({ profile });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};

// @route POST api/profile
// @desc  Create current user's profile
// Private
exports.createUserProfile = async (req, res) => {
  req.body.user = req.user.id;
  try {
    let profile = await Profile.findOne({ user: req.body.user });
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.body.user },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
    } else {
      profile = await Profile.create(req.body);
    }
    return res.status(200).json({ profile });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};

// @route GET api/profile
// @desc  Get all profiles
// Public
exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.status(200).json({ data: profiles });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route GET api/profile/user/:user_id
// @desc  Get single profile
// Public
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(200).json({ data: profile });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @route DELETE api/profile
// @desc  Delete profile, user & posts
// Private

exports.deleteProfile = async (req, res) => {
  const idFromToken = req.user.id;
  try {
    // Remove user posts
    // await Post.findOneAndRemove({
    //   user: idFromToken,
    // });
    // Remove profile
    await Profile.findOneAndRemove({
      user: idFromToken,
    });
    // Remove user
    await User.findOneAndRemove({
      _id: idFromToken,
    });

    return res.status(200).json({ msg: 'User Delete' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route PUT api/profile/experience
// @desc  Add current profile experience
// Private
exports.updateExpiernce = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(req.body);
    await profile.save();
    res.status(200).json({ profile });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route DELETE api/profile/experience/:exp_id
// @desc  Delete current profile experience
// Private
exports.deleteExpiernce = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // Get remove index
    const removeIndex = profile.experience
      .map((item) => item._id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.status(200).json({ profile });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route PUT api/profile/education
// @desc  Add current profile education
// Private
exports.updateEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(req.body);
    await profile.save();
    res.status(200).json({ profile });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route DELETE api/profile/education/:exp_id
// @desc  Delete current profile education
// Private
exports.deleteEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // Get remove index
    const removeIndex = profile.education
      .map((item) => item._id)
      .indexOf(req.params.exp_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.status(200).json({ profile });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @route GET api/profile/github/:username
// @desc  Get user repos from github
// Public

exports.getGithubRepo = async (req, res) => {
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );

    const headers = {
      'user-agent': 'node.js',
      Authorization: `token ${config.get('githubToken')}`,
    };

    const gitHubResponse = await axios.get(uri, { headers });
    return res.status(200).json(gitHubResponse.data);
  } catch (error) {
    console.error(error.message);
    return res.status(404).json({ msg: 'Profile not found' });
  }
};
