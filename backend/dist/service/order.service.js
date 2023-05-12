var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Orders } from "../model/order.model";
import { log } from "../logs/logger";
/**
 * Delete itesm from DB by id
 * @param string id
 */
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedOrder = yield Orders.deleteOne({ _id: id });
        if (deletedOrder.deletedCount == 0) {
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
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("xxx");
        return yield Orders.find();
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
const getOrderByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const singleOrder = yield Orders.findById(id).exec();
        if (!singleOrder) {
            throw Error;
        }
        const { _id, order_number, first_name, price, product_name, quantity, total, email, } = singleOrder;
        return {
            id: _id,
            order_number: order_number,
            first_name: first_name,
            price: price,
            product_name: product_name,
            quantity: quantity,
            total: total,
            email: email,
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
const createOrder = (value) => __awaiter(void 0, void 0, void 0, function* () {
    const { order_number, first_name, price, product_name, quantity, total, email } = value;
    try {
        const newOrder = new Orders({
            order_number: order_number,
            first_name: first_name,
            price: price,
            product_name: product_name,
            quantity: quantity,
            total: total,
            email: email,
        });
        return yield newOrder.save();
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
const updateOrderData = (value, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { order_number, first_name, price, product_name, quantity, total, email } = value;
    try {
        Orders.findByIdAndUpdate(id, {
            order_number: order_number,
            first_name: first_name,
            price: price,
            product_name: product_name,
            quantity: quantity,
            total: total,
            email: email,
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
export { deleteOrder, getAllOrders, getOrderByID, createOrder, updateOrderData, };
