const MyError = require("../../utils/MyError");
const repository = require("../repository/bookRepository");

exports.getAllBooks = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const [books, total] = await Promise.all([
    repository.getAllBooks({ skip, take: limit }),
    repository.count(),
  ]);
  if (!books) throw new MyError("Books not found", 404);
  return {
    data: books,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
};

exports.createBook = async (body) => {
  const { title, author, isbn, description, published_year, category_id } = body;
  if (!title || !author || !isbn || !description || !published_year || !category_id)
    throw new MyError("Enter all required fields!", 400);
  
  const book = await repository.createBook({
    title, author, isbn, description, published_year, category_id: Number(category_id)
  });
  if (!book) throw new MyError("Failed to create book", 500);
  return book;
};

exports.getBook = async (id) => {
  const book = await repository.getOneBook({ book_id: Number(id) });
  if (!book) throw new MyError("Book not found", 404);
  return book;
};

exports.updateBook = async (id, body) => {
  const updatedBook = await repository.updateBook({ book_id: Number(id) }, body);
  if (!updatedBook) throw new MyError("Failed to update book", 500);
  return updatedBook;
};

exports.deleteBook = async (id) => {
  await repository.deleteBook({ book_id: Number(id) });
};