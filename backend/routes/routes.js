const {Router} = require('express');
const router = Router();

const Book = require('../models/Book');

// Routes of Server
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

router.post('/', async (req, res) => {
  const {title, author, isbn} = req.body;
  console.log(req.file.filename);
  const imagePath = `/uploads/${req.file.filename}`;
  const newBook = new Book({title, author, isbn, imagePath});

  await newBook.save();
  res.json({message: 'Book Save'});
});

router.delete('/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({message: 'Book deleted'});
});

module.exports = router;
