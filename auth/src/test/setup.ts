import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";

jest.setTimeout(2000000); // 20 sekund, możesz ustawić nawet więcej

declare global {
  var signin: () => Promise<string[]>;
}

let mongo: any;
beforeAll(async () => {
  console.log("🔧 [setup] Starting in-memory MongoDB...");

  process.env.JWT_KEY = "asdfasdf";

  mongo = await MongoMemoryServer.create({
    binary: {
      version: "6.0.5", // <- stabilna, szybka wersja (~250MB zamiast 600MB)
    },
  });
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});

  console.log("✅ [setup] MongoDB connected");
});

// run before each tests

beforeEach(async () => {
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
  console.log("🧹 [setup] Collections cleared");
});

afterAll(async () => {
  console.log("🛑 [setup] Stopping in-memory MongoDB...");
  await mongoose.disconnect();
  if (mongo) {
    await mongo.stop();
  }
  console.log("✅ [setup] MongoDB stopped and connections closed");
});

global.signin = async () => {
  const email = "test@gmail.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  if (!cookie) {
    throw new Error("Failed to get cookie from response");
  }
  return cookie;
};
