const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");
const AUTH_ROUTE = "/api/auth";

const TEST_USER = {
  firstName: "Test",
  lastName: "User",
  email: `test@test.com`,
  password: "123",
};

describe("Auth Tests", () => {
  let token;
  let userId;
  let server;

  beforeAll(async () => {
    if (!app.listening) {
      server = app.listen(0);
    }
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();

    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  it("should register a user", async () => {
    const res = await request(app)
      .post(`${AUTH_ROUTE}/register`)
      .send(TEST_USER);

    expect(res.status).toBe(201);
    userId = res.body.result.userId;
  });

  it("should login with valid credentials", async () => {
    const res = await request(app).post(`${AUTH_ROUTE}/login`).send({
      email: TEST_USER.email,
      password: TEST_USER.password,
    });

    expect(res.status).toBe(200);
    token = res.body.accessToken;
  });

  it("should get user profile with token", async () => {
    const res = await request(app)
      .get(`${AUTH_ROUTE}/profile/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data.email).toBe(TEST_USER.email);
  });

  it("should fail login with wrong password", async () => {
    const res = await request(app).post(`${AUTH_ROUTE}/login`).send({
      email: TEST_USER.email,
      password: "456",
    });

    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/authentication failed/i);
  });
});
