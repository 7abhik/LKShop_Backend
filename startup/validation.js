const Joi = require('joi');
module.exports = function() {
	console.log('heeeeeeeeeeeeeeeee');
  Joi.objectId = require('joi-objectid')(Joi);
}