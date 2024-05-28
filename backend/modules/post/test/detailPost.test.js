const request = require("supertest");
const app = require("index");
const model = require("models");
const {
  setup,
  cleanupPost,
  cleanupAll,
  setCreatedPostId,
} = require("modules/post/test/post.setUp");

const stringUtils = require("utils/stringUtils");

const getPostDetails = async (data) => {
  const { language, postId } = data;
  return await request(app).get(`/posts/${postId}`).query({
    language: language,
  });
};

describe("get detail post", () => {
  let createdPostId;
  let newPostData;
  let user;
  let category;
  beforeAll(async () => {
    const setupData = await setup();
    newPostData = setupData.newPostData;
    user = setupData.user;
    category = setupData.category;
  });

  afterAll(async () => {
    await cleanupAll();
  });

  afterEach(async () => {
    await cleanupPost();
  });

  beforeEach(async () => {
    const post = await model.Post.create({
      category_id: category.id,
      user_id: user.id,
      related_id: 0,
      title: newPostData.title,
      content: newPostData.content,
      locale: newPostData.language,
      slug: stringUtils.slugify(newPostData.title),
      created_at: new Date(),
      updated_at: new Date(),
    });
    createdPostId = post.id;
  });

  test("should get detail post successfully", async () => {
    const res = await getPostDetails({
      postId: createdPostId,
      language: newPostData.language,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      success: true,
      data: {
        id: expect.any(Number),
        related_id: 0,
        locale: newPostData.language,
        title: newPostData.title,
        slug: "learn-about-nodejs-for-begginer",
        content: newPostData.content,
        created_at: expect.any(String),
        updated_at: expect.any(String),
        author: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          created_at: expect.any(String),
          updated_at: expect.any(String),
        },
        category: {
          id: category.id,
          name: category.name,
          created_at: expect.any(String),
          updated_at: expect.any(String),
        },
      },
      status: 200,
      message: "ok",
    });
    setCreatedPostId(createdPostId);
  });

  test("should return 500 if language not found", async () => {
    const res = await getPostDetails({
      postId: createdPostId,
      language: "fr",
    });

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      success: false,
      message: "Language not found",
      status: 500,
    });
    setCreatedPostId(createdPostId);
  });
  test("should return 422 if missing language", async () => {
    const res = await getPostDetails({
      postId: createdPostId,
    });
    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [{ field: "language", message: "Language must be required" }],
      },
    });
    setCreatedPostId(createdPostId);
  });
  test("should return 422 if language locale at least 2 charactors", async () => {
    const res = await getPostDetails({
      postId: createdPostId,
      language: "a",
    });
    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          {
            field: "language",
            message: "Language must be at least 2 characters long",
          },
        ],
      },
    });
    setCreatedPostId(createdPostId);
  });
  test("should return 422 if language locale max 10 charactors", async () => {
    const res = await getPostDetails({
      postId: createdPostId,
      language: "ư4t34resf23fsd",
    });
    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          {
            field: "language",
            message: "Language must be at most 10 characters long",
          },
        ],
      },
    });
    setCreatedPostId(createdPostId);
  });

  test("should return 500 if postId not found", async () => {
    const res = await getPostDetails({
      postId: 9999,
      language: newPostData.language,
    });
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      success: false,
      message: "Post not found",
      status: 500,
    });
    setCreatedPostId(createdPostId);
  });
  test("should return 422 if postId is missing", async () => {
    const res = await getPostDetails({
      language: newPostData.language,
    });
    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [{ field: "postId", message: "PostId must be number" }],
      },
    });
    setCreatedPostId(createdPostId);
  });
  test("should return 422 if postId is not numberic", async () => {
    const res = await getPostDetails({
      postId: "string",
      language: newPostData.language,
    });
    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [{ field: "postId", message: "PostId must be number" }],
      },
    });
    setCreatedPostId(createdPostId);
  });
});
