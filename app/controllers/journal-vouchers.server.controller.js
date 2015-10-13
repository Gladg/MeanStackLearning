'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
  
  Sequence = mongoose.model('Sequence'),
  
	JournalVoucher = mongoose.model('JournalVoucher'),
	_ = require('lodash');

/**
 * Create a Journal Voucher
 */
exports.create = function(req, res) {
	var journalVoucher = new JournalVoucher(req.body);
	journalVoucher.user = req.user;

  
  Sequence.update({ name: 'JournalVoucher.voucherNumber' },{$inc: {seqNumber:1}},{}, function (err, numAffected){
    if(numAffected === 1){
      Sequence.findOne({ name: 'JournalVoucher.voucherNumber' }, function (err, sequence){
        journalVoucher.voucherNumber = sequence.seqNumber;
        journalVoucher.save(function(err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.jsonp(journalVoucher);
          }
        });
      });  
    }
  });
  
};

/**
 * Show the current Journal Voucher
 */
exports.read = function(req, res) {
	res.jsonp(req.journalVoucher);
};

/**
 * Update a Journal Voucher
 */
exports.update = function(req, res) {
	var journalVoucher = req.journalVoucher ;

	journalVoucher = _.extend(journalVoucher , req.body);

	journalVoucher.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(journalVoucher);
		}
	});
};

/**
 * Delete an Journal Voucher
 */
exports.delete = function(req, res) {
	var journalVoucher = req.journalVoucher ;

	journalVoucher.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(journalVoucher);
		}
	});
};

/**
 * List of Journal Vouchers
 */
exports.list = function(req, res) { 

  var populateQuery = [{path:'user', select:'displayName'}];
  
  
  
  
  
  
  
  
  
  
  
  
  populateQuery.push({path: 'details.accountName', select: 'name description' });
  
  
  
  
  
  
  
  
  
  
	JournalVoucher.find().sort('-created').populate(populateQuery).exec(function(err, journalVouchers) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(journalVouchers);
		}
	});
};

/**
 * Journal Voucher middleware
 */
exports.journalVoucherByID = function(req, res, next, id) { 
  
  var populateQuery = [{path:'user', select:'displayName'}];
  
  
  
  
  
  
  
  
  
  
  
  
  populateQuery.push({path: 'details.accountName', select: 'name description' });
  
  
  
  
  
  
  
  
  
  
	JournalVoucher.findById(id).populate(populateQuery).exec(function(err, journalVoucher) {
		if (err) return next(err);
		if (! journalVoucher) return next(new Error('Failed to load Journal Voucher ' + id));
		req.journalVoucher = journalVoucher ;
		next();
	});
};

/**
 * Journal Voucher authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.journalVoucher.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
