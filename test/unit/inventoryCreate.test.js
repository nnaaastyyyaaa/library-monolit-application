const { CreateInventoryHandler } = require("../../application/commands/inventory/create-inventory/createInventoryHandler");
const { CreateInventoryCommand } = require("../../application/commands/inventory/create-inventory/createInventoryCommand");
const { DomainError } = require("../../domain/errors/domainError");

describe("CreateInventory Command", () => {
  let mockInvRepo;
  let handler;

  beforeEach(() => {
    mockInvRepo = { 
      findByNumber: jest.fn() 
    };
    handler = new CreateInventoryHandler(mockInvRepo);
  });

  it("має кидати помилку, якщо інвентарний номер вже існує", async () => {
    mockInvRepo.findByNumber.mockResolvedValue({ id: 1, inventory_number: 123 });
    
    const command = new CreateInventoryCommand({ inventory_number: 123 });

    await expect(handler.execute(command))
      .rejects.toThrow("Inventory number already exists");
  });

  it("має успішно викликати створення, якщо номер вільний", async () => {
    mockInvRepo.findByNumber.mockResolvedValue(null);
    mockInvRepo.create = jest.fn().mockResolvedValue({ id: 5 });

    const command = new CreateInventoryCommand({ inventory_number: 124 });
    await handler.execute(command);

    expect(mockInvRepo.create).toHaveBeenCalled();
  });
});