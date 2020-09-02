import './css/styles.css';
import UI from './UI';

document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  ui.renderBooks();
});

document.getElementById('book-form').addEventListener('submit', (event) => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;
  const image = document.getElementById('image').files;

  const formData = new FormData();
  formData.append('title', title);
  formData.append('author', author);
  formData.append('isbn', isbn);
  formData.append('image', image[0]);

  const ui = new UI();
  ui.addNetBook(formData);

  ui.renderMessage('New Book Adden', 'success', 2000);

  event.preventDefault();
});

document.getElementById('books-card').addEventListener('click', (event) => {
  if (event.target.classList.contains('delete')) {
    console.log(event.target.getAttribute('_id'));
    const ui = new UI();
    ui.deleteBook(event.target.getAttribute('_id'));
    ui.renderMessage('Book Removed', 'danger', 2000);
  }
  event.preventDefault();
});
