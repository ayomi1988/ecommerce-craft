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
describe("GET/crafts/order", () => {
    it("shoud return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(URL).get("/crafts/orders");
        expect(response.statusCode).toBe(200);
    }));
    it("should return orders", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(URL).get("/crafts/orders");
        expect(response.body.data.length >= 1).toBe(true);
    }));
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
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(URL).get("/crafts/orders");
        const lastItem = response.body.data[response.body.data.length - 1];
        yield supertest(URL).delete(`/crafts/orders/${lastItem._id}`);
    }));
    it("should add an order to DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(URL)
            .post("/crafts/orders")
            .send(orderData);
        expect(response.statusCode).toBe(201);
    }));
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
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest(URL).post("/crafts/orders").send(orderData);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(URL).get("/crafts/orders");
        //console.log(response.body.data);
        const lastItem = response.body.data[response.body.data.length - 1];
        //  console.log(lastItem);
        yield supertest(URL).delete(`/crafts/orders/${lastItem._id}`);
    }));
    it("should update item if it exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const newResponse = yield supertest(URL).get("/crafts/orders");
        const lastItem = newResponse.body.data[newResponse.body.data.length - 1];
        const response = yield supertest(URL)
            .put(`/crafts/orders/${lastItem._id}`)
            .send({
            first_name: "jest updaet SS",
        });
        console.log(response.body.error);
        expect(response.statusCode).toBe(200);
    }));
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
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest(URL).post("/crafts/orders").send(orderData);
    }));
    it("should delete one item", () => __awaiter(void 0, void 0, void 0, function* () {
        let newResponse = yield supertest(URL).get("/crafts/orders");
        const lastItem = newResponse.body.data[newResponse.body.data.length - 1];
        console.log('xxxx', lastItem._id);
        const response = yield supertest(URL).delete(`/crafts/orders/${lastItem._id}`);
        expect(response.statusCode).toBe(200);
    }));
});
