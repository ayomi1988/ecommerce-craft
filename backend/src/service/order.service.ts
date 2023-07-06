import { Orders } from "../model/order.model";
import { log } from "../logs/logger";
import { Order } from "../interface/interface";

/**
 * Delete itesm from DB by id
 * @param string id
 */
const deleteOrder = async (id: string) => {
  try {
    const deletedOrder = await Orders.deleteOne({ _id: id });
    if (deletedOrder.deletedCount == 0) {
      throw new Error("Could not find");
    }
  } catch (e) {
    log.info(e);
  }
};

/**
 * Return all items from DB
 * @returns
 */
const getAllOrders = async () => {
  try {
    //console.log("xxx");
    return await Orders.find();
  } catch (e) {
    log.info(e);
  }
};

/**
 * Get item from DB by ID
 * @param string id
 * @returns
 */
const getOrderByID = async (id: string) => {
  try {
    const singleOrder = await Orders.findById(id).exec();
    if (!singleOrder) {
      throw Error;
    }
    const { _id, order_number, first_name, price, product_name, quantity, total, email, } =
      singleOrder;
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
  } catch (e) {
    log.info(e);
  }
};

/**
 * Create item in DB
 * @param object value
 * @returns
 */
const createOrder = async (value: Order) => {
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

    return await newOrder.save();
  } catch (e) {
    log.info(e);
  }
};

/**
 * Update a entry in DB by ID
 * @param string value
 * @param id
 */
const updateOrderData = async (value: Order, id: string) => {
  const { order_number, first_name, price, product_name, quantity, total, email } = value;
  try {

    Orders.findByIdAndUpdate(
      id,
      {
        order_number: order_number,
        first_name: first_name,
        price: price,
        product_name: product_name,
        quantity: quantity,
        total: total,
        email: email,
      },
      function (err, docs) {
        if (err) {
          throw err;
        } else {
        //  console.log("Updated User : ", docs);
        }
      }
    );







  } catch (e) {
    log.info(e);
  }
};

export {
  deleteOrder,
  getAllOrders,
  getOrderByID,
  createOrder,
  updateOrderData,
};
