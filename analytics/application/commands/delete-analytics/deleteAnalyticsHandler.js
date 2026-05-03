class DeleteAnalyticsHandler {
  constructor(repository) {
    this.repository = repository;
  }

  async handle(command) {
    const { id } = command;
    await this.repository.delete(id);
    
    return { success: true };
  }
}

module.exports = { DeleteAnalyticsHandler };