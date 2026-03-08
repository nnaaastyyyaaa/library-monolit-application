const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createReservation = async (data) =>
  await prisma.reservation.create({
    data,
  });

exports.getAllReservations = async (options, data) =>
  await prisma.reservation.findMany({
    where: data?.where,
    skip: options.skip,
    take: options.take,
  });

exports.getOneReservation = async (data) =>
  await prisma.reservation.findUnique({
    where: data,
  });

exports.updateReservation = async (cond, data) =>
  await prisma.reservation.update({
    where: cond,
    data: data,
  });

exports.deleteReservation = async (data) =>
  prisma.reservation.delete({
    where: data,
  });

exports.count = (where = {}) => {
  return prisma.reservation.count({ where });
};