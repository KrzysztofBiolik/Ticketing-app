import request from "supertest";
import { app } from "../../app";

it("returns a 201 on succesful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "password",
    })
    .expect(201);
});

it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "testgmail.com",
      password: "password",
    })
    .expect(400);
});

it("dissallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "dug@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "dug@test.com",
      password: "password",
    })
    .expect(400);
});

it("set a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "password",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
