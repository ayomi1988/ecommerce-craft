import console from "console";
import supertest from "supertest";

const URL = "http://localhost:8070";

describe("GET/crafts/order", () => {
  it("shoud return 200", async () => {
    const response = await supertest(URL).get("/crafts/orders");
    expect(response.statusCode).toBe(200);
  });
  it("should return orders", async () => {
    const response = await supertest(URL).get("/crafts/orders");
    expect(response.body.data.length >= 1).toBe(true);
  });
});

describe("POST/orders", () => {
  const orderData = {
    "order_number": "11111",
    "first_name": "firs name",
    "price": "30",
    "product_name": "craft item name",
    "quantity": "30",
    "total": "600",
    "email": "ayo@hjkg23kkk.com"
  };
  afterAll(async () => {
    const response:any = await supertest(URL).get("/crafts/orders");
    const lastItem = response.body.data[response.body.data.length - 1];
    await supertest(URL).delete(`/crafts/orders/${lastItem._id}`);
  });
  it("should add an order to DB", async () => {
    const response = await supertest(URL)
      .post("/crafts/orders")
      .send(orderData);
    expect(response.statusCode).toBe(201);
  });
});

describe("PUT/crafts/orders", () => {
  const orderData = {
    order_number: "222222",
    first_name: "jest orde",
    price: "30",
    product_name: "craft item name",
    quantity: "30",
    total: "600",
    email: "ayo@hjkg23kkk.com"
  };
  beforeAll(async () => {
    await supertest(URL).post("/crafts/orders").send(orderData);
  });
  afterAll(async () => {
    const response:any = await supertest(URL).get("/crafts/orders");
   //console.log(response.body.data);
    const lastItem = response.body.data[response.body.data.length - 1];
  //  console.log(lastItem);
    await supertest(URL).delete(`/crafts/orders/${lastItem._id}`);
  });
  it("should update item if it exists", async () => {
    const newResponse:any = await supertest(URL).get("/crafts/orders");
    const lastItem = newResponse.body.data[newResponse.body.data.length - 1];
    const response = await supertest(URL)
      .put(`/crafts/orders/${lastItem._id}`)
      .send({
        first_name: "jest updaet SS", 
      });
      console.log(response.body.error);
    expect(response.statusCode).toBe(200);
  });
});

describe("DELETE/crafts/orders", () => {
  const orderData = {    
    order_number: "222222",
    first_name: "jest orde",
    price: "30",
    product_name: "craft item name",
    quantity: "30",
    total: "600",
    email: "ayo@hjkg23kkk.com"
  };
  beforeAll(async () => {
    await supertest(URL).post("/crafts/orders").send(orderData);
  });
  it("should delete one item", async () => {
    let newResponse:any = await supertest(URL).get("/crafts/orders");
    const lastItem = newResponse.body.data[newResponse.body.data.length - 1];
   console.log('xxxx', lastItem._id);
    const response:any = await supertest(URL).delete(`/crafts/orders/${lastItem._id}`);
    expect(response.statusCode).toBe(200);
  });
});