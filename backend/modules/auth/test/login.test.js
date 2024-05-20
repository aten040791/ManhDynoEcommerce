const request = require("supertest");
const express = require("express");
const authController = require("modules/auth/controllers/authController");
const authService = require("modules/auth/services/authService");
const responseUtils = require("utils/responseUtils");
const { validate } = require("kernels/validations/index");
const loginRequest = require("modules/auth/requests/loginRequest");

jest.mock("modules/auth/services/authService");

const app = express();
app.use(express.json());

app.post("/auth/sign-in", validate([loginRequest]), authController.signIn);

describe("Auth Controller - Sign In", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("return 200 if successful login", async () => {
    const mockUser = {
      email: "test@gmail.com",
      username: "testuser",
      role: "user",
      created_at: new Date(),
      updated_at: new Date(),
    };

    authService.signIn.mockResolvedValue({
      user: mockUser,
      access_token: "mocked_token",
    });

    const res = await request(app)
      .post("/auth/sign-in")
      .send({ email: "test@gmail.com", password: "password123" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      success: true,
      data: {
        user: {
          email: mockUser.email,
          username: mockUser.username,
          role: mockUser.role,
          created_at: mockUser.created_at.toISOString(),
          updated_at: mockUser.updated_at.toISOString(),
        },
        access_token: "mocked_token",
      },
      status: 200,
      message: "ok",
    });
    expect(authService.signIn).toHaveBeenCalledWith({
      email: "test@gmail.com",
      password: "password123",
    });
  });

  it("return 500 if email not found", async () => {
    authService.signIn.mockResolvedValue({ error: "Email not found" });

    const res = await request(app).post("/auth/sign-in").send({
      email: "abcd@gmail.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      success: false,
      status: 500,
      message: "Email not found",
    });
    expect(authService.signIn).toHaveBeenCalledWith({
      email: "abcd@gmail.com",
      password: "password123",
    });
  });

  it("return 500 if password is incorrect", async () => {
    authService.signIn.mockResolvedValue({ error: "Invalid credentials" });

    const res = await request(app)
      .post("/auth/sign-in")
      .send({ email: "abcd@gmail.com", password: "abcd1234" });

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      success: false,
      status: 500,
      message: "Invalid credentials",
    });
    expect(authService.signIn).toHaveBeenCalledWith({
      email: "abcd@gmail.com",
      password: "abcd1234",
    });
  });

  // Kiểm thử validate cho email và password
  it("return 422 if email is empty", async () => {
    const res = await request(app)
      .post("/auth/sign-in")
      .send({ email: "", password: "password123" });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: { errors: [{ field: "email", message: "Email must be required" }] },
    });
  });

  it("return 422 if email is invalid", async () => {
    const res = await request(app)
      .post("/auth/sign-in")
      .send({ email: "invalid-email", password: "password123" });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [{ field: "email", message: "Email is not in correct format" }],
      },
    });
  });

  it("return 422 if password is empty", async () => {
    const res = await request(app)
      .post("/auth/sign-in")
      .send({ email: "vccorp@gmail.com", password: "" });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [{ field: "password", message: "Password must be required" }],
      },
    });
  });

  it("return 422 if password is too short", async () => {
    const res = await request(app)
      .post("/auth/sign-in")
      .send({ email: "vccorp@gmail.com", password: "short" });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          {
            field: "password",
            message: "Password must be at least 8 characters long",
          },
        ],
      },
    });
  });
});
