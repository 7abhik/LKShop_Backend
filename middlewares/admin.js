const { ErrorHandler } = require("./error");

module.exports = function (req, res, next) {
	// 401 Unauthorized
	// 403 Forbidden 

	if (!req.user.isAdmin) throw new ErrorHandler(401, 'Access denied.')

	next();
}