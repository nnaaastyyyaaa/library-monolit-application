process.env.JWT_SECRET = "testsecret";

jest.resetModules();

const request = require("supertest");
const app = require("../../app");
const prisma = require("../../infrastructure/prisma/client");
const bcrypt = require("bcrypt");

describe("Reservation API Integration Tests", () => {
  let token;
  let loginResponse;
  let testAdminEmail = "test_admin_integration@test.com";

  beforeAll(async () => {
    await prisma.user.deleteMany({ where: { email: testAdminEmail } });

    const hashedPassword = await bcrypt.hash("password123", 10);
    await prisma.user.create({
      data: {
        name: "Test Admin",
        email: testAdminEmail,
        password: hashedPassword,
        role: "admin",
      },
    });

    loginResponse = await request(app).post("/users/login").send({
      email: testAdminEmail,
      password: "password123",
    });

    token = loginResponse.body.token;
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: testAdminEmail } });
    await prisma.$disconnect();
  });

  it("GET /reservations має повертати статус 200", async () => {
    const response = await request(app)
      .get("/reservations")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("POST /reservations/reservation має повертати 400, якщо юзера не існує", async () => {
    const response = await request(app)
      .post("/reservations/reservation")
      .set("Authorization", `Bearer ${token}`)
      .send({
        user_id: 9999,
        inventory_id: 1,
        expiration_date: "2026-12-31",
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  it("DELETE /reservations/reservation/:id має повертати статус 400 для неіснуючого ID", async () => {
    const response = await request(app)
      .delete("/reservations/reservation/9999")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});
