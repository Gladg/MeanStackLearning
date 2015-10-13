'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
  
	PriceList = mongoose.model('PriceList'),
	_ = require('lodash');

/**
 * Create a Price List
 */
exports.create = function(req, res) {
	var priceList = new PriceList(req.body);
	priceList.user = req.user;

  
	priceList.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(priceList);
		}
	});
  
};

/**
 * Show the current Price List
 */
exports.read = function(req, res) {
	res.jsonp(req.priceList);
};

/**
 * Update a Price List
 */
exports.update = function(req, res) {
	var priceList = req.priceList ;

	priceList = _.extend(priceList , req.body);

	priceList.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(priceList);
		}
	});
};

/**
 * Delete an Price List
 */
exports.delete = function(req, res) {
	var priceList = req.priceList ;

	priceList.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(priceList);
		}
	});
};

/**
 * List of Price Lists
 */
exports.list = function(req, res) { 

  var populateQuery = [{path:'user', select:'displayName'}];
  
  
  
  
  
  
  
  
  
  
  
  
  populateQuery.push({path: 'products.product', select: 'name brand unitOfMeasure units price' });
  
  
  
  
  
  
  
  
	PriceList.find().sort('-created').populate(populateQuery).exec(function(err, priceLists) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(priceLists);
		}
	});
};

/**
 * Price List middleware
 */
exports.priceListByID = function(req, res, next, id) { 
  
  var populateQuery = [{path:'user', select:'displayName'}];
  
  
  
  
  
  
  
  
  
  
  
  
  populateQuery.push({path: 'products.product', select: 'name brand unitOfMeasure units price' });
  
  
  
  
  
  
  
  
	PriceList.findById(id).populate(populateQuery).exec(function(err, priceList) {
		if (err) return next(err);
		if (! priceList) return next(new Error('Failed to load Price List ' + id));
		req.priceList = priceList ;
		next();
	});
};

/**
 * Price List authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.priceList.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
