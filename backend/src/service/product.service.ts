import { Products } from "../model/product.model";
import { log } from "../logs/logger";
import { Product } from "../interface/interface";

/**
 * Delete itesm from DB by id
 * @param string id
 */
const deleteProduct = async (id: string) => {
  try {
    const deletedProduct = await Products.deleteOne({ _id: id });
    if (deletedProduct.deletedCount == 0) {
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
const getAllProducts = async () => {
  try {
    console.log("xxx");
    return await Products.find();
  } catch (e) {
    log.info(e);
  }
};

/**
 * Get item from DB by ID
 * @param string id
 * @returns
 */
const getProductByID = async (id: string) => {
  try {
    const singleProduct = await Products.findById(id).exec();
    if (!singleProduct) {
      throw Error;
    }
    const { _id, product_name, price, quantity, description, } =
      singleProduct;
    return {
      id: _id,
      product_name: product_name,
      price: price,
      quantity: quantity,
      description: description,
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
const createProduct = async (value: Product) => {
  const { product_name, price, quantity, description, } = value;

  try {
    const newProduct = new Products({
      product_name: product_name,
      price: price,
      quantity: quantity,
      description: description,
    });

    return await newProduct.save();
  } catch (e) {
    log.info(e);
  }
};

/**
 * Update a entry in DB by ID
 * @param string value
 * @param id
 */
const updateProductData = async (value: Product, id: string) => {
  const { product_name, price, quantity, description, } = value;
  try {

    Products.findByIdAndUpdate(
      id,
      {
        product_name: product_name,
        price: price,
        quantity: quantity,
        description: description,
      },
      function (err, docs) {
        if (err) {
          throw err;
        } else {
          console.log("Updated User : ", docs);
        }
      }
    );







  } catch (e) {
    log.info(e);
  }
};

export {
  deleteProduct,
  getAllProducts,
  getProductByID,
  createProduct,
  updateProductData,
};
