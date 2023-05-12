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
describe("GET/crafts/admin", () => {
    it("shoud return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(URL).get("/crafts/admin");
        expect(response.statusCode).toBe(200);
    }));
    it("should return adminData", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(URL).get("/crafts/admin");
        expect(response.body.data.length >= 1).toBe(true);
    }));
});
describe("POST/admin", () => {
    const adminData = {
        "first_name": "jesttestinganaaaa",
        "user_name": "username",
        "email": "jesttest@yahoo.com",
        "password": "ppppippp"
    };
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(URL).get("/crafts/admin");
        const lastItem = response.body.data[response.body.data.length - 1];
        yield supertest(URL).delete(`/crafts/admin/${lastItem._id}`);
    }));
    it("should add an admin to DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(URL)
            .post("/crafts/admin")
            .send(adminData);
        expect(response.statusCode).toBe(201);
    }));
});
describe("PUT/crafts/admin", () => {
    const adminData = {
        first_name: "Ayoupdate",
        user_name: "Perera",
        email: "ayotest@gmail.com",
        password: "updatepw"
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest(URL).post("/crafts/admin").send(adminData);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(URL).get("/crafts/admin");
        //console.log(response.body.data);
        const lastItem = response.body.data[response.body.data.length - 1];
        //  console.log(lastItem);
        yield supertest(URL).delete(`/crafts/admin/${lastItem._id}`);
    }));
    it("should update item if it exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const newResponse = yield supertest(URL).get("/crafts/admin");
        const lastItem = newResponse.body.data[newResponse.body.data.length - 1];
        const response = yield supertest(URL)
            .put(`/crafts/admin/${lastItem._id}`)
            .send({
            first_name: "Ayomi SS",
        });
        console.log(response.body.error);
        expect(response.statusCode).toBe(200);
    }));
});
describe("DELETE/crafts/admin", () => {
    const adminData = {
        first_name: "Ayoudfss",
        user_name: "Perera",
        email: "ayotest@gmail.com",
        password: "updatepw"
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest(URL).post("/crafts/admin").send(adminData);
    }));
    it("should delete one item", () => __awaiter(void 0, void 0, void 0, function* () {
        let newResponse = yield supertest(URL).get("/crafts/admin");
        const lastItem = newResponse.body.data[newResponse.body.data.length - 1];
        console.log('xxxx', lastItem._id);
        const response = yield supertest(URL).delete(`/crafts/admin/${lastItem._id}`);
        expect(response.statusCode).toBe(200);
    }));
});
