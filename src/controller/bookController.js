const bookService = require("../service/bookService");

exports.getAllBooks = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const books = await bookService.getAllBooks(page, limit);
    res.json(books);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const book = await bookService.createBook(req.body);
    res.status(201).json({ "Created book": book });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await bookService.getBook(req.params.id);
    res.json(book);
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await bookService.updateBook(req.params.id, req.body);
    res.json({ "Updated book": updatedBook });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await bookService.deleteBook(req.params.id);
    res.json({ status: "Deleted successfully!" });
  } catch (error) {
    res.status(error.statuscode || 505).json({ error: error.message });
  }
};