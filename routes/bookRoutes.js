const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Home route
router.get('/', bookController.getAllBooks);

// Add a book
router.post('/', bookController.addBook);

// Issue a book
router.get('/issue/:bookID', bookController.issueBook);

// Return a book
router.get('/return/:bookID', bookController.returnBook);

// Delete a book
router.get('/delete/:bookID', bookController.deleteBook);

// Update a book
router.post('/update/:bookID', bookController.updateBook);

module.exports = router;