var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as jwt from 'jsonwebtoken';
import { Admins } from '../model/admin.model';
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header('Authorization');
        if (!token) {
            throw new Error('Authorization header missing');
        }
        const decode = jwt.verify(token, "secretcode");
        const user_name = yield Admins.findOne({ _id: decode._id, "tokens.token": token });
        if (!user_name) {
            throw new Error('Please Authenticate');
        }
        req.token = token;
        req.user_name = user_name;
        next();
    }
    catch (error) {
        res.status(401).send({ message: error.message });
        console.log(error.message);
    }
});
export default auth;
