class GetInventories {
  constructor(inventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }

  async execute() {
    return this.inventoryRepository.findAll();
  }
}

module.exports = { GetInventories };