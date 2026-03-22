class DeleteUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute(id) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    return await this.userRepository.delete(id);
  }
}

module.exports = { DeleteUser };
