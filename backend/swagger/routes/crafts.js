/**
 * @swagger
 * components:
 *   schemas:
 *     Craft:
 *       type: object
 *       required:
 *         - product_name
 *         - price
 *         - quantity
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the craft
 *         product_name:
 *           type: string
 *           description: The name of your craft
 *         price:
 *           type: string
 *           description: Price of the craft
 *         quantity:
 *           type: boolean
 *           description: Quantity of crafts
 *         description:
 *           type: string
 *           format: date
 *           description: The description of the craft was added
 *       example:
 *         id: 111
 *         product_name: MY craft
 *         price: 10
 *         quantity: 1
 *         description: carft description
 */



/**
 * @swagger
 * tags:
 *   name: Crafts
 *   description: The crafts managing API
 * /crafts:
 *   get:
 *     summary: Lists all the crafts
 *     tags: [Crafts]
 *     responses:
 *       200:
 *         description: The list of the crafts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Craft'
 *   post:
 *     summary: Create a new craft
 *     tags: [Crafts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Craft'
 *     responses:
 *       200:
 *         description: The created craft.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Craft'
 *       500:
 *         description: Some server error
 * /crafts/{id}:
 *   get:
 *     summary: Get the craft by id
 *     tags: [Crafts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The craft id
 *     responses:
 *       200:
 *         description: The craft response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Craft'
 *       404:
 *         description: The craft was not found
 *   put:
 *    summary: Update the craft by the id
 *    tags: [Crafts]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The craft id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Craft'
 *    responses:
 *      200:
 *        description: The craft was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Craft'
 *      404:
 *        description: The craft was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the craft by id
 *     tags: [Crafts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The craft id
 *
 *     responses:
 *       200:
 *         description: The craft was deleted
 *       404:
 *         description: The craft was not found
 */


const express = require("express");
const router = express.Router();

const crafts = require("../util/data");

router.get("/", function (req, res) {
	res.status(200).json(crafts);
});

router.get("/:id", function (req, res) {
	let craft = crafts.find(function (item) {
		return item.id == req.params.id;
	});

	craft ? res.status(200).json(craft) : res.sendStatus(404);
});

router.post("/", function (req, res) {
	const { product_name, price, quantity, description } = req.body;

	let craft = {
		id: crafts.length + 1,
		product_name: product_name,
		price: price,
		quantity: quantity,
		description: description,
	};

	crafts.push(craft);

	res.status(201).json(craft);
});

router.put("/:id", function (req, res) {
	let craft = crafts.find(function (item) {
		return item.id == req.params.id;
	});

	if (craft) {
		const { product_name, price, quantity, description } = req.body;

		let updated = {
			id: craft.id,
			product_name: product_name !== undefined ? product_name : craft.product_name,
			price: price !== undefined ? price : craft.price,
			quantity: quantity !== undefined ? quantity : craft.quantity,
			description: description !== undefined ? description : craft.description,
		};

		crafts.splice(crafts.indexOf(craft), 1, updated);

		res.sendStatus(204);
	} else {
		res.sendStatus(404);
	}
});

router.delete("/:id", function (req, res) {
	let craft = crafts.find(function (item) {
		return item.id == req.params.id;
	});

	if (craft) {
		crafts.splice(crafts.indexOf(craft), 1);
	} else {
		return res.sendStatus(404);
	}

	res.sendStatus(204);
});

module.exports = router;
