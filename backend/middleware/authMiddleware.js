import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import userModel from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  //Read the jwt from token
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); //Decoded burada userId field'ine sahiptir.
      req.user = await userModel.findById(decoded.userId).select('-password');
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as admin');
  }
};

export { protect, admin };
