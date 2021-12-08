const express = require('express');
const app = express()
const logger = require('./startup/logger');
global.logger = logger
const config = require('config')

require('./startup/config')();
require('./startup/middleware')(app)
require('./startup/routes')(app)
require('./startup/db')();


process.on('unhandledRejection', (ex) => {
	throw ex;
});

const port = config.get('port')
app.listen(port, () => {
	logger.info(`Listing at port ${port} ......`);
})