'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Purchase Schema
 */
var PurchaseSchema = new Schema({

  billNumber: Number,


  billDate: Date,


  party: {type: Schema.Types.ObjectId, ref: 'Supplier'},


  paid: Boolean,


  amount: Number,


  items: [{
  
  
  product:{type: Schema.Types.ObjectId, ref: 'Product'},
  
  
  
  quantity: Number,
  
  
  
  cost: Number,
  
  
  
  amount: Number,
  
  
  }],

	created: {type: Date, default: Date.now},
	user: {type: Schema.ObjectId, ref: 'User'}
});
mongoose.model('Purchase', PurchaseSchema);