import asyncHandler from '../middleware/asyncHandler.js';
import userModel from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc Auth user and get login
// @route POST /api/users/login
//  @Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc Register user
// @route POST /api/users
//  @Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  const userExists = await userModel.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await userModel.create({ name, email, password });

  if (user) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc Logout user and clear cookie
// @route POST /api/users/logout
//  @Private
const logoutUser = asyncHandler(async (req, res) => {
  //   res.cookie('jwt', '', {
  //     expires: new Date(0),
  //     httpOnly: true,
  //   });
  res.clearCookie('jwt'); // Kısa ve doğru kullanım.

  res.status(200).json({ message: 'Logged out successfully' });
});

// @desc get User Profile
// @route GET /api/users/profile
//  @Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('user not found');
  }
});

// @desc update User Profile
// @route PUT /api/users/profile
//  @Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc get users
// @route GET /api/users
//  @Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send('get users');
});

// @desc delete users
// @route DELETE /api/users/:id
//  @Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send('delete user');
});

// @desc get user by id
// @route GET /api/users/:id
//  @Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  res.send('getUserById');
});

// @desc update user
// @route PUT /api/users/:id
//  @Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send('update user');
});

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, deleteUser, updateUser, getUserById };
