'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
  
	ExpenseType = mongoose.model('ExpenseType'),
	_ = require('lodash');

/**
 * Create a Expense Type
 */
exports.create = function(req, res) {
	var expenseType = new ExpenseType(req.body);
	expenseType.user = req.user;

  
	expenseType.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(expenseType);
		}
	});
  
};

/**
 * Show the current Expense Type
 */
exports.read = function(req, res) {
	res.jsonp(req.expenseType);
};

/**
 * Update a Expense Type
 */
exports.update = function(req, res) {
	var expenseType = req.expenseType ;

	expenseType = _.extend(expenseType , req.body);

	expenseType.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(expenseType);
		}
	});
};

/**
 * Delete an Expense Type
 */
exports.delete = function(req, res) {
	var expenseType = req.expenseType ;

	expenseType.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(expenseType);
		}
	});
};

/**
 * List of Expense Types
 */
exports.list = function(req, res) { 

  var populateQuery = [{path:'user', select:'displayName'}];
  
  
  
  
  
  
  
  
	ExpenseType.find().sort('-created').populate(populateQuery).exec(function(err, expenseTypes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(expenseTypes);
		}
	});
};

/**
 * Expense Type middleware
 */
exports.expenseTypeByID = function(req, res, next, id) { 
  
  var populateQuery = [{path:'user', select:'displayName'}];
  
  
  
  
  
  
  
  
	ExpenseType.findById(id).populate(populateQuery).exec(function(err, expenseType) {
		if (err) return next(err);
		if (! expenseType) return next(new Error('Failed to load Expense Type ' + id));
		req.expenseType = expenseType ;
		next();
	});
};

/**
 * Expense Type authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.expenseType.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
