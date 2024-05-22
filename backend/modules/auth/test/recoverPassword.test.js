const request = require("supertest");
const express = require("express");
const authController = require("modules/auth/controllers/authController");
const authService = require("modules/auth/services/authService");
const responseUtils = require("utils/responseUtils");
const { validate } = require("kernels/validations/index");
const recoverPasswordRequest = require("modules/auth/requests/recoverPasswordRequest");

// jest.mock("modules/auth/services/authService");
// jest.mock("utils/responseUtils");

const app = express();
app.use(express.json());

app.post(
  "/auth/recover-password",
  validate([recoverPasswordRequest]),
  authController.recoverPassword
);

describe("Auth Controller - Recover Password", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // OK
  test("should return 200 if email is found and email sent", async () => {
    const res = await request(app)
      .post("/auth/recover-password")
      .send({ email: "binbaibb@gmail.com" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      success: true,
      data: {
        message: "Email sent",
      },
      status: 200,
      message: "ok",
    });
  });

  // Email not found
  test("should return 500 if email not found", async () => {
    const res = await request(app)
      .post("/auth/recover-password")
      .send({ email: "nonexistent@gmail.com" });

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      success: false,
      status: 500,
      message: "Email not found",
    });
  });

  // Kiểm thử validate cho email

  //Email is empty
  test("should return 422 if email is empty", async () => {
    const res = await request(app)
      .post("/auth/recover-password")
      .send({ email: "" });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: { errors: [{ field: "email", message: "Email must be required" }] },
    });
  });

  //Email is invalid
  test("should return 422 if email is invalid", async () => {
    const res = await request(app)
      .post("/auth/recover-password")
      .send({ email: "invalid-email" });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [{ field: "email", message: "Email is not in correct format" }],
      },
    });
  });
});
