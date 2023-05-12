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
describe("GET/crafts/products", () => {
    it("shoud return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(URL).get("/crafts/products");
        expect(response.statusCode).toBe(200);
    }));
    it("should return product", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(URL).get("/crafts/products");
        expect(response.body.data.length >= 1).toBe(true);
    }));
});
describe("POST/crafts/products", () => {
    const customerData = {
        "product_name": "jesttestinganaaaa",
        "price": "1000",
        "quantity": "jesttest@yahoo.com",
        "description": "ppppippp"
    };
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(URL).get("/crafts/products");
        const lastItem = response.body.data[response.body.data.length - 1];
        yield supertest(URL).delete(`/crafts/products/${lastItem._id}`);
    }));
    it("should add an product to DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(URL)
            .post("/crafts/products")
            .send(customerData);
        expect(response.statusCode).toBe(201);
    }));
});
describe("PUT/crafts/products", () => {
    const customerData = {
        product_name: "Ayoupdate",
        price: "200",
        quantity: "ayotest@gmail.com",
        description: "updatepw"
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest(URL).post("/crafts/products").send(customerData);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(URL).get("/crafts/products");
        //console.log(response.body.data);
        const lastItem = response.body.data[response.body.data.length - 1];
        //  console.log(lastItem);
        yield supertest(URL).delete(`/crafts/products/${lastItem._id}`);
    }));
    it("should update item if it exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const newResponse = yield supertest(URL).get("/crafts/products");
        const lastItem = newResponse.body.data[newResponse.body.data.length - 1];
        const response = yield supertest(URL)
            .put(`/crafts/products/${lastItem._id}`)
            .send({
            product_name: "Ayomi SS",
        });
        console.log(response.body.error);
        expect(response.statusCode).toBe(200);
    }));
});
describe("DELETE/crafts/products", () => {
    const customerData = {
        product_name: "Ayoupdate",
        price: "200",
        quantity: "ayotest@gmail.com",
        description: "updatepw"
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest(URL).post("/crafts/products").send(customerData);
    }));
    it("should delete one item", () => __awaiter(void 0, void 0, void 0, function* () {
        let newResponse = yield supertest(URL).get("/crafts/products");
        const lastItem = newResponse.body.data[newResponse.body.data.length - 1];
        console.log('xxxx', lastItem._id);
        const response = yield supertest(URL).delete(`/crafts/products/${lastItem._id}`);
        expect(response.statusCode).toBe(200);
    }));
});
