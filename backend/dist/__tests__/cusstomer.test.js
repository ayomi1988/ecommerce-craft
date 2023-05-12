var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import console from "console";
import supertest from "supertest";
const URL = "http://localhost:8070";
describe("GET/crafts/customers", () => {
    it("shoud return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(URL).get("/crafts/customers");
        expect(response.statusCode).toBe(200);
    }));
    it("should return employe", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(URL).get("/crafts/customers");
        expect(response.body.data.length >= 1).toBe(true);
    }));
});
describe("POST/crafts/customers", () => {
    const customerData = {
        "first_name": "jesttestinganaaaa",
        "user_name": "Fernand1o",
        "email": "jesttest@yahoo.com",
        "password": "ppppippp"
    };
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(URL).get("/crafts/customers");
        const lastItem = response.body.data[response.body.data.length - 1];
        yield supertest(URL).delete(`/crafts/customers/${lastItem._id}`);
    }));
    it("should add an employe to DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(URL)
            .post("/crafts/customers")
            .send(customerData);
        expect(response.statusCode).toBe(201);
    }));
});
describe("PUT/crafts/customers", () => {
    const customerData = {
        first_name: "Ayoupdate",
        user_name: "Perera",
        email: "ayotest@gmail.com",
        password: "updatepw"
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest(URL).post("/crafts/customers").send(customerData);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(URL).get("/crafts/customers");
        //console.log(response.body.data);
        const lastItem = response.body.data[response.body.data.length - 1];
        //  console.log(lastItem);
        yield supertest(URL).delete(`/crafts/customers/${lastItem._id}`);
    }));
    it("should update item if it exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const newResponse = yield supertest(URL).get("/crafts/customers");
        const lastItem = newResponse.body.data[newResponse.body.data.length - 1];
        const response = yield supertest(URL)
            .put(`/crafts/customers/${lastItem._id}`)
            .send({
            first_name: "Ayomi SS",
        });
        console.log(response.body.error);
        expect(response.statusCode).toBe(200);
    }));
});
describe("DELETE/crafts/customers", () => {
    const customerData = {
        first_name: "Ayomiii",
        user_name: "Perera",
        email: "ayotest@gmail.com",
        password: "3454344",
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest(URL).post("/crafts/customers").send(customerData);
    }));
    it("should delete one item", () => __awaiter(void 0, void 0, void 0, function* () {
        let newResponse = yield supertest(URL).get("/crafts/customers");
        const lastItem = newResponse.body.data[newResponse.body.data.length - 1];
        console.log('xxxx', lastItem._id);
        const response = yield supertest(URL).delete(`/crafts/customers/${lastItem._id}`);
        expect(response.statusCode).toBe(200);
    }));
});
