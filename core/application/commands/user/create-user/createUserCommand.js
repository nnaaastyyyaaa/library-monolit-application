class CreateUserCommand {
  constructor({ name, email, password, phone_number, role }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone_number = phone_number;
    this.role = role;
  }
}

module.exports = { CreateUserCommand };