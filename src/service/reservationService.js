const MyError = require("../../utils/MyError");
const repository = require("../repository/reservationRepository");

exports.getAllReservations = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const [res, total] = await Promise.all([
    repository.getAllReservations({ skip, take: limit }),
    repository.count(),
  ]);
  if (!res) throw new MyError("Reservations not found", 404);
  return {
    data: res,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
};

exports.createReservation = async (body) => {
  const { expiration_date, user_id, inventory_id, status } = body;
  if (!expiration_date || !user_id || !inventory_id)
    throw new MyError("Enter all required fields!", 400);

  const reservation = await repository.createReservation({
    expiration_date: new Date(expiration_date),
    user_id: Number(user_id),
    inventory_id: Number(inventory_id),
    status: status || "active"
  });
  if (!reservation) throw new MyError("Failed to create reservation", 500);
  return reservation;
};

exports.getReservation = async (id) => {
  const res = await repository.getOneReservation({ reservation_id: Number(id) });
  if (!res) throw new MyError("Reservation not found", 404);
  return res;
};

exports.updateReservation = async (id, body) => {
  if (body.expiration_date) body.expiration_date = new Date(body.expiration_date);
  const updatedRes = await repository.updateReservation({ reservation_id: Number(id) }, body);
  if (!updatedRes) throw new MyError("Failed to update reservation", 500);
  return updatedRes;
};

exports.deleteReservation = async (id) => {
  await repository.deleteReservation({ reservation_id: Number(id) });
};