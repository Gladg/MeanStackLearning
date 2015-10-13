'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Product Schema
 */
var ProductSchema = new Schema({

  name: String,


  brand: String,


  category: {type: Schema.Types.ObjectId, ref: 'Category'},

	created: {type: Date, default: Date.now},
	user: {type: Schema.ObjectId, ref: 'User'}
});
mongoose.model('Product', ProductSchema);