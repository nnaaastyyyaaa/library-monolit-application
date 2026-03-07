const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createCategory = async (data) =>
  await prisma.category.create({
    data,
  });

exports.getAllCategories = async (options, data) =>
  await prisma.category.findMany({
    where: data?.where,
    skip: options.skip,
    take: options.take,
  });

exports.getOneCategory = async (data) =>
  await prisma.category.findUnique({
    where: data,
  });

exports.updateCategory = async (cond, data) =>
  await prisma.category.update({
    where: cond,
    data: data,
  });

exports.deleteCategory = async (data) =>
  prisma.category.delete({
    where: data,
  });

exports.count = (where = {}) => {
  return prisma.category.count({ where });
};
