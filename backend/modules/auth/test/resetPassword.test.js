const request = require("supertest");

// jest.mock("modules/auth/services/authService");
// jest.mock("utils/responseUtils");


describe("Auth Controller - Reset Password", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // OK
  test("should return 200 if password reset successfully", async () => {
    const res = await request(app).put("/auth/reset-password").send({
      email: "binbaibb@gmail.com",
      password: "1234abcd",
      confirmPassword: "1234abcd",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      success: true,
      data: {
        message: "Reset password successfully",
      },
      status: 200,
      message: "ok",
    });
  });

  //Email not found
  test("should return 500 if email not found", async () => {
    const res = await request(app).put("/auth/reset-password").send({
      email: "nonexistent@gmail.com",
      password: "newpassword123",
      confirmPassword: "newpassword123",
    });

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      success: false,
      status: 500,
      message: "Email not found",
    });
  });

  // Kiểm thử validate cho password và password confirmation

  //Không có confirmPassword
  test("should return 422 if confirmPassword is empty", async () => {
    const res = await request(app).put("/auth/reset-password").send({
      email: "test@gmail.com",
      password: "abcd1234",
      confirmPassword: "",
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

  //   confirmPassword ko match
  test("should return 422 if passwords do not match", async () => {
    const res = await request(app).put("/auth/reset-password").send({
      email: "test@gmail.com",
      password: "newpassword123",
      confirmPassword: "differentpassword",
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

  //không có cả pass và confirmPassword
  test("should return 422 if both password and password confirmation are empty", async () => {
    const res = await request(app)
      .put("/auth/reset-password")
      .send({ email: "test@gmail.com", password: "", confirmPassword: "" });

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

  //không có pass và confirmP không match
  test("should return 422 if password is empty and confirmPassword do not match", async () => {
    const res = await request(app).put("/auth/reset-password").send({
      email: "test@gmail.com",
      password: "",
      confirmPassword: "abcd1234",
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
});
