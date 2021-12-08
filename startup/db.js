const mongoose = require('mongoose');
const logger = require('./logger');
const config = require('config');
const uri = config.get('mongodb.uri')
const db = config.get('mongodb.db')
module.exports = function () {
	mongoose.connect(uri + db, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})
		.then(() => {
			logger.info('connected to db..')
		})
		.catch((err) => {
			logger.error(err)
		})
}