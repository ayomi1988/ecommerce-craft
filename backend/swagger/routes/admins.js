/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - first_name
 *         - user_name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the admin
 *         first_name:
 *           type: string
 *           description: The name of your admin
 *         user_name:
 *           type: string
 *           description: user_name of the admin
 *         email:
 *           type: boolean
 *           description: email of admins
 *         password:
 *           type: string
 *           format: date
 *           description: The password of the admin was added
 *       example:
 *         id: 11111
 *         first_name: Ayomi Perera
 *         user_name: admin
 *         email: ayomi@test.com
 *         password: passwordhere
 */



/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: The admins managing API
 * /admins:
 *   post:
 *     summary: Create a new admin
 *     tags: [Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       200:
 *         description: The created admin.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       500:
 *         description: Some server error
 *
 */


const express = require("express");
const router = express.Router();

const admins = require("../util/data");

router.get("/", function (req, res) {
	res.status(200).json(admins);
});

router.get("/:id", function (req, res) {
	let admin = admins.find(function (item) {
		return item.id == req.params.id;
	});

	admin ? res.status(200).json(admin) : res.sendStatus(404);
});

router.post("/", function (req, res) {
	const { first_name, user_name, email, password } = req.body;

	let admin = {
		id: admins.length + 1,
		first_name: first_name,
		user_name: user_name,
		email: email,
		password: password,
	};

	admins.push(admin);

	res.status(201).json(admin);
});

router.put("/:id", function (req, res) {
	let admin = admins.find(function (item) {
		return item.id == req.params.id;
	});

	if (admin) {
		const { first_name, user_name, email, password } = req.body;

		let updated = {
			id: admin.id,
			first_name: first_name !== undefined ? first_name : admin.first_name,
			user_name: user_name !== undefined ? user_name : admin.user_name,
			email: email !== undefined ? email : admin.email,
			password: password !== undefined ? password : admin.password,
		};

		admins.splice(admins.indexOf(admin), 1, updated);

		res.sendStatus(204);
	} else {
		res.sendStatus(404);
	}
});

router.delete("/:id", function (req, res) {
	let admin = admins.find(function (item) {
		return item.id == req.params.id;
	});

	if (admin) {
		admins.splice(admins.indexOf(admin), 1);
	} else {
		return res.sendStatus(404);
	}

	res.sendStatus(204);
});

module.exports = router;
