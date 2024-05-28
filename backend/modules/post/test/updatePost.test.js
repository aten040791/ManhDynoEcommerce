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

const updatePost = async (data, access_token) => {
  const { postId, language, categoryId, title, content } = data;
  return await request(app)
    .put(`/posts/update/${postId}`)
    .query({
      language: language,
      categoryId: categoryId,
    })
    .set("Authorization", `Bearer ${access_token}`)
    .send({
      title: title,
      content: content,
    });
};

describe("update post", () => {
  let createdPostId;
  let newPostData;
  let user;
  let category;
  let access_token;
  beforeAll(async () => {
    const setupData = await setup();
    newPostData = setupData.newPostData;
    user = setupData.user;
    category = setupData.category;
    access_token = setupData.access_token;
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

  test("should get update post successfully", async () => {
    const testData = {
      postId: createdPostId,
      language: newPostData.language,
      categoryId: category.id,
      title: "Learn about nodejs for begginer-Updated",
      content: newPostData.content,
    };
    const res = await updatePost(testData, access_token);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      success: true,
      status: 200,
      data: "Post updated successfully",
      message: "ok",
    });
    setCreatedPostId(createdPostId);
  });

  //Error Handling PostId
  test("should return 500 if postId not found", async () => {
    const testData = {
      postId: 9999,
      language: newPostData.language,
      categoryId: category.id,
      title: "Learn about nodejs for begginer-Updated",
      content: newPostData.content,
    };
    const res = await updatePost(testData, access_token);
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      success: false,
      message: "Post not found",
      status: 500,
    });
    setCreatedPostId(createdPostId);
  });
  test("should return 422 if postId is missing", async () => {
    const testData = {
      language: newPostData.language,
      categoryId: category.id,
      title: "Learn about nodejs for begginer-Updated",
      content: newPostData.content,
    };
    const res = await updatePost(testData, access_token);
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
    const testData = {
      postId: "string",
      language: newPostData.language,
      categoryId: category.id,
      title: "Learn about nodejs for begginer-Updated",
      content: newPostData.content,
    };
    const res = await updatePost(testData, access_token);
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

  //Error Handling Language locale
  test("should return 422 if missing language", async () => {
    const res = await request(app)
      .put(`/posts/update/${createdPostId}`)
      .query({
        categoryId: category.id,
      })
      .set("Authorization", `Bearer ${access_token}`)
      .send({
        title: "Learn about nodejs for begginer-Updated",
        content: newPostData.content,
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
  test("should return 422 if language at least 2 charactors", async () => {
    const testData = {
      postId: createdPostId,
      language: "a",
      categoryId: category.id,
      title: "Learn about nodejs for begginer-Updated",
      content: newPostData.content,
    };
    const res = await updatePost(testData, access_token);
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
  test("should return 422 if language max 10 charactors", async () => {
    const testData = {
      postId: createdPostId,
      language: "a346577uytgfdwdáds",
      categoryId: category.id,
      title: "Learn about nodejs for begginer-Updated",
      content: newPostData.content,
    };
    const res = await updatePost(testData, access_token);
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
  test("should return 500 if language not match with post", async () => {
    const testData = {
      postId: createdPostId,
      language: "fr",
      categoryId: category.id,
      title: "Learn about nodejs for begginer-Updated",
      content: newPostData.content,
    };
    const res = await updatePost(testData, access_token);
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      success: false,
      message: "Language not match with post",
      status: 500,
    });
    setCreatedPostId(createdPostId);
  });

  //Error Handling Category
  test("should return 500 if categoryId not match with post", async () => {
    const testData = {
      postId: createdPostId,
      language: newPostData.language,
      categoryId: 9999,
      title: "Learn about nodejs for begginer-Updated",
      content: newPostData.content,
    };
    const res = await updatePost(testData, access_token);
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      success: false,
      message: "Category not match with post",
      status: 500,
    });
    setCreatedPostId(createdPostId);
  });
  test("should return 422 if missing categoryId", async () => {
    const testData = {
      postId: createdPostId,
      language: newPostData.language,
      title: "Learn about nodejs for begginer-Updated",
      content: newPostData.content,
    };
    const res = await updatePost(testData, access_token);
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
    setCreatedPostId(createdPostId);
  });
  test("should return 422 if categoryId is not numberic", async () => {
    const testData = {
      postId: createdPostId,
      language: newPostData.language,
      categoryId: "string",
      title: "Learn about nodejs for begginer-Updated",
      content: newPostData.content,
    };
    const res = await updatePost(testData, access_token);
    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [{ field: "categoryId", message: "CategoryId must be number" }],
      },
    });
    setCreatedPostId(createdPostId);
  });

  //Error Handling Title
  test("should return 422 if missing title", async () => {
    const testData = {
      postId: createdPostId,
      language: newPostData.language,
      categoryId: category.id,
      content: newPostData.content,
    };
    const res = await updatePost(testData, access_token);
    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [{ field: "title", message: "Title must be required" }],
      },
    });
    setCreatedPostId(createdPostId);
  });
  test("should return 422 if title at least 10 charactors", async () => {
    const testData = {
      postId: createdPostId,
      language: newPostData.language,
      categoryId: category.id,
      title: "acd",
      content: newPostData.content,
    };
    const res = await updatePost(testData, access_token);
    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          {
            field: "title",
            message: "Title must be at least 10 characters long",
          },
        ],
      },
    });
    setCreatedPostId(createdPostId);
  });
  test("should return 422 if title max 100 charactors", async () => {
    const testData = {
      postId: createdPostId,
      language: newPostData.language,
      categoryId: category.id,
      title:
        "stringgreaterthan132erfdsafaq23ewfdsccasdfc32rewfdcxrewdsvc23efdsdarqewdsetrefdsr34tregfdcvxfdarewqfsda",
      content: newPostData.content,
    };

    const res = await updatePost(testData, access_token);
    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [
          {
            field: "title",
            message: "Title must be at most 100 characters long",
          },
        ],
      },
    });
    setCreatedPostId(createdPostId);
  });
  test("should return 422 if title is not a unique value", async () => {
    const testData = {
      postId: createdPostId,
      language: newPostData.language,
      categoryId: category.id,
      title: newPostData.title,
      content: newPostData.content,
    };
    const res = await updatePost(testData, access_token);
    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [{ field: "title", message: "Title must be unique" }],
      },
    });
    setCreatedPostId(createdPostId);
  });

  //Error Handling Content
  test("should return 422 if missing content", async () => {
    const testData = {
      postId: createdPostId,
      language: newPostData.language,
      title: "Learn about nodejs for begginer-Updated",
      categoryId: category.id,
    };
    const res = await updatePost(testData, access_token);
    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({
      success: false,
      status: 422,
      data: {
        errors: [{ field: "content", message: "Content must be required" }],
      },
    });
    setCreatedPostId(createdPostId);
  });
});
