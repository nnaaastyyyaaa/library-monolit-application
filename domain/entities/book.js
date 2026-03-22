class Book {
  constructor({
    id,
    title,
    author,
    isbn,
    description,
    published_year,
    category_id,
  }) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.description = description;
    this.published_year = published_year;
    this.category_id = category_id;
  }
  updateTitle(title) {
    this.title = title;
  }
  updateAuthor(author) {
    this.author = author;
  }
  updateIsbn(isbn) {
    this.isbn = isbn;
  }
  updateDescription(description) {
    this.description = description;
  }
  updateCategory(category_id) {
    this.category_id = this.category_id;
  }
}

module.exports = { Book };
