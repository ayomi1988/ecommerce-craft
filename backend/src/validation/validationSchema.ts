import Joi from "joi";
const itemSchemaValidation = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});


const itemUpdateSchemaValidation = Joi.object({
  _id:Joi.string(),
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string(),
});

const orderSchemaValidation = Joi.object({
  first_name: Joi.string().required(),
  email: Joi.string().email().required(),
  order_number : Joi.string(),
  price:  Joi.string(),
  product_name:  Joi.string(),
  quantity:  Joi.string().required(),
  total: Joi.string(),
});

const orderUpdateSchemaValidation = Joi.object({
  _id:Joi.string(),
  first_name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  order_number : Joi.string().optional(),
  price:  Joi.string().optional(),
  product_name:  Joi.string().optional(),
  quantity:  Joi.string().optional(),
  total: Joi.string().optional(),
});


const productSchemaValidation = Joi.object({
  product_name : Joi.string(),
  price:  Joi.string(),
  quantity:  Joi.string(),
  description: Joi.string(),
});

const productUpdateSchemaValidation = Joi.object({
  _id:Joi.string(),
  product_name : Joi.string().optional(),
  price:  Joi.string(),
  quantity:  Joi.string(),
  description: Joi.string(),
});


const adminSchemaValidation = Joi.object({
  first_name: Joi.string().required(),
  user_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});


const adminUpdateSchemaValidation = Joi.object({
  _id:Joi.string(),
  first_name: Joi.string().optional(),
  user_name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string(),
});

const adminloginSchemaValidation = Joi.object({
  user_name: Joi.string().required(),
  password: Joi.string().required(),
});


const adminloginUpdateSchemaValidation = Joi.object({
  _id:Joi.string(),
  user_name: Joi.string().optional(),
  password: Joi.string(),
});

const itemValidation = Joi.array().items(itemSchemaValidation);
const orderValidation = Joi.array().items(orderSchemaValidation);
const productValidation = Joi.array().items(productSchemaValidation);
const adminValidation = Joi.array().items(adminSchemaValidation);
const adminloginValidation = Joi.array().items(adminSchemaValidation);

export { itemValidation, itemSchemaValidation,itemUpdateSchemaValidation, 
         orderValidation, orderSchemaValidation, orderUpdateSchemaValidation, 
         productValidation,productSchemaValidation,productUpdateSchemaValidation,
         adminValidation, adminSchemaValidation, adminUpdateSchemaValidation,
         adminloginValidation, adminloginSchemaValidation, adminloginUpdateSchemaValidation };
