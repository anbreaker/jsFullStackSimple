import BookService from './services/BookService';
import {format} from 'timeago.js';
const bookService = new BookService();

class UI {
  async renderBooks() {
    const books = await bookService.getBooks();
    const booksCardContainer = document.getElementById('books-card');
    booksCardContainer.innerHTML = '';
    books.forEach((book) => {
      const divBook = document.createElement('div');
      divBook.className = '';
      divBook.innerHTML = `
      <div class="card m-2">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="http://localhost:3000${book.imagePath}" class="img-fluid" alt="">
          </div>
          <div class="col-md-8">
            <div class="card-block px-2">
              <h4 class="card-title">${book.title}</h4>
              <p class="card-text">${book.author}</p>
              <a href="#" class="btn btn-danger delete" _id="${book._id}">Delete</a>
            </div>
          </div>
        </div>
        <div class="card-footer w-100 text-muted">
          ${format(book.created_at)}
        </div>
      </div>
      `;
      booksCardContainer.appendChild(divBook);
    });
  }

  async addNetBook(book) {
    await bookService.postBook(book);
    this.clearBookForm();
    this.renderBooks();
  }

  clearBookForm() {
    document.getElementById('book-form').reset();
  }

  renderMessage() {}

  deleteBook() {}
}
export default UI;
