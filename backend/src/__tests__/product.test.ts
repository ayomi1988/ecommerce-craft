import console from "console";
import supertest from "supertest";

const URL = "http://localhost:8070";

describe("GET/crafts/products", () => {
  it("shoud return 200", async () => {
    const response = await supertest(URL).get("/crafts/products");
    expect(response.statusCode).toBe(200);
  });
  it("should return product", async () => {
    const response = await supertest(URL).get("/crafts/products");
    expect(response.body.data.length >= 1).toBe(true);
  });
});

describe("POST/crafts/products", () => {
  const customerData = {
    "product_name": "jesttestinganaaaa",
    "price": "1000",
    "quantity": "jesttest@yahoo.com",
    "description": "ppppippp"
  };
  afterAll(async () => {
    const response:any = await supertest(URL).get("/crafts/products");
    const lastItem = response.body.data[response.body.data.length - 1];
    await supertest(URL).delete(`/crafts/products/${lastItem._id}`);
  });
  it("should add an product to DB", async () => {
    const response = await supertest(URL)
      .post("/crafts/products")
      .send(customerData);
    expect(response.statusCode).toBe(201);
  });
});

describe("PUT/crafts/products", () => {
  const customerData = {
    product_name: "Ayoupdate",
    price: "200",
    quantity: "ayotest@gmail.com",
    description: "updatepw"
  };
  beforeAll(async () => {
    await supertest(URL).post("/crafts/products").send(customerData);
  });
  afterAll(async () => {
    const response:any = await supertest(URL).get("/crafts/products");
  
    const lastItem = response.body.data[response.body.data.length - 1];
  
    await supertest(URL).delete(`/crafts/products/${lastItem._id}`);
  });
  it("should update item if it exists", async () => {
    const newResponse:any = await supertest(URL).get("/crafts/products");
    const lastItem = newResponse.body.data[newResponse.body.data.length - 1];
    const response = await supertest(URL)
      .put(`/crafts/products/${lastItem._id}`)
      .send({
        product_name: "Ayomi SS", 
      });
      console.log(response.body.error);
    expect(response.statusCode).toBe(200);
  });
});

describe("DELETE/crafts/products", () => {
  const customerData = {    
    product_name: "Ayoupdate",
    price: "200",
    quantity: "ayotest@gmail.com",
    description: "updatepw"
  };
  beforeAll(async () => {
    await supertest(URL).post("/crafts/products").send(customerData);
  });
  it("should delete one item", async () => {
    let newResponse:any = await supertest(URL).get("/crafts/products");
    const lastItem = newResponse.body.data[newResponse.body.data.length - 1];
   console.log('xxxx', lastItem._id);
    const response:any = await supertest(URL).delete(`/crafts/products/${lastItem._id}`);
    expect(response.statusCode).toBe(200);
  });
});