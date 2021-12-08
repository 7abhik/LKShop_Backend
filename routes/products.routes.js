const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const { validate } = require('../models/product.model');
const { validateVariation } = require('../models/variation.model');
const express = require('express');
const { ErrorHandler } = require('../middlewares/error');
const router = express.Router();
const { getProduct, createProduct, updateProduct, deleteProduct, getProductList } = require('../controllers/product.controller')

router.post('/list', async (req, res) => {
	const data = await getProductList(req.body)
	res.status(200).json({ status: "success", data });
});

router.post('/', auth, async (req, res) => {

	let validation = validate(req.body);
	let error = validation.error
	if (error) throw new ErrorHandler(400, error.details[0].message)

	validation = validateVariation(req.body.variations);
	error = validation.error
	if (error) throw new ErrorHandler(400, error.details[0].message)

	const data = await createProduct(req)
	res.status(200).json({ status: "success", data });
});

router.put('/:id', auth, async (req, res) => {
	const { error } = validate(req.body);
	if (error) throw new ErrorHandler(400, error.details[0].message)
	const data = await updateProduct(req)
	res.status(200).json({ status: "success", data });
});

router.delete('/:id', [auth, admin], async (req, res) => {
	const data = await deleteProduct(req)
	res.status(200).json({ status: 'success', data });
});

router.get('/:id', async (req, res) => {
	const data = await getProduct(req)
	res.status(200).json({ status: "success", data });
});


module.exports = router;