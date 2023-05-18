/**
 * @swagger
 * components:
 *   schemas:
 *     Orders:
 *       type: object
 *       required:
 *         - order_number
 *         - first_name
 *         - price
 *         - product_name
 *         - quantity
 *         - total
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the order
 *         order_number:
 *           type: string
 *           description: The order_number of your order
 *         first_name:
 *           type: string
 *           description: first_name of the order
 *         price:
 *           type: string
 *           description: The price of the order
 *         product_name:
 *           type: string
 *           description: The product_name of your order
 *         quantity:
 *           type: string
 *           description: quantity of the order
 *         total:
 *           type: string
 *           description: The order_number of your order
 *         email:
 *           type: string
 *           description: email of the order
 *       example:
 *         id: 11111
 *         order_number: 11111
 *         first_name: 11111
 *         price: 11111
 *         product_name: 11111
 *         quantity: 11111
 *         total: 11111
 *         email: 11111
 *      
 */



/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: The orders managing API
 * /orders:
 *   get:
 *     summary: Lists all the orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: The list of the orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: The created order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Some server error
 * /orders/{id}:
 *   get:
 *     summary: Get the order by id
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order id
 *     responses:
 *       200:
 *         description: The order response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: The order was not found
 *   put:
 *    summary: Update the order by the id
 *    tags: [Orders]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The order id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Order'
 *    responses:
 *      200:
 *        description: The order was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Order'
 *      404:
 *        description: The order was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the order by id
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order id
 *
 *     responses:
 *       200:
 *         description: The order was deleted
 *       404:
 *         description: The order was not found
 */


const express = require("express");
const router = express.Router();

const orders = require("../util/order-data");

router.get("/", function (req, res) {
	res.status(200).json(orders);
});

router.get("/:id", function (req, res) {
	let order = orders.find(function (item) {
		return item.id == req.params.id;
	});

	order ? res.status(200).json(order) : res.sendStatus(404);
});

router.post("/", function (req, res) {
	const { order_number, first_name, price, product_name, quantity, total, email } = req.body;

	let order = {
		id: orders.length + 1,
		order_number: order_number,
		first_name: first_name,
		price: price,
		product_name: product_name,
		quantity: quantity,
		total: total,
		email: email,
	};

	orders.push(order);

	res.status(201).json(order);
});

router.put("/:id", function (req, res) {
	let order = orders.find(function (item) {
		return item.id == req.params.id;
	});

	if (order) {
		const { order_number, first_name, price, product_name, quantity, total, email } = req.body;

		let updated = {
			id: order.id,
			order_number: order_number !== undefined ? order_number : order.first_name,
			first_name: first_name !== undefined ? first_name : order.first_name,
			price: price !== undefined ? price : order.price,
			product_name: product_name !== undefined ? product_name : order.product_name,
			quantity: quantity !== undefined ? quantity : order.quantity,
			total: total !== undefined ? total : order.total,
			email: email !== undefined ? email : order.email,
		};

		order.ssplice(orders.indexOf(order), 1, updated);

		res.sendStatus(204);
	} else {
		res.sendStatus(404);
	}
});

router.delete("/:id", function (req, res) {
	let order = orders.find(function (item) {
		return item.id == req.params.id;
	});

	if (order) {
		orders.splice(orders.indexOf(order), 1);
	} else {
		return res.sendStatus(404);
	}

	res.sendStatus(204);
});

module.exports = router;
