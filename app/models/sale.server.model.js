'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Sale Schema
 */
var SaleSchema = new Schema({

  creditSales: Boolean,


  party: {type: Schema.Types.ObjectId, ref: 'Customer'},


  billNumber: Number,


  billDateTime: Date,


  totalAmount: Number,


  totalDiscount: Number,


  taxes: Number,


  items: [{
  
  
  product:{type: Schema.Types.ObjectId, ref: 'Product'},
  
  
  
  quantity: Number,
  
  
  
  price: Number,
  
  
  
  amount: Number,
  
  
  }],

	created: {type: Date, default: Date.now},
	user: {type: Schema.ObjectId, ref: 'User'}
});
mongoose.model('Sale', SaleSchema);