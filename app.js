const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/libray', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

const bookSchema = new mongoose.Schema({
    bookID: Number,
    bookName: String,
    bookAuthor: String,
    bookPages: Number,
    bookPrice: Number,
    bookState: { type: String, default: 'Available' }
});

const Book = mongoose.model('Book', bookSchema);

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views'));

app.get("/", async (req, res) => {
    const books = await Book.find();
    res.render('home', {data: books});
})
app.post("/", async (req, res) => {
    const book = new Book({
        bookID: await Book.countDocuments() + 1, 
        bookName: req.body.bookName,
        bookAuthor: req.body.bookAuthor,
        bookPages: req.body.bookPages,
        bookPrice: req.body.bookPrice
      });
      await book.save();
      res.redirect("/");
})

app.get("/issue/:bookID", async (req, res) => {
    await Book.updateOne({ bookID: req.params.bookID }, { bookState: "Issued" });
    res.redirect("/");
})
app.get("/return/:bookID", async (req, res) => {
    await Book.updateOne({ bookID: req.params.bookID }, { bookState: "Available" });
  res.redirect("/");
})
app.get("/delete/:bookID", async (req, res) => {
    await Book.deleteOne({ bookID: req.params.bookID });
  res.redirect("/");
})

// Update route
app.post("/update/:bookID", async (req, res) => {
    const { bookName, bookAuthor, bookPages, bookPrice } = req.body;

    try {
        // Find the book by bookID and update it
        const updatedBook = await Book.findOneAndUpdate(
            { bookID: req.params.bookID },
            { bookName, bookAuthor, bookPages, bookPrice },
            { new: true } // Return the updated book
        );

        if (!updatedBook) {
            return res.status(404).send('Book not found');
        }

        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating book');
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});