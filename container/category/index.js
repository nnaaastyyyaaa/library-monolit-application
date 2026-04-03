const {
  CategoryPrismaRepository,
} = require("../../infrastructure/repositories/categoryPrismaRepository");

const {
  CreateCategory,
} = require("../../application/commands/category/create-category");
const {
  GetCategory,
} = require("../../application/queries/category/get-category");
const {
  GetCategories,
} = require("../../application/queries/category/get-categories");
const {
  UpdateCategory,
} = require("../../application/commands/category/update-category");
const {
  DeleteCategory,
} = require("../../application/commands/category/delete-category");

const {
  CategoryController,
} = require("../../presentation/controllers/categoryController");

const repository = new CategoryPrismaRepository();

module.exports = new CategoryController(
  new CreateCategory(repository),
  new GetCategory(repository),
  new GetCategories(repository),
  new UpdateCategory(repository),
  new DeleteCategory(repository),
);
