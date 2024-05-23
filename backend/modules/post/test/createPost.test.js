const request = require("supertest");
const app = require("index");

describe("Post Controller - Create new post", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  //OK
  test("return 200 if successful created new post", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJvd25lciIsImlhdCI6MTcxNjQzNzEwNSwiZXhwIjoxNzE2NDQwNzA1fQ.HB3y7vdPQyRWz0pjIVyCBGqs-w65D5qXSqMgCgGsPoA";
    const res = await request(app)
      .post("/posts/create")
      .query({ language: "vi", relatedId: 2, categoryId: 1 })
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Học về NodeJs cho người mới bắt đầu 2024",
        content: "Nội dung về học NodeJS cho người mới bắt đầu",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      success: true,
      data: {
        data: {
          id: expect.any(Number),
          user_id: 3,
          category_id: "1",
          related_id: "2",
          locale: "vi",
          title: "Học về NodeJs cho người mới bắt đầu 2024",
          slug: expect.any(String),
          content: "Nội dung về học NodeJS cho người mới bắt đầu",
          created_at: expect.any(String),
          updated_at: expect.any(String),
        },
      },
      status: 200,
      message: "ok",
    });
  });
  test("return 500 if token is missing", async () => {
    const res = await request(app)
      .post("/posts/create")
      .query({ language: "vi", relatedId: 2, categoryId: 1 })
      .send({
        title: "Học về NodeJs cho người mới bắt đầu 2024",
        content: "Nội dung về học NodeJS cho người mới bắt đầu",
      });

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      success: false,
      status: 500,
      message: "Access is required",
    });
  });

  test("return 401 if token is expired or invalid", async () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9w65D5qXSqMgCgGsPoA";
    const res = await request(app)
      .post("/posts/create")
      .query({ language: "vi", relatedId: 2, categoryId: 1 })
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Học về NodeJs cho người mới bắt đầu 2024",
        content: "Nội dung về học NodeJS cho người mới bắt đầu",
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({
      success: false,
      status: 401,
      message: "Unauthorized",
    });
  });

  test("return 500 if category not found", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJvd25lciIsImlhdCI6MTcxNjQzNzEwNSwiZXhwIjoxNzE2NDQwNzA1fQ.HB3y7vdPQyRWz0pjIVyCBGqs-w65D5qXSqMgCgGsPoA";
    const res = await request(app)
      .post("/posts/create")
      .query({ language: "vi", relatedId: 2, categoryId: 1 })
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Học về NodeJs cho người mới bắt đầu 2024",
        content: "Nội dung về học NodeJS cho người mới bắt đầu",
      });

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      success: false,
      status: 500,
      message: "Category not found",
    });
  });

  test("return 422 if category is empty", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJvd25lciIsImlhdCI6MTcxNjQzNzEwNSwiZXhwIjoxNzE2NDQwNzA1fQ.HB3y7vdPQyRWz0pjIVyCBGqs-w65D5qXSqMgCgGsPoA";
    const res = await request(app)
      .post("/posts/create")
      .query({ language: "vi", relatedId: 2, categoryId: "" })
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Học về NodeJs cho người mới bắt đầu 2024",
        content: "Nội dung về học NodeJS cho người mới bắt đầu",
      });

    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          { field: "categoryId", message: "CategoryId must be required" },
        ],
      },
    });
  });
});
