class CreateBookCommand {
  constructor({
    title,
    author,
    isbn,
    description,
    published_year,
    category_id,
  }) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.description = description;
    this.published_year = published_year;
    this.category_id = category_id;
  }
}

module.exports = { CreateBookCommand };
