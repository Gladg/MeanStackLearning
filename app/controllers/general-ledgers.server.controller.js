'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
  
	GeneralLedger = mongoose.model('GeneralLedger'),
	_ = require('lodash');

/**
 * Create a General Ledger
 */
exports.create = function(req, res) {
	var generalLedger = new GeneralLedger(req.body);
	generalLedger.user = req.user;

  
	generalLedger.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(generalLedger);
		}
	});
  
};

/**
 * Show the current General Ledger
 */
exports.read = function(req, res) {
	res.jsonp(req.generalLedger);
};

/**
 * Update a General Ledger
 */
exports.update = function(req, res) {
	var generalLedger = req.generalLedger ;

	generalLedger = _.extend(generalLedger , req.body);

	generalLedger.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(generalLedger);
		}
	});
};

/**
 * Delete an General Ledger
 */
exports.delete = function(req, res) {
	var generalLedger = req.generalLedger ;

	generalLedger.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(generalLedger);
		}
	});
};

/**
 * List of General Ledgers
 */
exports.list = function(req, res) { 

  var populateQuery = [{path:'user', select:'displayName'}];
  
  
  
  
  
  
  
  
	GeneralLedger.find().sort('-created').populate(populateQuery).exec(function(err, generalLedgers) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(generalLedgers);
		}
	});
};

/**
 * General Ledger middleware
 */
exports.generalLedgerByID = function(req, res, next, id) { 
  
  var populateQuery = [{path:'user', select:'displayName'}];
  
  
  
  
  
  
  
  
	GeneralLedger.findById(id).populate(populateQuery).exec(function(err, generalLedger) {
		if (err) return next(err);
		if (! generalLedger) return next(new Error('Failed to load General Ledger ' + id));
		req.generalLedger = generalLedger ;
		next();
	});
};

/**
 * General Ledger authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.generalLedger.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
