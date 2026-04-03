const { Reservation } = require("../entities/reservation");
const { ReservationPeriod } = require("../value-oblects/reservation-period");
const { DomainError } = require("../errors/domainError");

class ReservationFactory {
  constructor(reservationRepository, inventoryRepository, userRepository) {
    this.reservationRepository = reservationRepository;
    this.inventoryRepository = inventoryRepository;
    this.userRepository = userRepository;
  }

  async create({ user_id, inventory_id, expiration_date }) {
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new DomainError("User is not found");
    }

    const inventory = await this.inventoryRepository.findById(inventory_id);
    if (!inventory) {
      throw new DomainError("Book instance not found in inventory");
    }

    if (inventory.status !== "available") {
      throw new DomainError(
        "This book instance is already reserved or checked out",
      );
    }

    const period = new ReservationPeriod({
      reservationDate: new Date(),
      expirationDate: expiration_date,
    });

    return new Reservation({
      period,
      status: "active",
      user_id: Number(user_id),
      inventory_id: Number(inventory_id),
    });
  }
}

module.exports = { ReservationFactory };
