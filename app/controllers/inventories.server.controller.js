'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
  
	Inventory = mongoose.model('Inventory'),
	_ = require('lodash');

/**
 * Create a Inventory
 */
exports.create = function(req, res) {
	var inventory = new Inventory(req.body);
	inventory.user = req.user;

  
	inventory.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(inventory);
		}
	});
  
};

/**
 * Show the current Inventory
 */
exports.read = function(req, res) {
	res.jsonp(req.inventory);
};

/**
 * Update a Inventory
 */
exports.update = function(req, res) {
	var inventory = req.inventory ;

	inventory = _.extend(inventory , req.body);

	inventory.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(inventory);
		}
	});
};

/**
 * Delete an Inventory
 */
exports.delete = function(req, res) {
	var inventory = req.inventory ;

	inventory.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(inventory);
		}
	});
};

/**
 * List of Inventories
 */
exports.list = function(req, res) { 

  var populateQuery = [{path:'user', select:'displayName'}];
  
  
  
  populateQuery.push({path: 'product', select: 'name brand unitOfMeasure imgOfProduct' });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
	Inventory.find().sort('-created').populate(populateQuery).exec(function(err, inventories) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(inventories);
		}
	});
};

/**
 * Inventory middleware
 */
exports.inventoryByID = function(req, res, next, id) { 
  
  var populateQuery = [{path:'user', select:'displayName'}];
  
  
  
  populateQuery.push({path: 'product', select: 'name brand unitOfMeasure imgOfProduct' });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
	Inventory.findById(id).populate(populateQuery).exec(function(err, inventory) {
		if (err) return next(err);
		if (! inventory) return next(new Error('Failed to load Inventory ' + id));
		req.inventory = inventory ;
		next();
	});
};

/**
 * Inventory authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.inventory.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
