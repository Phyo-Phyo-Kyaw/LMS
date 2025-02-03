import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
	bookID: Number,
	bookName: String,
	bookAuthor: String,
	bookPages: Number,
	bookPrice: Number,
	bookState: { type: String, default: 'Available' }
});

const Book = mongoose.model('Book', bookSchema);
export default Book;
