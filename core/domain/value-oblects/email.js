const { DomainError } = require("../errors/domainError");
class Email {
  constructor(value) {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!regex.test(value)) {
      throw new DomainError("You entered invalid email");
    }
    this.value = value;
  }
}

module.exports = { Email };
