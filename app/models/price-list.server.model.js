'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * PriceList Schema
 */
var PriceListSchema = new Schema({

  priceListName: String,


  effectiveDate: Date,


  products: [{
  
  
  product:{type: Schema.Types.ObjectId, ref: 'Product'},
  
  
  
  price: Number,
  
  
  }],

	created: {type: Date, default: Date.now},
	user: {type: Schema.ObjectId, ref: 'User'}
});
mongoose.model('PriceList', PriceListSchema);