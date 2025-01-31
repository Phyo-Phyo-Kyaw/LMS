const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Home route
// router.get('/', (req, res) => {
//     res.render('home');
// });

// Get all books
router.get('/', bookController.getAllBooks);
router.get('/book', bookController.getAllBooks);

// Add a book
router.post('/book', bookController.addBook);

// Issue a book
router.get('/book/issue/:bookID', bookController.issueBook);

// Return a book
router.get('/book/return/:bookID', bookController.returnBook);

// Delete a book
router.get('/book/delete/:bookID', bookController.deleteBook);

// Update a book
router.post('/book/update/:bookID', bookController.updateBook);

module.exports = router;