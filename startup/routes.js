const { error, invalidPath } = require('../middlewares/error');
module.exports = function (app) {
	app.use('/api/auth', require('../routes/auth.routes'));
	app.use('/api/user', require('../routes/users.routes'));
	// app.use('/api/vendor', require('../routes/vendors.routes'));
	app.use('/api/product', require('../routes/products.routes'));
	app.use(invalidPath)
	app.use(error);
}