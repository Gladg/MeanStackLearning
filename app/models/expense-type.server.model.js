'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * ExpenseType Schema
 */
var ExpenseTypeSchema = new Schema({

  code: String,


  name: String,

	created: {type: Date, default: Date.now},
	user: {type: Schema.ObjectId, ref: 'User'}
});
mongoose.model('ExpenseType', ExpenseTypeSchema);