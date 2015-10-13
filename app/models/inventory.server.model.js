'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Inventory Schema
 */
var InventorySchema = new Schema({

  product: {type: Schema.Types.ObjectId, ref: 'Product'},


  lotOrBatchNumber: String,


  expiryDate: Date,


  quantity: Number,


  cost: Number,

	created: {type: Date, default: Date.now},
	user: {type: Schema.ObjectId, ref: 'User'}
});
mongoose.model('Inventory', InventorySchema);