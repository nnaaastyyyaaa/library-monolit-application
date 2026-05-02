const { User } = require("../../domain/entities/user");

class UserMapper {
  static toDomain(raw) {
    if (!raw) return null;

    return new User({
      id: raw.user_id,
      name: raw.name,
      email: raw.email,
      password: raw.password,
      phone_number: raw.phone_number,
      role: raw.role,
    });
  }

  static toPersistence(user) {
    return {
      name: user.name,
      email: user.email,
      password: user.password,
      phone_number: user.phone_number,
      role: user.role,
    };
  }
}

module.exports = { UserMapper };
