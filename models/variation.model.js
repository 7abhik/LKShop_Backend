const Joi = require('joi');
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi)

const variationSchema = new mongoose.Schema({
	sku: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 50
	},
	price: {
		type: Number,
		required: true
	},
	color: {
		type: String,
	},
	size: {
		type: String
	},
	inStock: {
		type: Number,
		required: true,
	},
	discount: {
		type: Number,
		default: 0
	}
});

const variation = mongoose.model('variation', variationSchema);

/***********************Validations**************************** */
const schema = Joi.object({
	_id: Joi.objectId().messages({ 'variations._id': 'Invalid variation id' }),
	sku: Joi.string().min(2).required(),
	price: Joi.number().min(0).required().messages({ 'any.required': 'product variation price is required' }),
	color: Joi.string(),
	size: Joi.string(),
	inStock: Joi.number().required().min(0).messages({ 'any.required': 'product variation stock is required' }),
	discount: Joi.number().min(0)
});
function validateVariation(variation) {
	return schema.validate(variation)
}
/***************************End************************** */

exports.variationSchema = variationSchema;
exports.variation = variation;
exports.validateVariation = validateVariation;
exports.varValidSchema = schema;