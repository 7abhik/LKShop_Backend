const jwt = require('jsonwebtoken');
const config = require('config');
const { ErrorHandler } = require('./error')
module.exports = function auth(req, res, next) {
	const token = req.header('x-auth-token');
	if (!token) throw new ErrorHandler(401, 'Access denied. No token provied')
	try {
		const decode = jwt.verify(token, config.get('jwtPrivateKey'))
		req.user = decode
		next()
	} catch (e) {
		throw new ErrorHandler(400, 'Invalid token.', e)
	}
}