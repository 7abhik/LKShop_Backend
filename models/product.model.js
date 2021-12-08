const Joi = require('joi');
const mongoose = require('mongoose');
const { variationSchema, varValidSchema } = require('./variation.model')

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 50
	},
	image: {
		type: String,
		required: true,
	},
	gender: {
		type: String
	},
	isLiked: {
		type: Boolean,
		default: false
	},
	variations: {
		type: variationSchema,
		required: true,
	}

});

const Product = mongoose.model('Product', productSchema);

/***********************Validations**************************** */

function validateProduct(product) {
	// const variationsSchema = Joi.object({

	// })
	// variationsSchema.validate(product.variations)

	const schema = Joi.object({
		name: Joi.string().min(2).required(),
		image: Joi.string().required(),
		gender: Joi.string().lowercase().valid('m', 'f'),
		variations: varValidSchema
	});
	return schema.validate(product);
}
/***************************End************************** */

exports.productSchema = productSchema;
exports.Product = Product;
exports.validate = validateProduct;