const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createInventory = async (data) =>
  await prisma.inventory.create({
    data,
  });

exports.getAllInventory = async (options, data) =>
  await prisma.inventory.findMany({
    where: data?.where,
    skip: options.skip,
    take: options.take,
  });

exports.getOneInventory = async (data) =>
  await prisma.inventory.findUnique({
    where: data,
  });

exports.updateInventory = async (cond, data) =>
  await prisma.inventory.update({
    where: cond,
    data: data,
  });

exports.deleteInventory = async (data) =>
  prisma.inventory.delete({
    where: data,
  });

exports.count = (where = {}) => {
  return prisma.inventory.count({ where });
};