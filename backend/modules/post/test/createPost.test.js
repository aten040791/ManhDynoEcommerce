const request = require("supertest");
const app = require("index");
const { setup, cleanupPost, cleanupAll, setCreatedPostId } = require("modules/post/test/post.setUp");

const createPost = async (data, access_token) => {
  const { language, relatedId, categoryId, title, content } = data;
  return await request(app)
    .post("/posts/create")
    .query({
      language: language,
      relatedId: relatedId,
      categoryId: categoryId,
    })
    .set("Authorization", `Bearer ${access_token}`)
    .send({
      title: title,
      content: content,
    });
};

const buildExpectedBody = (expectedStatus, field, message) => {
  const expectedBody = {
    success: false,
    status: expectedStatus,
  };

  if (expectedStatus === 500) {
    expectedBody.message = message;
  }

  if (expectedStatus === 422) {
    expectedBody.data = {
      errors: [{ field, message }],
    };
  }

  return expectedBody;
};

const testErrorResponse = async (testData, access_token, expectedStatus, field, message) => {
  const res = await createPost(testData, access_token);
  expect(res.statusCode).toBe(expectedStatus);
  const expectedBody = buildExpectedBody(expectedStatus, field, message);
  expect(res.body).toEqual(expectedBody);
};

describe("Create a new post", () => {
  let access_token;
  let newPostData;

  beforeAll(async () => {
    const setupData = await setup();
    access_token = setupData.access_token;
    newPostData = setupData.newPostData;
  });

  afterEach(async () => {
    await cleanupPost();
  });

  afterAll(async () => {
    await cleanupAll();
  });

  test("should create a new post successfully", async () => {
    const res = await createPost(newPostData, access_token);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      success: true,
      data: {
        id: expect.any(Number),
        user_id: newPostData.userId,
        category_id: String(newPostData.categoryId),
        related_id: String(newPostData.relatedId),
        locale: newPostData.language,
        title: newPostData.title,
        slug: "learn-about-nodejs-for-begginer",
        content: newPostData.content,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      },
      status: 200,
      message: "ok",
    });
    setCreatedPostId(res.body.data.id);
  });

  //Error Handling Category
  test("should return 500 if categoryId not found", async () => {
    const testData = { ...newPostData, categoryId: 9999 };
    testErrorResponse(testData, access_token, 500, "categoryId", "Category not found");
  });

  test("should return 422 if missing categoryId", async () => {
    const testData = { ...newPostData, categoryId: "" };
    testErrorResponse(testData, access_token, 422, "categoryId", "CategoryId must be required");
  });

  test("should return 422 if categoryId is not numberic", async () => {
    const testData = { ...newPostData, categoryId: "string" };
    testErrorResponse(testData, access_token, 422, "categoryId", "CategoryId must be number");
  });

  //Error Handling Language locale
  test("should return 500 if language not found", async () => {
    const testData = { ...newPostData, language: "fr" };
    testErrorResponse(testData, access_token, 500, "language", "Language not found");
  });
  test("should return 422 if missing language", async () => {
    const testData = { ...newPostData, language: "" };
    testErrorResponse(testData, access_token, 422, "language", "Language must be required");
  });
  test("should return 422 if language at least 2 charactors", async () => {
    const testData = { ...newPostData, language: "a" };
    testErrorResponse(testData, access_token, 422, "language", "Language must be at least 2 characters long");
  });
  test("should return 422 if language max 10 charactors", async () => {
    const testData = { ...newPostData, language: "stringgreaterthan10" };
    testErrorResponse(testData, access_token, 422, "language", "Language must be at most 10 characters long");
  });

  //Error Handling Title
  test("should return 422 if missing title", async () => {
    const testData = { ...newPostData, title: "" };
    testErrorResponse(testData, access_token, 422, "title", "Title must be required");
  });
  test("should return 422 if title at least 10 charactors", async () => {
    const testData = { ...newPostData, title: "aqfca" };
    testErrorResponse(testData, access_token, 422, "title", "Title must be at least 10 characters long");
  });
  test("should return 422 if title max 100 charactors", async () => {
    const testData = {
      ...newPostData,
      title: "stringgreaterthan132erfdsafaq23ewfdsccasdfc32rewfdcxrewdsvc23efdsdarqewdsetrefdsr34tregfdcvxfdarewqfsda",
    };
    testErrorResponse(testData, access_token, 422, "title", "Title must be at most 100 characters long");
  });
  test("should return 422 if title is not a unique value", async () => {
    const testData = newPostData;
    const oldPost = await createPost(testData, access_token);
    const res = await createPost(testData, access_token);
    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [{ field: "title", message: "Title must be unique" }],
      },
    });
    setCreatedPostId(oldPost.body.data.id);
  });

  //Error Handling Content
  test("should return 422 if missing content", async () => {
    const testData = { ...newPostData, content: "" };
    testErrorResponse(testData, access_token, 422, "content", "Content must be required");
  });

  //Error Handling RelatedId
  test("should return 422 if missing relatedId", async () => {
    const testData = { ...newPostData, relatedId: "" };
    testErrorResponse(testData, access_token, 422, "relatedId", "RelatedId must be required");
  });
  test("should return 422 if relatedId is not numberic", async () => {
    const testData = { ...newPostData, relatedId: "string" };
    testErrorResponse(testData, access_token, 422, "relatedId", "RelatedId must be number");
  });
});
