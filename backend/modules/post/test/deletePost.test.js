const request = require("supertest");
const app = require("index");
const model = require("models");
const {
  setup,
  cleanupPost,
  cleanupAll,
  setCreatedPostId,
} = require("modules/post/test/post.setUp");

const deletePost = async (data) => {
  const { postId, access_token } = data;
  return await request(app)
    .delete(`/posts/delete/${postId}`)
    .set("Authorization", `Bearer ${access_token}`);
};

describe("delete a post", () => {
  let access_token;
  let newPostData;
  let createdPostId;

  beforeAll(async () => {
    const setupData = await setup();
    newPostData = setupData.newPostData;
    user = setupData.user;
    category = setupData.category;
    access_token = setupData.access_token;
  });

  afterEach(async () => {
    await cleanupPost();
  });

  afterAll(async () => {
    await cleanupAll();
  });
  beforeEach(async () => {
    const post = await model.Post.create({
      title: "Learn about nodejs for begginer",
      content: "This is content of post learn about nodejs for begginer.",
      user_id: newPostData.userId,
      category_id: newPostData.categoryId,
      related_id: 0,
      slug: "learn-about-nodejs-for-begginer",
      locale: newPostData.language,
      created_at: new Date(),
      updated_at: new Date(),
    });
    createdPostId = post.id;
  });

  test("should delete a post successfully", async () => {
    const res = await deletePost({
      postId: createdPostId,
      access_token: access_token,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      success: true,
      status: 200,
      data: "Post deleted successfully",
      message: "ok",
    });
  });

  test("should return 500 if postId not found", async () => {
    const res = await deletePost({
      postId: 9999,
      access_token: access_token,
    });
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      success: false,
      message: "Post not found or has been deleted",
      status: 500,
    });
    setCreatedPostId(createdPostId);
  });

  test("should return 422 if postId is missing", async () => {
    const res = await deletePost({
      access_token: access_token,
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
  test("should return 422 if postId is not numberics", async () => {
    const res = await deletePost({
      postId: "string",
      access_token: access_token,
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
