const {
  InventoryPrismaRepository,
} = require("../../infrastructure/repositories/inventoryPrismaRepository");

const {
  CreateInventory,
} = require("../../application/commands/inventory/create-inventory");
const {
  GetInventory,
} = require("../../application/queries/inventory/get-inventory");
const {
  GetInventories,
} = require("../../application/queries/inventory/get-inventories");
const {
  UpdateInventory,
} = require("../../application/commands/inventory/update-inventory");
const {
  DeleteInventory,
} = require("../../application/commands/inventory/delete-inventory");

const {
  InventoryController,
} = require("../../presentation/controllers/inventoryController");

const repository = new InventoryPrismaRepository();

module.exports = new InventoryController(
  new CreateInventory(repository),
  new GetInventory(repository),
  new GetInventories(repository),
  new UpdateInventory(repository),
  new DeleteInventory(repository),
);
