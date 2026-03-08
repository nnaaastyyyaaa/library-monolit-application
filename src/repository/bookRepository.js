const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createBook = async (data) =>
  await prisma.book.create({
    data,
  });

exports.getAllBooks = async (options, data) =>
  await prisma.book.findMany({
    where: data?.where,
    skip: options.skip,
    take: options.take,
  });

exports.getOneBook = async (data) =>
  await prisma.book.findUnique({
    where: data,
  });

exports.updateBook = async (cond, data) =>
  await prisma.book.update({
    where: cond,
    data: data,
  });

exports.deleteBook = async (data) =>
  prisma.book.delete({
    where: data,
  });

exports.count = (where = {}) => {
  return prisma.book.count({ where });
};