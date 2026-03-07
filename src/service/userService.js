const MyError = require("../../utils/MyError");
const repository = require("../repository/userRepository");

exports.getAllUsers = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    repository.getAllUsers({
      skip: skip,
      take: limit,
    }),
    repository.count(),
  ]);
  if (!users) throw new MyError("Users not found", 404);
  return {
    data: users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

exports.createUser = async (body) => {
  const { name, email, phone_number, password } = body;
  if (!name || !password || !email || !phone_number)
    throw new MyError("Enter all required fields!", 400);
  const user = await repository.createUser({
    name,
    password,
    email,
    phone_number,
  });
  if (!user) throw new MyError("Failed to create user", 500);
  return user;
};

exports.getUser = async (id) => {
  const user = await repository.getOneUser({
    user_id: Number(id),
  });
  if (!user) throw new MyError("User not found", 404);
  return user;
};

exports.updateUser = async (id, body) => {
  const updateduser = await repository.updateUser(
    { user_id: Number(id) },
    body,
  );
  if (!updateduser) throw new MyError("Failed to update user", 500);
  return updateduser;
};

exports.deleteUser = async (id) => {
  await repository.deleteUser({ user_id: Number(id) });
};
