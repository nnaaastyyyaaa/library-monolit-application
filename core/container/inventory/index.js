const prisma = require("../../infrastructure/prisma/client");
const {
  InventoryPrismaRepository,
} = require("../../infrastructure/repositories/inventoryPrismaRepository");

const {
  CreateInventoryHandler,
} = require("../../application/commands/inventory/create-inventory/createInventoryHandler");
const {
  GetInventoryHandler,
} = require("../../application/queries/inventory/get-inventory/getInventoryHandler");
const {
  GetInventoriesHandler,
} = require("../../application/queries/inventory/get-inventories/getInventoriesHandler");
const {
  UpdateInventoryHandler,
} = require("../../application/commands/inventory/update-inventory/updateInventoryHandler");
const {
  DeleteInventoryHandler,
} = require("../../application/commands/inventory/delete-inventory/deleteInventoryHandler");

const {
  InventoryController,
} = require("../../presentation/controllers/inventoryController");

const repository = new InventoryPrismaRepository();

module.exports = new InventoryController(
  new CreateInventoryHandler(repository),
  new GetInventoryHandler(prisma),
  new GetInventoriesHandler(prisma),
  new UpdateInventoryHandler(repository),
  new DeleteInventoryHandler(repository),
);
