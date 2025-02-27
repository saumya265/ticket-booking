const request = require("supertest");
const app = require("../app");
const User = require("../models/User");

describe("User API", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        mobileNumber: "1234567890",
        gender: "male",
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered successfully");
  });

  it("should not register a user with an existing email", async () => {
    await request(app)
      .post("/api/users/register")
      .send({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        mobileNumber: "1234567890",
        gender: "male",
      });

    const res = await request(app)
      .post("/api/users/register")
      .send({
        name: "Jane Doe",
        email: "john@example.com",
        password: "password123",
        mobileNumber: "0987654321",
        gender: "female",
      });
    expect(res.statusCode).toBe(400);
  });
});