const Book = require('../models/Book');

// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.render('home', { data: books });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching books');
    }
};

// Add a new book
exports.addBook = async (req, res) => {
    try {
        const book = new Book({
            bookID: (await Book.countDocuments()) + 1,
            bookName: req.body.bookName,
            bookAuthor: req.body.bookAuthor,
            bookPages: req.body.bookPages,
            bookPrice: req.body.bookPrice
        });
        await book.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding book');
    }
};

// Issue a book
exports.issueBook = async (req, res) => {
    try {
        await Book.updateOne({ bookID: req.params.bookID }, { bookState: 'Issued' });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error issuing book');
    }
};

// Return a book
exports.returnBook = async (req, res) => {
    try {
        await Book.updateOne({ bookID: req.params.bookID }, { bookState: 'Available' });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error returning book');
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    try {
        await Book.deleteOne({ bookID: req.params.bookID });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting book');
    }
};

// Update a book
exports.updateBook = async (req, res) => {
    try {
        const { bookName, bookAuthor, bookPages, bookPrice } = req.body;
        const updatedBook = await Book.findOneAndUpdate(
            { bookID: req.params.bookID },
            { bookName, bookAuthor, bookPages, bookPrice },
            { new: true }
        );
        if (!updatedBook) {
            return res.status(404).send('Book not found');
        }
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating book');
    }
};