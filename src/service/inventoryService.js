const MyError = require("../../utils/MyError");
const repository = require("../repository/inventoryRepository");

exports.getAllInventory = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    repository.getAllInventory({ skip, take: limit }),
    repository.count(),
  ]);
  if (!items) throw new MyError("Inventory items not found", 404);
  return {
    data: items,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
};

exports.createInventory = async (body) => {
  const { inventory_number, book_id, status } = body;
  if (!inventory_number || !book_id)
    throw new MyError("Enter all required fields!", 400);

  const item = await repository.createInventory({
    inventory_number: Number(inventory_number),
    book_id: Number(book_id),
    status: status || "available"
  });
  if (!item) throw new MyError("Failed to create inventory item", 500);
  return item;
};

exports.getInventory = async (id) => {
  const item = await repository.getOneInventory({ inventory_id: Number(id) });
  if (!item) throw new MyError("Inventory item not found", 404);
  return item;
};

exports.updateInventory = async (id, body) => {
  const updatedItem = await repository.updateInventory({ inventory_id: Number(id) }, body);
  if (!updatedItem) throw new MyError("Failed to update inventory", 500);
  return updatedItem;
};

exports.deleteInventory = async (id) => {
  await repository.deleteInventory({ inventory_id: Number(id) });
};