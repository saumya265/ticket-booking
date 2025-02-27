const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const Ticket = require("../models/Ticket");

describe("Admin API", () => {
  let adminToken;

  beforeAll(async () => {
    // Create an admin user and get a token
    const admin = new User({
      name: "Admin",
      email: "admin@example.com",
      password: "password123",
      mobileNumber: "1234567890",
      gender: "male",
      role: "admin",
    });
    await admin.save();

    const res = await request(app)
      .post("/api/users/login")
      .send({ email: "admin@example.com", password: "password123" });
    adminToken = res.body.token;
  });

  it("should get all users", async () => {
    const res = await request(app)
      .get("/api/admin/users")
      .set("Authorization", 'Bearer ${adminToken}');
    expect(res.statusCode).toBe(200);
  });
});