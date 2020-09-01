'use stric';

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
  console.log(`\tWorking on ${process.env.NODE_ENV}`);
}

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');

// Initiazlizations
const app = express();
require('./database');

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename(request, file, callback) {
    callback(null, `${new Date().getTime()}.${paths.extname(file.originalname)}`);
  },
});
app.use(multer(storage).single('image'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Routes
app.use('/api/books', require('./routes/routes'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(app.get('port'), () => {
  console.log(`Server on Port: http://127.0.0.1:${app.get('port')}`);
});
