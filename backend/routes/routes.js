const {Router} = require('express');
const router = Router();
const path = require('path');
const {unlink} = require('fs-extra');

const Book = require('../models/Book');

// Routes of Server
router.get('/', async (req, res) => {
  // const books = await Book.find();
  const books = await Book.find().sort('-_id');
  res.json(books);
});

router.post('/', async (req, res) => {
  const {title, author, isbn} = req.body;
  const imagePath = `/uploads/${req.file.filename}`;
  const newBook = new Book({title, author, isbn, imagePath});

  await newBook.save();
  res.json({message: 'Book Save'});
});

router.delete('/:id', async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  unlink(path.resolve('./backend/public' + book.imagePath));
  res.json({message: 'Book deleted'});
});

module.exports = router;
