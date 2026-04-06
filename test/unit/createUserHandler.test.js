const { CreateUserHandler } = require('../../application/commands/user/create-user/createUserHandler');
const { CreateUserCommand } = require('../../application/commands/user/create-user/createUserCommand');
const { DomainError } = require('../../domain/errors/domainError');

describe('CreateUserHandler', () => {
  let userRepositoryMock;
  let handler;

  beforeEach(() => {
    userRepositoryMock = {
      findByEmail: jest.fn(),
      create: jest.fn()
    };
    handler = new CreateUserHandler(userRepositoryMock);
  });

  it('має викинути помилку, якщо користувач з таким email вже існує', async () => {
    const command = new CreateUserCommand({
      name: 'Test',
      email: 'test@example.com',
      password: 'password123'
    });

    userRepositoryMock.findByEmail.mockResolvedValue({ id: 1 });

    await expect(handler.execute(command)).rejects.toThrow(DomainError);
    expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith('test@example.com');
  });

  it('має успішно створити користувача та повернути його ID', async () => {
    const command = new CreateUserCommand({
      name: 'New User',
      email: 'new@example.com',
      password: 'password123'
    });

    userRepositoryMock.findByEmail.mockResolvedValue(null);
    userRepositoryMock.create.mockResolvedValue({ id: 10 });

    const result = await handler.execute(command);

    expect(result).toBe(10);
    expect(userRepositoryMock.create).toHaveBeenCalled();
  });
});