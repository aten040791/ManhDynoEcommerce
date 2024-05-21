const request = require("supertest");
const express = require("express");
const authController = require("modules/auth/controllers/authController");
const authService = require("modules/auth/services/authService");
const responseUtils = require("utils/responseUtils");
const { validate } = require("kernels/validations/index");
const registerRequest = require("modules/auth/requests/registerRequest");

const app = express();
app.use(express.json());

app.post("/auth/sign-up", validate([registerRequest]), authController.signUp);

describe("Auth Controller - Sign Up", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // OK
  // it("should return 200 if successful signup", async () => {
  //   const res = await request(app).post("/auth/sign-up").send({
  //     email: "test@gmail.com",
  //     password: "password123",
  //     confirmPassword: "password123",
  //     username: "testuser",
  //   });

  //   expect(res.statusCode).toBe(200);
  //   expect(res.body).toEqual({
  //     success: true,
  //     data: {
  //       user: {
  //         email: res.body.data.user.email,
  //         username: res.body.data.user.username,
  //         role: res.body.data.user.role,
  //         created_at: res.body.data.user.created_at,
  //         updated_at: res.body.data.user.updated_at,
  //       },
  //       access_token: res.body.data.access_token,
  //     },
  //     status: 200,
  //     message: "ok",
  //   });
  // });

  // Kiểm thử validate cho email, username và password

  //Email empty
  it("should return 422 if email is empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "",
      password: "password123",
      confirmPassword: "password123",
      username: "qwerty",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: { errors: [{ field: "email", message: "Email must be required" }] },
    });
  });

  //Email invalid
  it("should return 422 if email is invalid", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "invalid-email",
      password: "password123",
      confirmPassword: "password123",
      username: "qwerty",
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

  //Email already taken
  it("should return 422 if email is already taken", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "test@gmail.com",
      password: "password123",
      confirmPassword: "password123",
      username: "qwerty",
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

  //Username empty
  it("should return 422 if username is empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "test@example.com",
      password: "password123",
      confirmPassword: "password123",
      username: "",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [{ field: "username", message: "Username must be required" }],
      },
    });
  });

  //Username already exists
  it("should return 422 if username is already taken", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "test@example.com",
      password: "password123",
      confirmPassword: "password123",
      username: "testuser",
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

  //Password too short
  it("should return 422 if password is too short", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "new@gmail.com",
      password: "short",
      confirmPassword: "short",
      username: "qwerty",
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

  //ConfirmPassword empty
  it("should return 422 if confirmPassword is empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "test@example.com",
      password: "password123",
      confirmPassword: "",
      username: "qwerty",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          {
            field: "confirmPassword",
            message: "ConfirmPassword must be required",
          },
        ],
      },
    });
  });

  //ConfirmPassword do not match
  it("should return 422 if passwords do not match", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "new@gmail.com",
      password: "password123",
      confirmPassword: "differentpassword",
      username: "qwerty",
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
  // Test case when both email and username are empty
  it("should return 422 if email and username are empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "",
      password: "password123",
      confirmPassword: "password123",
      username: "",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be required" },
          { field: "username", message: "Username must be required" },
        ],
      },
    });
  });

  // Test case when both email is empty and username must be unique
  it("should return 422 if email is empty and username is already taken", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "",
      password: "password123",
      confirmPassword: "password123",
      username: "testuser", // assuming 'testuser' is already taken
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be required" },
          { field: "username", message: "Username must be unique" },
        ],
      },
    });
  });

  // Test case when email is invalid and username is empty
  it("should return 422 if email is invalid and username is empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "invalid-email",
      password: "password123",
      confirmPassword: "password123",
      username: "",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email is not in correct format" },
          { field: "username", message: "Username must be required" },
        ],
      },
    });
  });
  // Test case when email is invalid and username must be unique
  it("should return 422 if email is invalid and username is already taken", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "invalid-email",
      password: "password123",
      confirmPassword: "password123",
      username: "testuser", // assuming 'testuser' is already taken
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email is not in correct format" },
          { field: "username", message: "Username must be unique" },
        ],
      },
    });
  });

  // Test case when email must be unique and username is not empty
  it("should return 422 if email is already taken and username is emtpy", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "test@gmail.com", // assuming 'test@gmail.com' is already taken
      password: "password123",
      confirmPassword: "password123",
      username: "",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be unique" },
          { field: "username", message: "Username must be required" },
        ],
      },
    });
  });

  // Test case when both email and username must be unique
  it("should return 422 if email is already taken and username is already taken", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "test@gmail.com", // assuming 'test@gmail.com' is already taken
      password: "password123",
      confirmPassword: "password123",
      username: "testuser", // assuming 'testuser' is already taken
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be unique" },
          { field: "username", message: "Username must be unique" },
        ],
      },
    });
  });
  // Test case when email is empty and password is too short
  it("should return 422 if email is empty and password is too short", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "",
      password: "short",
      confirmPassword: "short",
      username: "validusername",
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
  // Test case when email must be unique and password is too short
  it("should return 422 if email is already taken and password is too short", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "test@gmail.com", // assuming 'test@gmail.com' is already taken
      password: "short",
      confirmPassword: "short",
      username: "validusername",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be unique" },
          {
            field: "password",
            message: "Password must be at least 8 characters long",
          },
        ],
      },
    });
  });
  // Test case when both email and confirmPassword are empty
  it("should return 422 if email is empty and confirmPassword is empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "",
      password: "password123",
      confirmPassword: "",
      username: "validusername",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be required" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword must be required",
          },
        ],
      },
    });
  });

  // Test case when email is empty and confirmPassword does not match password
  it("should return 422 if email is empty and confirmPassword does not match password", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "",
      password: "password123",
      confirmPassword: "differentpassword",
      username: "validusername",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be required" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword and password do not match",
          },
        ],
      },
    });
  });

  // Test case when email is invalid and confirmPassword is empty
  it("should return 422 if email is invalid and confirmPassword is empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "invalid-email",
      password: "password123",
      confirmPassword: "",
      username: "validusername",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email is not in correct format" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword must be required",
          },
        ],
      },
    });
  });

  // Test case when email is invalid and confirmPassword does not match password
  it("should return 422 if email is invalid and confirmPassword does not match password", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "invalid-email",
      password: "password123",
      confirmPassword: "differentpassword",
      username: "validusername",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email is not in correct format" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword and password do not match",
          },
        ],
      },
    });
  });
  // Test case when both password and confirmPassword are empty
  it("should return 422 if password is empty and confirmPassword is empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "valid@example.com",
      password: "",
      confirmPassword: "",
      username: "validusername",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "password", message: "Password must be required" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword must be required",
          },
        ],
      },
    });
  });

  // Test case when password is empty and confirmPassword does not match password
  it("should return 422 if password is empty and confirmPassword does not match password", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "valid@example.com",
      password: "",
      confirmPassword: "differentpassword",
      username: "validusername",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "password", message: "Password must be required" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword and password do not match",
          },
        ],
      },
    });
  });

  // Test case when password is too short and confirmPassword is empty
  it("should return 422 if password is too short and confirmPassword is empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "valid@example.com",
      password: "short",
      confirmPassword: "",
      username: "validusername",
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
          {
            field: "confirmPassword",
            message: "ConfirmPassword must be required",
          },
        ],
      },
    });
  });

  // Test case when password is too short and confirmPassword does not match password
  it("should return 422 if password is too short and confirmPassword does not match password", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "valid@example.com",
      password: "short",
      confirmPassword: "differentpassword",
      username: "validusername",
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
          {
            field: "confirmPassword",
            message: "ConfirmPassword and password do not match",
          },
        ],
      },
    });
  });
  // Test case when email is empty, username is empty, and password is too short
  it("should return 422 if email is empty, username is empty, and password is too short", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "",
      password: "short",
      confirmPassword: "short",
      username: "",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be required" },
          { field: "username", message: "Username must be required" },
          {
            field: "password",
            message: "Password must be at least 8 characters long",
          },
        ],
      },
    });
  });
  // Test case when email is empty, username is already taken, and password is too short
  it("should return 422 if email is empty, username is already taken, and password is too short", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "",
      password: "short",
      confirmPassword: "short",
      username: "testuser", // assuming 'testuser' is already taken
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be required" },
          { field: "username", message: "Username must be unique" },
          {
            field: "password",
            message: "Password must be at least 8 characters long",
          },
        ],
      },
    });
  });

  // Test case when email is invalid, username is empty, and password is too short
  it("should return 422 if email is invalid, username is empty, and password is too short", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "invalid-email",
      password: "short",
      confirmPassword: "short",
      username: "",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email is not in correct format" },
          { field: "username", message: "Username must be required" },
          {
            field: "password",
            message: "Password must be at least 8 characters long",
          },
        ],
      },
    });
  });

  // Test case when email is invalid, username is already taken, and password is too short
  it("should return 422 if email is invalid, username is already taken, and password is too short", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "invalid-email",
      password: "short",
      confirmPassword: "short",
      username: "testuser", // assuming 'testuser' is already taken
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email is not in correct format" },
          { field: "username", message: "Username must be unique" },
          {
            field: "password",
            message: "Password must be at least 8 characters long",
          },
        ],
      },
    });
  });

  // Test case when email is already taken, username is empty, and password is too short
  it("should return 422 if email is already taken, username is empty, and password is too short", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "test@gmail.com", // assuming 'test@gmail.com' is already taken
      password: "short",
      confirmPassword: "short",
      username: "",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be unique" },
          { field: "username", message: "Username must be required" },
          {
            field: "password",
            message: "Password must be at least 8 characters long",
          },
        ],
      },
    });
  });

  // Test case when email is already taken, username is already taken, and password is too short
  it("should return 422 if email is already taken, username is already taken, and password is too short", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "test@gmail.com", // assuming 'test@gmail.com' is already taken
      password: "short",
      confirmPassword: "short",
      username: "testuser", // assuming 'testuser' is already taken
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be unique" },
          { field: "username", message: "Username must be unique" },
          {
            field: "password",
            message: "Password must be at least 8 characters long",
          },
        ],
      },
    });
  });

  // Test case when email, username, and confirmPassword are all empty
  it("should return 422 if email is empty, username is empty, and confirmPassword is empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "",
      password: "password123",
      confirmPassword: "",
      username: "",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be required" },
          { field: "username", message: "Username must be required" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword must be required",
          },
        ],
      },
    });
  });

  // Test case when email and username are empty and confirmPassword does not match password
  it("should return 422 if email is empty, username is empty, and confirmPassword does not match password", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "",
      password: "password123",
      confirmPassword: "differentpassword",
      username: "",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be required" },
          { field: "username", message: "Username must be required" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword and password do not match",
          },
        ],
      },
    });
  });

  // Test case when email is empty, username must be unique, and confirmPassword is empty
  it("should return 422 if email is empty, username is already taken, and confirmPassword is empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "",
      password: "password123",
      confirmPassword: "",
      username: "testuser", // assuming 'testuser' is already taken
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be required" },
          { field: "username", message: "Username must be unique" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword must be required",
          },
        ],
      },
    });
  });

  // Test case when email is empty, username must be unique, and confirmPassword does not match password
  it("should return 422 if email is empty, username is already taken, and confirmPassword does not match password", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "",
      password: "password123",
      confirmPassword: "differentpassword",
      username: "testuser", // assuming 'testuser' is already taken
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be required" },
          { field: "username", message: "Username must be unique" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword and password do not match",
          },
        ],
      },
    });
  });

  // Test case when email is invalid, username is empty, and confirmPassword is empty
  it("should return 422 if email is invalid, username is empty, and confirmPassword is empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "invalid-email",
      password: "password123",
      confirmPassword: "",
      username: "",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email is not in correct format" },
          { field: "username", message: "Username must be required" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword must be required",
          },
        ],
      },
    });
  });

  // Test case when email is invalid, username is empty, and confirmPassword does not match password
  it("should return 422 if email is invalid, username is empty, and confirmPassword does not match password", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "invalid-email",
      password: "password123",
      confirmPassword: "differentpassword",
      username: "",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email is not in correct format" },
          { field: "username", message: "Username must be required" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword and password do not match",
          },
        ],
      },
    });
  });

  // Test case when email is invalid, username must be unique, and confirmPassword is empty
  it("should return 422 if email is invalid, username is already taken, and confirmPassword is empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "invalid-email",
      password: "password123",
      confirmPassword: "",
      username: "testuser", // assuming 'testuser' is already taken
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email is not in correct format" },
          { field: "username", message: "Username must be unique" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword must be required",
          },
        ],
      },
    });
  });

  // Test case when email is invalid, username must be unique, and confirmPassword does not match password
  it("should return 422 if email is invalid, username is already taken, and confirmPassword does not match password", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "invalid-email",
      password: "password123",
      confirmPassword: "differentpassword",
      username: "testuser", // assuming 'testuser' is already taken
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email is not in correct format" },
          { field: "username", message: "Username must be unique" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword and password do not match",
          },
        ],
      },
    });
  });

  // Test case when email is already taken, username is empty, and confirmPassword is empty
  it("should return 422 if email is already taken, username is empty, and confirmPassword is empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "test@gmail.com", // assuming 'test@gmail.com' is already taken
      password: "password123",
      confirmPassword: "",
      username: "",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be unique" },
          { field: "username", message: "Username must be required" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword must be required",
          },
        ],
      },
    });
  });

  // Test case when email is already taken, username is empty, and confirmPassword does not match password
  it("should return 422 if email is already taken, username is empty, and confirmPassword does not match password", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "test@gmail.com", // assuming 'test@gmail.com' is already taken
      password: "password123",
      confirmPassword: "differentpassword",
      username: "",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be unique" },
          { field: "username", message: "Username must be required" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword and password do not match",
          },
        ],
      },
    });
  });

  // Test case when email is already taken, username is already taken, and confirmPassword is empty
  it("should return 422 if email is already taken, username is already taken, and confirmPassword is empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "test@gmail.com", // assuming 'test@gmail.com' is already taken
      password: "password123",
      confirmPassword: "",
      username: "testuser", // assuming 'testuser' is already taken
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be unique" },
          { field: "username", message: "Username must be unique" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword must be required",
          },
        ],
      },
    });
  });

  // Test case when email is already taken, username is already taken, and confirmPassword does not match password
  it("should return 422 if email is already taken, username is already taken, and confirmPassword does not match password", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "test@gmail.com", // assuming 'test@gmail.com' is already taken
      password: "password123",
      confirmPassword: "differentpassword",
      username: "testuser", // assuming 'testuser' is already taken
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be unique" },
          { field: "username", message: "Username must be unique" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword and password do not match",
          },
        ],
      },
    });
  });

  // Test case when username, password, and confirmPassword are all empty
  it("should return 422 if username, password, and confirmPassword are all empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "valid@example.com",
      password: "",
      confirmPassword: "",
      username: "",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "username", message: "Username must be required" },
          { field: "password", message: "Password must be required" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword must be required",
          },
        ],
      },
    });
  });

  // Test case when username is empty, password is not empty, and confirmPassword does not match
  it("should return 422 if username is empty, password is not empty, and confirmPassword does not match", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "valid@example.com",
      password: "password123",
      confirmPassword: "differentpassword",
      username: "",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "username", message: "Username must be required" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword and password do not match",
          },
        ],
      },
    });
  });

  // Test case when username is not empty, password is too short, and confirmPassword is empty
  it("should return 422 if username is not empty, password is too short, and confirmPassword is empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "valid@example.com",
      password: "short",
      confirmPassword: "",
      username: "validusername",
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
          {
            field: "confirmPassword",
            message: "ConfirmPassword must be required",
          },
        ],
      },
    });
  });

  // Test case when username is not empty, password is too short, and confirmPassword does not match
  it("should return 422 if username is not empty, password is too short, and confirmPassword does not match", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "valid@example.com",
      password: "short",
      confirmPassword: "differentpassword",
      username: "validusername",
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
          {
            field: "confirmPassword",
            message: "ConfirmPassword and password do not match",
          },
        ],
      },
    });
  });

  // Test case when username is already taken, password is not empty, and confirmPassword is empty
  it("should return 422 if username is already taken, password is not empty, and confirmPassword is empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "valid@example.com",
      password: "password123",
      confirmPassword: "",
      username: "testuser", // assuming 'testuser' is already taken
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "username", message: "Username must be unique" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword must be required",
          },
        ],
      },
    });
  });

  // Test case when username is already taken, password is not empty, and confirmPassword does not match
  it("should return 422 if username is already taken, password is not empty, and confirmPassword does not match", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "valid@example.com",
      password: "password123",
      confirmPassword: "differentpassword",
      username: "testuser", // assuming 'testuser' is already taken
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "username", message: "Username must be unique" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword and password do not match",
          },
        ],
      },
    });
  });

  // Test case when username is already taken, password is too short, and confirmPassword is empty
  it("should return 422 if username is already taken, password is too short, and confirmPassword is empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "valid@example.com",
      password: "short",
      confirmPassword: "",
      username: "testuser", // assuming 'testuser' is already taken
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "username", message: "Username must be unique" },
          {
            field: "password",
            message: "Password must be at least 8 characters long",
          },
          {
            field: "confirmPassword",
            message: "ConfirmPassword must be required",
          },
        ],
      },
    });
  });

  // Test case when username is already taken, password is too short, and confirmPassword does not match
  it("should return 422 if username is already taken, password is too short, and confirmPassword does not match", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "valid@example.com",
      password: "short",
      confirmPassword: "differentpassword",
      username: "testuser", // assuming 'testuser' is already taken
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "username", message: "Username must be unique" },
          {
            field: "password",
            message: "Password must be at least 8 characters long",
          },
          {
            field: "confirmPassword",
            message: "ConfirmPassword and password do not match",
          },
        ],
      },
    });
  });

  // Test case when email, username, password, and confirmPassword are all empty
  it("should return 422 if email, username, password, and confirmPassword are all empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be required" },
          { field: "username", message: "Username must be required" },
          { field: "password", message: "Password must be required" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword must be required",
          },
        ],
      },
    });
  });

  // Test case when email, username, and password are all empty, and confirmPassword does not match password
  it("should return 422 if email is empty, username is empty, password is empty, and confirmPassword does not match password", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "",
      password: "",
      confirmPassword: "differentpassword",
      username: "",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be required" },
          { field: "username", message: "Username must be required" },
          { field: "password", message: "Password must be required" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword and password do not match",
          },
        ],
      },
    });
  });

  // Test case when email and username are empty, password is too short, and confirmPassword is empty
  it("should return 422 if email is empty, username is empty, password is too short, and confirmPassword is empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "",
      password: "short",
      confirmPassword: "",
      username: "",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be required" },
          { field: "username", message: "Username must be required" },
          {
            field: "password",
            message: "Password must be at least 8 characters long",
          },
          {
            field: "confirmPassword",
            message: "ConfirmPassword must be required",
          },
        ],
      },
    });
  });

  // Test case when email and username are empty, password is too short, and confirmPassword does not match password
  it("should return 422 if email is empty, username is empty, password is too short, and confirmPassword does not match password", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "",
      password: "short",
      confirmPassword: "differentpassword",
      username: "",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be required" },
          { field: "username", message: "Username must be required" },
          {
            field: "password",
            message: "Password must be at least 8 characters long",
          },
          {
            field: "confirmPassword",
            message: "ConfirmPassword and password do not match",
          },
        ],
      },
    });
  });
  // Test case when email is empty, username must be unique, password is empty, and confirmPassword is empty
  it("should return 422 if email is empty, username is already taken, password is empty, and confirmPassword is empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "",
      password: "",
      confirmPassword: "",
      username: "testuser", // assuming 'testuser' is already taken
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be required" },
          { field: "username", message: "Username must be unique" },
          { field: "password", message: "Password must be required" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword must be required",
          },
        ],
      },
    });
  });

  // Test case when email is empty, username must be unique, password is empty, and confirmPassword does not match
  it("should return 422 if email is empty, username is already taken, password is empty, and confirmPassword does not match", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "",
      password: "",
      confirmPassword: "differentpassword",
      username: "testuser", // assuming 'testuser' is already taken
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be required" },
          { field: "username", message: "Username must be unique" },
          { field: "password", message: "Password must be required" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword and password do not match",
          },
        ],
      },
    });
  });

  // Test case when email is empty, username must be unique, password is too short, and confirmPassword is empty
  it("should return 422 if email is empty, username is already taken, password is too short, and confirmPassword is empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "",
      password: "short",
      confirmPassword: "",
      username: "testuser", // assuming 'testuser' is already taken
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be required" },
          { field: "username", message: "Username must be unique" },
          {
            field: "password",
            message: "Password must be at least 8 characters long",
          },
          {
            field: "confirmPassword",
            message: "ConfirmPassword must be required",
          },
        ],
      },
    });
  });

  // Test case when email is empty, username must be unique, password is too short, and confirmPassword does not match
  it("should return 422 if email is empty, username is already taken, password is too short, and confirmPassword does not match", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "",
      password: "short",
      confirmPassword: "differentpassword",
      username: "testuser", // assuming 'testuser' is already taken
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be required" },
          { field: "username", message: "Username must be unique" },
          {
            field: "password",
            message: "Password must be at least 8 characters long",
          },
          {
            field: "confirmPassword",
            message: "ConfirmPassword and password do not match",
          },
        ],
      },
    });
  });

  // Test case when email is invalid, username is empty, password is empty, and confirmPassword is empty
  it("should return 422 if email is invalid, username is empty, password is empty, and confirmPassword is empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "invalid-email",
      password: "",
      confirmPassword: "",
      username: "",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email is not in correct format" },
          { field: "username", message: "Username must be required" },
          { field: "password", message: "Password must be required" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword must be required",
          },
        ],
      },
    });
  });

  // Test case when email is invalid, username is empty, password is empty, and confirmPassword does not match
  it("should return 422 if email is invalid, username is empty, password is empty, and confirmPassword does not match", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "invalid-email",
      password: "",
      confirmPassword: "differentpassword",
      username: "",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email is not in correct format" },
          { field: "username", message: "Username must be required" },
          { field: "password", message: "Password must be required" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword and password do not match",
          },
        ],
      },
    });
  });

  // Test case when email is invalid, username is empty, password is too short, and confirmPassword is empty
  it("should return 422 if email is invalid, username is empty, password is too short, and confirmPassword is empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "invalid-email",
      password: "short",
      confirmPassword: "",
      username: "",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email is not in correct format" },
          { field: "username", message: "Username must be required" },
          {
            field: "password",
            message: "Password must be at least 8 characters long",
          },
          {
            field: "confirmPassword",
            message: "ConfirmPassword must be required",
          },
        ],
      },
    });
  });

  // Test case when email is invalid, username is empty, password is too short, and confirmPassword does not match
  it("should return 422 if email is invalid, username is empty, password is too short, and confirmPassword does not match", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "invalid-email",
      password: "short",
      confirmPassword: "differentpassword",
      username: "",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email is not in correct format" },
          { field: "username", message: "Username must be required" },
          {
            field: "password",
            message: "Password must be at least 8 characters long",
          },
          {
            field: "confirmPassword",
            message: "ConfirmPassword and password do not match",
          },
        ],
      },
    });
  });

  // Test case when email is invalid, username must be unique, password is empty, and confirmPassword is empty
  it("should return 422 if email is invalid, username is already taken, password is empty, and confirmPassword is empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "invalid-email",
      password: "",
      confirmPassword: "",
      username: "testuser", // assuming 'testuser' is already taken
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email is not in correct format" },
          { field: "username", message: "Username must be unique" },
          { field: "password", message: "Password must be required" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword must be required",
          },
        ],
      },
    });
  });

  // Test case when email is invalid, username must be unique, password is empty, and confirmPassword does not match
  it("should return 422 if email is invalid, username is already taken, password is empty, and confirmPassword does not match", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "invalid-email",
      password: "",
      confirmPassword: "differentpassword",
      username: "testuser", // assuming 'testuser' is already taken
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email is not in correct format" },
          { field: "username", message: "Username must be unique" },
          { field: "password", message: "Password must be required" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword and password do not match",
          },
        ],
      },
    });
  });

  // Test case when email is invalid, username must be unique, password is too short, and confirmPassword is empty
  it("should return 422 if email is invalid, username is already taken, password is too short, and confirmPassword is empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "invalid-email",
      password: "short",
      confirmPassword: "",
      username: "testuser", // assuming 'testuser' is already taken
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email is not in correct format" },
          { field: "username", message: "Username must be unique" },
          {
            field: "password",
            message: "Password must be at least 8 characters long",
          },
          {
            field: "confirmPassword",
            message: "ConfirmPassword must be required",
          },
        ],
      },
    });
  });

  // Test case when email is invalid, username must be unique, password is too short, and confirmPassword does not match
  it("should return 422 if email is invalid, username is already taken, password is too short, and confirmPassword does not match", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "invalid-email",
      password: "short",
      confirmPassword: "differentpassword",
      username: "testuser", // assuming 'testuser' is already taken
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email is not in correct format" },
          { field: "username", message: "Username must be unique" },
          {
            field: "password",
            message: "Password must be at least 8 characters long",
          },
          {
            field: "confirmPassword",
            message: "ConfirmPassword and password do not match",
          },
        ],
      },
    });
  });

  // Test case when email is already taken, username is empty, password is empty, and confirmPassword is empty
  it("should return 422 if email is already taken, username is empty, password is empty, and confirmPassword is empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "test@gmail.com", // assuming 'test@gmail.com' is already taken
      password: "",
      confirmPassword: "",
      username: "",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be unique" },
          { field: "username", message: "Username must be required" },
          { field: "password", message: "Password must be required" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword must be required",
          },
        ],
      },
    });
  });

  // Test case when email is already taken, username is empty, password is empty, and confirmPassword does not match
  it("should return 422 if email is already taken, username is empty, password is empty, and confirmPassword does not match", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "test@gmail.com", // assuming 'test@gmail.com' is already taken
      password: "",
      confirmPassword: "differentpassword",
      username: "",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be unique" },
          { field: "username", message: "Username must be required" },
          { field: "password", message: "Password must be required" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword and password do not match",
          },
        ],
      },
    });
  });

  // Test case when email is already taken, username is empty, password is too short, and confirmPassword is empty
  it("should return 422 if email is already taken, username is empty, password is too short, and confirmPassword is empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "test@gmail.com", // assuming 'test@gmail.com' is already taken
      password: "short",
      confirmPassword: "",
      username: "",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be unique" },
          { field: "username", message: "Username must be required" },
          {
            field: "password",
            message: "Password must be at least 8 characters long",
          },
          {
            field: "confirmPassword",
            message: "ConfirmPassword must be required",
          },
        ],
      },
    });
  });

  // Test case when email is already taken, username is empty, password is too short, and confirmPassword does not match
  it("should return 422 if email is already taken, username is empty, password is too short, and confirmPassword does not match", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "test@gmail.com", // assuming 'test@gmail.com' is already taken
      password: "short",
      confirmPassword: "differentpassword",
      username: "",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be unique" },
          { field: "username", message: "Username must be required" },
          {
            field: "password",
            message: "Password must be at least 8 characters long",
          },
          {
            field: "confirmPassword",
            message: "ConfirmPassword and password do not match",
          },
        ],
      },
    });
  });

  // Test case when email is already taken, username is already taken, password is empty, and confirmPassword is empty
  it("should return 422 if email is already taken, username is already taken, password is empty, and confirmPassword is empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "test@gmail.com", // assuming 'test@gmail.com' is already taken
      password: "",
      confirmPassword: "",
      username: "testuser", // assuming 'testuser' is already taken
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be unique" },
          { field: "username", message: "Username must be unique" },
          { field: "password", message: "Password must be required" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword must be required",
          },
        ],
      },
    });
  });

  // Test case when email is already taken, username is already taken, password is empty, and confirmPassword does not match
  it("should return 422 if email is already taken, username is already taken, password is empty, and confirmPassword does not match", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "test@gmail.com", // assuming 'test@gmail.com' is already taken
      password: "",
      confirmPassword: "differentpassword",
      username: "testuser", // assuming 'testuser' is already taken
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be unique" },
          { field: "username", message: "Username must be unique" },
          { field: "password", message: "Password must be required" },
          {
            field: "confirmPassword",
            message: "ConfirmPassword and password do not match",
          },
        ],
      },
    });
  });

  // Test case when email is already taken, username is already taken, password is too short, and confirmPassword is empty
  it("should return 422 if email is already taken, username is already taken, password is too short, and confirmPassword is empty", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "test@gmail.com", // assuming 'test@gmail.com' is already taken
      password: "short",
      confirmPassword: "",
      username: "testuser", // assuming 'testuser' is already taken
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be unique" },
          { field: "username", message: "Username must be unique" },
          {
            field: "password",
            message: "Password must be at least 8 characters long",
          },
          {
            field: "confirmPassword",
            message: "ConfirmPassword must be required",
          },
        ],
      },
    });
  });

  // Test case when email is already taken, username is already taken, password is too short, and confirmPassword does not match
  it("should return 422 if email is already taken, username is already taken, password is too short, and confirmPassword does not match", async () => {
    const res = await request(app).post("/auth/sign-up").send({
      email: "test@gmail.com", // assuming 'test@gmail.com' is already taken
      password: "short",
      confirmPassword: "differentpassword",
      username: "testuser", // assuming 'testuser' is already taken
    });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "email", message: "Email must be unique" },
          { field: "username", message: "Username must be unique" },
          {
            field: "password",
            message: "Password must be at least 8 characters long",
          },
          {
            field: "confirmPassword",
            message: "ConfirmPassword and password do not match",
          },
        ],
      },
    });
  });
});
