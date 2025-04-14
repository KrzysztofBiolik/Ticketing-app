import request from "supertest";
import { app } from "../../app";

it("fails when an email that does not exist is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "my@gmail.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "my@gmail.com",
      password: "kokokokokok",
    })
    .expect(400);
});

it("set a cookie after successful signup", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "my@gmail.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "my@gmail.com",
      password: "password",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
