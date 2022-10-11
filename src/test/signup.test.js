import request from "supertest";
import app from "../../index.js";
import user from "../database/models/user.js";

describe("Sign up user", () => {
  it("should sign up a new user", async () => {
    const res = await request(app).post("/api/v1/user/signup").send(user[0]);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("post");
  });
  it("should sign up a user that does  not exist", async () => {
    const res = await request(app)
      .post("/api/v1/user/signup")
      .send({ email: "elonmuskt" });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("post");
  });
});
