import console from "console";
import supertest from "supertest";

const URL = "http://localhost:8070";

describe("GET/crafts/admin", () => {
  it("shoud return 200", async () => {
    const response = await supertest(URL).get("/crafts/admin");
    expect(response.statusCode).toBe(200);
  });
  it("should return adminData", async () => {
    const response = await supertest(URL).get("/crafts/admin");
    expect(response.body.data.length >= 1).toBe(true);
  });
});

describe("POST/admin", () => {
  const adminData = {
    "first_name": "jesttestinganaaaa",
    "user_name": "username",
    "email": "jesttest@yahoo.com",
    "password": "ppppippp"
  };
  afterAll(async () => {
    const response:any = await supertest(URL).get("/crafts/admin");
    const lastItem = response.body.data[response.body.data.length - 1];
    await supertest(URL).delete(`/crafts/admin/${lastItem._id}`);
  });
  it("should add an admin to DB", async () => {
    const response = await supertest(URL)
      .post("/crafts/admin")
      .send(adminData);
    expect(response.statusCode).toBe(201);
  });
});

describe("PUT/crafts/admin", () => {
  const adminData = {
    first_name: "Ayoupdate",
    user_name: "Perera",
    email: "ayotest@gmail.com",
    password: "updatepw"
  };
  beforeAll(async () => {
    await supertest(URL).post("/crafts/admin").send(adminData);
  });
  afterAll(async () => {
    const response:any = await supertest(URL).get("/crafts/admin");
  
    const lastItem = response.body.data[response.body.data.length - 1];
 
    await supertest(URL).delete(`/crafts/admin/${lastItem._id}`);
  });
  it("should update item if it exists", async () => {
    const newResponse:any = await supertest(URL).get("/crafts/admin");
    const lastItem = newResponse.body.data[newResponse.body.data.length - 1];
    const response = await supertest(URL)
      .put(`/crafts/admin/${lastItem._id}`)
      .send({
        first_name: "Ayomi SS", 
      });
      console.log(response.body.error);
    expect(response.statusCode).toBe(200);
  });
});

describe("DELETE/crafts/admin", () => {
  const adminData = {    
    first_name: "Ayoudfss",
    user_name: "Perera",
    email: "ayotest@gmail.com",
    password: "updatepw"
  };
  beforeAll(async () => {
    await supertest(URL).post("/crafts/admin").send(adminData);
  });
  it("should delete one item", async () => {
    let newResponse:any = await supertest(URL).get("/crafts/admin");
    const lastItem = newResponse.body.data[newResponse.body.data.length - 1];
   console.log('xxxx', lastItem._id);
    const response:any = await supertest(URL).delete(`/crafts/admin/${lastItem._id}`);
    expect(response.statusCode).toBe(200);
  });
});