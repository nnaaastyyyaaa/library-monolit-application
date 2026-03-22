class User {
  constructor({ id, name, email, password, phone_number, role }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone_number = phone_number;
    this.role = role;
  }
  changeName(name) {
    this.name = name;
  }
  changeEmail(email) {
    this.email = email;
  }
  changePassword(password) {
    this.password = password;
  }
  changePhone(phone) {
    this.phone_number = phone;
  }
}

module.exports = { User };
