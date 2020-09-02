'use stric';

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
  console.log(`\tWorking on ${process.env.NODE_ENV}`);
}

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

// Initiazlizations
const app = express();
require('./database');

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename(request, file, callback) {
    callback(null, `${new Date().getTime()}.${path.extname(file.originalname)}`);
  },
});
app.use(multer({storage}).single('image'));

// Routes
app.use('/api/books', require('./routes/routes'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(app.get('port'), () => {
  console.log(`Server on Port: http://127.0.0.1:${app.get('port')}`);
});
