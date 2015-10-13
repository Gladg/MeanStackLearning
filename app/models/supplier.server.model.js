'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Supplier Schema
 */
var SupplierSchema = new Schema({

  name: String,


  address: String,


  mobileNumber: Number,


  email: String,


  pan: String,


  tin: String,

	created: {type: Date, default: Date.now},
	user: {type: Schema.ObjectId, ref: 'User'}
});
mongoose.model('Supplier', SupplierSchema);