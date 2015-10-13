'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
  
  Sequence = mongoose.model('Sequence'),
  
	Sale = mongoose.model('Sale'),
	_ = require('lodash');

/**
 * Create a Sale
 */
exports.create = function(req, res) {
	var sale = new Sale(req.body);
	sale.user = req.user;

  
  Sequence.update({ name: 'Sale.billNumber' },{$inc: {seqNumber:1}},{}, function (err, numAffected){
    if(numAffected === 1){
      Sequence.findOne({ name: 'Sale.billNumber' }, function (err, sequence){
        sale.billNumber = sequence.seqNumber;
        sale.save(function(err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.jsonp(sale);
          }
        });
      });  
    }
  });
  
};

/**
 * Show the current Sale
 */
exports.read = function(req, res) {
	res.jsonp(req.sale);
};

/**
 * Update a Sale
 */
exports.update = function(req, res) {
	var sale = req.sale ;

	sale = _.extend(sale , req.body);

	sale.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sale);
		}
	});
};

/**
 * Delete an Sale
 */
exports.delete = function(req, res) {
	var sale = req.sale ;

	sale.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sale);
		}
	});
};

/**
 * List of Sales
 */
exports.list = function(req, res) { 

  var populateQuery = [{path:'user', select:'displayName'}];
  
  
  
  
  
  
  populateQuery.push({path: 'party', select: 'name address mobileNumber email pan tin' });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  populateQuery.push({path: 'items.product', select: 'name brand unitOfMeasure imgOfProduct' });
  
  
  
  
  
  
  
  
  
  
  
  
	Sale.find().sort('-created').populate(populateQuery).exec(function(err, sales) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sales);
		}
	});
};

/**
 * Sale middleware
 */
exports.saleByID = function(req, res, next, id) { 
  
  var populateQuery = [{path:'user', select:'displayName'}];
  
  
  
  
  
  
  populateQuery.push({path: 'party', select: 'name address mobileNumber email pan tin' });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  populateQuery.push({path: 'items.product', select: 'name brand unitOfMeasure imgOfProduct' });
  
  
  
  
  
  
  
  
  
  
  
  
	Sale.findById(id).populate(populateQuery).exec(function(err, sale) {
		if (err) return next(err);
		if (! sale) return next(new Error('Failed to load Sale ' + id));
		req.sale = sale ;
		next();
	});
};

/**
 * Sale authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.sale.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
