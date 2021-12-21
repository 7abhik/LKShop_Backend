const express = require('express');
const helmet = require("helmet");
const morgan = require('morgan')
const cors = require('cors')
const accessHeaders = require('../middlewares/accessHeaders');
module.exports = function (app) {
	app.use(helmet());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cors())
	app.use(morgan('tiny'))
}

