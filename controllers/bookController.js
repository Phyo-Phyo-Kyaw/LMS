import Book from '../models/Book.js';

// Helper function to handle errors
const handleError = (res, error, message) => {
    console.error(error);
    res.status(500).send(message);
};

// Get all books
export const getAllBooks = async (req, res) => {
    console.log('getAllBooks');
    try {
        const books = await Book.find();
        console.log(books);
        res.render('admin/book', { data: books });
    } catch (error) {
        handleError(res, error, 'Error fetching books');
    }
};

// Add a new book
export const addBook = async (req, res) => {
    const { bookName, bookAuthor, bookPages, bookPrice } = req.body;

    // Validate input
    if (!bookName || !bookAuthor || !bookPages || !bookPrice) {
        return res.status(400).send('All fields are required');
    }

    try {
        const book = new Book({
            bookID: (await Book.countDocuments()) + 1,
            bookName,
            bookAuthor,
            bookPages,
            bookPrice
        });
        await book.save();
        res.redirect('/admin/book');
    } catch (err) {
        handleError(res, err, 'Error adding book');
    }
};

// Issue a book
export const issueBook = async (req, res) => {
    try {
        const updatedBook = await Book.findOneAndUpdate(
            { bookID: req.params.bookID },
            { bookState: 'Issued' },
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).send('Book not found');
        }

        res.redirect('/admin/book');
    } catch (err) {
        handleError(res, err, 'Error issuing book');
    }
};

// Return a book
export const returnBook = async (req, res) => {
    try {
        const updatedBook = await Book.findOneAndUpdate(
            { bookID: req.params.bookID },
            { bookState: 'Available' },
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).send('Book not found');
        }

        res.redirect('/admin/book');
    } catch (err) {
        handleError(res, err, 'Error returning book');
    }
};

// Delete a book
export const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findOneAndDelete({ bookID: req.params.bookID });

        if (!deletedBook) {
            return res.status(404).send('Book not found');
        }

        res.redirect('/admin/book');
    } catch (err) {
        handleError(res, err, 'Error deleting book');
    }
};

// Update a book
export const updateBook = async (req, res) => {
    const { bookName, bookAuthor, bookPages, bookPrice } = req.body;

    // Validate input
    if (!bookName || !bookAuthor || !bookPages || !bookPrice) {
        return res.status(400).send('All fields are required');
    }

    try {
        const updatedBook = await Book.findOneAndUpdate(
            { bookID: req.params.bookID },
            { bookName, bookAuthor, bookPages, bookPrice },
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).send('Book not found');
        }

        res.redirect('/admin/book');
    } catch (err) {
        handleError(res, err, 'Error updating book');
    }
};
