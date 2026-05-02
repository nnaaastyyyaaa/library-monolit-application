class LoginCommand {
  constructor({ email, password }) {
    this.email = email;
    this.password = password;
  }
}

module.exports = { LoginCommand };