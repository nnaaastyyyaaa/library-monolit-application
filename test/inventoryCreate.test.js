const { CreateInventory } = require("../application/commands/inventory/create-inventory");
const { DomainError } = require("../domain/errors/domainError");

describe("CreateInventory Command", () => {
  it("має кидати помилку, якщо інвентарний номер вже існує", async () => {
    const mockInvRepo = { 
      findByNumber: jest.fn().mockResolvedValue({ id: 1, inventory_number: 123 }) 
    };
    const command = new CreateInventory(mockInvRepo);

    await expect(command.execute({ inventory_number: 123 }))
      .rejects.toThrow("Inventory number already exists");
  });
});