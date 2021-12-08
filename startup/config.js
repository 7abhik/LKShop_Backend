const config = require('config');
const { ErrorHandler } = require('../middlewares/error');
module.exports = function () {
	if (!config.get('jwtPrivateKey')) {
		throw new ErrorHandler('FATAL Error: jwtPrivateKey is not defined.')
	}
}