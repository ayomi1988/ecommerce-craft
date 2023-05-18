/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - first_name
 *         - user_name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the customer
 *         first_name:
 *           type: string
 *           description: The name of your customer
 *         user_name:
 *           type: string
 *           description: user_name of the customer
 *         email:
 *           type: boolean
 *           description: email of customers
 *         password:
 *           type: string
 *           format: date
 *           description: The password of the customer was added
 *       example:
 *         id: 11111
 *         first_name: Ayomi Perera
 *         user_name: username
 *         email: ayomi@test.com
 *         password: passwordhere
 */



/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: The customers managing API
 * /customers:
 *   get:
 *     summary: Lists all the customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: The list of the customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: The created customer.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Some server error
 * /customers/{id}:
 *   get:
 *     summary: Get the customer by id
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The customer id
 *     responses:
 *       200:
 *         description: The customer response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: The customer was not found
 *   put:
 *    summary: Update the customer by the id
 *    tags: [Customers]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The customer id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Customer'
 *    responses:
 *      200:
 *        description: The customer was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Customer'
 *      404:
 *        description: The customer was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the customer by id
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The customer id
 *
 *     responses:
 *       200:
 *         description: The customer was deleted
 *       404:
 *         description: The customer was not found
 */


const express = require("express");
const router = express.Router();

const customers = require("../util/data");

router.get("/", function (req, res) {
	res.status(200).json(customers);
});

router.get("/:id", function (req, res) {
	let customer = customers.find(function (item) {
		return item.id == req.params.id;
	});

	customer ? res.status(200).json(customer) : res.sendStatus(404);
});

router.post("/", function (req, res) {
	const { first_name, user_name, email, password } = req.body;

	let customer = {
		id: customers.length + 1,
		first_name: first_name,
		user_name: user_name,
		email: email,
		password: password,
	};

	customers.push(customer);

	res.status(201).json(customer);
});

router.put("/:id", function (req, res) {
	let customer = customers.find(function (item) {
		return item.id == req.params.id;
	});

	if (customer) {
		const { first_name, user_name, email, password } = req.body;

		let updated = {
			id: customer.id,
			first_name: first_name !== undefined ? first_name : customer.first_name,
			user_name: user_name !== undefined ? user_name : customer.user_name,
			email: email !== undefined ? email : customer.email,
			password: password !== undefined ? password : customer.password,
		};

		customers.splice(customers.indexOf(customer), 1, updated);

		res.sendStatus(204);
	} else {
		res.sendStatus(404);
	}
});

router.delete("/:id", function (req, res) {
	let customer = customers.find(function (item) {
		return item.id == req.params.id;
	});

	if (customer) {
		customers.splice(customers.indexOf(customer), 1);
	} else {
		return res.sendStatus(404);
	}

	res.sendStatus(204);
});

module.exports = router;
