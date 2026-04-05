const { GetUserHandler } = require('../application/queries/user/get-user/getUserHandler');
const { GetUserQuery } = require('../application/queries/user/get-user/getUserQuery');
const prisma = require('../infrastructure/prisma/client');

describe('GetUserHandler Integration', () => {
  let handler;

  beforeAll(() => {
    handler = new GetUserHandler(prisma);
  });

  it('має повернути користувача, якщо він існує в базі', async () => {
    const testUser = await prisma.user.create({
      data: {
        name: 'Query Test',
        email: 'query@test.com',
        password: 'hash',
        role: 'user'
      }
    });

    const query = new GetUserQuery({ id: testUser.user_id });
    const result = await handler.execute(query);

    expect(result).toBeDefined();
    expect(result.email).toBe('query@test.com');

    await prisma.user.delete({ where: { user_id: testUser.user_id } });
  });

  it('має викинути DomainError, якщо користувача не знайдено', async () => {
    const query = new GetUserQuery({ id: 999999 });
    await expect(handler.execute(query)).rejects.toThrow();
  });
});