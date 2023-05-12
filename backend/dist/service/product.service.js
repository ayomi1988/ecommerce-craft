var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Products } from "../model/product.model";
import { log } from "../logs/logger";
/**
 * Delete itesm from DB by id
 * @param string id
 */
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProduct = yield Products.deleteOne({ _id: id });
        if (deletedProduct.deletedCount == 0) {
            throw new Error("Could not find");
        }
    }
    catch (e) {
        log.info(e);
    }
});
/**
 * Return all items from DB
 * @returns
 */
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("xxx");
        return yield Products.find();
    }
    catch (e) {
        log.info(e);
    }
});
/**
 * Get item from DB by ID
 * @param string id
 * @returns
 */
const getProductByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const singleProduct = yield Products.findById(id).exec();
        if (!singleProduct) {
            throw Error;
        }
        const { _id, product_name, price, quantity, description, } = singleProduct;
        return {
            id: _id,
            product_name: product_name,
            price: price,
            quantity: quantity,
            description: description,
        };
    }
    catch (e) {
        log.info(e);
    }
});
/**
 * Create item in DB
 * @param object value
 * @returns
 */
const createProduct = (value) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_name, price, quantity, description, } = value;
    try {
        const newProduct = new Products({
            product_name: product_name,
            price: price,
            quantity: quantity,
            description: description,
        });
        return yield newProduct.save();
    }
    catch (e) {
        log.info(e);
    }
});
/**
 * Update a entry in DB by ID
 * @param string value
 * @param id
 */
const updateProductData = (value, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_name, price, quantity, description, } = value;
    try {
        Products.findByIdAndUpdate(id, {
            product_name: product_name,
            price: price,
            quantity: quantity,
            description: description,
        }, function (err, docs) {
            if (err) {
                throw err;
            }
            else {
                console.log("Updated User : ", docs);
            }
        });
    }
    catch (e) {
        log.info(e);
    }
});
export { deleteProduct, getAllProducts, getProductByID, createProduct, updateProductData, };
