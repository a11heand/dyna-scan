/*
    File: sophisticated_code.js
    Description: This JavaScript code showcases a complex and elaborate application for managing a library system.
*/

// E X T E R N A L   M O D U L E S
const express = require('express');
const mongoose = require('mongoose');

// C O N S T A N T S
const PORT = 3000;
const DB_URL = 'mongodb://localhost:27017/library_system';

// C R E A T E   E X P R E S S   A P P
const app = express();

// M O N G O O S E   C O N N E C T I O N
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to Database'))
  .catch((err) => console.error('Error connecting to Database:', err));

// D E F I N E   M O N G O O S E   S C H E M A S
const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
});

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
  genre: { type: String, required: true },
});

// D E F I N E   M O N G O O S E   M O D E L S
const Author = mongoose.model('Author', authorSchema);
const Book = mongoose.model('Book', bookSchema);

// C R E A T E   R O U T E S
app.get('/authors', async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get('/books', async (req, res) => {
  try {
    const books = await Book.find().populate('author');
    res.json(books);
  } catch (error) {
    res.status(500).json(error);
  }
});

// S T A R T   S E R V E R
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});