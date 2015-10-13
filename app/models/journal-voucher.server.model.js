'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * JournalVoucher Schema
 */
var JournalVoucherSchema = new Schema({

  voucherNumber: Number,


  voucherDate: Date,


  details: [{
  
  
  accountName:{type: Schema.Types.ObjectId, ref: 'GeneralLedger'},
  
  
  
  debitCredit: String,
  
  
  
  amount: Number,
  
  
  }],

	created: {type: Date, default: Date.now},
	user: {type: Schema.ObjectId, ref: 'User'}
});
mongoose.model('JournalVoucher', JournalVoucherSchema);