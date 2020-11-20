const jwt = require('jsonwebtoken');

exports.authorizationViaToken = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');
  // Check if token
  if (!token) {
    return res.status(401).json({
      msg: 'No token, authorization denied',
    });
  }
  // Verfity token
  try {
    const decoded = jwt.verify(token, process.env.JwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};

exports.checkUserRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        errors: [
          {
            msg: `User role ${req.user.role} is not authorize to access this route`,
          },
        ],
      });
    } else {
      next();
    }
  };
};
