const prisma = require("../../infrastructure/prisma/client");
const {
  CategoryPrismaRepository,
} = require("../../infrastructure/repositories/categoryPrismaRepository");

const {
  CreateCategoryHandler,
} = require("../../application/commands/category/create-category/createCategoryHandler");
const {
  GetCategoryHandler,
} = require("../../application/queries/category/get-category/getCategoryHandler");
const {
  GetCategoriesHandler,
} = require("../../application/queries/category/get-categories/getCategoriesHandler");
const {
  UpdateCategoryHandler,
} = require("../../application/commands/category/update-category/updateCategoryHandler");
const {
  DeleteCategoryHandler,
} = require("../../application/commands/category/delete-category/deleteCategoryHandler");

const {
  CategoryController,
} = require("../../presentation/controllers/categoryController");

const repository = new CategoryPrismaRepository();

module.exports = new CategoryController(
  new CreateCategoryHandler(repository),
  new GetCategoryHandler(prisma),
  new GetCategoriesHandler(prisma),
  new UpdateCategoryHandler(repository),
  new DeleteCategoryHandler(repository),
);
