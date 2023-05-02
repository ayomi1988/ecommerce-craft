import console from "console";
import supertest from "supertest";

const URL = "http://localhost:8070";

describe("GET/crafts/customers", () => {
  it("shoud return 200", async () => {
    const response = await supertest(URL).get("/crafts/customers");
    expect(response.statusCode).toBe(200);
  });
  it("should return employe", async () => {
    const response = await supertest(URL).get("/crafts/customers");
    expect(response.body.data.length >= 1).toBe(true);
  });
});

describe("POST/crafts/customers", () => {
  const customerData = {
    "first_name": "jesttestinganaaaa",
    "user_name": "Fernand1o",
    "email": "jesttest@yahoo.com",
    "password": "ppppippp"
  };
  afterAll(async () => {
    const response:any = await supertest(URL).get("/crafts/customers");
    const lastItem = response.body.data[response.body.data.length - 1];
    await supertest(URL).delete(`/crafts/customers/${lastItem._id}`);
  });
  it("should add an employe to DB", async () => {
    const response = await supertest(URL)
      .post("/crafts/customers")
      .send(customerData);
    expect(response.statusCode).toBe(201);
  });
});

describe("PUT/crafts/customers", () => {
  const customerData = {
    first_name: "Ayoupdate",
    user_name: "Perera",
    email: "ayotest@gmail.com",
    password: "updatepw"
  };
  beforeAll(async () => {
    await supertest(URL).post("/crafts/customers").send(customerData);
  });
  afterAll(async () => {
    const response:any = await supertest(URL).get("/crafts/customers");
   //console.log(response.body.data);
    const lastItem = response.body.data[response.body.data.length - 1];
  //  console.log(lastItem);
    await supertest(URL).delete(`/crafts/customers/${lastItem._id}`);
  });
  it("should update item if it exists", async () => {
    const newResponse:any = await supertest(URL).get("/crafts/customers");
    const lastItem = newResponse.body.data[newResponse.body.data.length - 1];
    const response = await supertest(URL)
      .put(`/crafts/customers/${lastItem._id}`)
      .send({
        first_name: "Ayomi SS", 
      });
      console.log(response.body.error);
    expect(response.statusCode).toBe(200);
  });
});

describe("DELETE/crafts/customers", () => {
  const customerData = {    
    first_name: "Ayomiii",
    user_name: "Perera",
    email: "ayotest@gmail.com",
    password: "3454344",
  };
  beforeAll(async () => {
    await supertest(URL).post("/crafts/customers").send(customerData);
  });
  it("should delete one item", async () => {
    let newResponse:any = await supertest(URL).get("/crafts/customers");
    const lastItem = newResponse.body.data[newResponse.body.data.length - 1];
   console.log('xxxx', lastItem._id);
    const response:any = await supertest(URL).delete(`/crafts/customers/${lastItem._id}`);
    expect(response.statusCode).toBe(200);
  });
});