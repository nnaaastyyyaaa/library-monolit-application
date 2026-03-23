const { ReservationFactory } = require("../domain/factories/reservationFactory");
const { DomainError } = require("../domain/errors/domainError");

describe("ReservationFactory Unit Tests", () => {
  let factory;
  let mockResRepo, mockInvRepo, mockUserRepo;

  beforeEach(() => {
    mockResRepo = {};
    mockInvRepo = { findById: jest.fn() };
    mockUserRepo = { findById: jest.fn() };
    factory = new ReservationFactory(mockResRepo, mockInvRepo, mockUserRepo);
  });

  it("має кидати помилку, якщо примірник книги вже зайнятий (status != available)", async () => {
    mockUserRepo.findById.mockResolvedValue({ id: 1 });
    mockInvRepo.findById.mockResolvedValue({ id: 10, status: 'borrowed' });

    const data = { user_id: 1, inventory_id: 10, expiration_date: "2026-12-31" };

    await expect(factory.create(data)).rejects.toThrow(DomainError);
    await expect(factory.create(data)).rejects.toThrow("This book instance is already reserved or checked out");
  });

  it("має кидати помилку, якщо дата закінчення в минулому", async () => {
    mockUserRepo.findById.mockResolvedValue({ id: 1 });
    mockInvRepo.findById.mockResolvedValue({ id: 10, status: 'available' });

    const data = { user_id: 1, inventory_id: 10, expiration_date: "2020-01-01" };

    await expect(factory.create(data)).rejects.toThrow("Expiration date cannot be in the past")
  });
  it("має успішно створити об'єкт Reservation, якщо всі дані валідні", async () => {
  mockUserRepo.findById.mockResolvedValue({ id: 1 });
  mockInvRepo.findById.mockResolvedValue({ id: 10, status: 'available' });

  const data = { 
    user_id: 1, 
    inventory_id: 10, 
    expiration_date: "2026-12-31" 
  };

  const result = await factory.create(data);

  expect(result.user_id).toBe(1);
  expect(result.inventory_id).toBe(10);
  expect(result.status).toBe("active");
});

it("має кидати помилку, якщо користувача не знайдено", async () => {
    mockUserRepo.findById.mockResolvedValue(null);
    await expect(factory.create({ user_id: 999, inventory_id: 1, expiration_date: "2026-01-01" }))
      .rejects.toThrow("User is not found");
  });
});