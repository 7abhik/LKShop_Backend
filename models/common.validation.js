const Joi = require("joi");
function validateListing(user) {
	const schema = Joi.object({
		page: Joi.number().required(),
		pageSize: Joi.number().required(),
		sort: Joi.string().required(),
		order: Joi.string().valid('asc', 'dsc').required(),
	});
	return schema.validate(user);
}

exports.validateListing = validateListing;
