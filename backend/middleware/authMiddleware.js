const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('🔐 Incoming Token:', token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('✅ Decoded Token:', decoded);

      const user = await User.findById(decoded.userId).select('-password');

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = user; // ✅ Fix: Assign the user to req.user
      next();
    } catch (err) {
      console.error('❌ JWT Error:', err);
      return res.status(401).json({ message: 'Not authorized' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided' });
  }
};

module.exports = protect;
