const request = require("supertest");
const app = require("../app");

describe("Reservation API Integration Tests", () => {
  it("GET /reservations має повертати статус 200", async () => {
    const response = await request(app).get("/reservations");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("POST /reservations/reservation має повертати 400, якщо юзера не існує", async () => {
    const response = await request(app).post("/reservations/reservation").send({
      user_id: 9999,
      inventory_id: 1,
      expiration_date: "2026-12-31",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  it("DELETE /reservations/reservation/:id має повертати статус 202 або 400", async () => {
    const response = await request(app).delete(
      "/reservations/reservation/9999",
    );

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});
