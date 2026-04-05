class UpdateUserCommand {
  constructor({ id, name, email, phone_number, role }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone_number = phone_number;
    this.role = role;
  }
}

module.exports = { UpdateUserCommand };