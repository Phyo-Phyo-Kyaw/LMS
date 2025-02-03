import express from 'express';
import bcrypt from 'bcryptjs';
import {newUser, loginUser} from '../controllers/userController.js';

const router = express.Router();

// Register route
router.get('/register', (req, res) => {
  res.render('register');
});
router.get('/', (req, res) => {
  res.render('home');
});

// Add a book
router.post('/register', newUser);

// Login route
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', loginUser);

export default router;
