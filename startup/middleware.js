const express = require('express');
const helmet = require("helmet");
const morgan = require('morgan')
const accessHeaders = require('../middlewares/accessHeaders');
module.exports = function (app) {
	app.use(helmet());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(accessHeaders)
	app.use(morgan('tiny'))
}

