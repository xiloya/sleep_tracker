const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");
const AUTH_ROUTE = "/api/auth";
const SLEEP_ROUTE = "/api/sleepdata";

const TEST_USER = {
  firstName: "Test",
  lastName: "User",
  email: `user@test.com`,
  password: "123",
};

describe("Sleep Data Controller Tests", () => {
  let token;
  let userId;
  let server;

  beforeAll(async () => {
    if (!app.listening) {
      server = app.listen(0);
    }

    const regRes = await request(app)
      .post(`${AUTH_ROUTE}/register`)
      .send(TEST_USER);
    userId = regRes.body.result.userId;

    const loginRes = await request(app).post(`${AUTH_ROUTE}/login`).send({
      email: TEST_USER.email,
      password: TEST_USER.password,
    });
    token = loginRes.body.accessToken;
  });

  afterAll(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }

    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  it("should create and retrieve sleep data", async () => {
    const sleepData = {
      userId,
      date: new Date().toISOString(),
      sleepTime: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      wakeTime: new Date().toISOString(),
    };

    const createRes = await request(app)
      .post(SLEEP_ROUTE)
      .set("Authorization", `Bearer ${token}`)
      .send(sleepData);

    expect(createRes.status).toBe(201);
    expect(createRes.body.message).toMatch(/saved/i);

    const getRes = await request(app)
      .get(`${SLEEP_ROUTE}/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(getRes.status).toBe(200);
    expect(getRes.body.length).toBe(1);
    expect(getRes.body[0].duration).toBe(8);
  });

  it("should handle sleep time correctly", async () => {
    const now = new Date();
    const sleepData = {
      userId,
      date: new Date(now.setDate(now.getDate() - 1)).toISOString(),
      sleepTime: new Date(now.setHours(22, 0, 0)).toISOString(),
      wakeTime: new Date(now.setDate(now.getDate() + 1)).setHours(6, 0, 0),
    };

    const res = await request(app)
      .post(SLEEP_ROUTE)
      .set("Authorization", `Bearer ${token}`)
      .send(sleepData);

    expect(res.status).toBe(201);
    expect(res.body.data.duration).toBe(8);
  });
});
