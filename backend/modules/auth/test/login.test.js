const request = require("supertest");
const express = require("express");
const authController = require("modules/auth/controllers/authController");
const authService = require("modules/auth/services/authService");
const responseUtils = require("utils/responseUtils");
const { validate } = require("kernels/validations/index");
const loginRequest = require("modules/auth/requests/loginRequest");

// jest.mock("modules/auth/services/authService");

const app = express();
app.use(express.json());

app.post("/auth/sign-in", validate([loginRequest]), authController.signIn);

describe("Auth Controller - Sign In", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  //OK
  it("return 200 if successful login", async () => {
    const res = await request(app)
      .post("/auth/sign-in")
      .send({ email: "nguyenky@gmail.com", password: "1234abcd" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      success: true,
      data: {
        user: {
          email: res.body.data.user.email,
          username: res.body.data.user.username,
          role: res.body.data.user.role,
          created_at: res.body.data.user.created_at,
          updated_at: res.body.data.user.updated_at,
        },
        access_token: res.body.data.access_token,
      },
      status: 200,
      message: "ok",
    });
  });

  //Email not found
  it("return 500 if email not found", async () => {
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
  });

  //Password is incorrect
  it("return 500 if password is incorrect", async () => {
    const res = await request(app)
      .post("/auth/sign-in")
      .send({ email: "binbaibb@gmail.com", password: "qwertyuio" });

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      success: false,
      status: 500,
      message: "Invalid credentials",
    });
  });

  // Kiểm thử validate cho email và password

  //Email is empty
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

  //Email is invalid
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

  //Password is empty
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

  //Password is too short
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

  //Email and password empty
  it("should return 422 if Email and password are empty", async () => {
    const res = await request(app).post("/auth/sign-in").send({
      email: "",
      password: "",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be required" },
          {
            field: "password",
            message: "Password must be required",
          },
        ],
      },
    });
  });

  //Email empty and pass short
  it("should return 422 if Email is empty password is too short", async () => {
    const res = await request(app).post("/auth/sign-in").send({
      email: "",
      password: "short",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be required" },
          {
            field: "password",
            message: "Password must be at least 8 characters long",
          },
        ],
      },
    });
  });

  //Email not correct and pass empty
  it("should return 422 if Email is empty password is too short", async () => {
    const res = await request(app).post("/auth/sign-in").send({
      email: "abcd",
      password: "",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email is not in correct format" },
          {
            field: "password",
            message: "Password must be required",
          },
        ],
      },
    });
  });

  //Email not correct and pass short
  it("should return 422 if Email is not correct form password is too short", async () => {
    const res = await request(app).post("/auth/sign-in").send({
      email: "abcd",
      password: "abcd",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email is not in correct format" },
          {
            field: "password",
            message: "Password must be at least 8 characters long",
          },
        ],
      },
    });
  });
});
