import express from 'express';
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, deleteUser, updateUser, getUserById } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(protect, admin, getUsers).post(registerUser);
router.route('/login').post(authUser); //Bir adet olduğu için router.post('/login', authUser) şeklinde de yapabilirsin.
router.route('/logout').post(protect, logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser);

export default router;
