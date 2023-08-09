const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
require("dotenv").config();

const { login } = require("./auth");

const { DB_HOST, PORT } = process.env;
/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(DB_HOST);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST /api/auth/login", () => {
  it("should login user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      password: "111111111",
      email: "test3@gmail.com",
    });
    expect(res.statusCode).toBe(200);
  });

  it("should return token", async () => {
    const res = await request(app).post("/api/auth/login").send({
      password: "111111111",
      email: "test3@gmail.com",
    });
    const { token } = res.body;
    expect(token).toBeTruthy();
  });

  it("should return object of user with email and subscription as string", async () => {
    const res = await request(app).post("/api/auth/login").send({
      password: "111111111",
      email: "test3@gmail.com",
    });
    const { user } = res.body;
    expect(typeof user.email).toBe("string");
    expect(typeof user.subscription).toBe("string");
  });
});
