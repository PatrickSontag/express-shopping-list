process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");


let testItem = {name: 'taco', price: 2.50};

beforeEach(() => {
  items.push(testItem);
})

afterEach(() => {
  items.length = 0;
})

describe("GET /items", () => {
  test("Get all items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([testItem]);
  })
})

describe("POST /items", () => {
  test("Create a new item", async () => {
    const res = await request(app)
      .post('/items')
      .send({
        name: "bread"
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      added: { name: "bread" }
    });
  });
});