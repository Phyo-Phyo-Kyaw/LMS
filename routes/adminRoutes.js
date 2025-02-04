// routes/adminRoutes.js
import express from 'express';
import { getAllBooks, addBook, issueBook, returnBook, deleteBook, updateBook } from '../controllers/bookController.js';
import { getAllUsers } from '../controllers/userController.js';
const router = express.Router();

// Middleware to check if the user is logged in
const isAuthenticated = (req, res, next) => {
	if (req.session.user) {
		return next(); // Allow access to the admin route
	}
	res.redirect('/login'); // Redirect to login if not authenticated
};

// Apply authentication middleware to the /admin routes
router.use(isAuthenticated);

// Admin Dashboard Route
router.get('/', (req, res) => {
	res.render('admin/dashboard', { title: 'Admin Dashboard' });
});

// Admin Logout Route
router.get('/logout', (req, res) => {
	req.session.destroy(() => {
		res.redirect('/login');
	});
});

// Get all books
router.get('/books', getAllBooks);

// Add a book
router.post('/book', addBook);

// Issue a book
router.get('/book/issue/:bookID', issueBook);

// Return a book
router.get('/book/return/:bookID', returnBook);

// Delete a book
router.get('/book/delete/:bookID', deleteBook);

// Update a book
router.post('/book/update/:bookID', updateBook);

// get all users
router.get('/users', getAllUsers);

export default router;
