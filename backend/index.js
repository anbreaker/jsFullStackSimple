const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');

// Initiazlizations
const app = express();

// Settings
app.set('port', 3000);

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

// Start the server
app.listen(app.get('port'), () => {
  console.log(`Server on Port: http://127.0.0.1:${app.get('port')}`);
});
