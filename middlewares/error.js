
module.exports.invalidPath = ('*', (req, res, next) => {
	throw new ErrorHandler(404, 'End point not found')
})

module.exports.error = (err, req, res, next) => {
	const { statusCode, message } = err;
	if (err.actualError) console.error(err.actualError);
	logger.warn(err)
	return res.status(statusCode || 500).json({
		status: "error",
		msg: message || 'Internal server error.'
	});
}

class ErrorHandler extends Error {
	constructor(statusCode, message, actualError) {
		super();
		this.statusCode = statusCode;
		this.message = message;
		this.actualError = actualError;
	}
}



module.exports.ErrorHandler = ErrorHandler
