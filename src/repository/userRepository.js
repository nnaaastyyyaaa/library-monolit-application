const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createUser = async (data) =>
  await prisma.user.create({
    data,
  });

exports.getAllUsers = async (options, data) =>
  await prisma.user.findMany({
    where: data?.where,
    skip: options.skip,
    take: options.take,
  });

exports.getOneUser = async (data) =>
  await prisma.user.findUnique({
    where: data,
  });

exports.updateUser = async (cond, data) =>
  await prisma.user.update({
    where: cond,
    data: data,
  });

exports.deleteUser = async (data) =>
  prisma.user.delete({
    where: data,
  });

exports.count = (where = {}) => {
  return prisma.user.count({ where });
};
