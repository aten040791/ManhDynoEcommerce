const request = require("supertest");
const express = require("express");
const authController = require("modules/auth/controllers/authController");
const authService = require("modules/auth/services/authService");
const responseUtils = require("utils/responseUtils");
const { validate } = require("kernels/validations/index");
const registerRequest = require("modules/auth/requests/registerRequest");

jest.mock("modules/auth/services/authService");
jest.mock("utils/responseUtils");

const app = express();
app.use(express.json());

app.post("/auth/sign-up", validate([registerRequest]), authController.signUp);

describe("Auth Controller - Sign Up", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 if successful signup", async () => {
    const mockUser = {
      email: "test@gmail.com",
      username: "testuser",
      role: "user",
      created_at: new Date(),
      updated_at: new Date(),
    };

    authService.signUp.mockResolvedValue({
      user: mockUser,
      access_token: "mocked_token",
    });

    responseUtils.ok.mockImplementation((res, data) =>
      res.status(200).json({
        success: true,
        data,
        status: 200,
        message: "ok",
      })
    );

    const res = await request(app).post("/auth/sign-up").send({
      email: "test@gmail.com",
      password: "password123",
      confirmPassword: "password123",
      username: "testuser",
    });

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
    expect(authService.signUp).toHaveBeenCalledWith({
      email: "test@gmail.com",
      password: "password123",
      username: "testuser",
    });
  });

  it("should return 500 if failed to create user", async () => {
    authService.signUp.mockResolvedValue({ error: "Failed to create user" });

    responseUtils.error.mockImplementation((res, data) =>
      res.status(500).json({
        success: false,
        status: 500,
        message: data,
      })
    );

    const res = await request(app).post("/auth/sign-up").send({
      email: "test@gmail.com",
      password: "password123",
      confirmPassword: "password123",
      username: "testuser",
    });

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      success: false,
      status: 500,
      message: "Failed to create user",
    });
    expect(authService.signUp).toHaveBeenCalledWith({
      email: "test@gmail.com",
      password: "password123",
      username: "testuser",
    });
  });

  // Kiểm thử validate cho email, username và password
  it("should return 422 if email is empty", async () => {
    responseUtils.invalidated.mockImplementation((res, errors) =>
      res.status(422).json({
        success: false,
        status: 422,
        data: errors,
      })
    );

    const res = await request(app).post("/auth/sign-up").send({
      email: "",
      password: "password123",
      confirmPassword: "password123",
      username: "testuser",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: { errors: [{ field: "email", message: "Email must be required" }] },
    });
  });

  it("should return 422 if email is invalid", async () => {
    responseUtils.invalidated.mockImplementation((res, errors) =>
      res.status(422).json({
        success: false,
        status: 422,
        data: errors,
      })
    );

    const res = await request(app).post("/auth/sign-up").send({
      email: "invalid-email",
      password: "password123",
      confirmPassword: "password123",
      username: "testuser",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [{ field: "email", message: "Email is not in correct format" }],
      },
    });
  });

  it("should return 422 if email is already taken", async () => {
    responseUtils.invalidated.mockImplementation((res, errors) =>
      res.status(422).json({
        success: false,
        status: 422,
        data: errors,
      })
    );

    const res = await request(app).post("/auth/sign-up").send({
      email: "existing@example.com",
      password: "password123",
      confirmPassword: "password123",
      username: "testuser",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [{ field: "email", message: "Email must be unique" }],
      },
    });
  });

  it("should return 422 if username is already taken", async () => {
    responseUtils.invalidated.mockImplementation((res, errors) =>
      res.status(422).json({
        success: false,
        status: 422,
        data: errors,
      })
    );

    const res = await request(app).post("/auth/sign-up").send({
      email: "new@example.com",
      password: "password123",
      confirmPassword: "password123",
      username: "existinguser",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [{ field: "username", message: "Username must be unique" }],
      },
    });
  });

  it("should return 422 if password is empty", async () => {
    responseUtils.invalidated.mockImplementation((res, errors) =>
      res.status(422).json({
        success: false,
        status: 422,
        data: errors,
      })
    );

    const res = await request(app).post("/auth/sign-up").send({
      email: "test@gmail.com",
      password: "",
      confirmPassword: "password123",
      username: "testuser",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [{ field: "password", message: "Password must be required" }],
      },
    });
  });

  it("should return 422 if password is too short", async () => {
    responseUtils.invalidated.mockImplementation((res, errors) =>
      res.status(422).json({
        success: false,
        status: 422,
        data: errors,
      })
    );

    const res = await request(app).post("/auth/sign-up").send({
      email: "test@gmail.com",
      password: "short",
      confirmPassword: "short",
      username: "testuser",
    });

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

  it("should return 422 if passwords do not match", async () => {
    responseUtils.invalidated.mockImplementation((res, errors) =>
      res.status(422).json({
        success: false,
        status: 422,
        data: errors,
      })
    );

    const res = await request(app).post("/auth/sign-up").send({
      email: "test@gmail.com",
      password: "password123",
      confirmPassword: "differentpassword",
      username: "testuser",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          {
            field: "confirmPassword",
            message: "ConfirmPassword and password do not match",
          },
        ],
      },
    });
  });
});
