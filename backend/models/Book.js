const {Schema, model} = require('mongoose');

const bookSchema = new Schema({
  title: {type: String, required: true},
  author: {type: String, required: true},
  isbn: {type: String, required: true},
  imagePath: {type: String},
  create_at: {type: Date, default: Date.now},
});

module.exports = model('Book', bookSchema);
