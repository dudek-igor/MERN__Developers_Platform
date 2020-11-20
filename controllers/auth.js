const User = require('../model/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Methods

// @route GET /api/auth
// @desc  Get authorization to route
// Private
exports.authorizationUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    return res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
};

// @route POST /api/auth/login
// @desc  Authenticate user & get token
// Public
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
    // Decrypt password
    const isMatch = await bcrypt.compare(password.toString(), user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    jwt.sign(
      payload,
      process.env.JwtSecret,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) {
          throw err;
        } else {
          return res.status(201).json({ success: true, token });
        }
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};

// @route POST /api/auth/register
// @desc  Create user & get token
// Public
exports.createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // See if user exist
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }
    // Get users gravatar
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });
    req.body.avatar = avatar;
    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password.toString(), salt);
    const user = await User.create(req.body);
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    jwt.sign(
      payload,
      process.env.JwtSecret,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) {
          throw err;
        } else {
          return res.status(201).json({ success: true, token });
        }
      }
    );
  } catch (error) {
    // console.error(error);
    return res.status(500).send('Server Error');
  }
};
