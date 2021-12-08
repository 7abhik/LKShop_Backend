const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50
	},
	lastName: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 50
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024
	},
	isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
	return token;
}
const User = mongoose.model('User', userSchema);


/****************************Validator******************************** */

const Joi = require('joi');
function validateUser(user) {
	const schema = Joi.object({
		firstName: Joi.string().min(3).max(50).required(),
		lastName: Joi.string().min(2).max(50).required(),
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required(),
		conf_password: Joi.string().min(5).max(255).valid(Joi.ref('password')).required().label('Confirm password')
			.options({ messages: { 'any.only': '{{#label}} does not match' } })
	});
	return schema.validate(user);
}


exports.validate = validateUser;
exports.User = User;