const { ErrorHandler } = require('../middlewares/error');
const { Product } = require('../models/product.model');
module.exports = {
	async getProductList(req) {
		let start = req.start ? req.start : 0
		let length = req.length ? req.length : 10
		const totalRecord = await Product.find().countDocuments()
		const products = await Product.find().skip(start).limit(length).sort('name');
		const metaInfo = { start, length }
		return { totalRecord, products, metaInfo }
	},

	async getProduct(req) {
		const product = await Product.findById(req.params.id);
		if (!product) throw new ErrorHandler(404, 'The product with the given ID was not found.')
		return product
	},

	async createProduct(req) {
		let product = new Product(req.body);
		return await product.save();
	},

	async updateProduct(req) {
		const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
			new: true
		});
		if (!product) throw new ErrorHandler(404, 'The product with the given ID was not found.');
		return product;
	},

	async deleteProduct(req) {
		const product = await Product.findByIdAndRemove(req.params.id);
		if (!product) throw new ErrorHandler(404, 'The product with the given ID was not found.');
		return product;
	}
}